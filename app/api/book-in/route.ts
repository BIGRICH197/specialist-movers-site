import { NextResponse } from "next/server";
import { pingBookings } from "@/lib/quote-notify";
import {
  createHubSpotDeal,
  findDealIdByEmail,
  findOrCreateContact,
  setDealOwner,
  setDealStage,
  STAGE_CLOSED_WON,
} from "@/lib/hubspot";
import { bookedByOwnerId, normalizeBookedBy } from "@/lib/booked-by";
import { isDialable, PHONE_ERROR } from "@/lib/phone";
import { createPianoCard } from "@/lib/piano-card";
import { saveDirectBooking, attachDealToDirectBooking } from "@/lib/direct-booking";
import { markLatestQuoteBookedByEmail } from "@/lib/quote-store";

export const runtime = "nodejs";

// Direct "book a job in" endpoint — for clients who did NOT get a hosted quote
// link (replaces the old JotForms). Unlike /api/bookings it does not need a
// stored quote. It pings the team in Slack and forwards to the same n8n booking
// webhook, which builds the Trello job card and moves the matching HubSpot deal
// (found by email) to Closed Won. Most people booking in are already a deal.

type BookInBody = { serviceType?: string; fields?: Record<string, string> };

const HOUSE_REQUIRED = [
  "fullName",
  "phone",
  "email",
  "pickupAddress",
  "dropoffAddress",
  "moveDate",
  "sizeOfMove",
  "howManyMovers",
  "typeOfMove",
  "payment",
  "cleaningBooked",
  "packing",
  "unpacking",
  "fragileItems",
  "furnitureDismantle",
  "accessRestrictions",
  "settlementDay",
];

const PIANO_REQUIRED = [
  "fullName",
  "phone",
  "email",
  "moveDate",
  "pianoType",
  "pickupAddress",
  "dropoffAddress",
  "stairs",
];

// The piano booking webhook lives next to the house one on the same n8n tenant.
// PIANO_BOOKING_WEBHOOK wins when set; otherwise derive it from
// QUOTE_BOOKING_WEBHOOK so adding the house webhook to an environment is enough
// to light both up.
function pianoWebhookUrl(): string | undefined {
  if (process.env.PIANO_BOOKING_WEBHOOK) return process.env.PIANO_BOOKING_WEBHOOK;
  const house = process.env.QUOTE_BOOKING_WEBHOOK;
  if (!house) return undefined;
  try {
    return new URL("spm-piano-booking-4c81de37a9b2", house).toString();
  } catch {
    return undefined;
  }
}

// Office moves reuse the house fields but drop bedrooms/type/payment.
const OFFICE_OMIT = ["sizeOfMove", "typeOfMove", "payment"];

function missingFields(serviceType: string, fields: Record<string, string>): string[] {
  if (serviceType === "piano") {
    return PIANO_REQUIRED.filter((k) => !fields[k]?.trim());
  }
  const required =
    serviceType === "office"
      ? HOUSE_REQUIRED.filter((k) => !OFFICE_OMIT.includes(k))
      : HOUSE_REQUIRED;
  const out = required.filter((k) => !fields[k]?.trim());
  if (fields.cleaningBooked === "Yes Cleaning" && !fields.cleaningSameDay?.trim())
    out.push("cleaningSameDay");
  if (fields.packing === "Yes packing" && !fields.whatPacking?.trim())
    out.push("whatPacking");
  return out;
}

export async function POST(request: Request) {
  let body: BookInBody;
  try {
    body = (await request.json()) as BookInBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const serviceType = body.serviceType || "house";
  const fields = body.fields || {};

  if (!fields.agreeTerms) {
    return NextResponse.json(
      { ok: false, error: "terms must be accepted" },
      { status: 400 },
    );
  }

  // Every question is compulsory (same rule as the quote-booking form).
  const missing = missingFields(serviceType, fields);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "missing required fields", missing },
      { status: 400 },
    );
  }

  // Presence is not enough — the crew must be able to RING this number on the
  // day. The booking forms validate client-side; this is the backstop for
  // direct POSTs and anything that skips the form JS.
  if (!isDialable(fields.phone)) {
    return NextResponse.json({ ok: false, error: PHONE_ERROR }, { status: 400 });
  }

  const isPiano = serviceType === "piano";

  // SAVE FIRST. Slack, HubSpot and Trello below are all best-effort — each is
  // wrapped so a failure can't break the booking — which means none of them can
  // be the record. Persist to Supabase before any of them, and if that fails,
  // tell the customer honestly instead of returning ok and losing their move.
  // The saved row is also what carries the booking to ShiftMate v2, via the
  // existing publisher.
  let token: string;
  try {
    token = await saveDirectBooking({ serviceType, fields });
  } catch (err) {
    console.error("book-in save failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your booking. Nothing has been booked — please call us on (021) 228 2728 and we'll sort it straight away.",
      },
      { status: 503 },
    );
  }

  // Tell the team a job has been booked in.
  const summary = [
    `:calendar: *Job booked in* (${serviceType}) — ${fields.fullName || ""}`,
    fields.email ? `Email: ${fields.email}` : "",
    fields.phone ? `Phone: ${fields.phone}` : "",
    fields.moveDate ? `Move date: ${fields.moveDate}` : "",
    isPiano && fields.pianoType ? `Item: ${fields.pianoType}` : "",
    isPiano && fields.stairs ? `Stairs: ${fields.stairs}` : "",
    !isPiano && fields.sizeOfMove ? `Size: ${fields.sizeOfMove}` : "",
    !isPiano && fields.howManyMovers ? `Movers: ${fields.howManyMovers}` : "",
    normalizeBookedBy(fields.bookedBy)
      ? `Dealing with: ${normalizeBookedBy(fields.bookedBy)}`
      : "",
    fields.pickupAddress ? `From: ${fields.pickupAddress}` : "",
    fields.dropoffAddress ? `To: ${fields.dropoffAddress}` : "",
    "_Direct book-in (no quote link) — Trello card created, deal matched by email or created won._",
  ]
    .filter(Boolean)
    .join("\n");
  await pingBookings(summary);

  // If this person already had a hosted quote, mark it booked so the admin
  // quotes list stays accurate (the /book flow has no quote token of its own).
  // Best-effort — a miss here must never fail the booking.
  const bookerEmail = fields.email?.trim();
  if (bookerEmail) {
    try {
      await markLatestQuoteBookedByEmail(bookerEmail);
    } catch (err) {
      console.error("book-in quote-link failed:", err);
    }
  }

  // Deal handling: most book-ins are an existing deal — find it by email and
  // move it to Closed Won. If there is no deal, create one at Closed Won (a
  // booked job is won), mirroring the JotForm script.
  let hubspotDealId: string | undefined;
  const email = fields.email?.trim();
  // "Who have you been dealing with?" -> deal owner. An explicit answer is
  // ground truth for whose sale this is, so it overrides the branch-routed
  // owner on an existing deal. Matthew (no HubSpot seat) resolves to
  // undefined and leaves ownership alone.
  const bookedByOwner = bookedByOwnerId(fields.bookedBy);
  if (email) {
    try {
      const existing = await findDealIdByEmail(email);
      if (existing) {
        await setDealStage(existing, STAGE_CLOSED_WON);
        if (bookedByOwner) await setDealOwner(existing, bookedByOwner);
        hubspotDealId = existing;
        // The booking form just collected a name and phone — fold them into
        // the contact. Before this, an email-only contact stayed phoneless
        // even after the customer typed their number into the booking form.
        await findOrCreateContact({
          name: fields.fullName || "",
          phone: fields.phone,
          email,
        });
      } else {
        const created = await createHubSpotDeal({
          name: fields.fullName || "",
          phone: fields.phone || "",
          email,
          serviceType: isPiano
            ? "Piano Move"
            : serviceType === "office"
              ? "Office Move"
              : "House Move",
          pickupAddress: fields.pickupAddress || "",
          dropoffAddress: fields.dropoffAddress || "",
          notes: "Booked in via /book (no quote link).",
          source: "Booking Form",
          dealStage: STAGE_CLOSED_WON,
          ownerId: bookedByOwner,
        });
        if ("dealId" in created) hubspotDealId = created.dealId;
      }
    } catch (err) {
      console.error("book-in deal handling failed:", err);
    }
  }

  // Link the deal to the saved booking so the v2 publisher reuses it rather than
  // creating a second deal for the same job.
  if (hubspotDealId) await attachDealToDirectBooking(token, hubspotDealId);

  // Create the Trello job card. Each move type has its own n8n webhook — house
  // on spm-booking (which also handles hosted-quote bookings), piano on
  // spm-piano-booking. Both webhooks also send the customer the "we've received
  // your booking form" acknowledgement, which is why piano no longer builds its
  // card in-process: an in-process card gets no ack.
  const webhook = isPiano ? pianoWebhookUrl() : process.env.QUOTE_BOOKING_WEBHOOK;
  if (webhook) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const webhookSecret = process.env.QUOTE_BOOKING_SECRET;
    if (webhookSecret) headers["X-SPM-Webhook-Secret"] = webhookSecret;
    try {
      await fetch(webhook, {
        method: "POST",
        headers,
        // token = the saved direct-booking row; n8n's ShiftMate publish uses it
        // as its idempotency key, so it must ride along.
        body: JSON.stringify({ quoteType: serviceType, booking: fields, hubspotDealId, token }),
      });
    } catch (err) {
      console.error("book-in webhook failed:", err);
    }
  } else if (isPiano) {
    // No webhook configured — fall back to the old in-process card builder so a
    // missing env var costs the ack email, never the Trello card.
    try {
      await createPianoCard({
        fullName: fields.fullName,
        email: fields.email,
        phone: fields.phone,
        dropoffPhone: fields.dropoffPhone,
        moveDate: fields.moveDate,
        pianoType: fields.pianoType,
        pickupAddress: fields.pickupAddress,
        dropoffAddress: fields.dropoffAddress,
        stairs: fields.stairs,
        anythingElse: fields.anythingElse,
      });
    } catch (err) {
      console.error("piano card create failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

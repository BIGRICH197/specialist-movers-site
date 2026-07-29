import { NextResponse } from "next/server";
import { pingBookings } from "@/lib/quote-notify";
import {
  createHubSpotDeal,
  findDealIdByEmail,
  STAGE_CLOSED_WON,
} from "@/lib/hubspot";

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
  const missing = HOUSE_REQUIRED.filter((k) => !fields[k]?.trim());
  if (fields.cleaningBooked === "Yes Cleaning" && !fields.cleaningSameDay?.trim())
    missing.push("cleaningSameDay");
  if (fields.packing === "Yes packing" && !fields.whatPacking?.trim())
    missing.push("whatPacking");
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "missing required fields", missing },
      { status: 400 },
    );
  }

  // Tell the team a job has been booked in.
  const summary = [
    `:calendar: *Job booked in* (${serviceType}) — ${fields.fullName || ""}`,
    fields.email ? `Email: ${fields.email}` : "",
    fields.phone ? `Phone: ${fields.phone}` : "",
    fields.moveDate ? `Move date: ${fields.moveDate}` : "",
    fields.sizeOfMove ? `Size: ${fields.sizeOfMove}` : "",
    fields.howManyMovers ? `Movers: ${fields.howManyMovers}` : "",
    fields.pickupAddress ? `From: ${fields.pickupAddress}` : "",
    fields.dropoffAddress ? `To: ${fields.dropoffAddress}` : "",
    "_Direct book-in (no quote link) — Trello card created, deal matched by email if it exists._",
  ]
    .filter(Boolean)
    .join("\n");
  await pingBookings(summary);

  // Deal handling: most book-ins are an existing deal — find it by email so the
  // webhook can close THAT one. If there is no deal, create one at Closed Won
  // (a booked job is won), mirroring the JotForm script.
  let hubspotDealId: string | undefined;
  const email = fields.email?.trim();
  if (email) {
    try {
      const existing = await findDealIdByEmail(email);
      if (existing) {
        hubspotDealId = existing;
      } else {
        const created = await createHubSpotDeal({
          name: fields.fullName || "",
          phone: fields.phone || "",
          email,
          serviceType: serviceType === "piano" ? "Piano Move" : "House Move",
          pickupAddress: fields.pickupAddress || "",
          dropoffAddress: fields.dropoffAddress || "",
          notes: "Booked in via /book (no quote link).",
          source: "Booking Form",
          dealStage: STAGE_CLOSED_WON,
        });
        if ("dealId" in created) hubspotDealId = created.dealId;
      }
    } catch (err) {
      console.error("book-in deal handling failed:", err);
    }
  }

  // Forward to the same booking webhook the hosted-quote flow uses: it builds
  // the Trello card and moves the deal (the one we found/created) to Closed Won.
  const webhook = process.env.QUOTE_BOOKING_WEBHOOK;
  if (webhook) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const webhookSecret = process.env.QUOTE_BOOKING_SECRET;
    if (webhookSecret) headers["X-SPM-Webhook-Secret"] = webhookSecret;
    try {
      await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify({ quoteType: serviceType, booking: fields, hubspotDealId }),
      });
    } catch (err) {
      console.error("book-in webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

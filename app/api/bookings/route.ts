import { NextResponse } from "next/server";
import { getQuote, tokenFromRef, setQuoteStatus } from "@/lib/quote-store";
import { saveBooking } from "@/lib/booking-store";
import { pingBookings, quoteUrl } from "@/lib/quote-notify";
import { setDealOwner } from "@/lib/hubspot";
import { bookedByOwnerId } from "@/lib/booked-by";

export const runtime = "nodejs";

// Booking form submission. Stores the booking, pings the team in Slack, and
// (when configured) hands off to n8n which will move the HubSpot deal to Closed
// Won and create the Trello job card. See docs/hosted-quotes-spec.md.

type BookingBody = { ref?: string; fields?: Record<string, string> };

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const stored = await getQuote(tokenFromRef(body?.ref || ""));
  if (!stored) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const fields = body.fields || {};
  if (!fields.agreeTerms) {
    return NextResponse.json(
      { ok: false, error: "terms must be accepted" },
      { status: 400 },
    );
  }

  // Every booking question is compulsory — a blank submission (e.g. a customer
  // who accepts the quote but skips the questions) must be rejected server-side,
  // not just in the browser where validation can be bypassed.
  const requiredKeys = [
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
  const missing = requiredKeys.filter((k) => !fields[k]?.trim());
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

  await saveBooking({
    token: stored.token,
    quoteSlug: stored.slug,
    clientName: stored.quote.clientName,
    submittedAt: new Date().toISOString(),
    fields,
  });

  await setQuoteStatus(stored.token, "booked");

  // Slack ping — also the signal n8n picks up for Closed Won + Trello.
  const summary = [
    `:tada: *Booking completed* — ${fields.fullName || stored.quote.clientName}`,
    fields.email ? `Email: ${fields.email}` : "",
    fields.phone ? `Phone: ${fields.phone}` : "",
    fields.moveDate ? `Move date: ${fields.moveDate}` : "",
    fields.sizeOfMove ? `Size: ${fields.sizeOfMove}` : "",
    fields.howManyMovers ? `Movers: ${fields.howManyMovers}` : "",
    fields.pickupAddress ? `From: ${fields.pickupAddress}` : "",
    fields.dropoffAddress ? `To: ${fields.dropoffAddress}` : "",
    `Quote: ${quoteUrl(stored.slug, stored.token)}`,
  ]
    .filter(Boolean)
    .join("\n");
  await pingBookings(summary);

  // "Who have you been dealing with?" -> deal owner, same as the direct
  // book-in path. On a hosted quote the deal already exists, so this is the
  // moment the customer's own answer can correct whatever routing guessed.
  // Best-effort: never fail a booking over an attribution field.
  const bookedByOwner = bookedByOwnerId(fields.bookedBy);
  if (bookedByOwner && stored.hubspotDealId) {
    try {
      await setDealOwner(stored.hubspotDealId, bookedByOwner);
    } catch (err) {
      console.error("booking deal-owner stamp failed:", err);
    }
  }

  // Hand off to n8n (Closed Won + Trello) when the webhook is configured.
  const webhook = process.env.QUOTE_BOOKING_WEBHOOK;
  if (webhook) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const webhookSecret = process.env.QUOTE_BOOKING_SECRET;
    if (webhookSecret) headers["X-SPM-Webhook-Secret"] = webhookSecret;
    try {
      await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify({
          token: stored.token,
          quoteType: stored.quoteType,
          xeroQuoteId: stored.xeroQuoteId,
          hubspotDealId: stored.hubspotDealId,
          quote: stored.quote,
          // What the booking form was PREFILLED with, so the team notification
          // can tell a customer's deliberate change from a blank they filled in
          // themselves. Chris Williams was quoted 3 movers, the form offered
          // "3 MOVERS", and he submitted 2 — the office saw only the 2 and read
          // it as a glitch. It is the customer changing the job, and it changes
          // the price, so it has to be visible as a change (Richard, 2026-09-01).
          prefill: stored.prefill ?? null,
          booking: fields,
        }),
      });
    } catch (err) {
      console.error("booking webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

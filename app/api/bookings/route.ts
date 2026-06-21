import { NextResponse } from "next/server";
import { getQuote, tokenFromRef, setQuoteStatus } from "@/lib/quote-store";
import { saveBooking } from "@/lib/booking-store";
import { pingBookings, quoteUrl } from "@/lib/quote-notify";

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

  // Hand off to n8n (Closed Won + Trello) when the webhook is configured.
  const webhook = process.env.QUOTE_BOOKING_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: stored.token,
          quoteType: stored.quoteType,
          xeroQuoteId: stored.xeroQuoteId,
          hubspotDealId: stored.hubspotDealId,
          quote: stored.quote,
          booking: fields,
        }),
      });
    } catch (err) {
      console.error("booking webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

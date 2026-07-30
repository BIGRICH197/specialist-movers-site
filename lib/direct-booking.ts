import { randomUUID } from "crypto";
import { sb, supabaseConfigured } from "@/lib/supabase";

// Durable store for a DIRECT book-in (/book, no hosted quote link). Until this
// existed, /api/book-in kept no record of its own: it pinged Slack, touched
// HubSpot and made a Trello card, all of which are best-effort and any of which
// can fail while the customer is still shown "Booking confirmed". A booking
// could vanish with nobody able to notice or replay it.
//
// It writes the same `bookings` row the hosted-quote flow writes, so everything
// downstream is reused unchanged — the v2 publisher (which reads `bookings` and
// is idempotent on token) and booking_reconciler.py both start covering direct
// book-ins for free.
//
// `bookings.token` is a FK to `quotes(token)`, so a direct booking needs a
// synthetic quote row to hang off. It carries no pricing (there was no quote —
// that's the nature of a direct book-in), so the v2 card lands unpriced for the
// office to fill in. quote_type drives the v2 move type, so it must be the real
// service ("house" / "piano"), not a placeholder.

export type DirectBooking = {
  serviceType: string;
  fields: Record<string, string>;
};

/** Persist a direct book-in. Returns the minted token. Throws if it cannot be
 *  saved — the caller MUST surface that rather than reporting success, or we are
 *  back to losing bookings silently. */
export async function saveDirectBooking(b: DirectBooking): Promise<string> {
  if (!supabaseConfigured()) {
    throw new Error("Supabase not configured — refusing to accept a booking we cannot save");
  }

  const token = randomUUID().replace(/-/g, "");
  const clientName = b.fields.fullName?.trim() || null;
  const email = b.fields.email?.trim() || null;

  // Synthetic quote first — the bookings FK requires it.
  await sb("quotes", {
    method: "POST",
    body: {
      token,
      slug: "direct-book-in",
      quote_type: b.serviceType,
      status: "booked",
      client_name: clientName,
      email,
      data: { direct: true, serviceType: b.serviceType },
    },
  });

  await sb("bookings", {
    method: "POST",
    body: {
      token,
      client_name: clientName,
      email,
      data: b.fields,
      submitted_at: new Date().toISOString(),
    },
  });

  return token;
}

/** Record the HubSpot deal against the synthetic quote once it's known, so the
 *  v2 publisher links the job to the same deal instead of creating a second one.
 *  Best-effort by design: the booking is already saved, and failing here must
 *  never fail the customer's submission. */
export async function attachDealToDirectBooking(
  token: string,
  hubspotDealId: string,
): Promise<void> {
  if (!token || !hubspotDealId || !supabaseConfigured()) return;
  try {
    await sb(`quotes?token=eq.${encodeURIComponent(token)}`, {
      method: "PATCH",
      body: { hubspot_deal_id: hubspotDealId },
    });
  } catch (err) {
    console.error("attachDealToDirectBooking failed:", err);
  }
}

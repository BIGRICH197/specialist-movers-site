import { kvGetJson, kvSetJson } from "@/lib/kv";
import { sb, supabaseConfigured } from "@/lib/supabase";

// Completed booking record, keyed by the quote token. This is the canonical
// booking captured by the website; downstream (n8n → HubSpot Closed Won + Trello,
// and later the in-house scheduler) consume it. Supabase-first with KV fallback.
// See docs/hosted-quotes-spec.md and supabase/schema.sql.

export type Booking = {
  token: string;
  quoteSlug?: string;
  clientName?: string;
  submittedAt: string;
  fields: Record<string, string>;
};

const TTL_SECONDS = 365 * 24 * 60 * 60;
const keyFor = (token: string) => `booking:${token}`;

type BookingRow = {
  token: string;
  client_name: string | null;
  email: string | null;
  data: Record<string, string>;
  submitted_at: string;
};

export async function saveBooking(b: Booking): Promise<void> {
  if (supabaseConfigured()) {
    await sb("bookings?on_conflict=token", {
      method: "POST",
      body: {
        token: b.token,
        client_name: b.clientName ?? null,
        email: b.fields?.email ?? null,
        data: b.fields,
        submitted_at: b.submittedAt,
      },
      prefer: "resolution=merge-duplicates,return=minimal",
    });
    return;
  }
  await kvSetJson(keyFor(b.token), b, TTL_SECONDS);
}

export async function getBooking(token: string): Promise<Booking | null> {
  if (!token) return null;
  if (supabaseConfigured()) {
    const rows = await sb<BookingRow[]>(
      `bookings?token=eq.${encodeURIComponent(token)}&select=*&limit=1`,
    );
    if (rows && rows.length) {
      const r = rows[0];
      return {
        token: r.token,
        clientName: r.client_name ?? undefined,
        submittedAt: r.submitted_at,
        fields: r.data ?? {},
      };
    }
  }
  return kvGetJson<Booking>(keyFor(token));
}

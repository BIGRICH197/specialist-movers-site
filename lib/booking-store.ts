import { kvGetJson, kvSetJson } from "@/lib/kv";

// Completed booking record, keyed by the quote token. This is the canonical
// booking captured by the website; downstream (n8n → HubSpot Closed Won + Trello,
// and later the in-house scheduler) consume it. See docs/hosted-quotes-spec.md.

export type Booking = {
  token: string;
  quoteSlug?: string;
  clientName?: string;
  submittedAt: string;
  fields: Record<string, string>;
};

const TTL_SECONDS = 365 * 24 * 60 * 60;
const keyFor = (token: string) => `booking:${token}`;

export async function saveBooking(b: Booking): Promise<void> {
  await kvSetJson(keyFor(b.token), b, TTL_SECONDS);
}

export async function getBooking(token: string): Promise<Booking | null> {
  if (!token) return null;
  return kvGetJson<Booking>(keyFor(token));
}

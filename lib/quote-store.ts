// Hosted-quote storage. Wraps the existing Upstash/Vercel KV (lib/kv.ts).
// One record per quote, keyed by an unguessable token. TTL is long (~1 year)
// for storage hygiene only — NOT a hard expiry. Quotes stay live past 14 days;
// "Valid for 14 days" is shown purely as an urgency device. See
// docs/hosted-quotes-spec.md.

import { kvGetJson, kvSetJson } from "@/lib/kv";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";

export type QuoteServiceType = "house" | "packing" | "cleaning";

/**
 * Contact + move details used ONLY to pre-fill the booking form. Kept separate
 * from `quote` because it is the client's own PII (email/phone) and must never
 * be rendered on the public quote deck — it is surfaced only on /book, to the
 * person holding the unguessable link. Joey populates this from the HubSpot deal.
 */
export type QuotePrefill = {
  email?: string;
  phone?: string;
  /** Bedroom count from HubSpot — maps to the booking "Size of move" dropdown. */
  bedrooms?: number;
  sizeOfMove?: string;
  typeOfMove?: string;
};

export type StoredQuote = {
  token: string;
  slug: string;
  quoteType?: QuoteServiceType;
  /** Link back to the Xero draft quote, for reference. */
  xeroQuoteId?: string;
  /** HubSpot deal id this quote came from. Lets the booking hand-off (n8n)
   *  move the EXACT deal to Closed Won instead of fuzzy-matching by email. */
  hubspotDealId?: string;
  /** The full deck-renderable quote object. */
  quote: HouseMoveQuote;
  /** Contact/move details for booking-form prefill only. Never rendered on the deck. */
  prefill?: QuotePrefill;
  createdAt: string;
};

/** ~365 days. Hygiene only — the link is not meant to die at 14 days. */
const TTL_SECONDS = 365 * 24 * 60 * 60;

const keyFor = (token: string) => `quote:${token}`;

/** Unguessable token — this is the privacy boundary for the public URL. */
export function makeToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

/** Readable URL part: ASCII-folded, kebab-cased, capped. Cosmetic only. */
export function slugify(input: string): string {
  const s = input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip macrons / accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return s || "quote";
}

/** The public URL ends in `<slug>-<token>`; the token is the part after the last hyphen. */
export function tokenFromRef(ref: string): string {
  const parts = ref.split("-");
  return parts[parts.length - 1] ?? "";
}

export async function saveQuote(stored: StoredQuote): Promise<void> {
  await kvSetJson(keyFor(stored.token), stored, TTL_SECONDS);
}

export async function getQuote(token: string): Promise<StoredQuote | null> {
  if (!token) return null;
  return kvGetJson<StoredQuote>(keyFor(token));
}

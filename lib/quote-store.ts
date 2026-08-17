// Hosted-quote storage. Supabase-first (a real DB the Taine portal + future
// scheduler can list/query) with a Vercel KV fallback so the site keeps working
// before Supabase creds are set. One record per quote, keyed by an unguessable
// token. See docs/hosted-quotes-spec.md and supabase/schema.sql.

import { kvGetJson, kvSetJson } from "@/lib/kv";
import { sb, supabaseConfigured } from "@/lib/supabase";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";

export type QuoteServiceType = "house" | "packing" | "cleaning";

/** Lifecycle of a quote, tracked for the portal. */
export type QuoteStatus = "sent" | "accepted" | "callback" | "booked";

/**
 * Contact + move details used ONLY to pre-fill the booking form. Kept separate
 * from `quote` because it is the client's own PII (email/phone) and must never
 * be rendered on the public quote deck — it is surfaced only on /book, to the
 * person holding the unguessable link. Joey populates this from the HubSpot deal.
 */
export type QuotePrefill = {
  email?: string;
  phone?: string;
  /** Bedroom count — maps to the booking "Size of move" dropdown and, with
   *  bathrooms, prices the exit-clean add-on (fixed by bed × bath). */
  bedrooms?: number;
  /** Bathroom count — with bedrooms, picks the exit-clean fixed-price tier. */
  bathrooms?: number;
  sizeOfMove?: string;
  typeOfMove?: string;
  /** Mover count from the quote (e.g. "3" or "3 MOVERS") — prefills "Number of movers". */
  movers?: string;
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
  status?: QuoteStatus;
  createdAt: string;
};

/** Lightweight row for the quotes list (no full quote payload). */
export type QuoteListItem = {
  token: string;
  slug: string;
  quoteType?: QuoteServiceType;
  status: QuoteStatus;
  clientName?: string;
  email?: string;
  createdAt: string;
};

// Shape of a row in the Supabase `quotes` table.
type QuoteRow = {
  token: string;
  slug: string | null;
  quote_type: QuoteServiceType | null;
  status: QuoteStatus | null;
  client_name: string | null;
  email: string | null;
  xero_quote_id: string | null;
  hubspot_deal_id: string | null;
  data: HouseMoveQuote;
  prefill: QuotePrefill | null;
  created_at: string;
};

function rowToStored(r: QuoteRow): StoredQuote {
  return {
    token: r.token,
    slug: r.slug ?? "",
    quoteType: r.quote_type ?? undefined,
    xeroQuoteId: r.xero_quote_id ?? undefined,
    hubspotDealId: r.hubspot_deal_id ?? undefined,
    quote: r.data,
    prefill: r.prefill ?? undefined,
    status: r.status ?? "sent",
    createdAt: r.created_at,
  };
}

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
  if (supabaseConfigured()) {
    const row = {
      token: stored.token,
      slug: stored.slug,
      quote_type: stored.quoteType ?? null,
      status: stored.status ?? "sent",
      client_name: stored.quote.clientName ?? null,
      email: stored.prefill?.email ?? null,
      xero_quote_id: stored.xeroQuoteId ?? null,
      hubspot_deal_id: stored.hubspotDealId ?? null,
      data: stored.quote,
      prefill: stored.prefill ?? null,
      updated_at: new Date().toISOString(),
    };
    // Upsert on the primary key so passing an existing token updates in place.
    await sb("quotes?on_conflict=token", {
      method: "POST",
      body: row,
      prefer: "resolution=merge-duplicates",
    });
    return;
  }
  await kvSetJson(keyFor(stored.token), stored, TTL_SECONDS);
}

export async function getQuote(token: string): Promise<StoredQuote | null> {
  if (!token) return null;
  if (supabaseConfigured()) {
    const rows = await sb<QuoteRow[]>(
      `quotes?token=eq.${encodeURIComponent(token)}&select=*&limit=1`,
    );
    if (rows && rows.length) return rowToStored(rows[0]);
    // Fall through to KV so quotes created before the migration still resolve.
  }
  return kvGetJson<StoredQuote>(keyFor(token));
}

/** Advance a quote's lifecycle status. No-op on the KV fallback (KV has no column). */
export async function setQuoteStatus(
  token: string,
  status: QuoteStatus,
): Promise<void> {
  if (!token || !supabaseConfigured()) return;
  await sb(`quotes?token=eq.${encodeURIComponent(token)}`, {
    method: "PATCH",
    body: { status, updated_at: new Date().toISOString() },
    prefer: "return=minimal",
  });
}

/**
 * Mark the most recent still-open quote for an email as booked. Used by the
 * direct /book flow (and old JotForm), which has no quote token but often
 * belongs to someone we already sent a hosted quote — so their quote would
 * otherwise sit at "sent"/"accepted" forever. Case-insensitive email match,
 * most-recent only (never over-marks older duplicate quotes). No-op on KV.
 * Returns the token it booked, or null if there was no open quote to link.
 */
export async function markLatestQuoteBookedByEmail(
  email: string,
): Promise<string | null> {
  const e = email.trim();
  if (!e || !supabaseConfigured()) return null;
  const rows = await sb<{ token: string }[]>(
    `quotes?email=ilike.${encodeURIComponent(e)}&status=neq.booked&select=token&order=created_at.desc&limit=1`,
  );
  const token = rows?.[0]?.token;
  if (!token) return null;
  await setQuoteStatus(token, "booked");
  return token;
}

/** List recent quotes for the portal. Empty array on the KV fallback (KV can't list). */
export async function listQuotes(limit = 200): Promise<QuoteListItem[]> {
  if (!supabaseConfigured()) return [];
  const rows = await sb<QuoteRow[]>(
    `quotes?select=token,slug,quote_type,status,client_name,email,created_at&order=created_at.desc&limit=${limit}`,
  );
  return (rows ?? []).map((r) => ({
    token: r.token,
    slug: r.slug ?? "",
    quoteType: r.quote_type ?? undefined,
    status: r.status ?? "sent",
    clientName: r.client_name ?? undefined,
    email: r.email ?? undefined,
    createdAt: r.created_at,
  }));
}

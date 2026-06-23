import { NextResponse } from "next/server";
import { kvConfigured } from "@/lib/kv";
import {
  makeToken,
  slugify,
  saveQuote,
  type StoredQuote,
  type QuoteServiceType,
  type QuotePrefill,
} from "@/lib/quote-store";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";

export const runtime = "nodejs";

// Create (or update) a hosted quote. Secret-gated — only Joey / authorised
// callers may create quotes. Separate from /api/quote (singular), which is the
// public website lead-capture form. See docs/hosted-quotes-spec.md.

type CreateBody = {
  quote: HouseMoveQuote;
  quoteType?: QuoteServiceType;
  xeroQuoteId?: string;
  hubspotDealId?: string;
  /** Contact/move details for booking-form prefill only (not shown on the deck). */
  prefill?: QuotePrefill;
  /** Pass an existing token to update that quote in place (same link). */
  token?: string;
};

function siteBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://specialistmovers.co.nz";
  return raw.replace(/\/$/, "");
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-quote-secret");
  const expected = process.env.QUOTE_API_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!kvConfigured()) {
    return NextResponse.json(
      { ok: false, error: "quote store not configured" },
      { status: 500 },
    );
  }

  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  if (
    !body?.quote ||
    !body.quote.clientName?.trim() ||
    !Array.isArray(body.quote.lineItems)
  ) {
    return NextResponse.json(
      { ok: false, error: "quote.clientName and quote.lineItems are required" },
      { status: 400 },
    );
  }

  const token = body.token?.trim() || makeToken();
  const slug = slugify(
    [body.quote.clientName, body.quoteType].filter(Boolean).join(" "),
  );

  const stored: StoredQuote = {
    token,
    slug,
    quoteType: body.quoteType,
    xeroQuoteId: body.xeroQuoteId,
    hubspotDealId: body.hubspotDealId,
    quote: body.quote,
    prefill: body.prefill,
    createdAt: new Date().toISOString(),
  };

  await saveQuote(stored);

  const url = `${siteBaseUrl()}/quote/${slug}-${token}`;
  return NextResponse.json({ ok: true, token, slug, url });
}

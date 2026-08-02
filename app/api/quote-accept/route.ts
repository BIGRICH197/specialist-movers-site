import { NextResponse } from "next/server";
import { getQuote, tokenFromRef, setQuoteStatus } from "@/lib/quote-store";
import { pingQuotes, quoteUrl } from "@/lib/quote-notify";
import {
  quoteTotalInclGst,
  quoteAddOnBreakdown,
  formatNzd,
} from "@/lib/quote-deck/house-move-quote";

export const runtime = "nodejs";

// Fired when the client clicks "Accept" on a hosted quote. Pings the team in
// Slack; the client is then sent to the booking form. Does NOT move the deal /
// create the card — that happens when the booking form is submitted (n8n).

type AddOns = { cleaning?: boolean; packing?: boolean; insurance?: boolean };

export async function POST(request: Request) {
  let ref = "";
  let addOns: AddOns = {};
  try {
    const body = (await request.json()) as { ref?: string; addOns?: AddOns };
    ref = body.ref ?? "";
    addOns = body.addOns ?? {};
  } catch {
    /* ignore */
  }

  const stored = await getQuote(tokenFromRef(ref || ""));
  if (!stored) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  await setQuoteStatus(stored.token, "accepted");

  const total = formatNzd(quoteTotalInclGst(stored.quote));
  // Summarise what the customer chose, so the team sees it at a glance.
  // Packing/insurance the customer ADDS (that we did not already quote) need
  // the team to action — flag those loudly.
  const brk = quoteAddOnBreakdown(stored.quote);
  const cleaningLine = addOns.cleaning
    ? brk.cleaningQuoted
      ? "Cleaning: yes (as quoted)"
      : "Cleaning: yes (added)"
    : "Cleaning: no";
  const packingLine = addOns.packing
    ? brk.packingQuoted
      ? "Packing: yes (as quoted)"
      : ":rotating_light: *Packing requested* — not yet quoted, go view/requote"
    : brk.packingQuoted
      ? "Packing: removed by customer"
      : "Packing: no";
  const insuranceLine = addOns.insurance
    ? ":rotating_light: *Insurance requested* — send them cover options"
    : "Insurance: no (owner's risk)";
  const addOnLine = [cleaningLine, packingLine, insuranceLine].join("  |  ");

  await pingQuotes(
    `:white_check_mark: *${stored.quote.clientName}* accepted their quote ` +
      `(${stored.quoteType || "move"}, ${total} incl GST) and is filling out the booking form.\n` +
      `${addOnLine}\n` +
      quoteUrl(stored.slug, stored.token),
  );

  return NextResponse.json({ ok: true });
}

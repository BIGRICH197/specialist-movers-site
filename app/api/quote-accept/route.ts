import { NextResponse } from "next/server";
import { getQuote, tokenFromRef, setQuoteStatus } from "@/lib/quote-store";
import { pingBookings, quoteUrl } from "@/lib/quote-notify";
import {
  quoteTotalInclGst,
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
  // Summarise what the customer chose, so the team sees it at a glance. The
  // insurance request is the one they most need to action.
  const addOnLine = [
    `Cleaning: ${addOns.cleaning ? "yes" : "no"}`,
    `Packing: ${addOns.packing ? "yes" : "no"}`,
    addOns.insurance
      ? ":rotating_light: *Insurance requested* — send them cover options"
      : "Insurance: no (owner's risk)",
  ].join("  |  ");

  await pingBookings(
    `:white_check_mark: *${stored.quote.clientName}* accepted their quote ` +
      `(${stored.quoteType || "move"}, ${total} incl GST) and is filling out the booking form.\n` +
      `${addOnLine}\n` +
      quoteUrl(stored.slug, stored.token),
  );

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { pingBookings, quoteUrl } from "@/lib/quote-notify";

export const runtime = "nodejs";

// Fired when the client clicks "Request a call" on a hosted quote.

export async function POST(request: Request) {
  let ref = "";
  let phone = "";
  try {
    const body = (await request.json()) as { ref?: string; phone?: string };
    ref = body.ref ?? "";
    phone = body.phone ?? "";
  } catch {
    /* ignore */
  }

  const stored = await getQuote(tokenFromRef(ref || ""));
  if (!stored) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  await pingBookings(
    `:telephone_receiver: *${stored.quote.clientName}* requested a call back about their quote` +
      (phone ? ` — phone: ${phone}` : "") +
      `.\n` +
      quoteUrl(stored.slug, stored.token),
  );

  return NextResponse.json({ ok: true });
}

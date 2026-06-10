"use client";

import { detectQuoteBranch, type QuoteBranch } from "@/lib/pricing";

const INSTANT_MESSAGES: Record<QuoteBranch, { tone: "ok" | "warn"; text: string }> =
  {
    auckland: {
      tone: "ok",
      text: "Auckland area. Instant estimate available for this route.",
    },
    hamilton: {
      tone: "ok",
      text: "Waikato area. Instant estimate available (Hamilton branch rates).",
    },
    manual: {
      tone: "warn",
      text: "Auckland ↔ Waikato or outside our auto-quote zones. We will call with a custom price (still free, 15 minutes).",
    },
  };

const CALLBACK_MESSAGES: Record<QuoteBranch, { tone: "ok" | "warn"; text: string }> =
  {
    auckland: {
      tone: "ok",
      text: "Auckland area. We'll call within 15 minutes with a tailored office quote.",
    },
    hamilton: {
      tone: "ok",
      text: "Waikato area. We'll call within 15 minutes with a tailored office quote.",
    },
    manual: {
      tone: "warn",
      text: "Auckland ↔ Waikato or longer routes. We'll call within 15 minutes with a tailored office quote.",
    },
  };

type Props = {
  pickupAddress: string;
  dropoffAddress: string;
  /** House and piano show instant pricing hints; office moves are callback-only. */
  instantQuote?: boolean;
};

export function RouteBranchHint({
  pickupAddress,
  dropoffAddress,
  instantQuote = true,
}: Props) {
  const pickup = pickupAddress.trim();
  const dropoff = dropoffAddress.trim();
  if (!pickup || !dropoff) return null;

  const branch = detectQuoteBranch(pickup, dropoff);
  const messages = instantQuote ? INSTANT_MESSAGES : CALLBACK_MESSAGES;
  const { tone, text } = messages[branch];

  return (
    <div
      className={`rounded-xl border-2 px-4 py-3 text-sm leading-relaxed ${
        tone === "warn"
          ? "border-amber-300/80 bg-amber-50 text-amber-950"
          : "border-brand-purple/10 bg-brand-purple/[0.04] text-brand-purple/80"
      }`}
      role="status"
    >
      {text}
    </div>
  );
}

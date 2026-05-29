"use client";

import { detectQuoteBranch, type QuoteBranch } from "@/lib/pricing";

const MESSAGES: Record<QuoteBranch, { tone: "ok" | "warn"; text: string }> = {
  auckland: {
    tone: "ok",
    text: "Auckland area , instant estimate available for this route.",
  },
  hamilton: {
    tone: "ok",
    text: "Waikato area , instant estimate available (Hamilton branch rates).",
  },
  manual: {
    tone: "warn",
    text: "Auckland ↔ Waikato or outside our auto-quote zones , we will call with a custom price (still free, 15 minutes).",
  },
};

type Props = {
  pickupAddress: string;
  dropoffAddress: string;
};

export function RouteBranchHint({ pickupAddress, dropoffAddress }: Props) {
  const pickup = pickupAddress.trim();
  const dropoff = dropoffAddress.trim();
  if (!pickup || !dropoff) return null;

  const branch = detectQuoteBranch(pickup, dropoff);
  const { tone, text } = MESSAGES[branch];

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

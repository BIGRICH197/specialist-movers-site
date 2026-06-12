"use client";

import type { ParsedPlaceAddress } from "@/lib/parse-place-address";
import { isQuoteDevBypassClient } from "@/lib/quote-dev-bypass";
import { resolveQuoteRoute } from "@/lib/quote-route";

const INSTANT_MESSAGES = {
  auckland:
    "Auckland area. Instant estimate available for this route.",
  hamilton:
    "Waikato area. Instant estimate available (Hamilton branch rates).",
} as const;

const CALLBACK_MESSAGES = {
  auckland:
    "Auckland area. We'll call within 15 minutes with a tailored office quote.",
  hamilton:
    "Waikato area. We'll call within 15 minutes with a tailored office quote.",
} as const;

type Props = {
  pickupAddress: string;
  dropoffAddress: string;
  pickupVerified?: boolean;
  dropoffVerified?: boolean;
  placesActive?: boolean;
  pickupParsed?: ParsedPlaceAddress | null;
  dropoffParsed?: ParsedPlaceAddress | null;
  /** House and piano show instant pricing hints; office moves are callback-only. */
  instantQuote?: boolean;
};

export function RouteBranchHint({
  pickupAddress,
  dropoffAddress,
  pickupVerified = false,
  dropoffVerified = false,
  placesActive = false,
  pickupParsed = null,
  dropoffParsed = null,
  instantQuote = true,
}: Props) {
  const pickup = pickupAddress.trim();
  const dropoff = dropoffAddress.trim();
  if (!pickup || !dropoff) return null;

  const route = resolveQuoteRoute({
    pickupAddress: pickup,
    dropoffAddress: dropoff,
    pickupVerified,
    dropoffVerified,
    placesActive,
    pickupParsed,
    dropoffParsed,
  });

  let tone: "ok" | "warn" = "warn";
  let text = "";

  if (isQuoteDevBypassClient()) {
    tone = "ok";
    text = instantQuote
      ? "Local test mode — instant estimate (Auckland rates)."
      : "Local test mode — we'll show a callback confirmation.";
  } else if (route.status === "places_unavailable") {
    text =
      "Address lookup is unavailable. We'll call within 15 minutes with your quote.";
  } else if (route.status === "addresses_unverified") {
    text =
      "Choose both addresses from the dropdown so we can confirm they're in our service area. Otherwise we'll call you with a quote.";
  } else if (route.status === "manual_route") {
    text = instantQuote
      ? "Outside our auto-quote zones (for example Auckland to Waikato, or beyond our service area). We'll call with a custom price within 15 minutes."
      : "Auckland to Waikato or longer routes. We'll call within 15 minutes with a tailored office quote.";
  } else if (instantQuote) {
    tone = "ok";
    text =
      route.branch === "hamilton"
        ? INSTANT_MESSAGES.hamilton
        : INSTANT_MESSAGES.auckland;
  } else {
    tone = "ok";
    text =
      route.branch === "hamilton"
        ? CALLBACK_MESSAGES.hamilton
        : CALLBACK_MESSAGES.auckland;
  }

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

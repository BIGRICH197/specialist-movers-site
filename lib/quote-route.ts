import { isGooglePlacesConfigured } from "@/lib/google-places-config";
import type { ParsedPlaceAddress } from "@/lib/parse-place-address";
import { isQuoteDevBypassClient } from "@/lib/quote-dev-bypass";
import { detectQuoteBranch, type QuoteBranch } from "@/lib/pricing";

export type QuoteRouteStatus =
  | "instant_auckland"
  | "instant_hamilton"
  | "manual_route"
  | "places_unavailable"
  | "addresses_unverified";

export type QuoteRouteResolution = {
  status: QuoteRouteStatus;
  branch: QuoteBranch;
  canInstantQuote: boolean;
};

type ResolveParams = {
  pickupAddress: string;
  dropoffAddress: string;
  pickupVerified: boolean;
  dropoffVerified: boolean;
  placesActive: boolean;
  pickupParsed?: ParsedPlaceAddress | null;
  dropoffParsed?: ParsedPlaceAddress | null;
};

export function resolveQuoteRoute(params: ResolveParams): QuoteRouteResolution {
  const pickup = params.pickupAddress.trim();
  const dropoff = params.dropoffAddress.trim();

  if (!pickup || !dropoff) {
    return {
      status: "addresses_unverified",
      branch: "manual",
      canInstantQuote: false,
    };
  }

  if (isQuoteDevBypassClient()) {
    const branch = detectQuoteBranch(pickup, dropoff, {
      pickupParsed: params.pickupParsed,
      dropoffParsed: params.dropoffParsed,
    });
    const effectiveBranch: QuoteBranch =
      branch === "manual" ? "auckland" : branch;
    return {
      status:
        effectiveBranch === "hamilton"
          ? "instant_hamilton"
          : "instant_auckland",
      branch: effectiveBranch,
      canInstantQuote: true,
    };
  }

  if (!isGooglePlacesConfigured() || !params.placesActive) {
    return {
      status: "places_unavailable",
      branch: "manual",
      canInstantQuote: false,
    };
  }

  if (!params.pickupVerified || !params.dropoffVerified) {
    return {
      status: "addresses_unverified",
      branch: "manual",
      canInstantQuote: false,
    };
  }

  const branch = detectQuoteBranch(pickup, dropoff, {
    pickupParsed: params.pickupParsed,
    dropoffParsed: params.dropoffParsed,
  });

  if (branch === "manual") {
    return { status: "manual_route", branch, canInstantQuote: false };
  }

  return {
    status: branch === "hamilton" ? "instant_hamilton" : "instant_auckland",
    branch,
    canInstantQuote: true,
  };
}

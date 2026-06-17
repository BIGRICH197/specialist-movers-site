import { HAMILTON_TIER_1_RATES } from "@/lib/hamilton-pricing-data";
import { TIER_1_RATES } from "@/lib/pricing-data";

/** Tuesday 2-mover floor rate (excl. GST) — must match pricing tables. */
const AUCKLAND_MIN_HOURLY_EX = TIER_1_RATES.tue["2M"];
const HAMILTON_MIN_HOURLY_EX = HAMILTON_TIER_1_RATES.tue["2M"];

export const pianoHeroSubline =
  "Piano moves from $300. Every move quoted upfront, so you know the number before we lift a thing.";

export function getMovingHeroRateLine(options?: { hamilton?: boolean }): string {
  const hourlyEx = options?.hamilton
    ? HAMILTON_MIN_HOURLY_EX
    : AUCKLAND_MIN_HOURLY_EX;
  return `Crew + truck from $${hourlyEx} per hour`;
}

export function getMovingHeroSubline(options?: { hamilton?: boolean }): string {
  const hourlyEx = options?.hamilton
    ? HAMILTON_MIN_HOURLY_EX
    : AUCKLAND_MIN_HOURLY_EX;
  return `Professional crew + truck from $${hourlyEx} per hour. Every move quoted upfront, so you know the number before we lift a thing.`;
}

const pianoMoveSlugs = new Set([
  "piano-movers",
  "grand-piano",
  "upright-piano",
  "international-piano",
  "piano-storage",
]);

export function isPianoMoveHeroSlug(slug: string): boolean {
  return pianoMoveSlugs.has(slug);
}

type ServiceHeroSublineOptions = {
  hamilton?: boolean;
};

/** Hero pricing pill — piano uses from-price; everything else uses hourly + fixed-quote promise. */
export function getServiceHeroSubline(
  slug: string,
  options?: ServiceHeroSublineOptions,
): string {
  if (isPianoMoveHeroSlug(slug)) {
    return pianoHeroSubline;
  }
  if (slug === "piano-tuning") {
    return "Upright and grand pianos. Free quote and callback within 15 minutes.";
  }
  return getMovingHeroSubline(options);
}

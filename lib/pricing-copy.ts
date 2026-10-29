import { HAMILTON_CALLOUT_FEES, HAMILTON_TIER_1_RATES } from "./hamilton-pricing-data";
import { CALLOUT_FEES, MOVE_HOURS, TIER_1_RATES } from "./pricing-data";

/**
 * Branch from-prices, so a Hamilton page cannot quote an Auckland floor.
 *
 * The canonical "$400" in company-facts.ts is the AUCKLAND floor:
 * 2 crew x $160 (flat every day since 2026-10-30) x 2 hrs + the flat $80
 * callout. Hamilton is the same flat $160 + GST an hour, so its floor is also
 * 2 hrs x $160 + $80 callout = $400 excl GST.
 * 2026-10-30 (Richard): +$10/hr, callouts flat $80/$100/$120 every zone. Both are computed from the rate constants so they
 * cannot drift. Both numbers here are excl GST, because every page that
 * prints them appends "+ GST". The furniture-movers-hamilton page once
 * shipped with the Auckland floor in the stat band, which this split prevents.
 */
const minHours = MOVE_HOURS[1].base;
export const fromPrice = {
  auckland: `$${minHours * TIER_1_RATES.tue["2M"] + CALLOUT_FEES["2M"]}`,
  hamilton: `$${minHours * HAMILTON_TIER_1_RATES.tue["2M"] + HAMILTON_CALLOUT_FEES.A["2M"]}`,
} as const;

/**
 * Typical all-in totals, excl GST, so a customer can sanity-check a budget.
 * A three-bedroom is 4 to 6 hours (MOVE_HOURS[3], easy access to both ends
 * hard) with two movers and the flat $80 callout. Auckland and Hamilton are
 * both a flat $160 an hour, so $720 to $1,040 for each. Rounded outward.
 */
export const typicalThreeBed = {
  auckland: "$700 to $1,050",
  hamilton: "$700 to $1,050",
} as const;

export type Branch = keyof typeof fromPrice;

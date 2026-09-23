import { HAMILTON_CALLOUT_FEES, HAMILTON_TIER_1_RATES } from "./hamilton-pricing-data";
import { CALLOUT_FEES, MOVE_HOURS, TIER_1_RATES } from "./pricing-data";

/**
 * Branch from-prices, so a Hamilton page cannot quote an Auckland floor.
 *
 * The canonical "$340" in company-facts.ts is the AUCKLAND floor:
 * 2 crew x $140 (any day but Friday) x 2 hrs + $60 Zone A callout. Hamilton
 * is a flat $150 + GST an hour, so its floor is 2 hrs x $150 + $60 Zone A
 * callout = $360 excl GST. Both are computed from the rate constants so they
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
 * hard) with two movers and a $60 Zone A callout. Auckland is $140 to $150 an
 * hour, so $620 to $960; Hamilton is a flat $150, so $660 to $960. Rounded
 * outward.
 */
export const typicalThreeBed = {
  auckland: "$600 to $1,000",
  hamilton: "$650 to $1,000",
} as const;

export type Branch = keyof typeof fromPrice;

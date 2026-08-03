/**
 * Branch from-prices, so a Hamilton page cannot quote an Auckland floor.
 *
 * The single canonical "$300" in company-facts.ts is the AUCKLAND floor:
 * 2 crew x $120 Tuesday x 2 hrs + $60 Zone A callout. Hamilton's cheapest
 * hourly is $140, so its floor is $340. The furniture-movers-hamilton page
 * shipped with "Moves from $300" in the stat band, which was wrong by $40.
 */
export const fromPrice = {
  auckland: "$300",
  hamilton: "$340",
} as const;

/** Typical all-in totals, excl GST, so a customer can sanity-check a budget. */
export const typicalThreeBed = {
  auckland: "$700 to $900",
  hamilton: "$750 to $950",
} as const;

export type Branch = keyof typeof fromPrice;

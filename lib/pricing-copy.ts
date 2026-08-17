/**
 * Branch from-prices, so a Hamilton page cannot quote an Auckland floor.
 *
 * The single canonical "$300" in company-facts.ts is the AUCKLAND floor:
 * 2 crew x $120 Tuesday x 2 hrs + $60 Zone A callout. Hamilton is now a flat
 * $180 an hour INCLUDING GST, which is $156.52 excluding, so its floor is
 * 2 hrs x $156.52 + $60 Zone A callout = $373 excl GST. Both numbers here are
 * excl GST, because every page that prints them appends "+ GST". The
 * furniture-movers-hamilton page shipped with "Moves from $300" in the stat
 * band, which was wrong then and would be wronger now.
 */
export const fromPrice = {
  auckland: "$300",
  hamilton: "$373",
} as const;

/**
 * Typical all-in totals, excl GST, so a customer can sanity-check a budget.
 * Hamilton is 4 to 6 hours at $156.52 excl plus a $60 Zone A callout, which is
 * $686 to $999, rounded outward the way the Auckland range is.
 */
export const typicalThreeBed = {
  auckland: "$700 to $900",
  hamilton: "$700 to $1,000",
} as const;

export type Branch = keyof typeof fromPrice;

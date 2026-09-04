const NZD = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Customer-facing estimate band: 8% under to 20% over (Richard, 2026-09-05).
 *
 *  Deliberately asymmetric. It was +/-8%, which described the estimate as
 *  tighter than the work turns out to be: across ten completed website house
 *  moves, the move lines invoiced between 43% under and 78% over the estimate,
 *  and six of the ten came in above it. The variance skews upward because jobs
 *  grow on the day, not down, so the band skews with it.
 *
 *  Note the final bill is capped at 2 hours over the estimate, which on a
 *  smaller move is worth more than 20% -- so the top of this band is not the
 *  ceiling the customer is protected by, it is the honest middle of one.
 */
export const ESTIMATE_DOWN = 0.08;
export const ESTIMATE_UP = 0.2;

export function quotePriceRange(
  totalIncGst: number,
  down = ESTIMATE_DOWN,
  up = ESTIMATE_UP,
): { lowIncGst: number; highIncGst: number } {
  const lowIncGst = Math.round(totalIncGst * (1 - down));
  const highIncGst = Math.round(totalIncGst * (1 + up));
  return { lowIncGst, highIncGst };
}

export function formatNzd(amount: number): string {
  return NZD.format(amount);
}

export function shortAddress(address: string): string {
  const trimmed = address.trim();
  if (!trimmed) return "your pickup";
  const firstLine = trimmed.split(",")[0]?.trim() ?? trimmed;
  return firstLine.length > 42 ? `${firstLine.slice(0, 39)}…` : firstLine;
}

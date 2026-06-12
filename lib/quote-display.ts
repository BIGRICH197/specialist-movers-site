const NZD = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Customer-facing estimate band (default ±8%). */
export function quotePriceRange(
  totalIncGst: number,
  spread = 0.08,
): { lowIncGst: number; highIncGst: number } {
  const lowIncGst = Math.round(totalIncGst * (1 - spread));
  const highIncGst = Math.round(totalIncGst * (1 + spread));
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

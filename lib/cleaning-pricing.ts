/** Fixed exit-clean prices (excl. GST). Customer quotes use Option 2 where set. */

export type CleaningPropertySize =
  | "1-1"
  | "2-1"
  | "2-2"
  | "3-1"
  | "3-2"
  | "4-2"
  | "4-3"
  | "5-3";

export type CleaningPropertyOption = {
  id: CleaningPropertySize;
  label: string;
  option1: number;
  option2: number | null;
};

export const EXTRA_LIVING_ROOM_EXCL_GST = 40;
export const GST_MULTIPLIER = 1.15;

export const cleaningPropertyOptions: readonly CleaningPropertyOption[] = [
  { id: "1-1", label: "1 bedroom, 1 bathroom", option1: 280, option2: 280 },
  { id: "2-1", label: "2 bedrooms, 1 bathroom", option1: 350, option2: 350 },
  { id: "2-2", label: "2 bedrooms, 2 bathrooms", option1: 420, option2: 400 },
  { id: "3-1", label: "3 bedrooms, 1 bathroom", option1: 450, option2: 450 },
  { id: "3-2", label: "3 bedrooms, 2 bathrooms", option1: 520, option2: 500 },
  { id: "4-2", label: "4 bedrooms, 2 bathrooms", option1: 600, option2: 590 },
  { id: "4-3", label: "4 bedrooms, 3 bathrooms", option1: 700, option2: 650 },
  { id: "5-3", label: "5 bedrooms, 3 bathrooms", option1: 730, option2: null },
] as const;

export function getCleaningPropertyOption(
  id: CleaningPropertySize
): CleaningPropertyOption | undefined {
  return cleaningPropertyOptions.find((o) => o.id === id);
}

/** Quote price uses Option 2; falls back to Option 1 when Option 2 is not set. */
export function getCleaningBasePriceExclGst(
  propertySize: CleaningPropertySize
): number | null {
  const option = getCleaningPropertyOption(propertySize);
  if (!option) return null;
  return option.option2 ?? option.option1;
}

export function bathroomsForBedrooms(bedrooms: number): number[] {
  return cleaningPropertyOptions
    .filter((o) => o.id.startsWith(`${bedrooms}-`))
    .map((o) => Number(o.id.split("-")[1]));
}

export function propertySizeFromRooms(
  bedrooms: number,
  bathrooms: number
): CleaningPropertySize | null {
  const id = `${bedrooms}-${bathrooms}` as CleaningPropertySize;
  return getCleaningPropertyOption(id) ? id : null;
}

/** Resolve a bedroom + bathroom count to the exit-clean quote price incl GST, for
 *  the quote add-on toggle. Bedrooms clamp to 1..5; bathrooms snap to the nearest
 *  option we price for that bedroom count (defaulting to the baseline when the
 *  bathroom count is unknown). Returns null only when the bedroom count is
 *  missing, in which case cleaning falls back to a "request". */
export function getCleaningQuoteInclGst(
  bedrooms?: number,
  bathrooms?: number
): number | null {
  if (!bedrooms || bedrooms < 1) return null;
  const bed = Math.min(Math.max(Math.round(bedrooms), 1), 5);
  const baths = bathroomsForBedrooms(bed);
  if (!baths.length) return null;
  const want = bathrooms && bathrooms >= 1 ? Math.round(bathrooms) : baths[0];
  const bath = baths.reduce(
    (best, b) => (Math.abs(b - want) < Math.abs(best - want) ? b : best),
    baths[0]
  );
  const id = propertySizeFromRooms(bed, bath);
  if (!id) return null;
  const ex = getCleaningBasePriceExclGst(id);
  if (ex == null) return null;
  return Math.round(ex * GST_MULTIPLIER * 100) / 100;
}

export type CleaningQuoteResult = {
  propertySize: CleaningPropertySize;
  propertyLabel: string;
  extraLivingRooms: number;
  priceExclGst: number;
  priceIncGst: number;
  extraLivingRoomsExclGst: number;
};

export function calculateCleaningQuote(params: {
  propertySize: CleaningPropertySize;
  extraLivingRooms: number;
}): CleaningQuoteResult | null {
  const option = getCleaningPropertyOption(params.propertySize);
  const base = getCleaningBasePriceExclGst(params.propertySize);
  if (!option || base == null) return null;

  const extraRooms = Math.max(0, Math.floor(params.extraLivingRooms));
  const extraLivingRoomsExclGst = extraRooms * EXTRA_LIVING_ROOM_EXCL_GST;
  const priceExclGst = base + extraLivingRoomsExclGst;
  const priceIncGst = Math.round(priceExclGst * GST_MULTIPLIER);

  return {
    propertySize: params.propertySize,
    propertyLabel: option.label,
    extraLivingRooms: extraRooms,
    priceExclGst,
    priceIncGst,
    extraLivingRoomsExclGst,
  };
}

export function formatNzMoney(amount: number): string {
  return `$${amount.toLocaleString("en-NZ")}`;
}

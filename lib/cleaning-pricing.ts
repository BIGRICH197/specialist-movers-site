/** Fixed exit-clean prices (excl. GST) — Option 1 / Option 2 by property size. */

export type CleaningPropertySize =
  | "1-1"
  | "2-1"
  | "2-2"
  | "3-1"
  | "3-2"
  | "4-2"
  | "4-3"
  | "5-3";

export type CleaningPackage = "option1" | "option2";

export type CleaningPropertyOption = {
  id: CleaningPropertySize;
  label: string;
  option1: number;
  option2: number | null;
};

export const EXTRA_LIVING_ROOM_EXCL_GST = 40;

export const cleaningPropertyOptions: readonly CleaningPropertyOption[] = [
  { id: "1-1", label: "1 bed, 1 bath", option1: 280, option2: 280 },
  { id: "2-1", label: "2 bed, 1 bath", option1: 350, option2: 350 },
  { id: "2-2", label: "2 bed, 2 bath", option1: 420, option2: 400 },
  { id: "3-1", label: "3 bed, 1 bath", option1: 450, option2: 450 },
  { id: "3-2", label: "3 bed, 2 bath", option1: 520, option2: 500 },
  { id: "4-2", label: "4 bed, 2 bath", option1: 600, option2: 590 },
  { id: "4-3", label: "4 bed, 3 bath", option1: 700, option2: 650 },
  { id: "5-3", label: "5 bed, 3 bath", option1: 730, option2: null },
] as const;

export function getCleaningPropertyOption(
  id: CleaningPropertySize
): CleaningPropertyOption | undefined {
  return cleaningPropertyOptions.find((o) => o.id === id);
}

export function cleaningPackagesForProperty(
  option: CleaningPropertyOption
): { id: CleaningPackage; label: string; priceExclGst: number }[] {
  const packages: { id: CleaningPackage; label: string; priceExclGst: number }[] = [
    { id: "option1", label: "Option 1", priceExclGst: option.option1 },
  ];
  if (option.option2 != null) {
    packages.push({
      id: "option2",
      label: "Option 2",
      priceExclGst: option.option2,
    });
  }
  return packages;
}

export function calculateCleaningPriceExclGst(params: {
  propertySize: CleaningPropertySize;
  package: CleaningPackage;
  extraLivingRooms: number;
}): number | null {
  const option = getCleaningPropertyOption(params.propertySize);
  if (!option) return null;
  const base =
    params.package === "option1" ? option.option1 : option.option2;
  if (base == null) return null;
  const extra = Math.max(0, Math.floor(params.extraLivingRooms)) * EXTRA_LIVING_ROOM_EXCL_GST;
  return base + extra;
}

export function formatNzMoney(amount: number): string {
  return `$${amount.toLocaleString("en-NZ")}`;
}

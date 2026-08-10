/**
 * Display rows for /pricing, derived from the same constants the quote engine
 * uses. Nothing here is a typed-in number: if a rate moves in pricing-data.ts
 * or hamilton-pricing-data.ts, the published page moves with it, so a price a
 * customer reads can never drift from the price we actually charge.
 *
 * GST: the engine works in ex-GST figures and rounds the retail number with
 * Math.round(ex * 1.15). `inclGst` below reproduces that exactly — including
 * the float quirks that make 170 -> 195 (not 196) and 450 -> 518 — so the
 * page and the quote agree to the dollar.
 */
import {
  HAMILTON_CALLOUT_FEES,
  HAMILTON_TIER_1_RATES,
  type HamiltonZone,
} from "@/lib/hamilton-pricing-data";
import {
  BEDROOM_CREW,
  CALLOUT_FEES,
  CLEANING_PRICES,
  GST_MULTIPLIER,
  MOVE_HOURS,
  PACKING_PRICES,
  PIANO_BASE,
  PIANO_STAIRS_PER_FLIGHT,
  TIER_1_RATES,
  TIER_2_RATES,
  TIER_2_SUBURBS,
  TIER_3_RATES,
  TIER_3_SUBURBS,
  type Bedrooms,
  type CrewSize,
  type DayOfWeek,
  type PianoType,
} from "@/lib/pricing-data";

/** Retail figure for an ex-GST price, matching the quote engine's rounding. */
export function inclGst(ex: number): number {
  return Math.round(ex * GST_MULTIPLIER);
}

export type Rate = { ex: number; incl: number };

export function rate(ex: number): Rate {
  return { ex, incl: inclGst(ex) };
}

const DAY_ORDER: DayOfWeek[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABEL: Record<DayOfWeek, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export type DayRateRow = {
  label: string;
  twoMovers: Rate;
  threeMovers: Rate;
  /** True for the row carrying the lowest 2-mover rate — the midweek discount. */
  cheapest: boolean;
};

/**
 * Collapse a day-of-week rate table into display rows, merging every day that
 * charges the same pair. Hamilton prices five days identically, so it folds to
 * one row; Auckland only pairs Monday with Wednesday. Rows come out
 * cheapest-first, because the midweek discount is the reason to read the table.
 */
function groupDayRates(
  table: Record<DayOfWeek, Record<CrewSize, number>>,
): DayRateRow[] {
  const cheapestEx = Math.min(...DAY_ORDER.map((day) => table[day]["2M"]));
  const bySignature = new Map<string, { days: DayOfWeek[]; two: number; three: number }>();

  for (const day of DAY_ORDER) {
    const two = table[day]["2M"];
    const three = table[day]["3M"];
    const signature = `${two}|${three}`;
    const existing = bySignature.get(signature);
    if (existing) {
      existing.days.push(day);
      continue;
    }
    bySignature.set(signature, { days: [day], two, three });
  }

  // Array.from, not [...map.values()] — tsconfig sets no `target`, so it
  // defaults to ES5 and spreading a Map iterator needs downlevelIteration.
  return Array.from(bySignature.values())
    .sort((a, b) => a.two - b.two || a.three - b.three)
    .map((group) => ({
      label: group.days.map((day) => DAY_LABEL[day]).join(" / "),
      twoMovers: rate(group.two),
      threeMovers: rate(group.three),
      cheapest: group.two === cheapestEx,
    }));
}

export const aucklandDayRates = groupDayRates(TIER_1_RATES);
export const hamiltonDayRates = groupDayRates(HAMILTON_TIER_1_RATES);

export const aucklandCallout = {
  twoMovers: rate(CALLOUT_FEES["2M"]),
  threeMovers: rate(CALLOUT_FEES["3M"]),
};

export const hamiltonCallouts: { zone: HamiltonZone; fee: Rate }[] = (
  ["A", "B", "C"] as HamiltonZone[]
).map((zone) => ({ zone, fee: rate(HAMILTON_CALLOUT_FEES[zone]["2M"]) }));

const BEDROOM_ORDER: Bedrooms[] = [1, 2, 3, 4];

function bedroomLabel(bedrooms: Bedrooms): string {
  if (bedrooms === 1) return "1 bedroom";
  if (bedrooms === 4) return "4+ bedrooms";
  return `${bedrooms} bedrooms`;
}

function crewLabel(crew: CrewSize): string {
  return crew === "2M" ? "2 movers" : "3 movers";
}

export type JobDurationRow = {
  label: string;
  crew: string;
  easyHours: number;
  tightHours: number;
};

/**
 * `base` assumes easy access at both ends; each difficult end adds
 * `perHardEnd`, so the tight-access column loads both ends.
 */
export const jobDurations: JobDurationRow[] = BEDROOM_ORDER.map((bedrooms) => {
  const { base, perHardEnd } = MOVE_HOURS[bedrooms];
  return {
    label: bedroomLabel(bedrooms),
    crew: crewLabel(BEDROOM_CREW[bedrooms]),
    easyHours: base,
    tightHours: base + perHardEnd * 2,
  };
});

export type FixedPriceRow = {
  label: string;
  packing: Rate;
  cleaning: Rate;
};

export const fixedPriceRows: FixedPriceRow[] = BEDROOM_ORDER.map((bedrooms) => ({
  label: bedroomLabel(bedrooms),
  packing: rate(PACKING_PRICES[bedrooms]),
  cleaning: rate(CLEANING_PRICES[bedrooms]),
}));

export type PianoRow = { label: string; from: Rate };

export const pianoRows: PianoRow[] = (
  ["upright", "grand"] as PianoType[]
).map((type) => ({
  label: type === "upright" ? "Upright piano" : "Grand piano",
  from: rate(PIANO_BASE[type]),
}));

export const pianoStairsPerFlight = rate(PIANO_STAIRS_PER_FLIGHT);

export type OuterTierRow = {
  label: string;
  twoMovers: Rate;
  threeMovers: Rate;
  callout: Rate;
  suburbs: string;
};

/** Title-case the lowercase matching lists so they read as place names. */
function formatSuburbs(suburbs: readonly string[]): string {
  return suburbs
    .map((suburb) =>
      suburb
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(", ");
}

export const outerTiers: OuterTierRow[] = [
  {
    label: "Tier 2",
    twoMovers: rate(TIER_2_RATES["2M"].hourly),
    threeMovers: rate(TIER_2_RATES["3M"].hourly),
    callout: rate(TIER_2_RATES["2M"].callout),
    suburbs: formatSuburbs(TIER_2_SUBURBS),
  },
  {
    label: "Tier 3",
    twoMovers: rate(TIER_3_RATES["2M"].hourly),
    threeMovers: rate(TIER_3_RATES["3M"].hourly),
    callout: rate(TIER_3_RATES["2M"].callout),
    suburbs: formatSuburbs(TIER_3_SUBURBS),
  },
];

/** Cheapest hourly rate in each branch — the "from" figure quoted in prose. */
export const aucklandFromHourly = rate(
  Math.min(...DAY_ORDER.map((day) => TIER_1_RATES[day]["2M"])),
);
export const hamiltonFromHourly = rate(
  Math.min(...DAY_ORDER.map((day) => HAMILTON_TIER_1_RATES[day]["2M"])),
);

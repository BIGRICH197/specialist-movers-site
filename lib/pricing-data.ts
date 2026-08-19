// ── Pricing constants ported from new_deals.py + sm_quote_bot.py + pricing.md ──

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type CrewSize = "2M" | "3M";
export type Tier = 1 | 2 | 3;
export type AccessDifficulty = "easy" | "hard";
export type PianoType = "upright" | "grand";
export type Bedrooms = 1 | 2 | 3 | 4;

export interface TruckSpec {
  name: string;
  capacity: number;
  loadTime: Record<AccessDifficulty, number>;
  unloadTime: Record<AccessDifficulty, number>;
}

// ── Bedroom → estimated cubic metres ──
export const BEDROOM_CUBES: Record<Bedrooms, number> = {
  1: 18,
  2: 25,
  3: 28,
  4: 40,
};

// ── Bedroom → crew size (2 movers for 1–3 rooms; 3 movers for 4 rooms) ──
export const BEDROOM_CREW: Record<Bedrooms, CrewSize> = {
  1: "2M",
  2: "2M",
  3: "2M",
  4: "3M",
};

// ── Estimated labour hours by bedroom size + access ──
// `base` = both ends easy access. Add `perHardEnd` for EACH end (pickup and
// dropoff) that has hard/difficult access (so 0, 1, or 2 hard ends).
export const MOVE_HOURS: Record<Bedrooms, { base: number; perHardEnd: number }> = {
  1: { base: 2, perHardEnd: 0.5 },
  2: { base: 3, perHardEnd: 0.5 },
  3: { base: 4, perHardEnd: 1 },
  4: { base: 6, perHardEnd: 1 },
};

// ── Tier 1: day-of-week hourly rates (excl GST) ──
// 2026-08-19 (Richard): Auckland 2-mover flattened to $140 every day, Friday
// still $150. The midweek discounts (Tue $120, Thu $130, Mon/Wed $135) are
// gone — one number is easier to quote and it matches the trade card.
export const TIER_1_RATES: Record<DayOfWeek, Record<CrewSize, number>> = {
  tue: { "2M": 140, "3M": 160 },
  wed: { "2M": 140, "3M": 175 },
  thu: { "2M": 140, "3M": 170 },
  fri: { "2M": 150, "3M": 190 },
  sat: { "2M": 140, "3M": 190 },
  sun: { "2M": 140, "3M": 185 },
  mon: { "2M": 140, "3M": 175 },
};

// ── Callout fees by crew (excl GST) ──
export const CALLOUT_FEES: Record<CrewSize, number> = {
  "2M": 60,
  "3M": 80,
};

// ── Tier 2: fixed rates (excl GST) ──
// One out-of-town rate, $180 and $220 EXCL GST (Richard, 2026-08-19). These
// were stored as 156.52 / 191.30 — the same figures read as GST-inclusive and
// divided back out, which undercharged the out-of-town job by 15%. Only the
// callout separates the tiers now, which is the distance charge.
export const TIER_2_RATES: Record<CrewSize, { hourly: number; callout: number }> =
  {
    "2M": { hourly: 180, callout: 80 },
    "3M": { hourly: 220, callout: 100 },
  };

// ── Tier 3: fixed rates (excl GST) ──
export const TIER_3_RATES: Record<CrewSize, { hourly: number; callout: number }> =
  {
    "2M": { hourly: 180, callout: 90 },
    "3M": { hourly: 220, callout: 90 },
  };

// ── Suburb tier lists (lowercase for matching) ──
export const TIER_2_SUBURBS = [
  "papakura",
  "silverdale",
  "dairy flat",
  "warkworth",
  "wellsford",
  "waiwera",
  "waimauku",
  "helensville",
  "tahekeroa",
  "kaukapakapa",
  "riverhead",
  "beachlands",
  "maraetai",
  "whangaparaoa",
  "orewa",
  "stanmore bay",
  "red beach",
];

export const TIER_3_SUBURBS = ["pukekohe", "waiuku", "tuakau", "pokeno", "karaka"];

/**
 * Auckland-branch OOA , Waikato in-area towns are quoted via Hamilton branch.
 * Hamilton city is NOT listed here.
 */
export const AUCKLAND_OOA_KEYWORDS = [
  "hamilton",
  "cambridge",
  "te awamutu",
  "huntly",
  "morrinsville",
  "matamata",
  "ngaruawahia",
  "raglan",
  "otorohanga",
  "te kuiti",
  "putaruru",
  "tauranga",
  "wellington",
  "christchurch",
  "dunedin",
  "rotorua",
  "taupo",
  "palmerston north",
  "napier",
  "hastings",
  "new plymouth",
  "whangarei",
  "nelson",
  "queenstown",
  "invercargill",
  "gisborne",
  "whanganui",
  "masterton",
  "blenheim",
  "timaru",
  "ashburton",
  "oamaru",
  "greymouth",
  "thames",
  "paeroa",
  "waihi",
  "katikati",
  "te puke",
  "tokoroa",
];

/** @deprecated Use AUCKLAND_OOA_KEYWORDS , kept for imports that still reference the old name. */
export const OUT_OF_AUCKLAND_KEYWORDS = AUCKLAND_OOA_KEYWORDS;

// ── Trucks (ordered smallest to largest) ──
export const TRUCKS: TruckSpec[] = [
  {
    name: "Hino",
    capacity: 15,
    loadTime: { easy: 45, hard: 90 },
    unloadTime: { easy: 45, hard: 90 },
  },
  {
    name: "Piano",
    capacity: 18,
    loadTime: { easy: 60, hard: 120 },
    unloadTime: { easy: 60, hard: 120 },
  },
  {
    name: "Foton",
    capacity: 20,
    loadTime: { easy: 60, hard: 120 },
    unloadTime: { easy: 60, hard: 120 },
  },
  {
    name: "Class 2",
    capacity: 26,
    loadTime: { easy: 120, hard: 180 },
    unloadTime: { easy: 120, hard: 180 },
  },
  {
    name: "Gullwing",
    capacity: 28,
    loadTime: { easy: 135, hard: 180 },
    unloadTime: { easy: 135, hard: 180 },
  },
];

// ── Travel times (minutes) ──
export const DEFAULT_TRAVEL_MINS = 30;
export const OUTER_TRAVEL_MINS = 50;

// ── GST ──
export const GST_MULTIPLIER = 1.15;

// ── Packing prices by bedroom (excl GST) ──
export const PACKING_PRICES: Record<Bedrooms, number> = {
  1: 1599,
  2: 1770,
  3: 1962,
  4: 2486,
};

// ── Cleaning prices by bedroom (excl GST) ──
export const CLEANING_PRICES: Record<Bedrooms, number> = {
  1: 280,
  2: 350,
  3: 450,
  4: 600,
};

/** Cleaning price incl. GST for a bedroom count, so a quote add-on toggle can
 *  price cleaning that was not already quoted. Returns null if we can't (no
 *  bedroom count), in which case cleaning is treated as a "request". */
export function getCleaningPriceInclGst(bedrooms?: number): number | null {
  if (!bedrooms || bedrooms < 1) return null;
  const b = Math.min(Math.round(bedrooms), 4) as Bedrooms;
  const ex = CLEANING_PRICES[b];
  return ex ? Math.round(ex * GST_MULTIPLIER * 100) / 100 : null;
}

// ── Piano base prices (excl GST) ──
export const PIANO_BASE: Record<PianoType, number> = {
  upright: 290,
  grand: 550,
};

// ── Piano location surcharges (excl GST) ──
export const PIANO_SURCHARGES: Record<string, number> = {
  silverdale: 0,
  whangaparaoa: 30,
  orewa: 30,
  "stanmore bay": 30,
  "red beach": 30,
  papakura: 50,
  kumeu: 50,
  riverhead: 50,
  laingholm: 50,
  helensville: 100,
  beachlands: 100,
  maraetai: 100,
  pukekohe: 150,
  waiuku: 200,
};

// ── Piano stairs surcharge (excl GST, per flight) ──
export const PIANO_STAIRS_PER_FLIGHT = 80;


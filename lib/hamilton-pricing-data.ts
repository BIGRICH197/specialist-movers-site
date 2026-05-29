import type { CrewSize, DayOfWeek } from "./pricing-data";

/** Hamilton house hourly rates (excl GST) , same across zones; callout varies by zone. */
export const HAMILTON_TIER_1_RATES: Record<
  DayOfWeek,
  Record<CrewSize, number>
> = {
  tue: { "2M": 140, "3M": 180 },
  thu: { "2M": 155, "3M": 195 },
  mon: { "2M": 165, "3M": 205 },
  wed: { "2M": 165, "3M": 205 },
  sun: { "2M": 180, "3M": 220 },
  fri: { "2M": 190, "3M": 230 },
  sat: { "2M": 190, "3M": 230 },
};

export type HamiltonZone = "A" | "B" | "C";

/** Callout fees by zone and crew (excl GST) , parity with Auckland at launch. */
export const HAMILTON_CALLOUT_FEES: Record<
  HamiltonZone,
  Record<CrewSize, number>
> = {
  A: { "2M": 60, "3M": 80 },
  B: { "2M": 80, "3M": 100 },
  C: { "2M": 120, "3M": 140 },
};

/** Piano zone surcharge (retail) , venues use fixed locations. */
export const HAMILTON_PIANO_ZONE_SURCHARGE: Record<HamiltonZone, number> = {
  A: 0,
  B: 50,
  C: 200,
};

/** Cleaning zone callout stacks on fixed bedroom price. */
export const HAMILTON_CLEANING_CALLOUT: Record<HamiltonZone, number> = {
  A: 0,
  B: 50,
  C: 100,
};

/** Hamilton retail piano stairs (per flight entered on form). */
export const HAMILTON_PIANO_STAIRS_PER_FLIGHT = 100;

/** In-area towns + Hamilton city (accent-insensitive match). */
export const HAMILTON_IN_AREA_KEYWORDS = [
  "hamilton",
  "chartwell",
  "fairfield",
  "dinsdale",
  "frankton",
  "hillcrest",
  "nawton",
  "flagstaff",
  "rototuna",
  "pukete",
  "claudelands",
  "melville",
  "bader",
  "glenview",
  "eureka",
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
];

/** Zone B suburbs/towns (keyword heuristic until maps cache on site). */
export const HAMILTON_ZONE_B_KEYWORDS = [
  "cambridge",
  "te awamutu",
  "huntly",
  "morrinsville",
  "ngaruawahia",
  "raglan",
];

/** Zone C suburbs/towns. */
export const HAMILTON_ZONE_C_KEYWORDS = [
  "matamata",
  "otorohanga",
  "te kuiti",
  "putaruru",
];

/**
 * OOA from Hamilton depot perspective , manual quote.
 * Inverse of Auckland in-area; includes Auckland metro and distant regions.
 */
export const HAMILTON_OOA_KEYWORDS = [
  "auckland",
  "north shore",
  "waitakere",
  "waitākere",
  "manukau",
  "manukau city",
  "rodney",
  "papakura",
  "silverdale",
  "orewa",
  "whangaparaoa",
  "pukekohe",
  "waiuku",
  "helensville",
  "beachlands",
  "maraetai",
  "herne bay",
  "ponsonby",
  "remuera",
  "newmarket",
  "mt eden",
  "mount eden",
  "takapuna",
  "albany",
  "glenfield",
  "wairau valley",
  "thames",
  "coromandel",
  "waihi",
  "te kauwhata",
  "mercer",
  "meremere",
  "tauranga",
  "mount maunganui",
  "papamoa",
  "bay of plenty",
  "rotorua",
  "taupo",
  "wellington",
  "christchurch",
  "palmerston north",
  "napier",
  "hastings",
  "new plymouth",
  "whangarei",
  "nelson",
  "queenstown",
  "dunedin",
  "invercargill",
  "gisborne",
  "whanganui",
  "masterton",
  "blenheim",
  "timaru",
  "katikati",
  "te puke",
  "tokoroa",
  "paeroa",
];

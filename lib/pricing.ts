import {
  type AccessDifficulty,
  type Bedrooms,
  type CrewSize,
  type DayOfWeek,
  type PianoType,
  type Tier,
  type TruckSpec,
  AUCKLAND_OOA_KEYWORDS,
  BEDROOM_CUBES,
  BEDROOM_CREW,
  CALLOUT_FEES,
  CLEANING_PRICES,
  DEFAULT_TRAVEL_MINS,
  GST_MULTIPLIER,
  OUTER_TRAVEL_MINS,
  PACKING_PRICES,
  PIANO_BASE,
  PIANO_STAIRS_PER_FLIGHT,
  PIANO_SURCHARGES,
  TIER_1_RATES,
  TIER_2_RATES,
  TIER_2_SUBURBS,
  TIER_3_RATES,
  TIER_3_SUBURBS,
  TRUCKS,
} from "./pricing-data";
import {
  type HamiltonZone,
  HAMILTON_CALLOUT_FEES,
  HAMILTON_CLEANING_CALLOUT,
  HAMILTON_IN_AREA_KEYWORDS,
  HAMILTON_OOA_KEYWORDS,
  HAMILTON_PIANO_STAIRS_PER_FLIGHT,
  HAMILTON_PIANO_ZONE_SURCHARGE,
  HAMILTON_TIER_1_RATES,
  HAMILTON_ZONE_B_KEYWORDS,
  HAMILTON_ZONE_C_KEYWORDS,
} from "./hamilton-pricing-data";

export type QuoteBranch = "auckland" | "hamilton" | "manual";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function suburbMatch(address: string, keywords: string[]): boolean {
  const addr = normalize(address);
  return keywords.some((kw) => addr.includes(normalize(kw)));
}

export function detectTier(address: string): Tier {
  if (suburbMatch(address, TIER_3_SUBURBS)) return 3;
  if (suburbMatch(address, TIER_2_SUBURBS)) return 2;
  return 1;
}

export function isHamiltonInArea(address: string): boolean {
  return suburbMatch(address, HAMILTON_IN_AREA_KEYWORDS);
}

export function isHamiltonOOA(address: string): boolean {
  return suburbMatch(address, HAMILTON_OOA_KEYWORDS);
}

export function isAucklandOOA(address: string): boolean {
  return suburbMatch(address, AUCKLAND_OOA_KEYWORDS);
}

/** @deprecated Use detectQuoteBranch or needsManualQuote */
export function isOutOfAuckland(pickup: string, dropoff: string): boolean {
  return needsManualQuote(pickup, dropoff);
}

export function detectHamiltonZone(address: string): HamiltonZone {
  if (suburbMatch(address, HAMILTON_ZONE_C_KEYWORDS)) return "C";
  if (suburbMatch(address, HAMILTON_ZONE_B_KEYWORDS)) return "B";
  return "A";
}

export function detectQuoteBranch(pickup: string, dropoff: string): QuoteBranch {
  const pHam = isHamiltonInArea(pickup);
  const dHam = isHamiltonInArea(dropoff);
  const pHamOOA = isHamiltonOOA(pickup);
  const dHamOOA = isHamiltonOOA(dropoff);
  const pAuckOOA = isAucklandOOA(pickup);
  const dAuckOOA = isAucklandOOA(dropoff);

  const pAuckMetro = !pHam && !pAuckOOA;
  const dAuckMetro = !dHam && !dAuckOOA;

  if ((pHam && dAuckMetro) || (dHam && pAuckMetro)) {
    return "manual";
  }

  if (pHam && dHam && !pHamOOA && !dHamOOA) {
    return "hamilton";
  }

  if (!pAuckOOA && !dAuckOOA) {
    return "auckland";
  }

  return "manual";
}

export function needsManualQuote(pickup: string, dropoff: string): boolean {
  return detectQuoteBranch(pickup, dropoff) === "manual";
}

function selectTruck(cubes: number): TruckSpec {
  for (const truck of TRUCKS) {
    if (truck.capacity >= cubes) return truck;
  }
  return TRUCKS[TRUCKS.length - 1];
}

function dateToDayKey(dateStr: string): DayOfWeek {
  const d = new Date(dateStr + "T12:00:00");
  const days: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[d.getDay()];
}

function getAucklandHourlyRate(
  tier: Tier,
  crew: CrewSize,
  day: DayOfWeek,
): number {
  if (tier === 2) return TIER_2_RATES[crew].hourly;
  if (tier === 3) return TIER_3_RATES[crew].hourly;
  return TIER_1_RATES[day][crew];
}

function getAucklandCalloutFee(tier: Tier, crew: CrewSize): number {
  if (tier === 2) return TIER_2_RATES[crew].callout;
  if (tier === 3) return TIER_3_RATES[crew].callout;
  return CALLOUT_FEES[crew];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function zoneRank(zone: HamiltonZone): number {
  return zone === "C" ? 3 : zone === "B" ? 2 : 1;
}

function maxHamiltonZone(a: HamiltonZone, b: HamiltonZone): HamiltonZone {
  return zoneRank(a) >= zoneRank(b) ? a : b;
}

export interface HouseMoveInput {
  bedrooms: Bedrooms;
  pickupAddress: string;
  dropoffAddress: string;
  preferredDate?: string; // YYYY-MM-DD
  pickupAccess: AccessDifficulty;
  dropoffAccess: AccessDifficulty;
  wantsPacking: boolean;
  wantsCleaning: boolean;
}

export interface HouseMoveResult {
  branch: QuoteBranch;
  outOfAuckland: boolean;
  cubes: number;
  crew: CrewSize;
  crewCount: number;
  tier: Tier;
  truck: string;
  numberOfLoads: number;
  totalHours: number;
  dayOfWeek: string;
  hourlyRate: number;
  calloutFee: number;
  moveCostExGst: number;
  moveCostIncGst: number;
  packingCostExGst: number | null;
  packingCostIncGst: number | null;
  cleaningCostExGst: number | null;
  cleaningCostIncGst: number | null;
  totalExGst: number;
  totalIncGst: number;
  breakdown: string;
}

export function calculateHouseMove(input: HouseMoveInput): HouseMoveResult {
  const branch = detectQuoteBranch(
    input.pickupAddress,
    input.dropoffAddress,
  );
  const outOfAuckland = branch === "manual";

  if (branch === "hamilton") {
    return calculateHouseMoveHamilton(input, outOfAuckland);
  }

  return calculateHouseMoveAuckland(input, branch, outOfAuckland);
}

function calculateHouseMoveAuckland(
  input: HouseMoveInput,
  branch: QuoteBranch,
  outOfAuckland: boolean,
): HouseMoveResult {
  const cubes = BEDROOM_CUBES[input.bedrooms];
  const crew = BEDROOM_CREW[input.bedrooms];
  const crewCount = crew === "2M" ? 2 : 3;
  const tierPickup = detectTier(input.pickupAddress);
  const tierDropoff = detectTier(input.dropoffAddress);
  const tier = Math.max(tierPickup, tierDropoff) as Tier;

  const day = input.preferredDate ? dateToDayKey(input.preferredDate) : "tue";
  const dayLabel = input.preferredDate
    ? new Date(input.preferredDate + "T12:00:00").toLocaleDateString("en-NZ", {
        weekday: "long",
      })
    : "Tuesday (default)";

  const truck = selectTruck(cubes);
  const numberOfLoads = Math.ceil(cubes / truck.capacity);

  const travelMins = tier >= 2 ? OUTER_TRAVEL_MINS : DEFAULT_TRAVEL_MINS;
  const loadMins = truck.loadTime[input.pickupAccess];
  const unloadMins = truck.unloadTime[input.dropoffAccess];

  const totalMins =
    numberOfLoads > 1
      ? (loadMins + unloadMins + travelMins * 2) * numberOfLoads
      : loadMins + unloadMins + travelMins;

  const totalHours = round2(totalMins / 60);

  const hourlyRate = getAucklandHourlyRate(tier, crew, day);
  const calloutFee = getAucklandCalloutFee(tier, crew);

  const moveCostExGst = round2(totalHours * hourlyRate + calloutFee);
  const moveCostIncGst = round2(moveCostExGst * GST_MULTIPLIER);

  const packingCostExGst = input.wantsPacking
    ? PACKING_PRICES[input.bedrooms]
    : null;
  const packingCostIncGst =
    packingCostExGst !== null
      ? round2(packingCostExGst * GST_MULTIPLIER)
      : null;

  const cleaningCostExGst = input.wantsCleaning
    ? CLEANING_PRICES[input.bedrooms]
    : null;
  const cleaningCostIncGst =
    cleaningCostExGst !== null
      ? round2(cleaningCostExGst * GST_MULTIPLIER)
      : null;

  const totalExGst = round2(
    moveCostExGst + (packingCostExGst ?? 0) + (cleaningCostExGst ?? 0),
  );
  const totalIncGst = round2(
    moveCostIncGst + (packingCostIncGst ?? 0) + (cleaningCostIncGst ?? 0),
  );

  const lines: string[] = [];
  lines.push(`${crewCount} movers, ${dayLabel}, ~${totalHours}hrs`);
  lines.push(`Moving: $${moveCostExGst} + GST = $${moveCostIncGst} incl. GST`);
  lines.push(`  ($${hourlyRate}/hr x ${totalHours}hrs + $${calloutFee} callout)`);
  if (packingCostIncGst !== null) {
    lines.push(
      `Packing: $${packingCostExGst} + GST = $${packingCostIncGst} incl. GST`,
    );
  }
  if (cleaningCostIncGst !== null) {
    lines.push(
      `Cleaning: $${cleaningCostExGst} + GST = $${cleaningCostIncGst} incl. GST`,
    );
  }
  lines.push(`Total: $${totalExGst} + GST = $${totalIncGst} incl. GST`);

  return {
    branch,
    outOfAuckland,
    cubes,
    crew,
    crewCount,
    tier,
    truck: truck.name,
    numberOfLoads,
    totalHours,
    dayOfWeek: dayLabel,
    hourlyRate,
    calloutFee,
    moveCostExGst,
    moveCostIncGst,
    packingCostExGst,
    packingCostIncGst,
    cleaningCostExGst,
    cleaningCostIncGst,
    totalExGst,
    totalIncGst,
    breakdown: lines.join("\n"),
  };
}

function calculateHouseMoveHamilton(
  input: HouseMoveInput,
  outOfAuckland: boolean,
): HouseMoveResult {
  const cubes = BEDROOM_CUBES[input.bedrooms];
  const crew = BEDROOM_CREW[input.bedrooms];
  const crewCount = crew === "2M" ? 2 : 3;
  const zone = maxHamiltonZone(
    detectHamiltonZone(input.pickupAddress),
    detectHamiltonZone(input.dropoffAddress),
  );
  const tier = 1 as Tier;

  const day = input.preferredDate ? dateToDayKey(input.preferredDate) : "tue";
  const dayLabel = input.preferredDate
    ? new Date(input.preferredDate + "T12:00:00").toLocaleDateString("en-NZ", {
        weekday: "long",
      })
    : "Tuesday (default)";

  const truck = selectTruck(cubes);
  const numberOfLoads = Math.ceil(cubes / truck.capacity);

  const travelMins = zone !== "A" ? OUTER_TRAVEL_MINS : DEFAULT_TRAVEL_MINS;
  const loadMins = truck.loadTime[input.pickupAccess];
  const unloadMins = truck.unloadTime[input.dropoffAccess];

  const totalMins =
    numberOfLoads > 1
      ? (loadMins + unloadMins + travelMins * 2) * numberOfLoads
      : loadMins + unloadMins + travelMins;

  const totalHours = round2(totalMins / 60);

  const hourlyRate = HAMILTON_TIER_1_RATES[day][crew];
  const calloutFee = HAMILTON_CALLOUT_FEES[zone][crew];

  const moveCostExGst = round2(totalHours * hourlyRate + calloutFee);
  const moveCostIncGst = round2(moveCostExGst * GST_MULTIPLIER);

  const packingCostExGst = input.wantsPacking
    ? PACKING_PRICES[input.bedrooms]
    : null;
  const packingCostIncGst =
    packingCostExGst !== null
      ? round2(packingCostExGst * GST_MULTIPLIER)
      : null;

  let cleaningCostExGst: number | null = null;
  let cleaningCostIncGst: number | null = null;
  if (input.wantsCleaning) {
    const cleaningCallout = HAMILTON_CLEANING_CALLOUT[zone];
    cleaningCostExGst = round2(
      CLEANING_PRICES[input.bedrooms] + cleaningCallout,
    );
    cleaningCostIncGst = round2(cleaningCostExGst * GST_MULTIPLIER);
  }

  const totalExGst = round2(
    moveCostExGst + (packingCostExGst ?? 0) + (cleaningCostExGst ?? 0),
  );
  const totalIncGst = round2(
    moveCostIncGst + (packingCostIncGst ?? 0) + (cleaningCostIncGst ?? 0),
  );

  const lines: string[] = [];
  lines.push(
    `${crewCount} movers, ${dayLabel}, Waikato Zone ${zone}, ~${totalHours}hrs`,
  );
  lines.push(`Moving: $${moveCostExGst} + GST = $${moveCostIncGst} incl. GST`);
  lines.push(`  ($${hourlyRate}/hr x ${totalHours}hrs + $${calloutFee} callout)`);
  if (packingCostIncGst !== null) {
    lines.push(
      `Packing: $${packingCostExGst} + GST = $${packingCostIncGst} incl. GST`,
    );
  }
  if (cleaningCostIncGst !== null) {
    const cleaningCallout = HAMILTON_CLEANING_CALLOUT[zone];
    if (cleaningCallout > 0) {
      lines.push(
        `Cleaning: $${cleaningCostExGst} + GST = $${cleaningCostIncGst} incl. GST (incl. $${cleaningCallout} zone callout)`,
      );
    } else {
      lines.push(
        `Cleaning: $${cleaningCostExGst} + GST = $${cleaningCostIncGst} incl. GST`,
      );
    }
  }
  lines.push(`Total: $${totalExGst} + GST = $${totalIncGst} incl. GST`);

  return {
    branch: "hamilton",
    outOfAuckland,
    cubes,
    crew,
    crewCount,
    tier,
    truck: truck.name,
    numberOfLoads,
    totalHours,
    dayOfWeek: dayLabel,
    hourlyRate,
    calloutFee,
    moveCostExGst,
    moveCostIncGst,
    packingCostExGst,
    packingCostIncGst,
    cleaningCostExGst,
    cleaningCostIncGst,
    totalExGst,
    totalIncGst,
    breakdown: lines.join("\n"),
  };
}

export interface PianoMoveInput {
  pianoType: PianoType;
  pickupAddress: string;
  dropoffAddress: string;
  pickupStairFlights: number;
  dropoffStairFlights: number;
}

export interface PianoMoveResult {
  branch: QuoteBranch;
  outOfAuckland: boolean;
  pianoType: PianoType;
  baseCostExGst: number;
  locationSurchargeExGst: number;
  stairsSurchargeExGst: number;
  totalExGst: number;
  totalIncGst: number;
  breakdown: string;
}

function getAucklandPianoSurcharge(address: string): number {
  const addr = normalize(address);
  let highest = 0;
  for (const [suburb, surcharge] of Object.entries(PIANO_SURCHARGES)) {
    if (addr.includes(suburb) && surcharge > highest) {
      highest = surcharge;
    }
  }
  return highest;
}

export function calculatePianoMove(input: PianoMoveInput): PianoMoveResult {
  const branch = detectQuoteBranch(
    input.pickupAddress,
    input.dropoffAddress,
  );
  const outOfAuckland = branch === "manual";

  const baseCost = PIANO_BASE[input.pianoType];
  const totalFlights = input.pickupStairFlights + input.dropoffStairFlights;

  let locationSurcharge = 0;
  let stairsPerFlight = PIANO_STAIRS_PER_FLIGHT;

  if (branch === "hamilton") {
    const zone = maxHamiltonZone(
      detectHamiltonZone(input.pickupAddress),
      detectHamiltonZone(input.dropoffAddress),
    );
    locationSurcharge = HAMILTON_PIANO_ZONE_SURCHARGE[zone];
    stairsPerFlight = HAMILTON_PIANO_STAIRS_PER_FLIGHT;
  } else if (branch === "auckland") {
    const pickupSurcharge = getAucklandPianoSurcharge(input.pickupAddress);
    const dropoffSurcharge = getAucklandPianoSurcharge(input.dropoffAddress);
    locationSurcharge = Math.max(pickupSurcharge, dropoffSurcharge);
  }

  const stairsSurcharge = totalFlights * stairsPerFlight;
  const totalExGst = baseCost + locationSurcharge + stairsSurcharge;
  const totalIncGst = round2(totalExGst * GST_MULTIPLIER);

  const lines: string[] = [];
  const typeLabel = input.pianoType === "grand" ? "Grand piano" : "Upright piano";
  lines.push(`${typeLabel}: $${baseCost} + GST`);
  if (locationSurcharge > 0) {
    const label =
      branch === "hamilton" ? "Waikato zone surcharge" : "Travel surcharge";
    lines.push(`${label}: $${locationSurcharge} + GST`);
  }
  if (stairsSurcharge > 0) {
    lines.push(
      `Stairs (${totalFlights} flight${totalFlights > 1 ? "s" : ""}): $${stairsSurcharge} + GST`,
    );
  }
  lines.push(`Total: $${totalExGst} + GST = $${totalIncGst} incl. GST`);

  return {
    branch,
    outOfAuckland,
    pianoType: input.pianoType,
    baseCostExGst: baseCost,
    locationSurchargeExGst: locationSurcharge,
    stairsSurchargeExGst: stairsSurcharge,
    totalExGst,
    totalIncGst,
    breakdown: lines.join("\n"),
  };
}

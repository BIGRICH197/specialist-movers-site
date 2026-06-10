import type { ParsedPlaceAddress } from "@/lib/parse-place-address";
import {
  TIER_2_SUBURBS,
  TIER_3_SUBURBS,
  AUCKLAND_OOA_KEYWORDS,
} from "@/lib/pricing-data";
import {
  HAMILTON_IN_AREA_KEYWORDS,
  HAMILTON_OOA_KEYWORDS,
} from "@/lib/hamilton-pricing-data";

export type ServiceAreaZone = "auckland" | "hamilton" | "outside" | "unrecognised";

const NZ_REGION_HINTS = [
  "auckland",
  "waikato",
  "bay of plenty",
  "canterbury",
  "wellington",
  "otago",
  "southland",
  "northland",
  "tasman",
  "nelson",
  "marlborough",
  "west coast",
  "manawatu",
  "whanganui",
  "hawke",
  "gisborne",
  "taranaki",
];

/** Overseas / non-service keywords — instant quote must never match these. */
const NON_NZ_KEYWORDS = [
  "australia",
  "sydney",
  "melbourne",
  "brisbane",
  "perth",
  "adelaide",
  "canberra",
  "hobart",
  "darwin",
  "queensland",
  "victoria",
  "new south wales",
  "united kingdom",
  "england",
  "scotland",
  "wales",
  "london",
  "united states",
  "america",
  "california",
  "singapore",
  "hong kong",
  "china",
  "india",
  "canada",
  "usa",
  "nsw",
];

/**
 * Auckland metro suburbs used for allowlist matching
 * (tier lists + suburbs that are in-area from the Auckland depot).
 */
const AUCKLAND_SUBURB_KEYWORDS = [
  ...TIER_2_SUBURBS,
  ...TIER_3_SUBURBS,
  "north shore",
  "waitakere",
  "waitākere",
  "manukau",
  "rodney",
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
  "devonport",
  "milford",
  "birkenhead",
  "henderson",
  "new lynn",
  "mt albert",
  "mount albert",
  "epsom",
  "greenlane",
  "ellerslie",
  "panmure",
  "pakuranga",
  "howick",
  "botany",
  "manurewa",
  "papatoetoe",
  "otahuhu",
  "onehunga",
  "mt wellington",
  "sylvia park",
  "ponsonby",
  "parnell",
  "grey lynn",
  "kingsland",
  "sandringham",
  "mt roskill",
  "avondale",
  "blockhouse bay",
  "titirangi",
  "te atatu",
];

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

function isNzRegion(region: string): boolean {
  const r = normalize(region);
  return NZ_REGION_HINTS.some((hint) => r.includes(hint));
}

function isBlockedNzTown(address: string): boolean {
  return suburbMatch(address, AUCKLAND_OOA_KEYWORDS);
}

function isHamiltonInArea(address: string): boolean {
  return suburbMatch(address, HAMILTON_IN_AREA_KEYWORDS);
}

function isHamiltonOOA(address: string): boolean {
  return suburbMatch(address, HAMILTON_OOA_KEYWORDS);
}

function isAucklandInArea(address: string, parsed?: ParsedPlaceAddress | null): boolean {
  if (isBlockedNzTown(address)) return false;
  if (isHamiltonInArea(address) && !normalize(address).includes("auckland")) {
    return false;
  }

  const region = normalize(parsed?.region ?? "");
  const city = normalize(parsed?.city ?? "");
  const addr = normalize(address);

  if (region.includes("auckland")) return true;
  if (city === "auckland") return true;
  if (addr.includes("auckland")) return true;
  if (suburbMatch(address, AUCKLAND_SUBURB_KEYWORDS)) return true;

  return false;
}

/**
 * Classify a single address into a service zone.
 * Defaults to unrecognised (fail-safe) unless we are confident it is in-area.
 */
export function classifyServiceArea(
  address: string,
  parsed?: ParsedPlaceAddress | null,
): ServiceAreaZone {
  const trimmed = address.trim();
  if (!trimmed) return "unrecognised";

  const addr = normalize(trimmed);

  if (NON_NZ_KEYWORDS.some((kw) => addr.includes(normalize(kw)))) {
    return "outside";
  }

  if (parsed) {
    const country = normalize(parsed.country ?? "");
    if (
      country &&
      !country.includes("new zealand") &&
      country !== "nz" &&
      country !== "nzl"
    ) {
      return "outside";
    }

    const region = normalize(parsed.region ?? "");
    if (region && !isNzRegion(region)) {
      return "outside";
    }

    if (
      region &&
      !region.includes("auckland") &&
      !region.includes("waikato") &&
      isBlockedNzTown(trimmed)
    ) {
      return "outside";
    }
  }

  if (isHamiltonInArea(trimmed)) {
    if (isHamiltonOOA(trimmed)) return "outside";
    return "hamilton";
  }

  if (isAucklandInArea(trimmed, parsed)) {
    return "auckland";
  }

  return "unrecognised";
}

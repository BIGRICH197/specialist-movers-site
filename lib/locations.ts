/**
 * Service areas, regions, suburbs, and Waikato towns.
 * Every entry here has a page at /locations/[slug].
 */

import { extraAucklandSuburbs, extraWaikatoTowns } from "@/lib/locations-extra";
import type { Location, LocationGroup } from "@/lib/location-types";

export type { Location, LocationGroup, LocationKind } from "@/lib/location-types";

const sharedServices =
  "House moves, piano transport, packing, office and commercial work, exit cleans, and hard-to-shift items.";

function suburbCopy(
  name: string,
  areaNote: string,
  parentRegionName: string,
): Pick<Location, "intro" | "paragraphs" | "highlights"> {
  return {
    intro: `We move homes and pianos in ${name} and nearby streets. Our Auckland crew plans access, parking, and timing before move day.`,
    paragraphs: [
      `${areaNote} We quote after a free in-home viewing when you need an accurate fixed price for a house move.`,
      `From our Wairau Valley depot we run ${name} jobs often, alongside wider ${parentRegionName} work. ${sharedServices}`,
      `Need a piano move in ${name}? We are trusted by Auckland music stores and handle uprights and grands with care.`,
    ],
    highlights: [
      "Free in-home viewing for house moves",
      "Fixed-price quotes when we have scoped the job",
      "Piano specialists, upright and grand",
      "Licensed and insured crews",
    ],
  };
}

const regions: Location[] = [
  {
    slug: "north-shore",
    name: "North Shore",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers North Shore Auckland",
    metaDescription:
      "House and piano movers on the North Shore. Specialist Movers, Silverdale to Devonport. Free quote. Auckland depot.",
    intro:
      "Regular North Shore work from Takapuna and Milford through to Albany and Silverdale. We plan ferry access, apartments, and driveway limits before your move.",
    paragraphs: [
      "Our Auckland base is in Wairau Valley, so North Shore jobs are a natural fit. We do house moves, piano transport, packing, and commercial runs across the Shore every week.",
      "Tight driveways, walk-up apartments, and villa steps are common here. We scope those at your free viewing so your quote matches the real job.",
      sharedServices,
    ],
    highlights: [
      "Daily North Shore runs from our Auckland depot",
      "Apartments, villas, and townhouses",
      "Piano moves for homes and music stores",
    ],
  },
  {
    slug: "central-auckland",
    name: "Central Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers Central Auckland",
    metaDescription:
      "Premium house and piano movers in central Auckland, Herne Bay, Ponsonby, Remuera, Parnell. Free quote. Specialist Movers.",
    intro:
      "Central suburbs mean character homes, apartments, and careful handling. We work in Herne Bay, Ponsonby, Remuera, and across the inner city.",
    paragraphs: [
      "Many of our residential moves are in central Auckland. We focus on clear communication, floor protection, and crews who treat your home with respect.",
      "Parking and building access need planning in the CBD fringe. We sort that at viewing so move day stays smooth.",
      sharedServices,
    ],
    highlights: [
      "Character homes and apartments",
      "Careful floor and doorway protection",
      "Trusted for high-value and piano moves",
    ],
  },
  {
    slug: "west-auckland",
    name: "West Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers West Auckland",
    metaDescription:
      "House and piano movers West Auckland, Henderson, New Lynn, Titirangi. Specialist Movers. Free quote.",
    intro:
      "West Auckland covers everything from Henderson and New Lynn out to Titirangi hillside homes. We quote properly for access and distance.",
    paragraphs: [
      "Hills, long driveways, and split-level homes are common in the west. We bring the right crew size and gear once we have seen the property.",
      "We also handle moves between West Auckland and other parts of the city, or longer relocations across New Zealand.",
      sharedServices,
    ],
    highlights: [
      "Hillside and split-level experience",
      "Local and long-distance moves",
      "Packing day before your move",
    ],
  },
  {
    slug: "south-auckland",
    name: "South Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers South Auckland",
    metaDescription:
      "Movers South Auckland, Manukau, Papakura, Drury, Pukekohe zone. House and piano moves. Specialist Movers.",
    intro:
      "South Auckland runs from Manukau and Papakura out toward Drury and the wider south. We check both ends of your move for fair pricing tiers.",
    paragraphs: [
      "Moves touching Papakura, Pukekohe, or outer south addresses can sit in a different pricing tier. We confirm pickup and dropoff when we quote.",
      "Our teams handle townhouses, family homes, and piano deliveries for retailers across the south.",
      sharedServices,
    ],
    highlights: [
      "Clear pricing for outer south zones",
      "Townhouses and family homes",
      "Piano and retail deliveries",
    ],
  },
  {
    slug: "east-auckland",
    name: "East Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers East Auckland",
    metaDescription:
      "House movers East Auckland, Howick, Mission Bay, Panmure. Specialist Movers Auckland. Free quote.",
    intro:
      "East Auckland includes coastal suburbs and growing residential areas. We plan for apartments, bungalows, and busy weekend roads.",
    paragraphs: [
      "From Mission Bay and St Heliers through to Howick and Panmure, we run east-side moves with the same careful process as the rest of Auckland.",
      "Coastal properties sometimes mean extra care for furniture and pianos going up steps or through tight hallways.",
      sharedServices,
    ],
    highlights: [
      "Coastal and hillside access",
      "Weekend and weekday scheduling",
      "Full packing and unpacking available",
    ],
  },
];

const suburbs: Location[] = [
  {
    slug: "takapuna",
    name: "Takapuna",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Takapuna",
    metaDescription: "House and piano movers in Takapuna. Specialist Movers North Shore. Free in-home viewing.",
    ...suburbCopy(
      "Takapuna",
      "Beachside apartments and office-adjacent homes mean lifts, stairs, and parking matter.",
      "North Shore",
    ),
  },
  {
    slug: "milford",
    name: "Milford",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Milford",
    metaDescription: "Milford movers, houses and pianos. Specialist Movers. North Shore Auckland.",
    ...suburbCopy("Milford", "Quiet streets and older homes often mean narrow hallways and careful piano placement.", "North Shore"),
  },
  {
    slug: "glenfield",
    name: "Glenfield",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Glenfield",
    metaDescription: "Glenfield house movers near our Wairau Valley depot. Piano moves. Free quote.",
    ...suburbCopy(
      "Glenfield",
      "Close to our Wairau Valley base, so Glenfield jobs are quick to schedule and easy to revisit for viewing.",
      "North Shore",
    ),
  },
  {
    slug: "albany",
    name: "Albany",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Albany",
    metaDescription: "Albany movers, townhouses and family homes. Specialist Movers Auckland.",
    ...suburbCopy("Albany", "Newer townhouses and family homes are common; we plan truck access and time slots with you.", "North Shore"),
  },
  {
    slug: "silverdale",
    name: "Silverdale",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Silverdale",
    metaDescription: "Silverdale and Hibiscus Coast movers. House and piano. Specialist Movers.",
    ...suburbCopy(
      "Silverdale",
      "North of the bridge, Silverdale and nearby coast suburbs are part of our regular North Shore schedule.",
      "North Shore",
    ),
  },
  {
    slug: "devonport",
    name: "Devonport",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Devonport",
    metaDescription: "Devonport movers, villas and apartments. Specialist Movers North Shore.",
    ...suburbCopy("Devonport", "Villa steps and village streets need a clear plan for parking and carrying distance.", "North Shore"),
  },
  {
    slug: "herne-bay",
    name: "Herne Bay",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Herne Bay",
    metaDescription: "Herne Bay house and piano movers. Premium careful moves. Specialist Movers.",
    ...suburbCopy("Herne Bay", "Premium villas and apartments, we protect floors and door frames as standard.", "central Auckland"),
  },
  {
    slug: "ponsonby",
    name: "Ponsonby",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Ponsonby",
    metaDescription: "Ponsonby movers, apartments and villas. Specialist Movers Auckland.",
    ...suburbCopy("Ponsonby", "Terraced homes and apartments mean stairs and tight turns; we scope that at viewing.", "central Auckland"),
  },
  {
    slug: "remuera",
    name: "Remuera",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Remuera",
    metaDescription: "Remuera movers, large homes and pianos. Specialist Movers. Free viewing.",
    ...suburbCopy("Remuera", "Larger homes and grand pianos are common; we bring experienced crews and proper equipment.", "central Auckland"),
  },
  {
    slug: "parnell",
    name: "Parnell",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Parnell",
    metaDescription: "Parnell house movers Auckland. Specialist Movers, careful, professional crews.",
    ...suburbCopy("Parnell", "Mix of apartments and character homes close to the city fringe.", "central Auckland"),
  },
  {
    slug: "mt-eden",
    name: "Mt Eden",
    searchTerms: ["Mount Eden"],
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Mt Eden",
    metaDescription: "Mt Eden movers, houses and apartments. Specialist Movers Auckland.",
    ...suburbCopy("Mt Eden", "Sloped streets and mixed housing; we confirm truck access when we visit.", "central Auckland"),
  },
  {
    slug: "henderson",
    name: "Henderson",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers Henderson",
    metaDescription: "Henderson house movers West Auckland. Specialist Movers. Free quote.",
    ...suburbCopy("Henderson", "Central West Auckland hub, good road links for local and cross-city moves.", "West Auckland"),
  },
  {
    slug: "titirangi",
    name: "Titirangi",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers Titirangi",
    metaDescription: "Titirangi movers, bush properties and hills. Specialist Movers West Auckland.",
    ...suburbCopy("Titirangi", "Bush sections and steep driveways need extra planning for large items and pianos.", "West Auckland"),
  },
  {
    slug: "new-lynn",
    name: "New Lynn",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers New Lynn",
    metaDescription: "New Lynn movers West Auckland. Apartments and houses. Specialist Movers.",
    ...suburbCopy("New Lynn", "Apartments near the town centre and suburban streets on the flats.", "West Auckland"),
  },
  {
    slug: "manukau",
    name: "Manukau",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Manukau",
    metaDescription: "Manukau movers South Auckland. House and commercial. Specialist Movers.",
    ...suburbCopy("Manukau", "Busy commercial and residential area, we schedule to avoid peak traffic where we can.", "South Auckland"),
  },
  {
    slug: "papakura",
    name: "Papakura",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Papakura",
    metaDescription: "Papakura movers, outer Auckland tier pricing explained upfront. Specialist Movers.",
    ...suburbCopy(
      "Papakura",
      "Outer south pricing may apply depending on your other address. We explain that clearly in your quote.",
      "South Auckland",
    ),
  },
  {
    slug: "drury",
    name: "Drury",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Drury",
    metaDescription: "Drury house movers South Auckland. Specialist Movers. Free quote.",
    ...suburbCopy("Drury", "Growing south corridor, new builds and family moves are common.", "South Auckland"),
  },
  {
    slug: "howick",
    name: "Howick",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Howick",
    metaDescription: "Howick movers East Auckland. House and piano. Specialist Movers.",
    ...suburbCopy("Howick", "Family homes and established streets east of the tamaki.", "East Auckland"),
  },
  {
    slug: "mission-bay",
    name: "Mission Bay",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Mission Bay",
    metaDescription: "Mission Bay movers, coastal homes. Specialist Movers Auckland.",
    ...suburbCopy("Mission Bay", "Coastal properties and apartment blocks near the waterfront.", "East Auckland"),
  },
  {
    slug: "panmure",
    name: "Panmure",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Panmure",
    metaDescription: "Panmure movers East Auckland. Specialist Movers, reliable crews.",
    ...suburbCopy("Panmure", "Central east location with good links across Auckland.", "East Auckland"),
  },
];

const towns: Location[] = [
  {
    slug: "hamilton",
    name: "Hamilton",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Hamilton",
    metaDescription:
      "Hamilton house and piano movers. Specialist Movers Hamilton base. Auckland and Waikato service.",
    intro:
      "Hamilton is our second base. We run daily work across Hamilton city and nearby towns, with Auckland crews when needed.",
    paragraphs: [
      "From student flats to family homes and commercial fit-outs, we plan Hamilton moves with the same viewing-first approach as Auckland.",
      "Piano moves between Hamilton and Auckland are a regular route for us. We handle uprights and grands with proper wrapping and crew experience.",
      "We also service Cambridge, Te Awamutu, Morrinsville, and wider Waikato when you need us.",
    ],
    highlights: [
      "Hamilton depot alongside Auckland",
      "House, piano, office, and commercial",
      "Moves between Hamilton and Auckland",
    ],
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Cambridge Waikato",
    metaDescription: "Cambridge movers, Waikato house and piano moves. Specialist Movers Hamilton base.",
    intro:
      "Cambridge and nearby Waikato towns are part of our regular Hamilton coverage. We quote travel and access clearly.",
    paragraphs: [
      "Lifestyle blocks and town homes around Cambridge need a proper viewing for accurate fixed pricing on house moves.",
      "We coordinate crews from Hamilton with clear arrival windows and the same communication you get in Auckland.",
      sharedServices,
    ],
    highlights: [
      "Serviced from our Hamilton base",
      "Clear quote after viewing",
      "Piano and house specialists",
    ],
  },
  {
    slug: "te-awamutu",
    name: "Te Awamutu",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Te Awamutu",
    metaDescription: "Te Awamutu movers Waikato. Specialist Movers. House and piano moves.",
    intro:
      "Te Awamutu moves are scheduled from Hamilton. We cover Waikato towns with the same careful crews and quoting process.",
    paragraphs: [
      "We visit before larger house moves so stairs, driveways, and volume are clear before we lock your price.",
      "Piano transport to and from Te Awamutu is available with specialist handling and shrink wrap.",
      sharedServices,
    ],
    highlights: [
      "Waikato scheduling from Hamilton",
      "In-home viewing for house moves",
      "Piano specialists",
    ],
  },
  {
    slug: "morrinsville",
    name: "Morrinsville",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Morrinsville",
    metaDescription: "Morrinsville Waikato movers. Specialist Movers Hamilton. Free quote.",
    intro:
      "Morrinsville sits in our Waikato patch from Hamilton. Call for house moves, pianos, and commercial work.",
    paragraphs: [
      "Town and rural properties around Morrinsville benefit from a viewing so we send the right truck and crew size.",
      "We keep you updated on timing from quote through to move day.",
      sharedServices,
    ],
    highlights: [
      "Waikato town coverage",
      "Fixed quotes after viewing",
      "Licensed and insured",
    ],
  },
];

function mergeLocations(...groups: Location[][]): Location[] {
  const bySlug = new Map<string, Location>();
  for (const group of groups) {
    for (const loc of group) {
      if (!bySlug.has(loc.slug)) bySlug.set(loc.slug, loc);
    }
  }
  return Array.from(bySlug.values());
}

const coreSuburbs = suburbs;
const coreTowns = towns;

export const allLocations: readonly Location[] = mergeLocations(
  regions,
  coreSuburbs,
  [...extraAucklandSuburbs],
  coreTowns,
  [...extraWaikatoTowns],
);

const bySlug = new Map(allLocations.map((l) => [l.slug, l]));

export function getLocation(slug: string): Location | undefined {
  return bySlug.get(slug);
}

export function getLocationSlugs(): string[] {
  return allLocations.map((l) => l.slug);
}

/** Header dropdown, regions + main Waikato towns (not every suburb) */
export const locationNavItems: readonly { label: string; href: string; group: LocationGroup }[] = [
  { label: "All areas we serve", href: "/locations", group: "auckland" },
  { label: "North Shore", href: "/locations/north-shore", group: "auckland" },
  { label: "Central Auckland", href: "/locations/central-auckland", group: "auckland" },
  { label: "West Auckland", href: "/locations/west-auckland", group: "auckland" },
  { label: "South Auckland", href: "/locations/south-auckland", group: "auckland" },
  { label: "East Auckland", href: "/locations/east-auckland", group: "auckland" },
  { label: "Hamilton", href: "/locations/hamilton", group: "waikato" },
  { label: "Cambridge", href: "/locations/cambridge", group: "waikato" },
  { label: "Te Awamutu", href: "/locations/te-awamutu", group: "waikato" },
  { label: "Morrinsville", href: "/locations/morrinsville", group: "waikato" },
  { label: "Matamata", href: "/locations/matamata", group: "waikato" },
];

export function getChildLocations(parentSlug: string): Location[] {
  return allLocations.filter((l) => l.parentSlug === parentSlug);
}

export type LocationHubGroup = {
  id: LocationGroup;
  title: string;
  regions: Location[];
  suburbs: Location[];
  towns: Location[];
};

/** Hub page columns */
export function getLocationHubGroups(): LocationHubGroup[] {
  const aucklandRegions = regions;
  const aucklandSuburbs = allLocations.filter(
    (l) => l.kind === "suburb" && l.group === "auckland",
  );
  const waikatoTowns = allLocations.filter(
    (l) => l.kind === "town" && l.group === "waikato",
  );

  return [
    {
      id: "auckland",
      title: "Auckland",
      regions: aucklandRegions,
      suburbs: aucklandSuburbs,
      towns: [],
    },
    {
      id: "waikato",
      title: "Waikato",
      regions: [],
      suburbs: [],
      towns: waikatoTowns,
    },
  ];
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function locationSearchBlob(loc: Location): string {
  const parent = loc.parentSlug ? bySlug.get(loc.parentSlug)?.name : "";
  const terms = loc.searchTerms?.join(" ") ?? "";
  return normalizeSearchText([loc.name, loc.slug.replace(/-/g, " "), parent, terms].join(" "));
}

/** Search, name, slug, parent region, aliases; supports short partial queries */
export function searchLocations(query: string): Location[] {
  const q = normalizeSearchText(query);
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = allLocations
    .map((loc) => {
      const blob = locationSearchBlob(loc);
      const slugNorm = normalizeSearchText(loc.slug.replace(/-/g, " "));

      let score = 0;
      if (blob.startsWith(q) || slugNorm.startsWith(q)) score += 100;
      if (blob.includes(q) || slugNorm.includes(q)) score += 50;
      for (const token of tokens) {
        if (token.length < 2) continue;
        if (blob.includes(token) || slugNorm.includes(token)) score += 20;
        if (loc.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(token))) score += 15;
      }
      return { loc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.loc.name.localeCompare(b.loc.name));

  return scored.map((x) => x.loc);
}

export function getNearbyLocations(location: Location, limit = 6): Location[] {
  if (location.kind === "region") {
    return getChildLocations(location.slug).slice(0, limit);
  }
  if (location.parentSlug) {
    const siblings = getChildLocations(location.parentSlug).filter((l) => l.slug !== location.slug);
    const parent = getLocation(location.parentSlug);
    return parent ? [parent, ...siblings].slice(0, limit) : siblings.slice(0, limit);
  }
  return towns.filter((t) => t.slug !== location.slug).slice(0, limit);
}

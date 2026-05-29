import type { Location } from "@/lib/location-types";

const sharedServices =
  "House moves, piano transport, packing, office and commercial work, exit cleans, and hard-to-shift items.";

export function slugifyLocationName(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function parentRegionName(parentSlug: string): string {
  const map: Record<string, string> = {
    "north-shore": "North Shore",
    "central-auckland": "central Auckland",
    "west-auckland": "West Auckland",
    "south-auckland": "South Auckland",
    "east-auckland": "East Auckland",
  };
  return map[parentSlug] ?? "Auckland";
}

export function createSuburb(
  name: string,
  parentSlug: string,
  areaNote?: string,
  searchTerms: string[] = [],
): Location {
  const slug = slugifyLocationName(name);
  const regionLabel = parentRegionName(parentSlug);
  const note =
    areaNote ??
    `We plan access, parking, and stairs for ${name} moves before move day.`;

  return {
    slug,
    name,
    kind: "suburb",
    group: "auckland",
    parentSlug,
    searchTerms: [name, slug, ...searchTerms],
    metaTitle: `Movers ${name}`,
    metaDescription: `${name} house and piano movers. Specialist Movers ${regionLabel}. Free quote.`,
    intro: `We move homes and pianos in ${name} and nearby streets. Our Auckland crew plans access, parking, and timing before move day.`,
    paragraphs: [
      `${note} We quote after a free in-home viewing when you need an accurate fixed price for a house move.`,
      `From our Wairau Valley depot we run ${name} jobs often, alongside wider ${regionLabel} work. ${sharedServices}`,
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

export function createTown(
  name: string,
  introNote: string,
  searchTerms: string[] = [],
): Location {
  const slug = slugifyLocationName(name);

  return {
    slug,
    name,
    kind: "town",
    group: "waikato",
    parentSlug: null,
    searchTerms: [name, slug, ...searchTerms],
    metaTitle: `Movers ${name} Waikato`,
    metaDescription: `${name} house and piano movers. Specialist Movers Hamilton base. Free quote.`,
    intro: `${introNote} We quote travel and access clearly from our Hamilton base.`,
    paragraphs: [
      `We visit before larger house moves in ${name} so stairs, driveways, and volume are clear before we lock your price.`,
      `Piano transport to and from ${name} is available with specialist handling and shrink wrap.`,
      sharedServices,
    ],
    highlights: [
      "Serviced from our Hamilton base",
      "In-home viewing for house moves",
      "Piano and house specialists",
      "Licensed and insured crews",
    ],
  };
}

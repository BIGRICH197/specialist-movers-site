/**
 * SEO meta descriptions informed by NZ Google keyword volume (June 2026).
 * Top terms: movers auckland, removalists auckland, moving company auckland,
 * furniture movers auckland, house removals auckland, office movers auckland,
 * piano movers auckland, movers and packers auckland.
 * Avoid budget terms (cheap, affordable) — premium positioning.
 */

/** Homepage + default layout description (~155 chars). */
export const homeMetaDescription =
  "Auckland movers and removalists. Home relocations, furniture removals, piano and commercial moves. Auckland and Hamilton bases. Free quote, callback in 15 minutes.";

/** /services/house-moving */
export const houseMovingMetaDescription =
  "Auckland furniture removalists and home movers. Viewing-first quotes, packing and piano. Trusted moving company. Free quote and callback in 15 minutes.";

/** Suburb / town fallback when no custom meta (≥120 chars). */
export function suburbMetaDescription(
  name: string,
  areaLabel: string,
  depot: "Auckland" | "Hamilton" = "Auckland",
): string {
  if (depot === "Hamilton") {
    return `${name} movers and furniture removalists. Home relocations and piano in ${areaLabel}. Specialist Movers Hamilton base. Free quote in 15 minutes.`;
  }
  return `${name} movers and furniture removalists. Home relocations and piano in ${areaLabel}. Specialist Movers Auckland. Free quote in 15 minutes.`;
}

/** Auckland region hub pages — match high-volume regional queries. */
export const regionMetaDescriptions: Record<string, string> = {
  "north-shore":
    "North Shore movers Auckland. Home relocations, furniture removals and piano from Silverdale to Devonport. Specialist Movers. Free quote in 15 minutes.",
  "central-auckland":
    "Central Auckland movers for home relocations and piano. Herne Bay, Ponsonby, Remuera and Parnell. Premium careful service. Free quote.",
  "west-auckland":
    "West Auckland movers and furniture removalists. Home relocations and piano across Henderson, New Lynn and Titirangi. Specialist Movers. Free quote.",
  "south-auckland":
    "South Auckland movers for home relocations and furniture removals. Manukau, Papakura and Drury. Specialist Movers. Free quote in 15 minutes.",
  "east-auckland":
    "East Auckland movers and furniture removalists. Home relocations and piano from Howick to Mission Bay. Specialist Movers. Free quote.",
  hamilton:
    "Hamilton movers and removalists. Home relocations, furniture removals and piano across the Waikato. Specialist Movers base. Free quote.",
};

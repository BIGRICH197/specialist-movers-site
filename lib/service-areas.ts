/**
 * Service schema areaServed presets for geo-split page pairs.
 *
 * ServiceJsonLd defaults to Auckland + Hamilton + Waikato, which is correct
 * for a page that genuinely serves all three. It is wrong for a pair of pages
 * deliberately split by region: /furniture-movers-auckland and
 * /furniture-movers-hamilton (and the retirement pair) have distinct visible
 * copy but would otherwise emit identically-scoped Service entities, which
 * works against the disambiguation the split exists to create.
 *
 * These live in their own module rather than in niche-service-pages.ts because
 * furniture-pages.ts needs them too, and niche-service-pages.ts already imports
 * furniture-pages.ts — a runtime import back the other way would be a cycle.
 */
export type ServiceArea = { "@type": string; name: string };

export const AUCKLAND_ONLY: ServiceArea[] = [
  { "@type": "City", name: "Auckland" },
];

export const WAIKATO_ONLY: ServiceArea[] = [
  { "@type": "City", name: "Hamilton" },
  { "@type": "AdministrativeArea", name: "Waikato" },
];

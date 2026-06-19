/**
 * Location pages we invest unique content in and let Google index.
 *
 * Everything NOT in this set (thin/templated long-tail suburbs and distant
 * out-of-area towns) is noindex'd and kept out of the sitemap, so a swarm of
 * near-duplicate pages can't drag down site quality. Promote a slug into this
 * set once its page has genuine, differentiated local content.
 */
export const INDEXED_LOCATION_SLUGS = new Set<string>([
  // Auckland regions (hub pages)
  "north-shore",
  "central-auckland",
  "west-auckland",
  "south-auckland",
  "east-auckland",
  // North Shore
  "takapuna",
  "albany",
  "devonport",
  // Central
  "ponsonby",
  "remuera",
  "mt-eden",
  "newmarket",
  // West
  "henderson",
  "titirangi",
  // South
  "manukau",
  "papakura",
  "pukekohe",
  // East
  "howick",
  "pakuranga",
  // Waikato core
  "hamilton",
  "cambridge",
  "te-awamutu",
  "morrinsville",
  "matamata",
]);

export function isIndexedLocation(slug: string): boolean {
  return INDEXED_LOCATION_SLUGS.has(slug);
}

/**
 * Location pages we invest unique content in and let Google index.
 *
 * Everything NOT in this set (thin/templated long-tail suburbs and distant
 * out-of-area towns) is noindex'd and kept out of the sitemap, so a swarm of
 * near-duplicate pages can't drag down site quality. Promote a slug into this
 * set once its page has genuine, differentiated local content.
 *
 * Focus: North Shore core (near the Glenfield depot) + wealthier isthmus
 * suburbs + Waikato towns near the Hamilton base. South Auckland is
 * deprioritised (low job volume).
 *
 * TODO — requested suburbs that have NO page yet (create + enrich, then add):
 *   Stanmore Bay, Greenhithe, Red Beach, Dairy Flat, Point Chevalier,
 *   West Harbour, Riverhead, Saint Johns, Glendowie
 */
export const INDEXED_LOCATION_SLUGS = new Set<string>([
  // Auckland region hubs
  "north-shore",
  "central-auckland",
  "west-auckland",
  "east-auckland",
  // North Shore (core, near depot)
  "glenfield",
  "birkenhead",
  "northcote",
  "hillcrest",
  "takapuna",
  "albany",
  "browns-bay",
  "long-bay",
  "torbay",
  "silverdale",
  "orewa",
  "greenhithe",
  "stanmore-bay",
  "red-beach",
  "dairy-flat",
  // Inner / West
  "grey-lynn",
  "mount-albert",
  "te-atat", // Te Atatū Peninsula
  "hobsonville",
  "titirangi",
  "point-chevalier",
  "west-harbour",
  "riverhead",
  // Central / East (affluent isthmus)
  "ponsonby",
  "herne-bay",
  "parnell",
  "remuera",
  "epsom",
  "mt-eden",
  "newmarket",
  "st-heliers",
  "st-johns",
  "glendowie",
  // Waikato (near Hamilton base)
  "hamilton",
  "cambridge",
  "te-awamutu",
  "morrinsville",
  "matamata",
  "huntly",
  "ngaruawahia",
  "raglan",
]);

export function isIndexedLocation(slug: string): boolean {
  return INDEXED_LOCATION_SLUGS.has(slug);
}

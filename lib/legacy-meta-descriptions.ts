/**
 * Meta descriptions from SEO team spreadsheet + live site (June 2026).
 */
export const legacyMetaDescriptions = {
  home:
    "Professional movers in Auckland and beyond. House, office, piano, and packing services from $120/hr. Quoted upfront, 7 days a week. Free quote.",
  "house-moving":
    "Auckland house movers with full packing service. Specialist Movers handles wrapping, loading, transport, and delivery. Free quote and callback in 15 minutes.",
  "office-moving":
    "Office movers in Auckland for desks, IT equipment, and full fit-outs. After-hours moves, SiteWise Gold certified. Minimal downtime. Free quote.",
  "commercial-moving":
    "Commercial movers in Auckland for office fit-outs, equipment, and business relocations. Trained crews, SiteWise Gold certified. Free quote.",
  "packing-services":
    "Professional house and office packing in Auckland with Specialist Movers. Our crew packs the day before your move. Cartons, wrap, and careful handling. Free quote.",
  "hard-to-shift":
    "Heavy item and furniture movers Auckland. Spa pools, safes, and hard-to-shift gear moved safely. Specialist Movers. Free quote and callback.",
  "cleaning-services":
    "Exit cleaning Auckland for tenancies and settlements. Fixed-price cleans alongside your move. Specialist Movers. Book online or get a fast quote.",
  "international-moving":
    "International movers in Auckland for overseas relocations. Sea and air freight, customs coordination, and door-to-door service. Free quote.",
  "loading-unloading":
    "Professional loading and unloading crews in Auckland from $300. Blankets and straps included, hourly pricing, 7 days a week. Call (021) 228 2728.",
  "winz-quotes":
    "Written moving quotes for WINZ and housing assistance applications in Auckland. Itemised pricing, site visits when needed, and fast turnaround. Call (021) 228 2728.",
  "piano-movers-auckland":
    "Auckland piano movers for upright and grand pianos. Trusted by North Shore and central Auckland music stores. Free quote and callback in 15 min.",
  "piano-movers":
    "Auckland and Hamilton piano movers for uprights and grands. Dedicated trucks, storage, and international shipping. Free quote in 15 minutes.",
  "apartment-movers-auckland":
    "Apartment movers in Auckland covering lifts, loading zones, and access codes. Specialist Movers plans every detail before move day. Free quote.",
  "retirement-home-movers-auckland":
    "Retirement home movers Auckland. Patient, careful village and rest-home relocations with full pack-and-move options. Specialist Movers. Free quote.",
  about:
    "Founded in 2023, Specialist Movers grew from weekend piano moves to trusted Auckland home and office crews. Meet Richard, Matthew, and the team behind the move.",
  contact:
    "Get a free quote from Specialist Movers in Auckland or Hamilton. Call (021) 228 2728 or fill out the form - callback usually within 15 minutes.",
  faq:
    "Moving and cleaning FAQs from Specialist Movers Auckland. Answers on quotes, packing, piano moves, and booking. Read before you move.",
  reviews:
    "Specialist Movers reviews. Hundreds of 5-star Google ratings for Auckland home relocations, piano, and commercial moves. See what customers say.",
  services:
    "House, commercial, international, and piano moves from our Auckland and Hamilton bases. Packing, storage, and exit cleaning. Free quote.",
  policies:
    "Specialist Movers privacy policy. How we protect your personal information under NZ privacy standards. Read our policy here.",
  storage:
    "Moving storage in Auckland for every situation - short-term, long-term, overnight, in transit, and piano storage. Secure holding. Free quote.",
  "house-moving-hamilton":
    "Hamilton house movers for flats, family homes, and lifestyle blocks. Viewing-first quotes, packing, piano, and storage. Waikato base. Free quote.",
  "location-hamilton":
    "Hamilton movers for house, office, and piano relocations. Local Waikato base covering Hamilton and surrounding areas. Free quote within 15 minutes.",
} as const;

export type LegacyMetaKey = keyof typeof legacyMetaDescriptions;

export function legacyMetaDescription(key: LegacyMetaKey): string {
  return legacyMetaDescriptions[key];
}

/** Legacy Yoast descriptions for /services/{slug} and legacy Auckland paths. */
const serviceSlugToLegacyKey: Partial<Record<string, LegacyMetaKey>> = {
  "house-moving": "house-moving",
  "office-moving": "office-moving",
  "commercial-moving": "commercial-moving",
  "packing-services": "packing-services",
  "hard-to-shift": "hard-to-shift",
  "cleaning-services": "cleaning-services",
  "international-moving": "international-moving",
  "loading-unloading": "loading-unloading",
  "winz-quotes": "winz-quotes",
  "piano-movers": "piano-movers-auckland",
  storage: "storage",
};

export function legacyMetaForServiceSlug(slug: string): string | undefined {
  const key = serviceSlugToLegacyKey[slug];
  return key ? legacyMetaDescriptions[key] : undefined;
}

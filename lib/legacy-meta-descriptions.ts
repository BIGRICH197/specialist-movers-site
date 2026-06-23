/**
 * Meta descriptions from live specialistmovers.co.nz (Yoast), June 2026.
 * Use verbatim on migrated URLs to preserve SEO.
 */
export const legacyMetaDescriptions = {
  home:
    "Auckland movers and removalists. Home relocations, furniture removals, piano and commercial moves. Auckland and Hamilton bases. Free quote, callback in 15 minutes.",
  "house-moving":
    "Auckland furniture removalists and home movers. Viewing-first quotes, packing and piano. Trusted moving company. Free quote and callback in 15 minutes.",
  "office-moving":
    "Office movers Auckland. Workplace and furniture relocations planned around your downtime. Specialist Movers. Free quote and callback in 15 minutes.",
  "commercial-moving":
    "Commercial movers Auckland for fit-outs, installs and business relocations. SiteWise Gold crews. Specialist Movers. Free quote today.",
  "packing-services":
    "Movers and packers Auckland. Professional packing the day before your move. Cartons, wrap, and careful handling. Free quote from Specialist Movers.",
  "hard-to-shift":
    "Heavy item and furniture movers Auckland. Spa pools, safes, and hard-to-shift gear moved safely. Specialist Movers. Free quote and callback.",
  "cleaning-services":
    "Exit cleaning Auckland for tenancies and settlements. Fixed-price cleans alongside your move. Specialist Movers. Book online or get a fast quote.",
  "international-moving":
    "International moving company Auckland. Secure relocations to and from New Zealand. Specialist Movers. Experienced crews. Free quote today.",
  "loading-unloading":
    "Loading and unloading Auckland. Expert furniture movers for truck hire and container deliveries. Specialist Movers. Careful handling. Free quote.",
  "winz-quotes":
    "WINZ home relocation quotes Auckland. Written scope and pricing for moving assistance applications. Specialist Movers. Fast follow-up. Free quote.",
  "piano-movers-auckland":
    "Piano movers Auckland for upright and grand pianos. Trusted by music stores. Dedicated piano trucks. Free quote and callback in 15 minutes.",
  "piano-movers":
    "Auckland and Hamilton piano movers for uprights and grands. Dedicated trucks, storage, and international shipping. Free quote in 15 minutes.",
  "apartment-movers-auckland":
    "Apartment movers Auckland. Lift access, body corporate rules, and tight stairwells planned before move day. Specialist Movers. Free quote.",
  "retirement-home-movers-auckland":
    "Retirement home movers Auckland. Patient, careful village and rest-home relocations with full pack-and-move options. Specialist Movers. Free quote.",
  about:
    "About Specialist Movers, Auckland and Hamilton removalists. NZ owned, SiteWise Gold, hundreds of 5-star reviews. Learn more and book with confidence.",
  contact:
    "Contact Specialist Movers, Auckland movers and removalists. Quick quotes for home relocations, piano, office and commercial moves. Callback in 15 minutes.",
  faq:
    "Moving and cleaning FAQs from Specialist Movers Auckland. Answers on quotes, packing, piano moves, and booking. Read before you move.",
  reviews:
    "Specialist Movers reviews. Hundreds of 5-star Google ratings for Auckland home relocations, piano, and commercial moves. See what customers say.",
  services:
    "Auckland moving company for home relocations, piano, commercial, packing, storage and exit cleaning. Specialist Movers. Free quote in 15 minutes.",
  policies:
    "Specialist Movers privacy policy. How we protect your personal information under NZ privacy standards. Read our policy here.",
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
};

export function legacyMetaForServiceSlug(slug: string): string | undefined {
  const key = serviceSlugToLegacyKey[slug];
  return key ? legacyMetaDescriptions[key] : undefined;
}

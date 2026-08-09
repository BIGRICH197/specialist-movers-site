/**
 * Meta descriptions from SEO team spreadsheet + live site (June 2026).
 *
 * Keep every entry under ~130 characters. Google truncates the SERP snippet at
 * roughly 920px, and at this copy's character density the originals (133-166
 * chars) were rendering at 1000px+ and losing their call to action mid-sentence.
 * The audit flagged 13 of these on the crawled pages alone.
 */
export const legacyMetaDescriptions = {
  home:
    "Auckland movers for house, office and piano. From $120/hr, quoted upfront, 7 days a week. Free quote in 15 minutes.",
  "house-moving":
    "Auckland house moving with full packing. We wrap, load, transport and deliver. Free quote and callback in 15 minutes.",
  "office-moving":
    "Auckland office movers for desks, IT and full fit-outs. After-hours moves, SiteWise Gold certified. Free quote.",
  "commercial-moving":
    "Auckland commercial movers for fit-outs, equipment and business relocations. SiteWise Gold certified. Free quote.",
  "packing-services":
    "Professional house and office packing in Auckland. Our crew packs the day before your move. Cartons and wrap included.",
  "hard-to-shift":
    "Spa pools, safes and heavy gear moved safely across Auckland. Hard-to-shift specialists. Free quote and callback.",
  "cleaning-services":
    "Exit cleaning in Auckland for tenancies and settlements. Fixed-price cleans alongside your move. Book online.",
  "international-moving":
    "International movers in Auckland. Sea and air freight, customs coordination and door-to-door service. Free quote.",
  "loading-unloading":
    "Loading and unloading crews in Auckland from $300. Blankets and straps included, hourly rates, 7 days a week.",
  "winz-quotes":
    "Written moving quotes for WINZ and housing assistance in Auckland. Itemised pricing, fast turnaround. Call (021) 228 2728.",
  "piano-movers-auckland":
    "Auckland piano movers for uprights and grands. Trusted by North Shore and central Auckland music stores. Free quote.",
  "piano-movers":
    "Auckland and Hamilton piano movers for uprights and grands. Dedicated trucks, storage and crating. Free quote.",
  "apartment-movers-auckland":
    "Auckland apartment movers who handle lifts, loading zones and access codes. Planned before move day. Free quote.",
  "retirement-home-movers-auckland":
    "Retirement village and rest-home moves in Auckland. Patient crews, full pack-and-move options. Free quote.",
  about:
    "Founded in 2023, Specialist Movers grew from weekend piano moves to trusted Auckland crews. Meet Richard, Matthew and the team.",
  contact:
    "Get a free quote from Specialist Movers in Auckland or Hamilton. Call (021) 228 2728 - callback usually within 15 minutes.",
  faq:
    "Moving and cleaning FAQs from Specialist Movers Auckland. Quotes, packing, piano moves and booking answered.",
  reviews:
    "Hundreds of 5-star Google reviews for Auckland home, piano and commercial moves. See what our customers say.",
  services:
    "House, commercial, international and piano moves from our Auckland and Hamilton bases. Packing and storage. Free quote.",
  policies:
    "Specialist Movers privacy policy. How we protect your personal information under NZ privacy standards. Read our policy here.",
  storage:
    "Moving storage in Auckland - short-term, long-term, overnight, in transit and piano. Secure holding. Free quote.",
  "house-moving-hamilton":
    "Hamilton home moving for flats, family homes and lifestyle blocks. Packing, piano and storage. Free quote.",
  "location-hamilton":
    "Hamilton movers for house, office and piano relocations. Waikato base covering Hamilton and surrounds. Free quote.",
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

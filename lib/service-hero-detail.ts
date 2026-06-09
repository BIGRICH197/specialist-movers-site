import { hero } from "@/lib/homepage-copy";

/** On-photo slogan (couch gag style) for service hero photos. */
export const serviceHeroOverlayCaptionBySlug: Record<string, string> = {
  "house-moving": hero.photoTagline,
  "office-moving": "You run the office. We move it.",
  "commercial-moving": "You run the business. We move it.",
  "piano-movers": "You play. We move.",
  "packing-services": "You rest. We pack.",
  "hard-to-shift": "Too heavy? We shift it.",
  "cleaning-services": "Keys handed over. We clean.",
  "international-moving": "You plan it. We ship it.",
  "loading-unloading": "You drive. We lift.",
  "winz-quotes": "Need paperwork? We quote.",
  storage: "Need time? We store it.",
  "local-moving": hero.photoTagline,
  "regional-moving": "Long haul. We handle it.",
  "short-term-storage": "Between homes? We hold it.",
  "long-term-storage": "Away for months? We store it.",
  "storage-in-transit": "On the road? We secure it.",
  "overnight-storage": "Multi-day move? We plan it.",
  "piano-storage": "You play later. We store.",
  "piano-tuning": "Out of tune? We fix it.",
  "grand-piano": "You play. We move.",
  "upright-piano": "You play. We move.",
  "international-piano": "You play. We move.",
};

export function getServiceHeroOverlayCaption(slug: string): string {
  return serviceHeroOverlayCaptionBySlug[slug] ?? hero.photoTagline;
}

/** Extra hero lines, pushes the photo down and adds context above the fold. */

const defaultDetail: readonly string[] = [
  "We scope access, volume, and timing before we quote, no surprises on move day.",
  "Written price confirmed upfront. Call back within 15 minutes, seven days a week.",
  "Auckland and Hamilton bases with crews across the Waikato daily.",
];

export const serviceHeroDetailBySlug: Record<string, readonly string[]> = {
  "house-moving": [
    "Free in-home viewing or a clear phone quote for your addresses and access.",
    "Packing, exit cleaning, and storage can be added to the same booking.",
    "Apartments, townhouses, and regional North Island routes, one company end to end.",
  ],
  "office-moving": [
    "Desks, IT, filing, and meeting rooms moved with lift access and parking planned in advance.",
    "After-hours and weekend office moves available to reduce staff downtime.",
    "Site visit when needed so your written quote matches the real scope.",
  ],
  "commercial-moving": [
    "Fit-outs, staging, printer and vending deliveries, and tenant relocations.",
    "SiteWise Gold crews who respect your site rules, parking, and install windows.",
    "We confirm crew size, gear, and access before the day, not when the truck arrives.",
  ],
  "piano-movers": [
    "Upright, baby grand, grand, and digital pianos, minimum three trained movers per job.",
    "Piano boards, shrink wrap, and quilted blankets on every move.",
    "Local runs, Hamilton to Auckland corridor, storage, and international crating when quoted.",
  ],
  "packing-services": [
    "Professional packers the day before your move with cartons, paper, and wrap supplied.",
    "Fixed price by bedroom count, kitchens, fragile items, and wardrobes handled room by room.",
    "Partial packs available when you only need breakables or selected rooms done.",
  ],
  "hard-to-shift": [
    "Spa pools, safes, gym gear, and oversized items scoped for weight, stairs, and access.",
    "Extra crew, dollies, and padding arranged before we quote, not added as a surprise.",
    "We have moved awkward items across Auckland and the Waikato for years.",
  ],
  "cleaning-services": [
    "Fixed-price exit cleans by bedrooms, bathrooms, and living rooms on our booking form.",
    "Kitchen, bathrooms, and living areas to tenancy inspection standard.",
    "Book around settlement or handover, Auckland, Hamilton, and Waikato towns.",
  ],
  "international-moving": [
    "Inventory, written quote, and confirmed dates before packing and export wrap.",
    "Sea freight, sole-use containers, and air freight explained for your load size.",
    "Storage in transit when collection and delivery dates do not line up.",
  ],
  "loading-unloading": [
    "Load-only, unload-only, or both, crew and truck with blankets and straps included.",
    "Ideal when you are driving or using a container but need experienced movers for the heavy work.",
    "Hourly pricing with a clear minimum call-out and crew size for your access.",
  ],
  "winz-quotes": [
    "Written quotes suitable for moving assistance applications.",
    "We visit when needed so volume and access are accurate on your paperwork.",
    "Fast follow-up, tell us your deadline when you request the quote.",
  ],
  storage: [
    "Short and long-term storage when settlement dates or renovations do not align.",
    "Careful collection, wrapping on intake, and delivery when your next date is ready.",
    "Piano storage handled by our Specialist Piano Movers team when required.",
  ],
  "local-moving": [
    "Walk-ups, lifts, and suburban driveways planned before move day.",
    "Crew labour, truck, blankets, and standard local travel included in your quote.",
    "Outer Auckland and Waikato zones priced clearly upfront.",
  ],
  "regional-moving": [
    "Auckland, Hamilton, Bay of Plenty, and Northland on our trucks, one company throughout.",
    "Travel, access, and overnight legs quoted before you confirm, no hidden fees.",
    "Blankets, wrap, and internal truck strapping standard on every regional load.",
  ],
  "short-term-storage": [
    "Bridges overlapping tenancies, we collect, wrap, and deliver when your next home is ready.",
    "Duration and volume confirmed in writing before goods are held.",
    "Same crews who packed you in can deliver you out.",
  ],
  "long-term-storage": [
    "Overseas postings, extended builds, and months between properties.",
    "Goods wrapped and inventoried on intake; delivery booked when you confirm your date.",
    "Retrieval visits available on agreed terms.",
  ],
  "storage-in-transit": [
    "Secure holding between multi-day regional legs, goods never left unattended.",
    "Planned and priced before move day when a route cannot finish in one shift.",
    "One accountable company from pickup through to final delivery.",
  ],
  "overnight-storage": [
    "Multi-day moves when distance, access, or crew hours need a planned overnight stop.",
    "Goods secured between crew shifts, not left on a truck unattended.",
    "Overnight legs included in your written quote upfront.",
  ],
  "piano-storage": [
    "Specialist piano holding, not generic household locker storage.",
    "Padded blankets, shrink wrap, and climate-aware handling on collection and return.",
    "Short and long-term options when settlement or international timing does not align.",
  ],
};

export function getServiceHeroDetail(slug: string): readonly string[] {
  return serviceHeroDetailBySlug[slug] ?? defaultDetail;
}

export const serviceHeroSubline =
  "Free quote · We call back within 15 minutes · 7 days a week";

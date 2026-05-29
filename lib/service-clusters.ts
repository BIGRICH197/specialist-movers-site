import type { JobType } from "@/lib/site-data";

export type ServiceClusterItem = {
  slug: string;
  title: string;
  /** Card / meta description */
  excerpt: string;
  /** Hero paragraph */
  description: string;
  includedBullets: readonly string[];
  whyChooseCopy: string;
  relatedSlugs: readonly string[];
  defaultJobType: JobType;
  /** Override path when not under cluster base (e.g. piano storage) */
  href?: string;
};

export const movingDistanceHub = {
  path: "/services/moving",
  eyebrow: "Moving by distance",
  title: "Local, regional, and international moves",
  description:
    "Same careful crews whether you are moving across Auckland, between Auckland and Hamilton, or heading overseas or between islands. Choose the move type that matches your job, then request a quote.",
} as const;

export const movingDistanceServices: readonly ServiceClusterItem[] = [
  {
    slug: "local-moving",
    title: "Local moving Auckland & Waikato",
    excerpt:
      "Same-day and short-notice house moves across Auckland suburbs and Hamilton. Day rates, clear call-out, and crews who know local access.",
    description:
      "Local moves are our bread and butter: apartments, townhouses, and family homes across Auckland and the Waikato. We plan parking, stairs, and lift access before move day so your crew arrives ready. Packing, storage, and specialty items can be added to the same job.",
    includedBullets: [
      "Auckland and Hamilton metro moves, suburbs, apartments, and houses",
      "Careful furniture handling, blankets, and floor protection",
      "Trucks sized for your home, from smaller loads to full house moves",
      "Optional packing the day before, unpacking, and exit cleaning",
      "Transparent day-rate pricing with call-out explained up front",
    ],
    whyChooseCopy:
      "We are not a gig-economy app. You get trained crews, SiteWise Gold systems, and hundreds of 5-star reviews. Local does not mean rushed. It means we know Auckland and Waikato access and get it right the first time.",
    relatedSlugs: ["house-moving", "packing-services", "regional-moving"],
    defaultJobType: "House Move",
  },
  {
    slug: "regional-moving",
    title: "Regional moving, Auckland, Waikato & beyond",
    excerpt:
      "Moves between Auckland and Hamilton, Waikato towns, Bay of Plenty, and Northland. One company from pickup to delivery. We do not hand off your load.",
    description:
      "Regional moves cover the gap between a local day move and an international relocation. Think Auckland to Hamilton, Tauranga, or Whangārei, or Waikato to Auckland. Your goods stay on our trucks with the same crew standards, communication, and care as a local job.",
    includedBullets: [
      "Auckland ↔ Hamilton and Waikato corridor moves",
      "Bay of Plenty, Northland, and wider upper North Island when quoted",
      "Single company, no broker handoffs mid-route",
      "Timing and access planned for both ends of the journey",
      "Packing, piano, and storage available on the same quote",
    ],
    whyChooseCopy:
      "Mid-distance moves fail when communication breaks between teams. We run the job end to end from our Auckland and Hamilton bases, with clear ETAs and one point of contact.",
    relatedSlugs: ["house-moving", "international-moving", "packing-services"],
    defaultJobType: "House Move",
  },
  {
    slug: "international-moving",
    title: "International moving",
    excerpt:
      "Overseas relocations and moves between North and South Island. Planning, packing coordination, and clear timing from quote to delivery.",
    description:
      "When your move crosses borders or islands, we coordinate planning, packing, transit, and delivery with the same care standards as our local work. Furniture, household goods, and delicate items are handled by experienced crews with clear communication throughout.",
    includedBullets: [
      "International destinations and inter-island relocations",
      "Careful planning and packaging coordination",
      "Clear communication around timing and logistics",
      "Reliable handling for furniture and delicate items",
      "Storage in transit when dates do not line up",
    ],
    whyChooseCopy:
      "International moves need reliability and one point of contact. We plan the job properly, keep you updated, and deliver with the care your home contents deserve.",
    relatedSlugs: ["house-moving", "packing-services", "regional-moving"],
    defaultJobType: "House Move",
    href: "/services/international-moving",
  },
] as const;

export const storageHub = {
  path: "/services/storage",
  eyebrow: "Storage while you move",
  title: "Flexible storage options",
  description:
    "Gap between settlement dates, renovations, or a long-distance leg? We store household goods and pianos securely until you are ready, short stays or longer term.",
} as const;

export const storageServices: readonly ServiceClusterItem[] = [
  {
    slug: "short-term-storage",
    title: "Short-term storage",
    excerpt:
      "Bridge the gap between homes, no long minimum stay. Ideal when settlement dates do not align or you need a few weeks between properties.",
    description:
      "Short-term storage keeps your move flexible. We collect, inventory, and store your goods securely, then deliver when your next place is ready. Common for overlapping tenancies, renovations, and staged moves across Auckland and the Waikato.",
    includedBullets: [
      "Flexible duration, weeks, not years required",
      "Careful pickup, wrapping, and inventory on entry",
      "Delivery back to your new address when you are ready",
      "Can combine with packing and house moving on one plan",
    ],
    whyChooseCopy:
      "Timing stress is what makes moves feel chaotic. Short-term storage with the same team that moves you means fewer handoffs and clearer accountability.",
    relatedSlugs: ["house-moving", "packing-services", "long-term-storage"],
    defaultJobType: "House Move",
  },
  {
    slug: "long-term-storage",
    title: "Long-term storage",
    excerpt:
      "Secure storage for extended periods, overseas postings, extended builds, or when you need your goods held safely for months.",
    description:
      "When you need storage beyond a few weeks, we keep your items protected and accessible on agreed terms. Household furniture, boxes, and selected specialty items. Piano storage is handled by our piano team with dedicated processes.",
    includedBullets: [
      "Months-long storage for furniture and boxed goods",
      "Protected handling on intake and return delivery",
      "Clear access and retrieval arrangements",
      "Works alongside international and inter-island moves",
    ],
    whyChooseCopy:
      "Your belongings should be stored by movers who understand how they were packed and how they need to come out again, not a generic locker with no context.",
    relatedSlugs: ["short-term-storage", "regional-moving", "piano-storage"],
    defaultJobType: "House Move",
  },
  {
    slug: "storage-in-transit",
    title: "Storage in transit",
    excerpt:
      "Your load is secured between legs of a longer move, ideal for North Island relocations when delivery cannot happen the same day.",
    description:
      "Storage in transit supports long-distance and regional jobs where overnight or multi-day routing is required. Goods stay accounted for between pickup, transit, and final delivery rather than double-handling through unknown third parties.",
    includedBullets: [
      "Secured holding between move legs",
      "Suited to intercity and North Island routes",
      "Same crew standards at pickup and delivery",
      "Coordinated with your delivery window",
    ],
    whyChooseCopy:
      "Long routes need a plan for where the truck and your goods sit overnight. We build that into the quote so you are not solving logistics at the last minute.",
    relatedSlugs: ["international-moving", "regional-moving", "overnight-storage"],
    defaultJobType: "House Move",
  },
  {
    slug: "overnight-storage",
    title: "Overnight storage",
    excerpt:
      "When the move spans two days or the truck secures overnight, your goods stay protected until the crew completes delivery.",
    description:
      "Some jobs cannot finish in a single day, distance, access windows, or building rules. Overnight storage keeps your load secured between move days with monitored handling rather than leaving items unattended.",
    includedBullets: [
      "Multi-day moves across Auckland, Waikato, and further afield",
      "Secure overnight holding between crew shifts",
      "Planned as part of your quote, no surprise add-ons",
      "Pairs with regional and international moving",
    ],
    whyChooseCopy:
      "Overnight legs should be planned before move day, not improvised. We schedule them so you know where your goods are and when they arrive.",
    relatedSlugs: ["storage-in-transit", "regional-moving", "house-moving"],
    defaultJobType: "House Move",
  },
  {
    slug: "piano-storage",
    title: "Piano storage",
    excerpt:
      "Safe piano storage when timing changes, upright and grand pianos with specialist handling.",
    description:
      "When your piano cannot go straight to its new home, our piano team stores it with protective handling and the right equipment. Trusted by Auckland music retailers for collection, storage transitions, and delivery.",
    includedBullets: [
      "Upright and grand piano storage planning",
      "Protective handling during pickup and return delivery",
      "Specialist crew and equipment, not general household storage only",
      "Coordinates with piano moves and regional relocations",
    ],
    whyChooseCopy:
      "Pianos are not standard furniture. Storage should be planned by people who move them every week.",
    relatedSlugs: ["grand-piano", "upright-piano", "piano-movers"],
    defaultJobType: "Piano Move",
    href: "/piano-movers/piano-storage",
  },
] as const;

export type MoveInclusionCategory = {
  id: string;
  title: string;
  intro?: string;
  bullets: readonly string[];
};

export const whatsIncludedPage = {
  path: "/services/whats-included",
  eyebrow: "The Specialist Movers standard",
  title: "What's included in every move",
  lead:
    "Premium moving means knowing what you are paying for before move day. These are the standards our crews bring to local, regional, and long-distance jobs across Auckland and the Waikato.",
  asideTitle: "Clear quotes, no surprises",
  asideBody:
    "Your written quote sets out labour, transport, and any add-ons (packing, cleaning, storage, specialty items). If access is unusual, stairs, long carries, or tight parking, we flag it when we quote, not on the invoice.",
} as const;

export const moveInclusionCategories: readonly MoveInclusionCategory[] = [
  {
    id: "wrapping",
    title: "Wrapping and protection",
    intro: "Furniture and fragile items are protected for transit as standard on full moves.",
    bullets: [
      "Moving blankets and wrap for furniture",
      "Mattress protectors available upon request",
      "Flat screens and fragile items packed safely",
      "Standard paintings and small mirrors. Ask us about oversized or high-value pieces",
    ],
  },
  {
    id: "disassembly",
    title: "Disassembly and reassembly",
    bullets: [
      "Beds, tables, and modular furniture taken apart and reassembled where safe",
      "Care taken with hardware, bags labelled for your new room",
      "Specialist items (pianos, spa pools, commercial gear) quoted separately",
    ],
  },
  {
    id: "transport",
    title: "Labour, truck, and local travel",
    bullets: [
      "Crew labour and truck for your quote",
      "Local travel and standard route costs included in day-rate quotes",
      "Call-out and tier explained when you book, Auckland vs outer zones",
      "Tolls on longer regional jobs included when quoted",
    ],
  },
  {
    id: "safety",
    title: "Safety and professionalism",
    bullets: [
      "SiteWise Gold health and safety systems",
      "Trained crews, not casual labour",
      "Licensed and insured operations",
      "Clear communication from quote to handover",
    ],
  },
  {
    id: "optional",
    title: "Popular add-ons (quoted separately)",
    bullets: [
      "Full packing and unpacking, packers come in the day before",
      "Exit cleaning, fixed-price tenancy cleans",
      "Storage, short-term, long-term, in transit, and overnight",
      "Piano, commercial, and hard-to-shift specialist moves",
    ],
  },
] as const;

export function getMovingDistanceService(slug: string) {
  return movingDistanceServices.find((s) => s.slug === slug);
}

export function getStorageService(slug: string) {
  return storageServices.find((s) => s.slug === slug);
}

export function clusterItemPath(
  basePath: string,
  item: ServiceClusterItem
): string {
  return item.href ?? `${basePath}/${item.slug}`;
}

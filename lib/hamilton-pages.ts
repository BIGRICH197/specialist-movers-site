/**
 * Hamilton service pages, separate URLs with unique copy (SEO).
 * Pattern: /services/{service}-hamilton, /piano-movers/hamilton
 */
import type { JobType } from "@/lib/site-data";
import type { ProcessStep } from "@/components/ProcessStepsGrid";
import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import { enrichHamiltonPageConfig } from "@/lib/hamilton-seo";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import { hardToShiftPageHeroPhoto } from "@/lib/hard-to-shift-gallery";
import { sitePhotos } from "@/lib/site-photos";

export const HAMILTON_SUFFIX = "-hamilton" as const;

export type HamiltonPageConfig = {
  baseSlug: string;
  path: string;
  parentHref: string;
  parentLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  paragraphs: readonly string[];
  highlightCards: readonly { title: string; body: string }[];
  includedBullets: readonly string[];
  whyChooseCopy: string;
  faqs?: readonly { q: string; a: string }[];
  processTitle?: string;
  processSteps?: readonly ProcessStep[];
  defaultJobType: JobType;
  heroPhoto: string;
  heroPhotoAlt: string;
  showPianoPartners?: boolean;
  showPianoGallery?: boolean;
  locationHref: string;
  locationLabel: string;
  /** Optional links below FAQs (e.g. Moving to Australia under international). */
  extraLinks?: readonly { label: string; href: string }[];
};

export const hamiltonBaseSlugs = [
  "piano-movers",
  "house-moving",
  "office-moving",
  "commercial-moving",
  "packing-services",
  "hard-to-shift",
  "cleaning-services",
  "international-moving",
  "loading-unloading",
  "winz-quotes",
  "storage",
] as const;

export type HamiltonBaseSlug = (typeof hamiltonBaseSlugs)[number];

export function isHamiltonServiceSlug(slug: string): boolean {
  return slug.endsWith(HAMILTON_SUFFIX) && getHamiltonBaseSlug(slug) !== null;
}

export function getHamiltonBaseSlug(slug: string): HamiltonBaseSlug | null {
  if (!slug.endsWith(HAMILTON_SUFFIX)) return null;
  const base = slug.slice(0, -HAMILTON_SUFFIX.length);
  return (hamiltonBaseSlugs as readonly string[]).includes(base)
    ? (base as HamiltonBaseSlug)
    : null;
}

export function hamiltonPath(base: HamiltonBaseSlug): string {
  if (base === "piano-movers") return "/piano-movers/hamilton";
  return `/services/${base}${HAMILTON_SUFFIX}`;
}

export function listHamiltonPaths(): string[] {
  return hamiltonBaseSlugs.map(hamiltonPath);
}

const hamiltonPages: Record<HamiltonBaseSlug, Omit<HamiltonPageConfig, "baseSlug" | "path">> = {
  "piano-movers": {
    parentHref: "/piano-movers",
    parentLabel: "Piano moving",
    metaTitle: "Piano moving Hamilton | Specialist Piano Movers",
    metaDescription:
      "Hamilton piano movers for upright and grand pianos. Waikato base, Auckland routes, storage and crating. Free quote within 15 minutes.",
    h1: "Piano movers Hamilton",
    lead:
      "Hamilton is our second base for piano work. We move uprights and grands across the city, Cambridge, and wider Waikato, and we run regular Hamilton to Auckland routes for families and music stores.",
    paragraphs: [
      "Specialist Piano Movers operates from Hamilton with the same dedicated crews, piano trucks, and equipment you get in Auckland. We never send fewer than three trained movers on a standard piano job.",
      "Student flats, character homes, and rural driveways around Hamilton need planning before move day. Tell us your piano type, both addresses, and any stairs or tight turns. We confirm crew size and price up front.",
      "Piano moves between Hamilton and Auckland are a weekly route for us. Music schools, retailers, and private owners trust us for shrink wrap, piano boards, and specialist transport insurance when you need it.",
      "Short-term piano storage is available from our Hamilton coordination when settlement dates do not line up. We handle collection, secure holding, and delivery when you are ready.",
    ],
    highlightCards: [
      {
        title: "Waikato base",
        body: "Local Hamilton crews with clear travel quotes for Cambridge, Morrinsville, and nearby towns.",
      },
      {
        title: "Auckland corridor",
        body: "Regular Hamilton to Auckland and return runs with one company end to end.",
      },
      {
        title: "Grand and upright",
        body: "Legs, pedals, and lid prep for grands. Custom dollies and straps for uprights in tight access.",
      },
      {
        title: "Insured specialists",
        body: "Specialist transport insurance options. Hundreds of 5-star reviews across the North Island.",
      },
    ],
    includedBullets: [
      "Upright, baby grand, grand, and digital pianos",
      "Hamilton city, Cambridge, and Waikato towns",
      "Hamilton to Auckland and return routes",
      "Piano boards, shrink wrap, and quilted blankets",
      "Minimum three trained movers per job",
      "Piano storage and international crating when quoted",
    ],
    whyChooseCopy:
      "Pianos are not furniture. Our Hamilton team moves instruments every week with route planning for stairs, rural access, and long-distance legs. You get clear pricing and updates from pickup to placement.",
    faqs: [
      {
        q: "Do you move pianos from Hamilton to Auckland?",
        a: "Yes. It is one of our most common routes. We quote both addresses, stairs at each end, and confirm timing before move day.",
      },
      {
        q: "How much does a piano move cost in Hamilton?",
        a: "Local Hamilton upright moves start from $300 excl. GST. Grands, stairs, and longer routes cost more. Call or use the form for a clear quote.",
      },
      {
        q: "Will my piano need tuning after the move?",
        a: "Allow 2 to 3 weeks for the piano to settle after humidity changes, then book your tuner.",
      },
    ],
    defaultJobType: "Piano Move",
    heroPhoto: sitePhotos.pianoMove,
    heroPhotoAlt: "Specialist Piano Movers crew with a wrapped piano in Hamilton",
    showPianoPartners: true,
    showPianoGallery: true,
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton and Waikato areas",
  },

  "house-moving": {
    parentHref: "/services/house-moving",
    parentLabel: "Auckland Moving Company",
    metaTitle: "Hamilton Moving Company | Specialist Movers",
    metaDescription:
      "Hamilton movers and removalists. Home relocations, furniture removals, packing and piano. Waikato base. Free quote in 15 minutes.",
    h1: "Hamilton Moving Company",
    lead:
      "Moving house in Hamilton or the wider Waikato? Our local base plans every job with a viewing-first approach so your quote matches stairs, driveways, and volume before we lock the price.",
    paragraphs: [
      "From Hillcrest and Hamilton East through to Rototuna and rural lifestyle blocks, we run Waikato home relocations every week. Apartments, townhouses, and full home relocations are all in scope.",
      "Relocating between Hamilton and Auckland? We coordinate one crew and one timeline instead of handing your load to a third party mid-route. Packing, piano transport, exit cleans, and storage can sit on the same plan.",
      "Larger homes benefit from a free in-home viewing so we send the right truck and crew size. You get SiteWise Gold systems, licensed crews, and the same communication standards as our Auckland work.",
    ],
    highlightCards: [
      {
        title: "Viewing-first quotes",
        body: "Fixed-price home relocations when we have scoped access, volume, and parking at both ends.",
      },
      {
        title: "Waikato know-how",
        body: "Familiar with Hamilton CBD access, hill sections, and rural driveways across the region.",
      },
      {
        title: "Inter-city moves",
        body: "Hamilton to Auckland and beyond with clear ETAs and one point of contact.",
      },
      {
        title: "Full service",
        body: "Packing the day before, piano moves, exit cleaning, and storage when you need them.",
      },
    ],
    includedBullets: [
      "Residential moves across Hamilton city and Waikato towns",
      "Apartments, townhouses, and lifestyle properties",
      "Furniture protection, blankets, and careful loading",
      "Hamilton to Auckland corridor moves",
      "Optional packing, unpacking, and exit cleaning",
      "Secure storage when settlement dates slip",
    ],
    whyChooseCopy:
      "Hamilton moves fail when travel and access are guessed. We visit when needed, explain call-out and day rates clearly, and keep you updated from quote to handover.",
    defaultJobType: "Home Move",
    heroPhoto: sitePhotos.homeHero,
    heroPhotoAlt:
      "Specialist Movers carrying a sofa while the client relaxes and reads a magazine",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton and nearby towns",
  },

  "office-moving": {
    parentHref: "/services/office-moving",
    parentLabel: "Office movers Auckland",
    metaTitle: "Office Movers Hamilton | Specialist Movers",
    metaDescription:
      "Hamilton office and workplace relocations. After-hours moves, IT and desk handling, minimal downtime. Waikato base. Free quote.",
    h1: "Office movers Hamilton",
    lead:
      "Office relocations in Hamilton need lift bookings, parking plans, and tight timelines. We move clinics, agencies, warehouses, and corporate floors from our Waikato base with after-hours slots when you need them.",
    paragraphs: [
      "Hamilton CBD fringe, Te Rapa industrial, and suburban business parks all need different access plans. We walk the site before move day so desks, IT, and filing move in the right order.",
      "Weekend and evening moves reduce downtime for staff. We protect workstations, coordinate with building managers, and hand over a ready-to-work floor where we can.",
      "Multi-site or Hamilton to Auckland office moves are quoted with clear scope, crew size, and arrival windows so your team knows what to expect.",
    ],
    highlightCards: [
      {
        title: "Less downtime",
        body: "After-hours and weekend Hamilton office moves when business hours are too disruptive.",
      },
      {
        title: "IT-aware crews",
        body: "Desks, monitors, and fragile equipment handled with floor and doorway protection.",
      },
      {
        title: "Building access",
        body: "Lifts, loading zones, and tenant rules sorted before the truck arrives.",
      },
      {
        title: "One contact",
        body: "Single coordinator from walkthrough to handover across the Waikato.",
      },
    ],
    includedBullets: [
      "Office and workplace relocations in Hamilton and Waikato towns",
      "Desks, chairs, meeting rooms, and filing",
      "IT equipment and fragile items",
      "After-hours and weekend scheduling",
      "Hamilton to Auckland office moves when quoted",
    ],
    whyChooseCopy:
      "Your team should be back at work, not chasing movers. We plan Hamilton office jobs properly and communicate clearly when things change.",
    defaultJobType: "Office Move",
    heroPhoto: sitePhotos.officeMove,
    heroPhotoAlt: "Office relocation crew Specialist Movers Hamilton",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton service area",
  },

  "commercial-moving": {
    parentHref: "/services/commercial-moving",
    parentLabel: "Commercial movers Auckland",
    metaTitle: "Commercial Movers Hamilton | Specialist Movers",
    metaDescription:
      "Hamilton commercial fit-outs, equipment deliveries, and tenant moves. Trained crews, SiteWise Gold. Waikato contractors. Free quote.",
    h1: "Commercial movers Hamilton",
    lead:
      "Commercial work in Hamilton includes fit-outs, staging, printer and vending deliveries, and tenant relocations. We plan parking, access, and crew size from our Waikato base so install days stay on track.",
    paragraphs: [
      "Retail, light industrial, and trade clients around Te Rapa and Frankton need reliable contractors who show up on time with the right crew and equipment. We work to your schedule, not the other way around.",
      "Auckland crews support larger Waikato projects when you need extra capacity. One company, clear communication, SiteWise Gold safety systems.",
      "Tight timelines and specialist equipment are normal for us. Tell us what is moving, where it is going, and any building rules we need to follow.",
    ],
    highlightCards: [
      {
        title: "Fit-outs and installs",
        body: "Cabinetry, fixtures, and staged deliveries across Hamilton commercial sites.",
      },
      {
        title: "Equipment runs",
        body: "Printers, vending, and bulky commercial items with careful handling.",
      },
      {
        title: "Tenant moves",
        body: "Whole-floor or partial relocations with minimal disruption to neighbours.",
      },
      {
        title: "SiteWise Gold",
        body: "Audited health and safety for commercial clients who expect compliance up front.",
      },
    ],
    includedBullets: [
      "Commercial fit-outs and tenant relocations",
      "Printer, vending, and specialist equipment",
      "Hamilton industrial and retail sites",
      "Coordination with facilities and installers",
      "Auckland backup crews for larger Waikato jobs",
    ],
    whyChooseCopy:
      "Commercial jobs in Hamilton need predictability. We quote scope clearly and turn up with trained crews who treat your site with respect.",
    defaultJobType: "Commercial Move",
    heroPhoto: sitePhotos.commercialHero,
    heroPhotoAlt: "Commercial movers loading a truck Specialist Movers Waikato",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton and Waikato",
  },

  "packing-services": {
    parentHref: "/services/packing-services",
    parentLabel: "Packing services Auckland",
    metaTitle: "Packing Services Hamilton | Specialist Movers",
    metaDescription:
      "Professional packing and unpacking in Hamilton and the Waikato. Quality materials, furniture wrap, day-before pack. Free quote.",
    h1: "Packing services Hamilton",
    lead:
      "Hamilton packing teams help before a local move or a Hamilton to Auckland relocation. Packers come in the day before your move when you book a full pack, with quality materials and the same care standards as Auckland.",
    paragraphs: [
      "Kitchens, fragile items, and wardrobe boxes need proper technique, not speed for its own sake. We label clearly so unpacking at your new Waikato or Auckland address stays organised.",
      "Partial packs are available when you only need help with breakables or a few rooms. We can combine packing with your relocation on one quote.",
      "Fixed-scope packing quotes after we understand volume, access, and your move date.",
    ],
    highlightCards: [
      {
        title: "Day-before pack",
        body: "Full home packs scheduled the day before move day so the truck loads efficiently.",
      },
      {
        title: "Quality materials",
        body: "Moving blankets, bubble wrap, and sturdy cartons for Waikato moves.",
      },
      {
        title: "Unpack option",
        body: "Help settling into your new Hamilton or inter-city home faster.",
      },
      {
        title: "With your move",
        body: "One company for pack, move, and unpack reduces handoffs and confusion.",
      },
    ],
    includedBullets: [
      "Professional packing and unpacking in Hamilton",
      "Fragile and kitchen specialist packing",
      "Furniture disassembly support",
      "Packing for Hamilton to Auckland relocations",
      "Materials supplied on full pack jobs",
    ],
    whyChooseCopy:
      "Bad packing causes damage and stress. Our Hamilton packers use proven methods so your belongings arrive the way they left.",
    defaultJobType: "Packing",
    heroPhoto: sitePhotos.packing,
    heroPhotoAlt: "Packing team Specialist Movers Hamilton",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton region",
  },

  "hard-to-shift": {
    parentHref: "/services/hard-to-shift",
    parentLabel: "Hard to shift Auckland",
    metaTitle: "Hard to Shift Items Hamilton | Specialist Movers",
    metaDescription:
      "Spa pools, bathtubs, saunas, and bulky items in Hamilton and the Waikato. Specialist gear and planning. Free quote and callback in 15 minutes.",
    h1: "Hard to shift items Hamilton",
    lead:
      "Spa pools, bathtubs, oversized furniture, and awkward access jobs around Hamilton and rural Waikato need planning before move day. We scope stairs, pathways, and crane or rigging requirements from our local base.",
    paragraphs: [
      "Lifestyle blocks and hill sections are common in the Waikato. We visit when photos are not enough so crew size and equipment match the real job.",
      "The same careful handling standards apply whether you are in Hamilton city or moving a bulky item between towns. Moving blankets, straps, and specialist techniques protect your property and ours.",
      "Combine with relocating or storage when the awkward item is part of a bigger relocation.",
    ],
    highlightCards: [
      {
        title: "Spa and pool moves",
        body: "Heavy outdoor items with route planning for gates, decks, and driveways.",
      },
      {
        title: "Rural access",
        body: "Long driveways and tight farm gates scoped before we quote.",
      },
      {
        title: "Bulky furniture",
        body: "Oversized items through Hamilton townhouses and commercial spaces.",
      },
      {
        title: "Specialist gear",
        body: "Right equipment and crew count for safe lifts and rolls.",
      },
    ],
    includedBullets: [
      "Spa pools, bathtubs, saunas, and bulky furniture",
      "Hamilton city and Waikato rural properties",
      "Stairs, tight hallways, and awkward pathways",
      "Moving blankets and protective materials",
      "Coordination with home relocations when needed",
    ],
    whyChooseCopy:
      "Standard movers often say no to the hard jobs. We plan Hamilton specialist moves properly so nothing is improvised on the day.",
    defaultJobType: "Hard to Shift",
    heroPhoto: hardToShiftPageHeroPhoto,
    heroPhotoAlt: "Crane lifting a piano to an upper balcony, Specialist Movers",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton and Waikato",
  },

  "cleaning-services": {
    parentHref: "/services/cleaning-services",
    parentLabel: "Exit cleaning Auckland",
    metaTitle: "Exit Cleaning Hamilton | Specialist Movers",
    metaDescription:
      "Fixed-price exit cleaning in Hamilton and the Waikato. Tenancy and settlement cleans aligned with your move-out. Specialist Movers.",
    h1: "Exit cleaning Hamilton",
    lead:
      "Tenancy and settlement cleans in Hamilton scheduled around your move-out date. Fixed pricing by bedrooms and bathrooms, no surprises on invoice day.",
    paragraphs: [
      "We work alongside our Hamilton residential moving teams so keys, inspections, and handovers line up. One timeline is easier than juggling separate contractors.",
      "Cambridge, Morrinsville, and nearby towns can be included when travel is quoted up front.",
      "Property left spotless and ready for inspection is the goal every time.",
    ],
    highlightCards: [
      {
        title: "Fixed price",
        body: "Exit cleans quoted by property size, not open-ended hourly guesswork.",
      },
      {
        title: "Move-aligned",
        body: "Cleaning booked against your Hamilton move-out or settlement date.",
      },
      {
        title: "Tenancy ready",
        body: "Kitchen, bathrooms, and living areas to inspection standard.",
      },
      {
        title: "Waikato towns",
        body: "Hamilton city plus nearby towns when quoted.",
      },
    ],
    includedBullets: [
      "Tenancy and settlement exit cleans",
      "Post-move handover timing",
      "Fixed-price by bedrooms and bathrooms",
      "Hamilton and selected Waikato towns",
      "Can bundle with home relocations",
    ],
    whyChooseCopy:
      "Exit cleaning stress usually comes from bad timing. We coordinate with your move so the property is ready when the agent arrives.",
    defaultJobType: "Cleaning",
    heroPhoto: sitePhotos.cleaningHero,
    heroPhotoAlt: "Exit cleaning team Specialist Movers Hamilton",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton area",
  },

  "international-moving": {
    parentHref: "/services/international-moving",
    parentLabel: "International moving Auckland",
    metaTitle: "International Movers Hamilton | Specialist Movers",
    metaDescription:
      "International and inter-island moves from Hamilton. Planning, packing coordination, clear timelines. Specialist Movers Waikato base.",
    h1: "International moving from Hamilton",
    lead:
      "Leaving Hamilton for overseas or moving between North and South Island? We coordinate planning, packing, and logistics from our Waikato base with the same care standards as Auckland.",
    paragraphs: [
      "International moves need early planning for customs, crating, and dates that rarely align perfectly. We help you understand timing and what happens at each stage.",
      "Hamilton to Auckland port or airport legs are part of many international jobs. We keep one point of contact rather than passing you between brokers.",
      "Delicate items including pianos can be included when scoped properly on the quote.",
    ],
    highlightCards: [
      {
        title: "Early planning",
        body: "Timeline and packing coordination before containers or air freight are booked.",
      },
      {
        title: "Inter-island",
        body: "North and South Island relocations from Hamilton homes and businesses.",
      },
      {
        title: "Clear updates",
        body: "One coordinator through pickup, transit, and delivery milestones.",
      },
      {
        title: "Specialist items",
        body: "Pianos and fragile goods quoted with proper prep when needed.",
      },
    ],
    includedBullets: [
      "International destinations and inter-island moves",
      "Planning and packaging coordination from Hamilton",
      "Hamilton to Auckland transit legs when required",
      "Clear communication on timing and documentation",
      "Storage in transit when dates slip",
    ],
    whyChooseCopy:
      "International moves from Hamilton should not feel like a black box. We explain the steps and stay reachable when plans change.",
    defaultJobType: "Home Move",
    heroPhoto: sitePhotos.commercialHero,
    heroPhotoAlt: "International move planning Specialist Movers",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton base",
    extraLinks: [
      {
        label: "Moving to Australia",
        href: "/international-moving/moving-to-australia",
      },
    ],
  },

  "loading-unloading": {
    parentHref: "/services/loading-unloading",
    parentLabel: "Loading and unloading Auckland",
    metaTitle: "Loading & Unloading Hamilton | Specialist Movers",
    metaDescription:
      "Hire experienced Hamilton movers for loading, unloading, and heavy lifts. Containers and storage transfers. Free quote and callback in 15 minutes.",
    h1: "Loading and unloading Hamilton",
    lead:
      "Need extra hands in Hamilton without booking a full home relocation? Our crews load and unload containers, storage units, and rental trucks with careful handling for furniture and boxed goods.",
    paragraphs: [
      "Popular when you have hired a truck yourself, need a container emptied, or want help for part of the day only.",
      "We quote crew size and minimum hours clearly so you know what you are paying for.",
      "Hamilton and nearby Waikato towns serviced from our local base.",
    ],
    highlightCards: [
      {
        title: "Container loads",
        body: "Import and export containers for home and commercial goods.",
      },
      {
        title: "Storage transfers",
        body: "Move items in or out of storage with proper wrapping.",
      },
      {
        title: "Heavy lifts",
        body: "Experienced crews for bulky furniture and boxed loads.",
      },
      {
        title: "Flexible hours",
        body: "Partial-day hire when you do not need a full move package.",
      },
    ],
    includedBullets: [
      "Loading and unloading trucks and containers",
      "Hamilton city and Waikato when quoted",
      "Careful handling for furniture and boxes",
      "Crew hire with clear hourly or scoped pricing",
    ],
    whyChooseCopy:
      "Loading day injuries and damage often come from untrained help. Our Hamilton crews know how to stack, strap, and protect a load properly.",
    defaultJobType: "Home Move",
    heroPhoto: sitePhotos.truckLoad,
    heroPhotoAlt: "Truck loading Specialist Movers Hamilton",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton",
  },

  "winz-quotes": {
    parentHref: "/services/winz-quotes",
    parentLabel: "WINZ quotes Auckland",
    metaTitle: "WINZ Moving Quote Hamilton | Specialist Movers",
    metaDescription:
      "Written WINZ and assistance quotes for Hamilton and Waikato moves. Fast turnaround, clear scope. Specialist Movers. Free quote and callback in 15 minutes.",
    h1: "WINZ moving quotes Hamilton",
    lead:
      "Applying for moving assistance in Hamilton or the Waikato? We provide written quotes with clear scope and pricing you can submit with confidence.",
    paragraphs: [
      "Tell us addresses, approximate volume, and dates. We respond promptly so you are not waiting on paperwork.",
      "Hamilton city, student flats, and wider Waikato towns are covered from our local base. Auckland to Hamilton relocations can be quoted when both addresses are provided.",
      "Home relocations, packing, and cleaning quotes available from the same team.",
    ],
    highlightCards: [
      {
        title: "Fast paperwork",
        body: "Written quotes structured for assistance applications.",
      },
      {
        title: "Clear scope",
        body: "What is included, travel, and crew explained in plain language.",
      },
      {
        title: "Waikato coverage",
        body: "Hamilton plus nearby towns when listed on your application.",
      },
      {
        title: "Straight answers",
        body: "Phone and email follow-up so you get what you need quickly.",
      },
    ],
    includedBullets: [
      "Written quotes for moving assistance applications",
      "Hamilton and Waikato addresses",
      "Clear scope and prompt follow-up",
      "Home relocation, pack, and clean quotes available",
    ],
    whyChooseCopy:
      "You need the quote fast and correct. We keep Hamilton WINZ quotes simple and respond quickly.",
    defaultJobType: "Home Move",
    heroPhoto: sitePhotos.aboutTeam,
    heroPhotoAlt: "Specialist Movers team Hamilton depot",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton",
  },

  storage: {
    parentHref: "/services/storage",
    parentLabel: "Moving storage Auckland",
    metaTitle: "Moving Storage Hamilton | Specialist Movers",
    metaDescription:
      "Short and long-term storage in Hamilton and the Waikato. Bridge settlement gaps, renovations, and regional move legs. Free quote.",
    h1: "Moving storage Hamilton",
    lead:
      "Gap between Hamilton homes, renovation timing, or a regional move leg? We store household goods securely with the same crews who packed them, not an anonymous locker chain.",
    paragraphs: [
      "Short-term storage bridges overlapping tenancies around Hamilton and Cambridge. Long-term options suit overseas postings and extended builds.",
      "Storage in transit supports Hamilton to Auckland routes when delivery cannot happen the same day.",
      "Piano storage is handled by our Specialist Piano Movers team with dedicated processes.",
    ],
    highlightCards: [
      {
        title: "Between homes",
        body: "Weeks between settlement dates without double-handling your goods.",
      },
      {
        title: "Renovation storage",
        body: "Furniture out while work happens, delivered back when you are ready.",
      },
      {
        title: "In transit",
        body: "Secure holding between multi-day regional legs.",
      },
      {
        title: "Piano storage",
        body: "Specialist piano team for upright and grand storage transitions.",
      },
    ],
    includedBullets: [
      "Short-term and long-term household storage",
      "Hamilton and Waikato collection and delivery",
      "Storage in transit for regional moves",
      "Inventory and careful wrapping on intake",
      "Piano storage via Specialist Piano Movers",
    ],
    whyChooseCopy:
      "Storage works best when the same movers who packed you in unpack you out. We keep Hamilton storage accountable and clear on access terms.",
    defaultJobType: "Home Move",
    heroPhoto: sitePhotos.specialistItem,
    heroPhotoAlt: "Wrapped furniture storage Specialist Movers",
    locationHref: "/locations/hamilton",
    locationLabel: "Hamilton and Waikato",
  },
};

export function getHamiltonPageConfig(slug: string): HamiltonPageConfig | null {
  const base = getHamiltonBaseSlug(slug);
  if (!base) return null;
  const page = hamiltonPages[base];
  return enrichHamiltonPageConfig({
    baseSlug: base,
    path: hamiltonPath(base),
    ...page,
    h1: getServiceHeroH1(base, "Hamilton"),
    parentHref: aucklandServiceHref(base),
  });
}

export function getHamiltonStaticParams(): { slug: string }[] {
  return hamiltonBaseSlugs
    .filter((b) => b !== "piano-movers")
    .map((b) => ({ slug: `${b}${HAMILTON_SUFFIX}` }));
}

export function hasHamiltonPage(baseSlug: string): boolean {
  return (hamiltonBaseSlugs as readonly string[]).includes(baseSlug);
}

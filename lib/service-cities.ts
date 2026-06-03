/**
 * Service + city landing pages for local SEO and backlink targets.
 *
 * URL patterns:
 * - Piano: /piano-movers/{city}
 * - Main services: /services/{service}/{city}
 * - Storage hub: /services/storage/{city}
 * - Moving hub: /services/moving/{city}
 */
import { movingDistanceHub, storageHub } from "@/lib/service-clusters";
import { getLocation } from "@/lib/locations";
import { getPianoCityExtra } from "@/lib/piano-city-content";
import { serviceBlurbs } from "@/lib/legacy-site-content";
import { regions } from "@/lib/regions";
import type { JobType } from "@/lib/site-data";
import { services } from "@/lib/site-data";

export const serviceCitySlugs = ["auckland", "hamilton"] as const;
export type ServiceCitySlug = (typeof serviceCitySlugs)[number];

/** Cluster hubs that also get Auckland + Hamilton pages. */
export const clusterServiceCitySlugs = ["storage", "moving"] as const;

export function isServiceCitySlug(slug: string): slug is ServiceCitySlug {
  return (serviceCitySlugs as readonly string[]).includes(slug);
}

export const serviceCityTargetSlugs = [
  ...services.map((s) => s.slug),
  ...clusterServiceCitySlugs,
] as const;

export function hasServiceCityPages(serviceSlug: string): boolean {
  return (serviceCityTargetSlugs as readonly string[]).includes(serviceSlug);
}

type CityServiceSource = {
  slug: string;
  parentHref: string;
  parentLabel: string;
  title: string;
  description: string;
  defaultJobType: JobType;
  includedBullets: readonly string[];
  whyChooseCopy: string;
};

function getCityServiceSource(slug: string): CityServiceSource | null {
  const service = services.find((s) => s.slug === slug);
  if (service) {
    return {
      slug,
      parentHref: slug === "piano-movers" ? "/piano-movers" : `/services/${slug}`,
      parentLabel: slug === "piano-movers" ? "All piano services" : service.title,
      title: service.title,
      description: service.description,
      defaultJobType: service.defaultJobType,
      includedBullets: service.includedBullets,
      whyChooseCopy: service.whyChooseCopy,
    };
  }

  if (slug === "storage") {
    return {
      slug: "storage",
      parentHref: storageHub.path,
      parentLabel: storageHub.title,
      title: storageHub.title,
      description: storageHub.description,
      defaultJobType: "House Move",
      includedBullets: [
        "Short-term storage between settlement dates",
        "Long-term storage for overseas postings and builds",
        "Storage in transit for regional and overnight legs",
        "Piano storage handled by our piano team",
      ],
      whyChooseCopy:
        "Storage with the same movers who packed your home means fewer handoffs and clearer accountability across Auckland and the Waikato.",
    };
  }

  if (slug === "moving") {
    return {
      slug: "moving",
      parentHref: movingDistanceHub.path,
      parentLabel: movingDistanceHub.title,
      title: movingDistanceHub.title,
      description: movingDistanceHub.description,
      defaultJobType: "House Move",
      includedBullets: [
        "Local moves across Auckland suburbs and Hamilton",
        "Regional moves between Auckland, Waikato, and beyond",
        "International and inter-island coordination",
        "Packing, piano, and storage on the same quote",
      ],
      whyChooseCopy:
        "One company from pickup to delivery. No broker handoffs mid-route, whether your move is across town or across the North Island.",
    };
  }

  return null;
}

export type ServiceCityPageConfig = {
  serviceSlug: string;
  city: ServiceCitySlug;
  path: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  paragraphs: readonly string[];
  highlights: readonly string[];
  /** Titled cards (piano Auckland page); falls back to highlights as body-only */
  highlightCards?: readonly { title: string; body: string }[];
  faqs?: readonly { q: string; a: string }[];
  showPianoGallery?: boolean;
  locationHref: string;
  locationLabel: string;
  parentHref: string;
  parentLabel: string;
  defaultJobType: JobType;
  includedBullets: readonly string[];
  whyChooseCopy: string;
  alternateCity: { slug: ServiceCitySlug; label: string; href: string };
};

const cityMeta: Record<
  ServiceCitySlug,
  { name: string; depot: string; locationSlug: string; locationLabel: string }
> = {
  auckland: {
    name: "Auckland",
    depot: "Wairau Valley depot",
    locationSlug: "north-shore",
    locationLabel: "Auckland areas we serve",
  },
  hamilton: {
    name: "Hamilton",
    depot: "Hamilton base",
    locationSlug: "hamilton",
    locationLabel: "Hamilton and Waikato",
  },
};

type ServiceSeo = {
  keyword: string;
  shortTitle: string;
  jobFocus: string;
};

const serviceSeo: Record<string, ServiceSeo> = {
  "piano-movers": {
    keyword: "piano movers",
    shortTitle: "Piano movers",
    jobFocus: "piano transport",
  },
  "house-moving": {
    keyword: "house movers",
    shortTitle: "House movers",
    jobFocus: "house moves",
  },
  "office-moving": {
    keyword: "office movers",
    shortTitle: "Office movers",
    jobFocus: "office relocations",
  },
  "commercial-moving": {
    keyword: "commercial movers",
    shortTitle: "Commercial movers",
    jobFocus: "commercial relocations",
  },
  "packing-services": {
    keyword: "packing services",
    shortTitle: "Packing services",
    jobFocus: "professional packing",
  },
  "hard-to-shift": {
    keyword: "hard to shift movers",
    shortTitle: "Hard to shift",
    jobFocus: "spa pools, bathtubs, and bulky items",
  },
  "cleaning-services": {
    keyword: "exit cleaning",
    shortTitle: "Exit cleaning",
    jobFocus: "exit cleans",
  },
  "international-moving": {
    keyword: "international movers",
    shortTitle: "International moving",
    jobFocus: "international relocations",
  },
  "loading-unloading": {
    keyword: "loading and unloading",
    shortTitle: "Loading and unloading",
    jobFocus: "loading and unloading",
  },
  "winz-quotes": {
    keyword: "WINZ moving quote",
    shortTitle: "WINZ quote",
    jobFocus: "written WINZ moving quotes",
  },
  storage: {
    keyword: "moving storage",
    shortTitle: "Moving storage",
    jobFocus: "short and long-term storage",
  },
  moving: {
    keyword: "movers",
    shortTitle: "Moving services",
    jobFocus: "local and regional moves",
  },
};

function buildParagraphs(
  serviceSlug: string,
  city: ServiceCitySlug,
  seo: ServiceSeo,
): string[] {
  const c = cityMeta[city];
  const loc = getLocation(c.locationSlug);

  if (serviceSlug === "piano-movers") {
    if (city === "auckland") {
      return [
        "Specialist Piano Movers is the dedicated piano team within Specialist Movers. We are trusted by Steinway and major Auckland music stores for upright, baby grand, and grand piano moves.",
        `From our ${c.depot} we run daily piano work across the North Shore, central suburbs, West and South Auckland, and longer runs to Hamilton when you need them.`,
        "Every job gets at least three trained movers, piano boards, shrink wrap, and trucks built for instruments. Free quote and callback within 15 minutes.",
      ];
    }
    return [
      "Hamilton is our second base for piano work. We move uprights and grands across Hamilton city, Cambridge, and nearby Waikato towns, and we run regular Hamilton to Auckland routes.",
      "Music stores, schools, and families trust us for careful collection, secure transport, and placement on arrival. Specialist transport insurance options are available on request.",
      "Tell us your piano type, both addresses, and stairs at each end. We confirm price and crew size before move day.",
    ];
  }

  if (serviceSlug === "house-moving") {
    if (city === "auckland") {
      return [
        "We move apartments, townhouses, and family homes across Auckland with clear communication and careful crews. Free in-home viewings help us give accurate fixed-price quotes when you need them.",
        `Our ${c.depot} keeps North Shore, central, east, west, and south Auckland jobs on regular routes. Packing, storage, and piano moves can be added to your plan.`,
        "Licensed, insured, and SiteWise Gold. Hundreds of 5-star Google reviews from Auckland families.",
      ];
    }
    return [
      "Hamilton house moves are planned from our local base with the same viewing-first approach as Auckland. Student flats, family homes, and lifestyle blocks around the Waikato are part of our weekly work.",
      "We also coordinate moves between Hamilton and Auckland when you are relocating between cities. Packing, piano transport, and exit cleans can be bundled.",
      "Book a free viewing for larger homes so stairs, driveways, and volume are scoped before we lock your price.",
    ];
  }

  if (serviceSlug === "office-moving") {
    if (city === "auckland") {
      return [
        "Office and workplace moves across Auckland CBD fringe, inner suburbs, and business parks. We plan lifts, loading zones, and after-hours access before move day.",
        "Desks, IT, meeting rooms, and files move with minimal downtime. Weekend and evening slots are available when you need them.",
        `Crews run from our ${c.depot} with one point of contact from walkthrough to handover.`,
      ];
    }
    return [
      "Hamilton office relocations for clinics, agencies, warehouses, and corporate floors. We scope access and timing from our Hamilton base.",
      "After-hours moves reduce disruption. Packing and commercial support are available on the same job.",
      "Quote includes clear scope, crew size, and arrival windows.",
    ];
  }

  if (serviceSlug === "commercial-moving") {
    if (city === "auckland") {
      return [
        "Commercial fit-outs, staging, printer and vending deliveries, and tenant moves across Auckland. Trained crews and the right gear for tight timelines.",
        "We work with retailers, installers, and facilities teams who need reliable Auckland contractors.",
        "SiteWise Gold systems and clear communication on every job.",
      ];
    }
    return [
      "Hamilton commercial work includes fit-outs, equipment deliveries, and tenant relocations from our Waikato base.",
      "We plan parking, access, and crew size up front so install days stay on track.",
      "Auckland crews support larger Waikato projects when extra capacity is needed.",
    ];
  }

  if (serviceSlug === "cleaning-services") {
    if (city === "auckland") {
      return [
        "Exit cleaning for Auckland tenancies, settlements, and post-construction handovers. Fixed pricing aligned with your move-out date.",
        "We work alongside our house moving teams so keys and inspections line up.",
        "Property left spotless and ready for inspection.",
      ];
    }
    return [
      "Hamilton and Waikato exit cleans from our Hamilton base. Tenancy and settlement cleans scheduled around your move.",
      "Fixed-price cleaning matched to bedrooms and bathrooms. No surprises on invoice day.",
      "Pair with a Hamilton house move for one coordinated timeline.",
    ];
  }

  if (serviceSlug === "hard-to-shift") {
    if (city === "auckland") {
      return [
        "Spa pools, bathtubs, saunas, oversized furniture, and awkward access jobs across Auckland. We plan stairs, tight pathways, and crane or specialist gear before move day.",
        `Crews from our ${c.depot} bring moving blankets, packing materials, and techniques built for fragile and bulky items.`,
        "Trusted when a standard furniture crew is not enough.",
      ];
    }
    return [
      "Hard-to-shift work in Hamilton and the Waikato: spa pools, bulky furniture, and items that need extra planning. We scope access from our Hamilton base.",
      "Same careful handling standards as our Auckland specialist jobs, with clear travel and timing in your quote.",
      "Combine with house moving or storage when your job spans more than one tricky item.",
    ];
  }

  if (serviceSlug === "winz-quotes") {
    if (city === "auckland") {
      return [
        "Need a written quote for a WINZ or moving assistance application in Auckland? We provide clear scope, pricing, and prompt follow-up.",
        "Tell us addresses, approximate volume, and dates. We respond quickly so you can complete your application without delay.",
        "House moves, packing, and cleaning quotes available from the same team.",
      ];
    }
    return [
      "WINZ and assistance quotes for Hamilton and Waikato moves. Written scope and pricing you can submit with confidence.",
      "We cover Hamilton city and nearby towns from our local base, plus Auckland to Hamilton relocations when quoted.",
      "Straight communication and fast turnaround on paperwork.",
    ];
  }

  if (serviceSlug === "packing-services") {
    if (city === "auckland") {
      return [
        "Professional packing and unpacking across Auckland homes and apartments. Packers come in the day before your move when you book a full pack.",
        "Quality materials, moving blankets, and furniture disassembly support from our Wairau Valley teams.",
        "Pair with house moving or storage on one plan.",
      ];
    }
    return [
      "Hamilton packing teams for homes and rentals around the Waikato. Same materials and care standards as Auckland.",
      "Ideal before regional moves between Hamilton and Auckland.",
      "Fixed-scope packing quotes after we understand volume and access.",
    ];
  }

  if (serviceSlug === "loading-unloading") {
    if (city === "auckland") {
      return [
        "Hire experienced Auckland movers for loading, unloading, containers, and heavy lifts without booking a full house move.",
        "Careful handling for furniture and boxed goods with clear hourly or scoped pricing.",
        "Popular for container deliveries, storage transfers, and extra hands on move day.",
      ];
    }
    return [
      "Loading and unloading help in Hamilton and nearby Waikato towns. Crews scheduled from our Hamilton base.",
      "Suited to containers, storage units, and jobs where you only need muscle and skill for part of the day.",
      "Quote includes crew size and minimum hours.",
    ];
  }

  if (serviceSlug === "storage") {
    if (city === "auckland") {
      return [
        "Moving storage in Auckland when settlement dates do not line up, or you need a few weeks between properties. Short-term, long-term, in-transit, and overnight options.",
        "Goods stay with movers who packed them, not an anonymous locker chain.",
        "Piano storage is handled by our Specialist Piano Movers team with dedicated processes.",
      ];
    }
    return [
      "Hamilton and Waikato storage from our local base. Bridge gaps between homes, renovations, or regional move legs.",
      "Delivery back to your new address when you are ready, with the same crew standards as our house moves.",
      "Ask about storage in transit for Auckland to Hamilton routes.",
    ];
  }

  if (serviceSlug === "moving") {
    if (city === "auckland") {
      return [
        "Local Auckland moves plus regional runs to Hamilton, Bay of Plenty, and Northland. One company, no handoffs mid-route.",
        "Apartments, townhouses, and full homes with day rates and clear call-out explained up front.",
        "Add packing, piano transport, storage, or exit cleaning to the same quote.",
      ];
    }
    return [
      "Hamilton local moves and regional corridors to Auckland and wider Waikato towns. End-to-end communication from one team.",
      "Lifestyle blocks and town homes quoted after a viewing when you need a fixed price.",
      "International and inter-island moves coordinated from our Hamilton base.",
    ];
  }

  const areaNote =
    city === "auckland"
      ? (loc?.intro ??
        "We service Auckland from Silverdale and the North Shore through to central, west, and south suburbs.")
      : (loc?.intro ??
        "Hamilton is our Waikato base with regular work in nearby towns.");

  return [
    `${seo.shortTitle} in ${c.name} from Specialist Movers. ${areaNote}`,
    `Our ${c.depot} supports ${seo.jobFocus} with the same careful crews and 15-minute callback promise across ${regions.serviceArea}.`,
    serviceBlurbs[serviceSlug as keyof typeof serviceBlurbs]?.excerpt ??
      `Contact us for ${seo.jobFocus} in ${c.name}. Free quote.`,
  ];
}

export function getServiceCityPath(
  serviceSlug: string,
  city: ServiceCitySlug,
): string {
  const source = getCityServiceSource(serviceSlug);
  if (!source) return "";
  return `${source.parentHref}/${city}`;
}

export function getServiceCityConfig(
  serviceSlug: string,
  city: ServiceCitySlug,
): ServiceCityPageConfig | null {
  const source = getCityServiceSource(serviceSlug);
  if (!source || !isServiceCitySlug(city)) return null;

  const seo = serviceSeo[serviceSlug] ?? {
    keyword: source.title.toLowerCase(),
    shortTitle: source.title,
    jobFocus: source.title.toLowerCase(),
  };
  const c = cityMeta[city];
  const alternate: ServiceCitySlug = city === "auckland" ? "hamilton" : "auckland";
  const path = getServiceCityPath(serviceSlug, city);
  const pianoExtra =
    serviceSlug === "piano-movers" ? getPianoCityExtra(city) : null;

  return {
    serviceSlug,
    city,
    path,
    cityName: c.name,
    metaTitle: pianoExtra?.metaTitle ??
      (serviceSlug === "piano-movers"
        ? `${seo.shortTitle} ${c.name} | Specialist Piano Movers`
        : `${seo.shortTitle} ${c.name} | Specialist Movers`),
    metaDescription:
      pianoExtra?.metaDescription ??
      `${seo.keyword} in ${c.name}. ${source.description} Free quote. Callback within 15 minutes.`,
    h1: `${seo.shortTitle} ${c.name}`,
    lead:
      pianoExtra?.lead ??
      `${seo.shortTitle} in ${c.name} from Specialist Movers. ${regions.basesLong}. Free quote and callback within 15 minutes.`,
    paragraphs: pianoExtra?.paragraphs ?? buildParagraphs(serviceSlug, city, seo),
    highlights: pianoExtra
      ? []
      : [
          `${c.name} crews from our ${c.depot}`,
          "Licensed and insured",
          "Free quote, 15-minute callback",
          city === "auckland"
            ? "Piano, house, office, and commercial specialists"
            : "Hamilton to Auckland routes when you need them",
        ],
    highlightCards: pianoExtra?.highlights,
    faqs: pianoExtra?.faqs,
    showPianoGallery: serviceSlug === "piano-movers" && city === "auckland",
    locationHref: city === "auckland" ? "/locations" : `/locations/${c.locationSlug}`,
    locationLabel: c.locationLabel,
    parentHref: source.parentHref,
    parentLabel: source.parentLabel,
    defaultJobType: source.defaultJobType,
    includedBullets: pianoExtra?.includedBullets ?? source.includedBullets,
    whyChooseCopy: pianoExtra?.whyChooseCopy ?? source.whyChooseCopy,
    alternateCity: {
      slug: alternate,
      label: `${seo.shortTitle} ${cityMeta[alternate].name}`,
      href: getServiceCityPath(serviceSlug, alternate),
    },
  };
}

export function getAllServiceCityParams(): { serviceSlug: string; city: ServiceCitySlug }[] {
  const params: { serviceSlug: string; city: ServiceCitySlug }[] = [];
  for (const slug of serviceCityTargetSlugs) {
    for (const city of serviceCitySlugs) {
      params.push({ serviceSlug: slug, city });
    }
  }
  return params;
}

/** Params for /services/[slug]/[city] (excludes piano + cluster hubs). */
export function getMainServiceCityRouteParams(): { slug: string; city: ServiceCitySlug }[] {
  return getAllServiceCityParams()
    .filter(
      (p) =>
        p.serviceSlug !== "piano-movers" &&
        p.serviceSlug !== "storage" &&
        p.serviceSlug !== "moving",
    )
    .map((p) => ({ slug: p.serviceSlug, city: p.city }));
}

export function listServiceCityPaths(): string[] {
  return getAllServiceCityParams()
    .map((p) => getServiceCityPath(p.serviceSlug, p.city))
    .filter(Boolean);
}

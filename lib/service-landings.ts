import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import { hero } from "@/lib/homepage-copy";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import {
  houseMovingProcess,
  pianoMovingProcess,
  workplaceMovingProcess,
} from "@/lib/moving-process";
import { getServicePhoto, sitePhotos } from "@/lib/site-photos";
import type { JobType } from "@/lib/site-data";
import { services } from "@/lib/site-data";

export const serviceLandingSlugs = [
  "piano-movers",
  "house-moving",
  "office-moving",
  "commercial-moving",
] as const;

export type ServiceLandingSlug = (typeof serviceLandingSlugs)[number];

export function isServiceLandingSlug(slug: string): slug is ServiceLandingSlug {
  return (serviceLandingSlugs as readonly string[]).includes(slug);
}

export type ServiceLandingHighlight = {
  title: string;
  text: string;
};

export type ServiceLandingConfig = {
  slug: ServiceLandingSlug;
  /** Path for this landing (piano hub vs services slug) */
  path: string;
  eyebrow: string;
  h1: string;
  lead: string;
  subline: string;
  defaultJobType: JobType;
  heroPhoto: string;
  heroPhotoAlt: string;
  /** Gag shot in hero left column (defaults to heroPhoto) */
  heroGagPhoto: string;
  heroGagAlt: string;
  heroOverlayCaption?: string;
  heroVariant: "moving" | "piano";
  aboutTitle: string;
  aboutBody: string;
  trustHighlights: ServiceLandingHighlight[];
  whyTitle: string;
  whyBody: string;
  includedBullets: readonly string[];
  relatedSlugs: readonly string[];
  showPianoPartners: boolean;
  showMovingBanner: boolean;
  /** Optional piano sub-service grid */
  showPianoSubServices: boolean;
  faqHeading: string;
  /** Override generic house-moving process steps */
  processTitle?: string;
  processSteps?: readonly { title: string; body?: string }[];
  /** Side image in about section (off when hero already shows the main shot) */
  showAboutSideImage?: boolean;
  /** Hero gag photo in half-width frame (homepage style) */
  wrapHeroPhoto?: boolean;
  /** Photo right of about copy (no caption) */
  aboutSidePhoto?: string;
  aboutSidePhotoAlt?: string;
};

const landingOverrides: Record<
  ServiceLandingSlug,
  Omit<
    ServiceLandingConfig,
    "includedBullets" | "relatedSlugs" | "defaultJobType" | "heroPhoto" | "heroPhotoAlt"
  >
> = {
  "piano-movers": {
    slug: "piano-movers",
    path: "/piano-movers/auckland",
    eyebrow: "Trusted by Steinway and music retailers",
    h1: getServiceHeroH1("piano-movers", "Auckland"),
    lead:
      "Looking for reliable piano movers in Auckland? Specialist Piano Movers handles local moves, runs to Hamilton and the Waikato, and coordinates international shipping when you need it. Upright, baby grand, and grand pianos with shrink wrap, piano boards, and crews who do this every day.",
    subline: "Piano moves from $300 + GST. Free quote. Callback within 15 minutes.",
    heroGagPhoto: sitePhotos.pianoAbout,
    heroGagAlt: "Specialist Piano Movers team with a wrapped piano beside the company truck",
    heroOverlayCaption: "You play. We move.",
    wrapHeroPhoto: false,
    showAboutSideImage: true,
    aboutSidePhoto: sitePhotos.pianoMove,
    aboutSidePhotoAlt:
      "Specialist Movers crew moving a piano carefully",
    heroVariant: "piano",
    aboutTitle: "About our piano moving team",
    aboutBody:
      "At Specialist Piano Movers we focus on safe, efficient transport for pianos of all types and sizes. We are trusted by Steinway and major Auckland music stores including Lewis Eady, Rockshop, and Piano Traders. From our Wairau Valley base we cover the North Shore, central suburbs, west, south, and east Auckland every week. Your piano is an instrument and often a family heirloom. We plan collection, secure transport, and placement on arrival. Every piano is wrapped in padded blankets and shrink wrap before it leaves your home. Uprights are secured upright inside the truck with specialist straps. Grands are tilted onto a piano board, padded, and strapped for the drive. Humidity and lacquer finishes are protected with proper wrap, not just a standard furniture blanket.",
    trustHighlights: [
      {
        title: "Retailer trusted",
        text: "Regular work for Lewis Eady, Rockshop, Piano Traders, and more.",
      },
      {
        title: "Quick response",
        text: "Free quote and callback within 15 minutes, 7 days a week.",
      },
      {
        title: "Insured crew, cover on request",
        text: "Pianos carry $2,000 cover as standard. More is available, just ask.",
      },
    ],
    whyTitle: "Why choose us for your piano",
    whyBody:
      "Pianos look solid but they are delicate inside. Regular furniture crews are not enough. We use custom dollies, padding tape, and secure straps. Grand pianos are stripped and padded properly before transport. Transparent pricing, specialist insurance options, and updates from pickup to placement.",
    showPianoPartners: true,
    showMovingBanner: false,
    showPianoSubServices: true,
    faqHeading: "Piano moving questions",
    processTitle: pianoMovingProcess.title,
    processSteps: pianoMovingProcess.steps,
  },
  "house-moving": {
    slug: "house-moving",
    path: "/services/house-moving",
    eyebrow: "Trusted Auckland movers",
    h1: getServiceHeroH1("house-moving", "Auckland"),
    lead:
      "Apartments, townhouses and family homes across Auckland, seven days a week. Two movers and a truck for most homes up to three bedrooms, blankets and hardware bagged so beds go back together the way they came apart, and a free in-home viewing on three bedrooms and up so the price is fixed before you book.",
    subline: "Moves starting from $300 + GST. Free quote. We usually call back within 15 minutes.",
    heroGagPhoto: sitePhotos.homeHero,
    heroGagAlt:
      "Specialist Movers carrying a sofa while the client relaxes and reads a magazine",
    heroOverlayCaption: hero.photoTagline,
    heroVariant: "moving",
    aboutTitle: "What actually happens on the day",
    aboutBody:
      "A crew of two turns up for most homes up to three bedrooms, three or four for bigger houses and anything with a lot of stairs. Furniture gets wrapped before it leaves the room. Beds and dining tables come apart, and the hardware gets bagged and labelled so the same screws go back in the same bed. A three-bedroom house is a day on site. We do around 80 house and office moves a month, so the order we load in is not something we work out on your driveway.",
    trustHighlights: [
      {
        title: "We look before we quote",
        text: "We come and look at anything three bedrooms or more, so the number is real before you book.",
      },
      {
        title: "Written, then fixed",
        text: "You get the number in writing before you book, and it does not move afterwards.",
      },
      {
        title: "The hard bits included",
        text: "Stairs, tight driveways, balcony hoists and pianos. We do not sub them out.",
      },
    ],
    whyTitle: "What a house move costs in Auckland",
    whyBody:
      "The day you pick moves the price more than anything else you control. Two movers and a truck are $120 an hour plus GST on a Tuesday and $150 on a Friday, and three movers run $160 to $190. On top of the hours there is a callout fee from $60 that rises with distance from our North Shore depot. Because we charge for the hours the job actually takes rather than a guessed flat rate, on a bigger home we would rather come and look than be wrong in either direction.",
    showPianoPartners: false,
    showMovingBanner: true,
    showPianoSubServices: false,
    faqHeading: "Moving house questions",
    processTitle: houseMovingProcess.title,
    processSteps: houseMovingProcess.steps,
    showAboutSideImage: true,
    aboutSidePhoto: sitePhotos.houseMove,
    aboutSidePhotoAlt: "Crew moving wrapped furniture into a home",
  },
  "office-moving": {
    slug: "office-moving",
    path: "/services/office-moving",
    eyebrow: "Auckland office relocation specialists",
    h1: getServiceHeroH1("office-moving", "Auckland"),
    lead:
      "Office relocations across the Auckland CBD fringe, inner suburbs, and business parks. Weekend and after-hours moves, with lifts and loading zones booked before the day, so your team sits down at a working desk on Monday.",
    subline: "Office move quotes tailored to your space. Callback within 15 minutes.",
    heroGagPhoto: sitePhotos.officeMove,
    heroGagAlt: "Specialist Movers crew carrying office boxes while a client relaxes inside",
    heroOverlayCaption: "You run the office. We move it.",
    heroVariant: "moving",
    aboutTitle: "About our office moving service",
    aboutBody:
      "We relocate offices and workplaces across Auckland and the Waikato, from a single floor to a multi-site corporate relocation. Packing and IT-sensitive gear can be included, and the awkward items get scoped at the viewing rather than discovered on the day.",
    trustHighlights: [
      {
        title: "Less downtime",
        text: "Weekend and after-hours moves, so Monday morning works.",
      },
      {
        title: "Bagged per desk",
        text: "Screws, brackets and cables labelled to their own desk.",
      },
      {
        title: "SiteWise Gold",
        text: "90%+ score, which gets us onto managed and secure sites.",
      },
    ],
    whyTitle: "Why offices choose Specialist Movers",
    whyBody:
      "We have moved law firms, clinics, agencies and corporate floors. Access, timing and crew size are agreed in writing before the day, so nobody is working it out in a stairwell on the Saturday morning.",
    showPianoPartners: false,
    showMovingBanner: true,
    showPianoSubServices: false,
    faqHeading: "Office moving questions",
    processTitle: workplaceMovingProcess.title,
    processSteps: workplaceMovingProcess.steps,
    showAboutSideImage: true,
    aboutSidePhoto: sitePhotos.officeAbout,
    aboutSidePhotoAlt: "Specialist Movers office relocation crew at work",
  },
  "commercial-moving": {
    slug: "commercial-moving",
    path: "/services/commercial-moving",
    eyebrow: "Auckland commercial moving specialists",
    h1: getServiceHeroH1("commercial-moving", "Auckland"),
    lead:
      "Kitchen installs, shop fit outs, staging, printer runs, vending machines, and heavy equipment across Auckland. Commercial work runs to a window, so we quote against yours, and we say up front if we do not think it is achievable.",
    subline: "Commercial quotes tailored to your job. Callback within 15 minutes.",
    heroGagPhoto: sitePhotos.commercialTeam,
    heroGagAlt:
      "Specialist Movers team in uniform with company trucks ready for commercial work",
    heroOverlayCaption: "You run the business. We move it.",
    heroVariant: "moving",
    aboutSidePhoto: sitePhotos.commercialHero,
    aboutSidePhotoAlt:
      "Specialist Movers truck loaded for a commercial delivery",
    showAboutSideImage: true,
    aboutTitle: "About our commercial moving team",
    aboutBody:
      "We work with retailers, fit out teams, and businesses that cannot afford to shut. Crews coordinate site access, protect fixtures, and deliver to the slot, from a single heavy item to a full fit out run. A business relocation is usually more than furniture, so we phase the bigger ones and you keep trading through the move.",
    trustHighlights: [
      {
        title: "Fit out ready",
        text: "Cabinetry, staging, printers, vending machines, and specialist gear.",
      },
      {
        title: "SiteWise Gold",
        text: "90%+ score, so managed and construction sites let us through the gate.",
      },
      {
        title: "Two bases",
        text: "Auckland (Wairau Valley) and Hamilton for Waikato work.",
      },
    ],
    whyTitle: "Why businesses use Specialist Movers",
    whyBody:
      "Proven safety systems, the right gear for awkward loads, and crews who turn up when they said they would. We plan the job around your trading hours rather than ours, and if the work is recurring you deal with the same crew each time.",
    showPianoPartners: false,
    showMovingBanner: true,
    showPianoSubServices: false,
    faqHeading: "Commercial moving questions",
    processTitle: workplaceMovingProcess.title,
    processSteps: workplaceMovingProcess.steps,
  },
};

export function getServiceLandingConfig(
  slug: string
): ServiceLandingConfig | null {
  if (!isServiceLandingSlug(slug)) return null;
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  const overrides = landingOverrides[slug];

  const heroPhoto = getServicePhoto(slug) ?? "/photos/source/batch-p125/P1250366.jpg";

  return {
    ...overrides,
    path: aucklandServiceHref(slug),
    defaultJobType: service.defaultJobType,
    includedBullets: service.includedBullets,
    relatedSlugs: service.relatedSlugs,
    heroPhoto,
    heroPhotoAlt: `${overrides.h1}, Specialist Movers`,
    heroGagPhoto: overrides.heroGagPhoto ?? heroPhoto,
    heroGagAlt: overrides.heroGagAlt ?? `${overrides.h1}, Specialist Movers`,
    aboutSidePhoto: overrides.aboutSidePhoto ?? heroPhoto,
    aboutSidePhotoAlt:
      overrides.aboutSidePhotoAlt ?? `${overrides.h1}, Specialist Movers`,
  };
}

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
    subline: "Piano moves from $300. Free quote. Callback within 15 minutes.",
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
      "Relocating your Auckland home should feel manageable, not overwhelming. Our Wairau Valley crews handle apartments, townhouses, and family homes across the city with clear communication, careful handling, and free in-home viewings when you need a fixed price.",
    subline: "Moves starting from $350. Free quote. We call back within 15 minutes.",
    heroGagPhoto: sitePhotos.homeHero,
    heroGagAlt:
      "Specialist Movers carrying a sofa while the client relaxes and reads a magazine",
    heroOverlayCaption: hero.photoTagline,
    heroVariant: "moving",
    aboutTitle: "About our moving service",
    aboutBody:
      "At Specialist Movers, we go beyond shifting boxes. We plan access, protect furniture, and communicate clearly from quote to handover. Apartments, townhouses, and full homes. Local moves and longer relocations when you need them.",
    trustHighlights: [
      {
        title: "Quality crews",
        text: "Careful handling, SiteWise Gold systems, and hundreds of 5-star reviews.",
      },
      {
        title: "Quick response",
        text: "Free quote and callback within 15 minutes.",
      },
      {
        title: "Full service",
        text: "Packing, unpacking, storage, and hard-to-shift items available.",
      },
    ],
    whyTitle: "Why families choose Specialist Movers",
    whyBody:
      "Transparent pricing, no hidden fees, and crews who treat your home like their own. We adapt to tight driveways, multi-level homes, and busy timelines.",
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
      "Office and workplace moves across Auckland CBD fringe, inner suburbs, and business parks. We plan lifts, loading zones, and after-hours access so desks, IT, and files move with minimal downtime.",
    subline: "Office move quotes tailored to your space. Callback within 15 minutes.",
    heroGagPhoto: sitePhotos.officeMove,
    heroGagAlt: "Specialist Movers crew carrying office boxes while a client relaxes inside",
    heroOverlayCaption: "You run the office. We move it.",
    heroVariant: "moving",
    aboutTitle: "About our office moving service",
    aboutBody:
      "We relocate offices and workplaces across Auckland and the Waikato, from single-floor moves to multi-site projects. Building access, parking, and lift bookings are sorted before move day. Packing and IT-sensitive items can be included.",
    trustHighlights: [
      {
        title: "Less downtime",
        text: "Weekend and after-hours moves when you need them.",
      },
      {
        title: "Quick response",
        text: "Quote and callback within 15 minutes.",
      },
      {
        title: "Planned access",
        text: "Lifts, docks, and building rules handled up front.",
      },
    ],
    whyTitle: "Why offices choose Specialist Movers",
    whyBody:
      "Clear timelines, careful crews, and one point of contact from walkthrough to handover. We have moved law firms, clinics, agencies, and corporate floors.",
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
      "Kitchen installs, shop fit outs, staging, printer runs, vending machines, and heavy equipment across Auckland. We move commercial work with clear timelines, SiteWise Gold systems, and the right gear.",
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
      "We work with retailers, fit out teams, and businesses that cannot afford downtime. Our crews coordinate access, protect fixtures, and deliver on schedule, from a single heavy item to full fit out deliveries.",
    trustHighlights: [
      {
        title: "Fit out ready",
        text: "Kitchens, staging, printers, vending machines, and specialist gear.",
      },
      {
        title: "Quick response",
        text: "Quote and callback within 15 minutes. Mon to Sun.",
      },
      {
        title: "Two bases",
        text: "Auckland (Wairau Valley) and Hamilton for Waikato work.",
      },
    ],
    whyTitle: "Why businesses use Specialist Movers",
    whyBody:
      "Professional crews, proven safety systems, and communication you can rely on. We plan the job properly so your team can keep trading.",
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
    heroPhotoAlt: `${overrides.h1} , Specialist Movers`,
    heroGagPhoto: overrides.heroGagPhoto ?? heroPhoto,
    heroGagAlt: overrides.heroGagAlt ?? `${overrides.h1} , Specialist Movers`,
    aboutSidePhoto: overrides.aboutSidePhoto ?? heroPhoto,
    aboutSidePhotoAlt:
      overrides.aboutSidePhotoAlt ?? `${overrides.h1} , Specialist Movers`,
  };
}

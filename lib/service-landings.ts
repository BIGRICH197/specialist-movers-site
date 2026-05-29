import { hero } from "@/lib/homepage-copy";
import { houseMovingProcess, workplaceMovingProcess } from "@/lib/moving-process";
import { regions } from "@/lib/regions";
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
    path: "/piano-movers",
    eyebrow: "Trusted by Auckland music retailers. Piano specialists.",
    h1: "Piano movers Auckland and the Waikato",
    lead:
      "Moving a piano takes skill, not just strength. We move upright, baby grand, and grand pianos with the right gear, shrink wrap, and crews who do this every day. Auckland and Hamilton bases. Callback within 15 minutes.",
    subline: "Piano moves from $300. Free quote. We call back within 15 minutes.",
    heroGagPhoto: sitePhotos.pianoMove,
    heroGagAlt: "Specialist Movers crew moving a grand piano",
    heroOverlayCaption: "You play. We move.",
    wrapHeroPhoto: false,
    showAboutSideImage: true,
    aboutSidePhoto: sitePhotos.pianoAbout,
    aboutSidePhotoAlt:
      "Specialist Piano Movers crew with a wrapped upright piano beside the company truck",
    heroVariant: "piano",
    aboutTitle: "About our piano moving team",
    aboutBody:
      "Specialist Piano Movers is part of Specialist Movers. We are trusted by Steinway and major Auckland music stores for careful collection, secure transport, and setup on arrival. Whether it is a short hop across town or Hamilton to Auckland, we plan access, stairs, and timing before we arrive.",
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
        title: "Insured moves",
        text: "Specialist transport insurance options. Ask us for details.",
      },
    ],
    whyTitle: "Why choose us for your piano",
    whyBody:
      "We use custom dollies, padding, and secure straps. Grand pianos are prepared properly before transport. You stay informed from pickup to placement. Not just movers, piano specialists.",
    showPianoPartners: true,
    showMovingBanner: false,
    showPianoSubServices: true,
    faqHeading: "Piano moving questions",
    processTitle: "Piano moving process",
    processSteps: [
      {
        title: "Quote and confirm details",
        body: "Tell us upright or grand, pickup and drop-off addresses, and stairs at each end. We confirm price and your move date.",
      },
      {
        title: "Plan access and prep",
        body: "We check doorways, steps, and parking. Grand pianos may need legs or pedals removed before transport. We handle that on site.",
      },
      {
        title: "Protect and load",
        body: "On move day the crew shrink wraps and pads your piano, then loads it onto our piano truck using specialist dollies and straps.",
      },
      {
        title: "Deliver and place",
        body: "We transport your piano safely, set it down where you need it, and do a final check with you before we leave.",
      },
    ],
  },
  "house-moving": {
    slug: "house-moving",
    path: "/services/house-moving",
    eyebrow: `${regions.basesShort} , house moving specialists`,
    h1: "House movers Auckland and the Waikato",
    lead:
      "Relocating your home should feel manageable, not overwhelming. Our crews handle packing, heavy furniture, stairs, and timing so you can focus on settling in. Full-service house moves across Auckland and the Waikato.",
    subline: "Moves starting from $350. Free quote. We call back within 15 minutes.",
    heroGagPhoto: sitePhotos.homeHero,
    heroGagAlt:
      "Specialist Movers carrying a sofa while the client relaxes and reads a magazine",
    heroOverlayCaption: hero.photoTagline,
    heroVariant: "moving",
    aboutTitle: "About our house moving service",
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
    faqHeading: "House moving questions",
    processTitle: houseMovingProcess.title,
    processSteps: houseMovingProcess.steps,
  },
  "office-moving": {
    slug: "office-moving",
    path: "/services/office-moving",
    eyebrow: `${regions.basesShort} , office relocation specialists`,
    h1: "Office movers Auckland and the Waikato",
    lead:
      "Moving workplaces needs planning: desks, IT, files, and meeting rooms with minimal downtime. We coordinate lifts, loading zones, and after-hours slots so your team can get back to work.",
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
  },
  "commercial-moving": {
    slug: "commercial-moving",
    path: "/services/commercial-moving",
    eyebrow: `${regions.basesShort}. Commercial and fit out specialists.`,
    h1: "Commercial movers Auckland and the Waikato",
    lead:
      "Kitchen installs, shop fit outs, staging, printer runs, vending machines, and heavy equipment. We move commercial work with clear timelines and the right gear. Auckland and Hamilton bases.",
    subline: "Commercial quotes tailored to your job. Callback within 15 minutes.",
    heroGagPhoto: sitePhotos.commercialTeam,
    heroGagAlt:
      "Specialist Movers team in uniform with company trucks ready for commercial work",
    heroOverlayCaption: "You run the business. We move the gear.",
    heroVariant: "moving",
    aboutSidePhoto: sitePhotos.commercialFitOut,
    aboutSidePhotoAlt:
      "Specialist Movers crew on a commercial kitchen and fit out job",
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

import {
  pianoMomentPhotoBySlug,
  premiumServicePhotoLayout,
  serviceMomentPhotoBySlug,
  sitePhotos,
} from "@/lib/site-photos";
import type { JobType } from "@/lib/site-data";

const p125 = "/photos/source/batch-p125";
const p126 = "/photos/source/batch-p126-p127";

export type PagePhotoMoment = {
  photo: string;
  alt: string;
  caption: string;
  /** Landscape vs standard hero crop */
  layout?: "wide" | "hero";
  /** Desktop: image + caption side by side (caption not on image) */
  captionPlacement?: "overlay" | "beside";
  /** Show Free quote + Request a call back under beside caption */
  showCta?: boolean;
  /** Pre-select service on inline quote form */
  defaultJobType?: JobType;
  /** Optional copy under beside caption (landing pages) */
  body?: string;
  /** Constrain photo block to half-page width (centered) */
  photoWrap?: "half" | "full";
  /** Keep faces in frame when object-cover crops (CSS object-position) */
  imageObjectPosition?: string;
  /** Override default aspect classes on HeroVisual */
  aspectClassName?: string;
};

/** Half-width brand moment + caption, one per main route (varied photos, not all piano). */
export const pagePhotoMoments: Record<string, PagePhotoMoment> = {
  home: {
    photo: sitePhotos.homeRainMoment,
    alt: "Specialist Movers crew in the rain while a client stays comfortable inside",
    caption: "Rain or shine, we\u2019ve got your back",
    layout: "wide",
    captionPlacement: "beside",
    photoWrap: "full",
    showCta: true,
    body:
      "We show up prepared, communicate clearly, and treat your belongings with care. Auckland and Hamilton bases, servicing Auckland and the Waikato every day.",
    aspectClassName:
      "aspect-[16/10] min-h-[14rem] sm:min-h-[16rem] lg:min-h-0 lg:aspect-[16/10] lg:max-h-[24rem]",
    imageObjectPosition: "center center",
  },
  "home-separator": {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Feel looked after from quote to handover",
    showCta: false,
    body: "One team, one point of contact, no surprises.",
  },
  "why-us": {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Service like no other",
    showCta: true,
    body:
      "SiteWise Gold certified, 90%+ safety scores, and crews who treat your home like their own. We plan every move properly so you can relax while we handle the heavy work.",
  },
  about: {
    photo: `${p126}/P1260446.jpg`,
    alt: "Specialist Movers team packing carefully in a home",
    caption: "Real people. Real care.",
    layout: "wide",
    captionPlacement: "beside",
    photoWrap: "full",
    showCta: true,
    body:
      "We are a 100% New Zealand-owned team with over 60 years of combined moving industry experience. With bases in Auckland (Wairau Valley) and Hamilton, we move homes, pianos, and commercial work across Auckland, Hamilton, and the wider Waikato every day.",
    aspectClassName:
      "aspect-[4/5] min-h-[14rem] sm:aspect-[3/4] sm:min-h-[18rem] lg:min-h-0 lg:aspect-[4/5] lg:max-h-[26rem]",
    imageObjectPosition: "center 8%",
  },
  contact: {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Service like no other",
    showCta: true,
    body:
      "Phone, email, or the form below. We aim to call back within 15 minutes, seven days a week, with a clear quote and next steps.",
  },
  faq: {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Service like no other",
    showCta: true,
    body:
      "Straight answers on pricing, packing, and booking. For piano-specific questions, see our piano movers page or request a free quote.",
  },
  reviews: {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Ready for the same level of care?",
    showCta: true,
    body:
      "When you have read enough reviews, request a free quote or call back. We aim to respond within 15 minutes, seven days a week.",
    aspectClassName:
      "aspect-[4/3] min-h-[12rem] sm:aspect-[16/10] sm:min-h-[14rem] lg:min-h-0 lg:aspect-[16/10] lg:max-h-[20rem]",
    imageObjectPosition: "center 35%",
  },
  services: {
    photo: `${p125}/P1250366.jpg`,
    alt: "Specialist Movers loading a truck on an Auckland hillside",
    caption: "One team for every type of move",
    layout: "wide",
    captionPlacement: "beside",
    photoWrap: "full",
    showCta: true,
    body:
      "House, piano, office, commercial, packing, cleaning, and hard-to-shift items. Auckland and Hamilton bases with crews trained for careful, efficient moves.",
    aspectClassName:
      "aspect-[16/10] min-h-[14rem] sm:min-h-[16rem] lg:min-h-0 lg:aspect-[16/10] lg:max-h-[24rem]",
    imageObjectPosition: "center 30%",
  },
  "piano-movers": {
    photo: serviceMomentPhotoBySlug["piano-movers"],
    alt: "Specialist Movers team member caring for a piano in a home",
    caption: "More than movers",
    layout: "wide",
    captionPlacement: "beside",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "We are piano specialists first, trusted by Auckland retailers and hundreds of families across Auckland and the Waikato.",
  },
  blog: {
    photo: `${p126}/P1260347.jpg`,
    alt: "Specialist Movers team member wrapping items for transport",
    caption: "Advice from crews who do this every day",
    layout: "wide",
    captionPlacement: "beside",
    photoWrap: "full",
    showCta: true,
    body:
      "Practical tips for Auckland and Waikato moves, from packing timelines to choosing the right crew size.",
    aspectClassName:
      "aspect-[4/5] min-h-[14rem] sm:aspect-[3/4] sm:min-h-[18rem] lg:min-h-0 lg:aspect-[4/5] lg:max-h-[26rem]",
    imageObjectPosition: "center 20%",
  },
  policies: {
    ...premiumServicePhotoLayout,
    photo: sitePhotos.premiumService,
    alt: "Client at home while a Specialist Movers crew member serves champagne after a move",
    caption: "Service like no other",
    showCta: true,
    body:
      "Our privacy policy explains how we use your information. For booking terms, deposits, or damage questions on a specific move, contact us and we will walk you through it.",
  },
  "services/office-moving": {
    photo: serviceMomentPhotoBySlug["office-moving"],
    alt: "Specialist Movers crew on a workplace fit out and relocation job",
    caption: "More than movers",
    layout: "wide",
    captionPlacement: "beside",
    showCta: true,
    defaultJobType: "Office Move",
    body: "Workplace relocations planned properly, desks, IT, and files moved with care and clear timing.",
  },
  "services/house-moving": {
    photo: serviceMomentPhotoBySlug["house-moving"],
    alt: "Crew moving wrapped furniture into a home",
    caption: "More than movers",
    layout: "wide",
    captionPlacement: "beside",
    showCta: true,
    defaultJobType: "House Move",
    body: "House moves with real care, packing, heavy furniture, stairs, and clear communication from quote to handover.",
  },
  "services/piano-movers": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["piano-movers"],
    alt: "Crew moving a wrapped piano",
    caption: "Pianos are our specialty",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "Upright, grand, and specialist handling. Trusted by Auckland retailers and hundreds of families.",
  },
  "services/commercial-moving": {
    photo: serviceMomentPhotoBySlug["commercial-moving"],
    alt: "Specialist Movers crew on a commercial kitchen and fit out job",
    caption: "Fit outs, kitchens, gear",
    layout: "wide",
    captionPlacement: "beside",
    showCta: true,
    defaultJobType: "Commercial Move",
    body: "Kitchens, fit outs, staging, and equipment deliveries. Commercial work planned properly so your business keeps moving.",
  },
  "services/packing-services": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["packing-services"],
    alt: "Specialist Movers team carefully packing in a customer's home",
    caption: "Packed right the first time",
    showCta: true,
    defaultJobType: "Packing",
    body: "Professional packers the day before your move. Materials and labour included in fixed-price quotes.",
  },
  "services/hard-to-shift": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["hard-to-shift"],
    alt: "Specialist Movers crew positioning a heavy item with care",
    caption: "If it is awkward, we have done it before",
    showCta: true,
    defaultJobType: "Hard to Shift",
    body: "Pool tables, safes, gym gear, and bulky items moved with the right crew and equipment.",
  },
  "services/cleaning-services": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["cleaning-services"],
    alt: "Specialist Movers team packing in a modern kitchen",
    caption: "Move out ready, inside and out",
    showCta: true,
    defaultJobType: "Cleaning",
    body: "Fixed-price exit cleans sized to your home. Book alongside your move for one less thing to organise.",
  },
  "services/international-moving": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["international-moving"],
    alt: "Specialist Movers crew working in wet weather while the client stays comfortable",
    caption: "Auckland to wherever you are headed",
    showCta: true,
    defaultJobType: "House Move",
    body: "International relocations quoted to your destination with clear scope and timing.",
  },
  "services/loading-unloading": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["loading-unloading"],
    alt: "Crew loading the moving truck",
    caption: "Heavy lifting, handled safely",
    showCta: true,
    defaultJobType: "House Move",
    body: "Truck hire or container delivery? Our crew loads and unloads with care and efficiency.",
  },
  "services/winz-quotes": {
    ...premiumServicePhotoLayout,
    photo: serviceMomentPhotoBySlug["winz-quotes"],
    alt: "Friendly Specialist Movers team member",
    caption: "Clear quotes. No surprises.",
    showCta: true,
    defaultJobType: "House Move",
    body: "Written quotes for moving assistance applications. Fast follow-up and straightforward communication.",
  },
  "piano-movers/grand-piano": {
    ...premiumServicePhotoLayout,
    photo: pianoMomentPhotoBySlug["grand-piano"],
    alt: "Crew moving a grand piano",
    caption: "Grand pianos need grand care",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "Grand piano moves with specialist gear, protection, and experienced crews.",
  },
  "piano-movers/upright-piano": {
    ...premiumServicePhotoLayout,
    photo: pianoMomentPhotoBySlug["upright-piano"],
    alt: "Upright piano on specialist moving gear",
    caption: "Uprights done properly",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "Local upright moves from $300 (excl. GST). Stairs and access quoted clearly upfront.",
  },
  "piano-movers/international-piano": {
    ...premiumServicePhotoLayout,
    photo: pianoMomentPhotoBySlug["international-piano"],
    alt: "Piano loaded on a Specialist Movers truck",
    caption: "Across town or across borders",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "International piano shipping coordinated with clear timelines and handling.",
  },
  "piano-movers/piano-storage": {
    ...premiumServicePhotoLayout,
    photo: pianoMomentPhotoBySlug["piano-storage"],
    alt: "Piano wrapped for safe transport or storage",
    caption: "Wrapped, stored, protected",
    showCta: true,
    defaultJobType: "Piano Move",
    body: "Short- or long-term piano storage with proper wrapping and climate-aware handling.",
  },
};

export function getPagePhotoMoment(key: string): PagePhotoMoment | undefined {
  return pagePhotoMoments[key];
}

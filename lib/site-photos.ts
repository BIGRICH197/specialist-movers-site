/**
 * Curated photo paths (60 originals in public/photos/source).
 * Filenames match WeTransfer batches , swap any time in this file.
 */
import {
  hardToShiftAboutPhoto,
  hardToShiftCardPhoto,
  hardToShiftMomentPhoto,
} from "@/lib/hard-to-shift-gallery";

const p125 = "/photos/source/batch-p125";
const p126 = "/photos/source/batch-p126-p127";

export const sitePhotos = {
  /** Couch gag , homepage hero (client reading while we carry the sofa) */
  homeHero: `${p126}/P1260739.jpg`,
  /** Champagne moment , homepage hero hover (Richard serving client) */
  homeHeroHover: `${p126}/P1260963.jpg`,
  /** Rain day , crew outside in wet weather, client relaxed inside */
  homeRainMoment: `${p126}/P1260935.jpg`,
  /** Team + trucks at depot , about page */
  aboutTeam: `${p125}/P1250030.jpg`,
  /** Commercial hero , truck load (not house couch gag) */
  commercialHero: `${p125}/P1250386.jpg`,
  /** Packing team in kitchen , packing pages only (P1260077) */
  kitchenPack: `${p126}/P1260077.jpg`,
  /** Commercial brand moment , truck on site */
  commercialOnSite: `${p125}/P1250366.jpg`,
  /** Commercial , team + trucks at depot (group photo) */
  commercialTeam: `${p125}/P1250030.jpg`,
  /** Piano move , crew with wrapped upright */
  pianoMove: `${p125}/P1250551.jpg`,
  /** Piano team + truck , cropped desktop original (P1250409.jpg) */
  pianoAbout: `${p125}/P1250409-cropped.jpg`,
  /** Piano care , upright in home (piano pages only) */
  pianoCare: `${p125}/P1250887.jpg`,
  /** House move , crew with wrapped furniture */
  houseMove: `${p125}/P1250461.jpg`,
  /** Office move , crew carrying boxes past client (through glass doors) */
  officeMove: `${p126}/P1260879.jpg`,
  /** Hard to shift , homepage service card (crane truck on site) */
  hardToShift: hardToShiftCardPhoto,
  /** Premium service , you looking at camera, crew serving (Why Us, FAQ, Contact, etc.) */
  premiumService: `${p126}/P1260963.jpg`,
  /** Truck loading */
  truckLoad: `${p125}/P1250366.jpg`,
  /** Exit clean / kitchen handover */
  cleaningHero: `${p126}/P1260080.jpg`,
  /** Packing , bubble wrap in kitchen */
  packing: `${p126}/P1260453.jpg`,
  /** Wrapped furniture / specialist handling */
  specialistItem: `${p125}/P1250461.jpg`,
  /** Piano positioning under furniture */
  pianoDetail: `${p125}/P1250836.jpg`,
  /** Office brand moment , differs from officeMove hero */
  officeMoment: `${p125}/P1250510.jpg`,
  /** House brand moment , differs from houseMove hero on Hamilton/local pages */
  houseMoment: `${p126}/P1260347.jpg`,
  /** Exit clean brand moment , differs from cleaningHero */
  cleaningMoment: `${p126}/P1260162.jpg`,
  /** Storage brand moment */
  storageMoment: `${p125}/P1250977.jpg`,
  /** Office about-side , differs from officeMove hero */
  officeAbout: `${p126}/P1260017.jpg`,
} as const;

/** Shared purple-band layout for the premium service photo (faces in frame). */
export const premiumServicePhotoLayout = {
  layout: "wide" as const,
  captionPlacement: "beside" as const,
  photoWrap: "full" as const,
  aspectClassName:
    "aspect-[16/10] min-h-[14rem] sm:min-h-[16rem] lg:min-h-0 lg:aspect-[16/10] lg:max-h-[24rem]",
  imageObjectPosition: "center center",
};

/** Service hub cards + service page heroes */
export const servicePhotoBySlug: Record<string, string> = {
  // Richard picked this shot for the homepage tile (2026-08-11). It shared
  // houseMove before, which rendered as a dark shrink-wrap close-up and read
  // badly as the first thing on the page. Without a key here the card renders
  // its text beside an empty photo well, because <SitePhoto> only mounts when
  // getServicePhoto returns something.
  "furniture-movers": `${p125}/P1250050.jpg`,
  "house-moving": sitePhotos.homeHero,
  "office-moving": sitePhotos.officeMove,
  "piano-movers": sitePhotos.pianoMove,
  "commercial-moving": sitePhotos.commercialHero,
  "packing-services": sitePhotos.packing,
  "hard-to-shift": sitePhotos.hardToShift,
  "loading-unloading": sitePhotos.truckLoad,
  "cleaning-services": sitePhotos.cleaningHero,
  "international-moving": sitePhotos.commercialHero,
  "winz-quotes": sitePhotos.aboutTeam,
  storage: sitePhotos.specialistItem,
  "local-moving": sitePhotos.houseMove,
  "regional-moving": sitePhotos.truckLoad,
  "short-term-storage": sitePhotos.specialistItem,
  "long-term-storage": sitePhotos.specialistItem,
  "storage-in-transit": sitePhotos.truckLoad,
  "overnight-storage": sitePhotos.truckLoad,
  "piano-storage": sitePhotos.pianoCare,
};

/**
 * Purple-band brand moment on service pages , must not match the hero above.
 * Pair with servicePhotoBySlug when adding or editing a service route.
 */
export const serviceMomentPhotoBySlug: Record<string, string> = {
  "house-moving": sitePhotos.houseMoment,
  "office-moving": sitePhotos.officeMoment,
  "piano-movers": sitePhotos.pianoCare,
  "commercial-moving": sitePhotos.commercialOnSite,
  "packing-services": sitePhotos.kitchenPack,
  "hard-to-shift": hardToShiftMomentPhoto,
  "loading-unloading": `${p125}/P1250386.jpg`,
  "cleaning-services": sitePhotos.cleaningMoment,
  "international-moving": sitePhotos.homeRainMoment,
  "winz-quotes": `${p125}/P1250204.jpg`,
  storage: sitePhotos.storageMoment,
};

/** Piano sub-service pages , moment photo differs from pianoPhotoBySlug hero */
export const pianoMomentPhotoBySlug: Record<string, string> = {
  "grand-piano": sitePhotos.pianoCare,
  "upright-piano": sitePhotos.pianoMove,
  "international-piano": sitePhotos.homeRainMoment,
  "piano-storage": sitePhotos.pianoMove,
  "piano-tuning": sitePhotos.pianoCare,
};

export const pianoPhotoBySlug: Record<string, string> = {
  "grand-piano": sitePhotos.pianoMove,
  "upright-piano": `${p125}/P1250437.jpg`,
  "international-piano": `${p125}/P1250386.jpg`,
  "piano-storage": sitePhotos.pianoCare,
  "piano-tuning": "/photos/piano-gallery/piano-tuning.jpg",
};

export function getServicePhoto(slug: string): string | undefined {
  return servicePhotoBySlug[slug];
}

export function getServiceMomentPhoto(slug: string): string | undefined {
  return serviceMomentPhotoBySlug[slug];
}

/**
 * About-section photo on service/cluster templates — must differ from hero
 * and purple-band moment on the same page.
 */
export const serviceAboutPhotoBySlug: Record<string, string> = {
  "house-moving": sitePhotos.houseMove,
  "office-moving": sitePhotos.officeAbout,
  "piano-movers": sitePhotos.pianoAbout,
  "commercial-moving": sitePhotos.commercialTeam,
  "packing-services": `${p126}/P1260446.jpg`,
  "hard-to-shift": hardToShiftAboutPhoto,
  "cleaning-services": sitePhotos.packing,
  "international-moving": sitePhotos.houseMove,
  "loading-unloading": sitePhotos.commercialTeam,
  "winz-quotes": sitePhotos.officeMoment,
  storage: sitePhotos.truckLoad,
  "local-moving": sitePhotos.homeHero,
  "regional-moving": sitePhotos.houseMove,
  "short-term-storage": sitePhotos.truckLoad,
  "long-term-storage": sitePhotos.truckLoad,
  "storage-in-transit": sitePhotos.houseMove,
  "overnight-storage": sitePhotos.houseMove,
  "piano-storage": sitePhotos.pianoAbout,
};

export function getServiceAboutPhoto(slug: string): string | undefined {
  return serviceAboutPhotoBySlug[slug];
}

/** About-section photo that never matches the page hero (hero / moment / about must differ). */
export function getDistinctAboutPhoto(slug: string, heroSrc: string): string {
  const preferred = getServiceAboutPhoto(slug);
  if (preferred && preferred !== heroSrc) return preferred;

  const fallbacks: Record<string, string> = {
    "house-moving": sitePhotos.homeHero,
    "office-moving": sitePhotos.officeMoment,
    "piano-movers": sitePhotos.pianoCare,
    "commercial-moving": sitePhotos.commercialOnSite,
    "packing-services": sitePhotos.kitchenPack,
    "cleaning-services": sitePhotos.cleaningMoment,
    "hard-to-shift": hardToShiftMomentPhoto,
    "loading-unloading": sitePhotos.commercialHero,
    storage: sitePhotos.storageMoment,
    "local-moving": sitePhotos.houseMoment,
    "regional-moving": sitePhotos.truckLoad,
  };

  const candidates = [
    fallbacks[slug],
    sitePhotos.houseMoment,
    sitePhotos.officeAbout,
    sitePhotos.homeRainMoment,
    `${p126}/P1260446.jpg`,
  ].filter((src): src is string => Boolean(src) && src !== heroSrc);

  return candidates[0] ?? sitePhotos.officeAbout;
}

export function getPianoMomentPhoto(slug: string): string | undefined {
  return pianoMomentPhotoBySlug[slug];
}

export function getPianoPhoto(slug: string): string | undefined {
  return pianoPhotoBySlug[slug] ?? sitePhotos.pianoMove;
}

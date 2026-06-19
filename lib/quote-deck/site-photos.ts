/**
 * Curated photo paths (60 originals in public/photos/source).
 * Filenames match WeTransfer batches , swap any time in this file.
 */
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
  /** Commercial about , crew on a fit out / kitchen job */
  commercialFitOut: `${p126}/P1260077.jpg`,
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
  /** Hard to shift , specialist awkward item handling */
  hardToShift: `${p125}/P1250836.jpg`,
  /** Premium service , you looking at camera, crew serving (Why Us, FAQ, Contact, etc.) */
  premiumService: `${p126}/P1260963.jpg`,
  /** Truck loading */
  truckLoad: `${p125}/P1250366.jpg`,
  /** Kitchen packing team */
  kitchenPack: `${p126}/P1260077.jpg`,
  /** Packing , bubble wrap in kitchen */
  packing: `${p126}/P1260453.jpg`,
  /** Wrapped furniture / specialist handling */
  specialistItem: `${p125}/P1250461.jpg`,
  /** Piano positioning under furniture */
  pianoDetail: `${p125}/P1250836.jpg`,
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
  "house-moving": sitePhotos.homeHero,
  "office-moving": sitePhotos.officeMove,
  "piano-movers": sitePhotos.pianoMove,
  "commercial-moving": sitePhotos.commercialTeam,
  "packing-services": sitePhotos.packing,
  "hard-to-shift": sitePhotos.hardToShift,
  "loading-unloading": sitePhotos.truckLoad,
  "cleaning-services": sitePhotos.kitchenPack,
  "international-moving": `${p125}/P1250386.jpg`,
  "winz-quotes": sitePhotos.aboutTeam,
};

/**
 * Purple-band brand moment on service pages , must not match the hero above.
 * Pair with servicePhotoBySlug when adding or editing a service route.
 */
export const serviceMomentPhotoBySlug: Record<string, string> = {
  "house-moving": sitePhotos.houseMove,
  "office-moving": sitePhotos.commercialFitOut,
  "piano-movers": sitePhotos.pianoCare,
  "commercial-moving": sitePhotos.commercialFitOut,
  "packing-services": `${p126}/P1260446.jpg`,
  "hard-to-shift": `${p125}/P1250878.jpg`,
  "loading-unloading": `${p125}/P1250386.jpg`,
  "cleaning-services": `${p126}/P1260080.jpg`,
  "international-moving": sitePhotos.homeRainMoment,
  "winz-quotes": `${p125}/P1250204.jpg`,
};

/** Piano sub-service pages , moment photo differs from pianoPhotoBySlug hero */
export const pianoMomentPhotoBySlug: Record<string, string> = {
  "grand-piano": sitePhotos.pianoCare,
  "upright-piano": sitePhotos.pianoMove,
  "international-piano": sitePhotos.homeRainMoment,
  "piano-storage": sitePhotos.pianoMove,
};

export const pianoPhotoBySlug: Record<string, string> = {
  "grand-piano": sitePhotos.pianoMove,
  "upright-piano": `${p125}/P1250437.jpg`,
  "international-piano": `${p125}/P1250386.jpg`,
  "piano-storage": sitePhotos.pianoCare,
};

export function getServicePhoto(slug: string): string | undefined {
  return servicePhotoBySlug[slug];
}

export function getServiceMomentPhoto(slug: string): string | undefined {
  return serviceMomentPhotoBySlug[slug];
}

export function getPianoMomentPhoto(slug: string): string | undefined {
  return pianoMomentPhotoBySlug[slug];
}

export function getPianoPhoto(slug: string): string | undefined {
  return pianoPhotoBySlug[slug] ?? sitePhotos.pianoMove;
}

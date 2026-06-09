/**
 * Audit duplicate photos per page (static analysis of lib mappings).
 * Run: node scripts/audit-page-photos.mjs
 */
const p125 = "/photos/source/batch-p125";
const p126 = "/photos/source/batch-p126-p127";

const sitePhotos = {
  homeHero: `${p126}/P1260739.jpg`,
  homeRainMoment: `${p126}/P1260935.jpg`,
  aboutTeam: `${p125}/P1250030.jpg`,
  commercialHero: `${p125}/P1250386.jpg`,
  kitchenPack: `${p126}/P1260077.jpg`,
  commercialOnSite: `${p125}/P1250366.jpg`,
  commercialTeam: `${p125}/P1250030.jpg`,
  pianoMove: `${p125}/P1250551.jpg`,
  pianoAbout: `${p125}/P1250409-cropped.jpg`,
  pianoCare: `${p125}/P1250887.jpg`,
  houseMove: `${p125}/P1250461.jpg`,
  officeMove: `${p126}/P1260879.jpg`,
  hardToShift: `${p125}/P1250836.jpg`,
  truckLoad: `${p125}/P1250366.jpg`,
  cleaningHero: `${p126}/P1260080.jpg`,
  packing: `${p126}/P1260453.jpg`,
  specialistItem: `${p125}/P1250461.jpg`,
  officeMoment: `${p125}/P1250510.jpg`,
  houseMoment: `${p126}/P1260347.jpg`,
  cleaningMoment: `${p126}/P1260162.jpg`,
  storageMoment: `${p125}/P1250977.jpg`,
  officeAbout: `${p126}/P1260017.jpg`,
};

const servicePhotoBySlug = {
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

const serviceMomentPhotoBySlug = {
  "house-moving": sitePhotos.houseMoment,
  "office-moving": sitePhotos.officeMoment,
  "piano-movers": sitePhotos.pianoCare,
  "commercial-moving": sitePhotos.commercialOnSite,
  "packing-services": sitePhotos.kitchenPack,
  "hard-to-shift": `${p125}/P1250878.jpg`,
  "loading-unloading": `${p125}/P1250386.jpg`,
  "cleaning-services": sitePhotos.cleaningMoment,
  "international-moving": sitePhotos.homeRainMoment,
  "winz-quotes": `${p125}/P1250204.jpg`,
  storage: sitePhotos.storageMoment,
};

const serviceAboutPhotoBySlug = {
  "house-moving": sitePhotos.houseMove,
  "office-moving": sitePhotos.officeAbout,
  "piano-movers": sitePhotos.pianoAbout,
  "commercial-moving": sitePhotos.commercialTeam,
  "packing-services": `${p126}/P1260446.jpg`,
  "hard-to-shift": sitePhotos.houseMove,
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

function dupes(slots) {
  const seen = new Map();
  const d = [];
  for (const [name, path] of Object.entries(slots)) {
    if (!path) continue;
    if (seen.has(path)) d.push({ path, slots: [seen.get(path), name] });
    else seen.set(path, name);
  }
  return d;
}

function report(page, slots) {
  const d = dupes(slots);
  if (d.length) console.log(`DUPLICATE: ${page}`, JSON.stringify(d, null, 2));
}

const representatives = [
  "office-moving",
  "packing-services",
  "commercial-moving",
  "house-moving",
  "cleaning-services",
  "loading-unloading",
  "storage",
  "local-moving",
];

for (const slug of representatives) {
  report(`services/${slug}`, {
    hero: servicePhotoBySlug[slug],
    moment: serviceMomentPhotoBySlug[slug],
    about: serviceAboutPhotoBySlug[slug],
  });
}

function hamiltonAbout(slug, hero) {
  const preferred = serviceAboutPhotoBySlug[slug];
  if (preferred && preferred !== hero) return preferred;
  if (slug === "house-moving") return sitePhotos.homeHero;
  return serviceAboutPhotoBySlug[slug];
}

const hamiltonHeroBySlug = {
  "house-moving": sitePhotos.houseMove,
  "office-moving": sitePhotos.officeMove,
  "commercial-moving": sitePhotos.commercialHero,
  "packing-services": sitePhotos.packing,
  "cleaning-services": sitePhotos.cleaningHero,
};

for (const slug of Object.keys(hamiltonHeroBySlug)) {
  const hero = hamiltonHeroBySlug[slug];
  report(`hamilton/${slug}-hamilton`, {
    hero,
    moment: serviceMomentPhotoBySlug[slug],
    about: hamiltonAbout(slug, hero),
  });
}

report("landing/house-moving", {
  heroGag: sitePhotos.homeHero,
  moment: serviceMomentPhotoBySlug["house-moving"],
  about: sitePhotos.houseMove,
});

report("landing/commercial-moving", {
  heroGag: sitePhotos.commercialTeam,
  moment: serviceMomentPhotoBySlug["commercial-moving"],
  about: sitePhotos.commercialHero,
});

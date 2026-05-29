import { sitePhotos } from "@/lib/site-photos";

export const champagneHoverAlt =
  "Client at home while a Specialist Movers crew member serves champagne after a move";

export const couchGagHoverAlt =
  "Specialist Movers carrying a sofa while the client relaxes and reads a magazine";

export type PhotoHoverPair = {
  src: string;
  alt: string;
};

const alt = {
  rain: "Specialist Movers crew in the rain while a client stays comfortable inside",
  team: "Specialist Movers team in uniform with company trucks",
  truck: "Specialist Movers loading a truck on an Auckland hillside",
  fitOut: "Specialist Movers crew on a commercial fit out job",
  pianoMove: "Specialist Movers crew moving a wrapped piano",
  pianoCare: "Piano cared for in a customer's home",
  upright: "Upright piano on specialist moving gear",
  house: "Crew moving wrapped furniture into a home",
  office: "Specialist Movers crew carrying boxes on an office move",
  awkward: "Specialist Movers crew positioning a heavy item with care",
  packing: "Specialist Movers team carefully packing in a home",
  kitchen: "Specialist Movers team packing in a modern kitchen",
  cleaning: "Specialist Movers team preparing a home for move-out clean",
  wrap: "Specialist Movers team member wrapping items for transport",
  friendly: "Friendly Specialist Movers team member",
} as const;

/**
 * Hover photo pool (copied from OneDrive folder into `public/`).
 * Note: hover image alt text is not user-facing because the primary image alt
 * remains the accessible label; hover images are aria-hidden.
 */
const hoverPool: readonly string[] = [
  "/photos/hover/new-folder/P1250366.jpg",
  "/photos/hover/new-folder/P1250510.jpg",
  "/photos/hover/new-folder/P1250878.jpg",
  "/photos/hover/new-folder/P1250935.jpg",
  "/photos/hover/new-folder/P1250977.jpg",
  "/photos/hover/new-folder/P1260017.jpg",
  "/photos/hover/new-folder/P1260162.jpg",
  "/photos/hover/new-folder/P1260347.jpg",
  "/photos/hover/new-folder/P1270102.jpg",
  "/photos/hover/new-folder/P1270110.jpg",
  "/photos/hover/new-folder/P1270116.jpg",
] as const;

/**
 * Each primary photo swaps to a different scene on hover (not always champagne).
 * Homepage hero keeps couch → champagne via explicit props on HomeHero.
 * Other pages: hover off unless `hoverSwap` is set (home photo moment strip only).
 */
const photoHoverBySrc: Record<string, PhotoHoverPair> = {
  [sitePhotos.homeRainMoment]: {
    src: sitePhotos.houseMove,
    alt: alt.wrap,
  },
  [sitePhotos.aboutTeam]: {
    src: hoverPool[1]!,
    alt: "",
  },
  [sitePhotos.commercialHero]: {
    src: hoverPool[2]!,
    alt: "",
  },
  [sitePhotos.commercialFitOut]: {
    src: hoverPool[3]!,
    alt: "",
  },
  [sitePhotos.commercialOnSite]: {
    src: hoverPool[4]!,
    alt: "",
  },
  [sitePhotos.pianoMove]: {
    src: hoverPool[5]!,
    alt: "",
  },
  [sitePhotos.pianoAbout]: {
    src: hoverPool[6]!,
    alt: "",
  },
  [sitePhotos.pianoCare]: {
    src: hoverPool[7]!,
    alt: "",
  },
  [sitePhotos.houseMove]: {
    src: hoverPool[8]!,
    alt: "",
  },
  [sitePhotos.officeMove]: {
    src: hoverPool[9]!,
    alt: "",
  },
  [sitePhotos.hardToShift]: {
    src: hoverPool[10]!,
    alt: "",
  },
  [sitePhotos.premiumService]: {
    src: sitePhotos.homeHero,
    alt: couchGagHoverAlt,
  },
  [sitePhotos.packing]: {
    src: hoverPool[10]!,
    alt: alt.wrap,
  },
};

/** Fallback pool when a path is not mapped. */
const hoverFallbackPool: PhotoHoverPair[] = [
  ...hoverPool.map((src) => ({ src, alt: "" })),
  { src: sitePhotos.homeRainMoment, alt: alt.rain },
  { src: sitePhotos.officeMove, alt: alt.office },
  { src: sitePhotos.houseMove, alt: alt.house },
  { src: sitePhotos.pianoMove, alt: alt.pianoMove },
];

function hashPath(path: string): number {
  let h = 0;
  for (let i = 0; i < path.length; i += 1) {
    h = (h * 31 + path.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function fallbackHover(primarySrc: string): PhotoHoverPair {
  const pool = hoverFallbackPool.filter((item) => item.src !== primarySrc);
  const pick = pool[hashPath(primarySrc) % pool.length] ?? pool[0];
  return pick;
}

export function resolvePhotoHover(primarySrc: string): PhotoHoverPair | undefined {
  if (primarySrc === sitePhotos.homeHeroHover) {
    return { src: sitePhotos.homeHero, alt: couchGagHoverAlt };
  }
  if (primarySrc === sitePhotos.homeHero) {
    return { src: sitePhotos.homeRainMoment, alt: alt.rain };
  }

  const mapped = photoHoverBySrc[primarySrc];
  if (mapped && mapped.src !== primarySrc) {
    return mapped;
  }

  const fallback = fallbackHover(primarySrc);
  if (fallback.src === primarySrc) {
    return undefined;
  }
  return fallback;
}

export function getPhotoHoverProps(
  primarySrc: string,
  explicit?: PhotoHoverPair | null,
): PhotoHoverPair | undefined {
  const pair = explicit ?? resolvePhotoHover(primarySrc);
  if (!pair || pair.src === primarySrc) return undefined;
  return pair;
}

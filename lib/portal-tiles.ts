import { sitePhotos } from "@/lib/site-photos";

export type PortalTile = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  imageAlt: string;
};

/** Four entry points for the trial portal page */
export const portalTiles: readonly PortalTile[] = [
  {
    title: "House move",
    subtitle: "Homes, apartments, and townhouses across Auckland and the Waikato",
    href: "/services/house-moving",
    image: sitePhotos.homeHero,
    imageAlt: "Specialist Movers carrying furniture during a house move",
  },
  {
    title: "Piano move",
    subtitle: "Upright and grand pianos , trusted by Auckland music stores",
    href: "/piano-movers",
    image: sitePhotos.pianoMove,
    imageAlt: "Specialist Movers crew moving a piano",
  },
  {
    title: "Commercial move",
    subtitle: "Offices, fit outs, and workplace relocations",
    href: "/services/commercial-moving",
    image: sitePhotos.commercialHero,
    imageAlt: "Specialist Movers commercial moving truck on site",
  },
  {
    title: "Packing & cleaning",
    subtitle: "Packers, exit cleans, and more services , or learn about us",
    href: "/services",
    image: sitePhotos.packing,
    imageAlt: "Specialist Movers team packing a home",
  },
] as const;

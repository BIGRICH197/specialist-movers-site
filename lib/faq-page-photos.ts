import { sitePhotos } from "@/lib/site-photos";

/** Small sidebar gallery on /faq , each src must be unique (React keys + no repeats). */
export const faqSidebarPhotos = [
  {
    src: sitePhotos.officeMove,
    alt: "Crew carrying office boxes past a client at home",
  },
  {
    src: sitePhotos.pianoMove,
    alt: "Specialist Movers team with a wrapped upright piano",
  },
  {
    src: sitePhotos.houseMove,
    alt: "Crew moving wrapped furniture into a home",
  },
  {
    src: sitePhotos.packing,
    alt: "Packer wrapping items with bubble wrap",
  },
  {
    src: sitePhotos.commercialOnSite,
    alt: "Specialist Movers crew loading a truck on site",
  },
  {
    src: sitePhotos.truckLoad,
    alt: "Crew loading a Specialist Movers truck on an Auckland hillside",
  },
  {
    src: sitePhotos.hardToShift,
    alt: "Crew positioning a heavy item with specialist gear",
  },
] as const;

import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import { getLocation } from "@/lib/locations";

export type LocationNavLink = {
  label: string;
  href: string;
  slug?: string;
};

export type LocationNavSubsection = {
  title?: string;
  links: readonly LocationNavLink[];
  footnote?: string;
};

export type LocationNavDepotColumn = {
  id: "hamilton" | "auckland";
  depotTitle: string;
  coverageTitle: string;
  primaryLink?: LocationNavLink;
  subsections: readonly LocationNavSubsection[];
};

function locationHref(slug: string): string {
  return getLocation(slug) ? `/locations/${slug}` : "/contact";
}

function link(label: string, slug: string): LocationNavLink {
  return { label, href: locationHref(slug), slug };
}

/**
 * Service areas derived from Hamilton/Auckland pricing zones
 * (hamilton-pricing-data.ts, pricing-data.ts) and existing location pages.
 */
const hamiltonWaikatoLinks: LocationNavLink[] = [
  link("Hamilton", "hamilton"),
  link("Cambridge", "cambridge"),
  link("Te Awamutu", "te-awamutu"),
  link("Morrinsville", "morrinsville"),
  link("Matamata", "matamata"),
  link("Raglan", "raglan"),
];

const hamiltonRegionalLinks: LocationNavLink[] = [
  link("Thames", "thames"),
  link("Waihi", "waihi"),
  link("Coromandel", "coromandel"),
  link("Tauranga", "tauranga"),
  link("Mount Maunganui", "mount-maunganui"),
  link("Rotorua", "rotorua"),
  link("Taupo", "taupo"),
  link("Napier", "napier"),
  link("Hastings", "hastings"),
  link("Palmerston North", "palmerston-north"),
  link("Wellington", "wellington"),
];

/** Rodney, Kaipara, and Northland, Auckland depot regional schedule. */
const upperNorthIslandLinks: LocationNavLink[] = [
  link("Warkworth", "warkworth"),
  link("Wellsford", "wellsford"),
  link("Helensville", "helensville"),
  link("Whangarei", "whangarei"),
  link("Kerikeri", "kerikeri"),
  link("Paihia", "paihia"),
];

export const locationNavDepotColumns: readonly LocationNavDepotColumn[] = [
  {
    id: "hamilton",
    depotTitle: "Hamilton depot",
    coverageTitle: "Servicing the Waikato through to Wellington",
    subsections: [
      { title: "Waikato", links: hamiltonWaikatoLinks },
      {
        title: "Regional North Island",
        links: hamiltonRegionalLinks,
      },
    ],
  },
  {
    id: "auckland",
    depotTitle: "Auckland depot",
    coverageTitle: "Servicing Auckland and the upper North Island",
    primaryLink: {
      label: "All Auckland suburbs",
      href: "/locations",
    },
    subsections: [
      {
        title: "Upper North Island",
        links: upperNorthIslandLinks,
      },
    ],
  },
] as const;

export const locationNavSidebarLinks: readonly LocationNavLink[] = [
  { label: "All locations", href: "/locations" },
  { label: "Regional moving", href: "/services/moving/regional-moving" },
  { label: "Moving house Auckland", href: aucklandServiceHref("house-moving") },
  { label: "Moving house Hamilton", href: "/services/house-moving-hamilton" },
] as const;

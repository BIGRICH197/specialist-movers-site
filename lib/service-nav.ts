import type { HamiltonBaseSlug } from "@/lib/hamilton-pages";
import { movingDistanceHub, storageHub } from "@/lib/service-clusters";
import { serviceAucklandHref, serviceHamiltonHref } from "@/lib/service-links";
import { services } from "@/lib/site-data";

export type ServiceNavLink = {
  label: string;
  href: string;
};

/** One row in the services menu — service name with Auckland / Hamilton links. */
export type ServiceNavRow = {
  key: string;
  /** Parent label in the menu (e.g. Piano moving) */
  label: string;
  auckland: ServiceNavLink;
  hamilton: ServiceNavLink | null;
};

const aucklandNavLabelBySlug: Record<string, string> = {
  "piano-movers": "Piano moving",
  "house-moving": "House moving",
  "office-moving": "Office moving",
  "commercial-moving": "Commercial moving",
  "packing-services": "Packing and unpacking",
  "hard-to-shift": "Hard to shift items",
  "cleaning-services": "Exit cleaning",
  "international-moving": "International moving",
  "loading-unloading": "Loading and unloading",
  "winz-quotes": "WINZ quotes",
  storage: "Moving storage",
};

function aucklandLabel(slug: string): string {
  return aucklandNavLabelBySlug[slug] ?? services.find((s) => s.slug === slug)?.title ?? slug;
}

function buildServiceNavRow(base: HamiltonBaseSlug): ServiceNavRow {
  return {
    key: base,
    label: aucklandLabel(base),
    auckland: {
      label: "Auckland",
      href: serviceAucklandHref(base),
    },
    hamilton: {
      label: "Hamilton",
      href: serviceHamiltonHref(base),
    },
  };
}

/** Mega menu left column — house and packing first. */
const serviceNavMenuLeftSlugs: readonly HamiltonBaseSlug[] = [
  "house-moving",
  "packing-services",
  "office-moving",
  "commercial-moving",
  "hard-to-shift",
  "cleaning-services",
];

/** Mega menu right column — piano moving first. */
const serviceNavMenuRightSlugs: readonly HamiltonBaseSlug[] = [
  "piano-movers",
  "international-moving",
  "loading-unloading",
  "winz-quotes",
  "storage",
];

/** Paired Auckland / Hamilton rows for footer navigation. */
export function getServiceNavRows(): ServiceNavRow[] {
  return [...serviceNavMenuLeftSlugs, ...serviceNavMenuRightSlugs].map(buildServiceNavRow);
}

/** Two-column layout for the header services mega menu. */
export function getServiceNavMenuColumns(): {
  left: ServiceNavRow[];
  right: ServiceNavRow[];
} {
  return {
    left: serviceNavMenuLeftSlugs.map(buildServiceNavRow),
    right: serviceNavMenuRightSlugs.map(buildServiceNavRow),
  };
}

export type ServiceNavSection = {
  id: "auckland" | "hamilton";
  title: string;
  items: ServiceNavLink[];
};

/** Flat sections (Auckland list, then Hamilton list) for stacked menus. */
export function getServiceNavSections(): ServiceNavSection[] {
  const rows = getServiceNavRows();
  return [
    {
      id: "auckland",
      title: "Auckland services",
      items: rows.map((row) => row.auckland),
    },
    {
      id: "hamilton",
      title: "Hamilton services",
      items: rows.filter((row) => row.hamilton).map((row) => row.hamilton!),
    },
  ];
}

/** Auckland-only extras not in the paired grid (hub index). */
export const serviceNavHubLink = {
  label: "All services",
  href: "/services",
};

/** Cluster / guide pages — not main bookable services (footer and secondary nav). */
export const serviceNavClusterLinks: readonly ServiceNavLink[] = [
  { label: "What's included", href: "/services/whats-included" },
  { label: movingDistanceHub.title, href: movingDistanceHub.path },
  { label: "Storage options", href: storageHub.path },
] as const;

/** Piano sub-pages in the mega menu sidebar (not main service grid). */
export const serviceNavPianoExtras: readonly ServiceNavLink[] = [
  { label: "International Piano Shipping", href: "/piano-movers/international-piano" },
  { label: "Piano Storage", href: "/piano-movers/piano-storage" },
  { label: "Piano tuning", href: "/piano-movers/piano-tuning" },
] as const;

export const serviceNavCompanyLinks: readonly ServiceNavLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Policies", href: "/policies" },
] as const;

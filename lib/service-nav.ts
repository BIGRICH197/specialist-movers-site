import { getHamiltonPageConfig, hamiltonBaseSlugs, hamiltonPath } from "@/lib/hamilton-pages";
import { movingDistanceHub, storageHub } from "@/lib/service-clusters";
import { serviceHref } from "@/lib/service-links";
import { services } from "@/lib/site-data";

export type ServiceNavLink = {
  label: string;
  href: string;
};

/** One row in the services menu — Auckland and optional Hamilton counterpart. */
export type ServiceNavRow = {
  key: string;
  auckland: ServiceNavLink;
  hamilton: ServiceNavLink | null;
};

const aucklandNavLabelBySlug: Record<string, string> = {
  "piano-movers": "Piano movers",
  "house-moving": "House moving",
  "office-moving": "Office moving",
  "commercial-moving": "Commercial moving",
  "packing-services": "Packing services",
  "hard-to-shift": "Hard to shift items",
  "cleaning-services": "Exit cleaning",
  "international-moving": "International moving",
  "loading-unloading": "Loading and unloading",
  "winz-quotes": "WINZ quotes",
  storage: "Moving storage",
  moving: "Moving by distance",
};

function aucklandLabel(slug: string): string {
  return aucklandNavLabelBySlug[slug] ?? services.find((s) => s.slug === slug)?.title ?? slug;
}

function hamiltonLabel(baseSlug: string): string {
  const config = getHamiltonPageConfig(`${baseSlug}-hamilton`);
  if (config) return config.h1;
  if (baseSlug === "piano-movers") {
    return getHamiltonPageConfig("piano-movers-hamilton")?.h1 ?? "Piano movers Hamilton";
  }
  return aucklandLabel(baseSlug) + " Hamilton";
}

/** Paired Auckland / Hamilton rows for header and footer navigation. */
export function getServiceNavRows(): ServiceNavRow[] {
  const rows: ServiceNavRow[] = [];

  for (const base of hamiltonBaseSlugs) {
    rows.push({
      key: base,
      auckland: {
        label: aucklandLabel(base),
        href: serviceHref(base),
      },
      hamilton: {
        label: hamiltonLabel(base),
        href: hamiltonPath(base),
      },
    });
  }

  // Piano tuning — Auckland/Waikato service, no separate Hamilton page
  rows.splice(1, 0, {
    key: "piano-tuning",
    auckland: {
      label: "Piano tuning",
      href: "/piano-movers/piano-tuning",
    },
    hamilton: null,
  });

  return rows;
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
export const serviceNavHubLink: ServiceNavLink = {
  label: "All services",
  href: "/services",
};

export const serviceNavClusterLinks: readonly ServiceNavLink[] = [
  { label: "What's included", href: "/services/whats-included" },
  { label: movingDistanceHub.title, href: movingDistanceHub.path },
  { label: "Storage options", href: storageHub.path },
] as const;

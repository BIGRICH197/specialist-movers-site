import {
  clusterItemPath,
  getMovingDistanceService,
  getStorageService,
  movingDistanceHub,
  storageHub,
} from "@/lib/service-clusters";
import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import { hamiltonPath, type HamiltonBaseSlug } from "@/lib/hamilton-pages";
import { pianoServices, services } from "@/lib/site-data";

export function resolveServiceLink(
  slug: string,
): { href: string; label: string } | null {
  const s = services.find((x) => x.slug === slug);
  if (s) {
    return { href: aucklandServiceHref(s.slug), label: s.title };
  }
  const p = pianoServices.find((x) => x.slug === slug);
  if (p) return { href: `/piano-movers/${p.slug}`, label: p.title };
  if (slug === "piano-movers-hamilton") {
    return { href: "/piano-movers/hamilton", label: "Piano moving Hamilton" };
  }
  const moving = getMovingDistanceService(slug);
  if (moving) {
    return {
      href: clusterItemPath(movingDistanceHub.path, moving),
      label: moving.title,
    };
  }
  const storage = getStorageService(slug);
  if (storage) {
    return {
      href: clusterItemPath(storageHub.path, storage),
      label: storage.title,
    };
  }
  return null;
}

/** Canonical href for a main service slug (header, footer, cards). */
export function serviceHref(slug: string): string {
  return resolveServiceLink(slug)?.href ?? `/services/${slug}`;
}

/** Auckland city page, matches live WordPress URLs (see legacy-auckland-urls.json). */
export function serviceAucklandHref(slug: string): string {
  return aucklandServiceHref(slug);
}

/** Hamilton city page for paired services. */
export function serviceHamiltonHref(slug: HamiltonBaseSlug): string {
  return hamiltonPath(slug);
}

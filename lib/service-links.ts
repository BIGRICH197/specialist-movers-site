import {
  clusterItemPath,
  getMovingDistanceService,
  getStorageService,
  movingDistanceHub,
  storageHub,
} from "@/lib/service-clusters";
import { pianoServices, services } from "@/lib/site-data";

export function resolveServiceLink(
  slug: string,
): { href: string; label: string } | null {
  const s = services.find((x) => x.slug === slug);
  if (s) {
    const href =
      s.slug === "piano-movers" ? "/piano-movers" : `/services/${s.slug}`;
    return { href, label: s.title };
  }
  const p = pianoServices.find((x) => x.slug === slug);
  if (p) return { href: `/piano-movers/${p.slug}`, label: p.title };
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

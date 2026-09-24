/** Visible “Updated” line on key pages (refresh when copy or SEO changes). */
export const siteContentUpdated = "13 June 2026";

/** Same date, ISO, for sitemap lastmod. Keep the two in step. */
export const siteContentUpdatedIso = "2026-06-13";

/**
 * Per-route content dates for sitemap lastmod.
 *
 * app/sitemap.ts used to stamp `new Date()` across all 101 URLs, so every
 * entry carried the build timestamp and Google discarded the signal — it
 * ignores lastmod that isn't trustworthy per-URL. Add a route here whenever
 * its content genuinely changes; anything absent falls back to the site
 * baseline, which is still honest and still stable between builds.
 */
const routeContentDates: Record<string, string> = {
  "/blog/crane-lift-wairau-valley-third-fourth-floor-delivery": "2026-09-24",
  "/blog/crane-lift-wairau-valley-third-fourth-floor": "2026-09-24",
  "/blog/balcony-hoist-couch-freemans-bay": "2026-09-24",
  "/blog/balcony-fridge-delivery-st-heliers-auckland": "2026-09-24",
  "/blog/how-much-do-furniture-movers-cost-in-auckland": "2026-09-24",
  "/blog/how-much-does-it-cost-to-move-an-office-in-auckland": "2026-09-24",
  "/locations/wellington": "2026-08-19",
  "/locations/palmerston-north": "2026-08-19",
  "/locations/bucklands-beach": "2026-08-03",
  "/locations/papatoetoe": "2026-08-03",
  "/locations/ellerslie": "2026-08-12",
  "/locations/whangaparaoa": "2026-08-03",
  "/locations/helensville": "2026-08-19",
  "/locations/wellsford": "2026-08-24",
  "/locations/warkworth": "2026-08-24",
  "/locations/waiuku": "2026-08-31",
  "/locations/pukekohe": "2026-09-07",
  "/locations/manukau": "2026-08-24",
  "/locations/henderson": "2026-09-14",
  "/kitchen-and-joinery-delivery": "2026-09-01",
  "/pricing": "2026-08-10",
  "/movers-near-me": "2026-08-11",
  "/services/storage": "2026-08-11",
  "/office-movers-auckland": "2026-08-04",
  "/commercial-moving-auckland": "2026-08-04",
  "/blog/how-much-do-movers-cost-in-auckland": "2026-09-24",
  "/blog/diy-packing-vs-professional-packing-services": "2026-08-03",
  "/blog/planning-an-office-move-in-auckland": "2026-07-20",
  "/blog/hoist-move-newmarket-how-we-did-it": "2026-07-28",
  "/locations/mt-eden": "2026-07-29",
  "/locations/mount-albert": "2026-07-29",
  "/locations/torbay": "2026-07-24",
  "/locations/titirangi": "2026-07-24",
  "/locations/west-auckland": "2026-07-24",
  "/locations/te-awamutu": "2026-07-24",
  "/locations/huntly": "2026-07-24",
  "/locations/morrinsville": "2026-07-24",
  "/locations/ngaruawahia": "2026-07-24",
  "/locations/south-auckland": "2026-07-31",
};

/**
 * Last real content change for a route, as a Date for MetadataRoute.Sitemap.
 * Never returns build time.
 */
export function routeLastModified(path: string, fallbackIso?: string): Date {
  const iso = routeContentDates[path] ?? fallbackIso ?? siteContentUpdatedIso;
  return new Date(`${iso}T00:00:00.000Z`);
}

/**
 * Human-readable "Updated" label for a route, falling back to the site
 * baseline. Keeps the visible stamp in step with the sitemap lastmod above, so
 * a page we genuinely rewrote today does not still claim June.
 */
export function contentUpdatedLabelFor(path: string): string {
  const iso = routeContentDates[path];
  return iso ? formatContentUpdatedDate(iso) : siteContentUpdated;
}

export function formatContentUpdatedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

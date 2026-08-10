export type ServiceHeroCity = "Auckland" | "Hamilton";

export const serviceHeroSlugs = [
  "piano-movers",
  "house-moving",
  "office-moving",
  "commercial-moving",
  "packing-services",
  "hard-to-shift",
  "cleaning-services",
  "international-moving",
  "loading-unloading",
  "winz-quotes",
  "storage",
] as const;

export type ServiceHeroSlug = (typeof serviceHeroSlugs)[number];

/** Visible H1 on service heroes — `{service} {city}` pattern (matches piano).
 *  House pages deliberately say "Moving Company", NOT "house movers":
 *  Richard moved them off that term on purpose (7927154) and it is a brand
 *  decision, not an SEO one. In NZ "house movers" reads as building
 *  relocation. Do not change these back on an audit's say-so. */
const serviceHeroH1: Record<ServiceHeroCity, Record<ServiceHeroSlug, string>> = {
  Auckland: {
    "piano-movers": "Piano movers Auckland",
    "house-moving": "Auckland Moving Company",
    "office-moving": "Office movers Auckland",
    "commercial-moving": "Commercial movers Auckland",
    "packing-services": "Packing services Auckland",
    "hard-to-shift": "Hard to shift movers Auckland",
    "cleaning-services": "Exit cleaning Auckland",
    "international-moving": "International movers Auckland",
    "loading-unloading": "Loading and unloading Auckland",
    "winz-quotes": "WINZ moving quotes Auckland",
    storage: "Moving and storage Auckland",
  },
  Hamilton: {
    "piano-movers": "Piano movers Hamilton",
    "house-moving": "Hamilton Moving Company",
    "office-moving": "Office movers Hamilton",
    "commercial-moving": "Commercial movers Hamilton",
    "packing-services": "Packing services Hamilton",
    "hard-to-shift": "Hard to shift movers Hamilton",
    "cleaning-services": "Exit cleaning Hamilton",
    "international-moving": "International movers Hamilton",
    "loading-unloading": "Loading and unloading Hamilton",
    "winz-quotes": "WINZ moving quotes Hamilton",
    storage: "Moving and storage Hamilton",
  },
};

/** Cluster hub pages (not a HamiltonBaseSlug service slug). */
const hubHeroH1: Record<string, string> = {
  "moving-hub": "Moving services Auckland",
  "storage-hub": "Moving and storage Auckland",
};

export function getServiceHeroH1(
  slug: string,
  city: ServiceHeroCity,
): string {
  if ((serviceHeroSlugs as readonly string[]).includes(slug)) {
    return serviceHeroH1[city][slug as ServiceHeroSlug];
  }
  return hubHeroH1[slug] ?? `${slug} ${city}`;
}

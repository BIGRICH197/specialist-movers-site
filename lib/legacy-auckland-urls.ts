import legacyAucklandUrls from "./legacy-auckland-urls.json";

export type LegacyAucklandService = {
  slug: string;
  legacyPath: string;
  aliases?: string[];
};

export const legacyAucklandServices = legacyAucklandUrls as LegacyAucklandService[];

const slugToLegacy = new Map(
  legacyAucklandServices.map((entry) => [entry.slug, entry.legacyPath]),
);

/** Live WordPress Auckland URL for a service slug, if one exists. */
export function legacyPathForServiceSlug(slug: string): string | null {
  return slugToLegacy.get(slug) ?? null;
}

/** Canonical Auckland href — WordPress path when mapped, else /services/{slug}. */
export function aucklandServiceHref(slug: string): string {
  if (slug === "piano-movers") return "/piano-movers";
  return legacyPathForServiceSlug(slug) ?? `/services/${slug}`;
}

/** All legacy paths (primary + aliases) that should serve an Auckland service page. */
export function allLegacyAucklandPaths(): string[] {
  return legacyAucklandServices.flatMap((entry) => [
    entry.legacyPath,
    ...(entry.aliases ?? []),
  ]);
}

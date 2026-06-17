export type PianoMobileCity = "Auckland" | "Hamilton";

export const PIANO_MOBILE_TRUST_PILL =
  "Trusted by Steinway and music retailers";

export const pianoHeroSlugs = [
  "piano-movers",
  "grand-piano",
  "upright-piano",
  "international-piano",
  "piano-storage",
  "piano-tuning",
] as const;

export type PianoHeroSlug = (typeof pianoHeroSlugs)[number];

/** Visible hero titles on piano service pages — `{service} {city}`. */
const pianoHeroH1: Record<PianoMobileCity, Record<PianoHeroSlug, string>> = {
  Auckland: {
    "piano-movers": "Piano movers Auckland",
    "grand-piano": "Grand piano moving Auckland",
    "upright-piano": "Upright piano moving Auckland",
    "international-piano": "International piano shipping Auckland",
    "piano-storage": "Piano storage Auckland",
    "piano-tuning": "Piano tuning Auckland",
  },
  Hamilton: {
    "piano-movers": "Piano movers Hamilton",
    "grand-piano": "Grand piano moving Hamilton",
    "upright-piano": "Upright piano moving Hamilton",
    "international-piano": "International piano shipping Hamilton",
    "piano-storage": "Piano storage Hamilton",
    "piano-tuning": "Piano tuning Hamilton",
  },
};

export function inferPianoMobileCity(heading: string): PianoMobileCity | null {
  if (/hamilton/i.test(heading)) return "Hamilton";
  if (/auckland/i.test(heading)) return "Auckland";
  return null;
}

export function getPianoHeroH1(
  slug: string,
  city: PianoMobileCity = "Auckland",
): string {
  if ((pianoHeroSlugs as readonly string[]).includes(slug)) {
    return pianoHeroH1[city][slug as PianoHeroSlug];
  }
  return pianoHeroH1[city]["piano-movers"];
}

/** Fitted mobile title — sub-services use slug map; hub/city pages use full heading when set. */
export function getPianoMobileTitle(heading: string, slug?: string): string {
  const city = inferPianoMobileCity(heading) ?? "Auckland";

  if (slug && (pianoHeroSlugs as readonly string[]).includes(slug)) {
    return getPianoHeroH1(slug, city);
  }

  if (inferPianoMobileCity(heading)) {
    return heading;
  }

  return getPianoHeroH1("piano-movers", city);
}

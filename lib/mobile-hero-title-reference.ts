/** Shorter display copy on service mobile heroes (home title unchanged). */
export function normalizeServiceMobileHeroTitle(text: string): string {
  return text
    .replace(/\s+and\s+/gi, " & ")
    .replace(/\.\s+/g, " · ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fitted mobile hero title — not the SEO h1 (yellow desktop / sr-only mobile). */
const serviceMobileHeroTitleBySlug: Record<string, string> = {
  "winz-quotes": "WINZ quotes Auckland",
  storage: "Moving storage Auckland",
};

function inferHeroCity(heading: string): "Auckland" | "Hamilton" {
  return /Hamilton/i.test(heading) ? "Hamilton" : "Auckland";
}

export function getServiceMobileHeroTitle(
  slug: string | undefined,
  heading: string,
  eyebrowLabel?: string,
): string {
  const override = slug ? serviceMobileHeroTitleBySlug[slug] : undefined;
  if (override) {
    const city = inferHeroCity(heading);
    return normalizeServiceMobileHeroTitle(override.replace(/Auckland/g, city));
  }
  return normalizeServiceMobileHeroTitle(eyebrowLabel ?? heading);
}

/** Shorter display copy on service mobile heroes (home title unchanged). */
export function normalizeServiceMobileHeroTitle(text: string): string {
  return text
    .replace(/\s+and\s+/gi, " & ")
    .replace(/\.\s+/g, " · ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fitted mobile hero title — not the SEO h1 (yellow desktop / sr-only mobile). Use \\n for two lines (no uppercase). */
const serviceMobileHeroTitleBySlug: Record<string, string> = {
  "winz-quotes": "WINZ quotes Auckland",
  storage: "Moving storage Auckland",
  "retirement-home-movers-auckland":
    "Auckland Retirement Village\n& Rest-Home Moves",
  "retirement-home-movers-hamilton":
    "Hamilton Retirement Village\n& Rest-Home Moves",
  "packing-services": "Auckland Packing\n& Unpacking",
  "hard-to-shift": "Hard to Shift Items\nAuckland",
  "commercial-moving": "Auckland Commercial Movers",
  "office-moving": "Auckland Office Relocations",
  "house-moving": "Auckland Trusted Movers",
};

export function isMultilineServiceMobileHeroTitle(text: string): boolean {
  return text.includes("\n");
}

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
    if (isMultilineServiceMobileHeroTitle(override)) {
      const city = inferHeroCity(heading);
      return override.replace(/Auckland/g, city);
    }
    const city = inferHeroCity(heading);
    return normalizeServiceMobileHeroTitle(override.replace(/Auckland/g, city));
  }
  return normalizeServiceMobileHeroTitle(eyebrowLabel ?? heading);
}

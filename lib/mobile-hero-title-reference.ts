/** Shorter display copy on service mobile heroes (home title unchanged). */
export function normalizeServiceMobileHeroTitle(text: string): string {
  return text
    .replace(/\s+and\s+/gi, " & ")
    .replace(/\.\s+/g, " · ")
    .replace(/\s+/g, " ")
    .trim();
}

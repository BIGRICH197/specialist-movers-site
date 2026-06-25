import { seoAbsoluteTitles } from "@/lib/seo-meta-titles";

/** SEO spreadsheet absolute titles keyed by service slug. */
const serviceSlugTitles: Record<string, string> = {
  "house-moving": seoAbsoluteTitles.houseMovingAuckland,
  "office-moving": seoAbsoluteTitles.officeAuckland,
  "commercial-moving": seoAbsoluteTitles.commercialAuckland,
  "packing-services": seoAbsoluteTitles.packingAuckland,
  "hard-to-shift": seoAbsoluteTitles.hardToShiftAuckland,
  "cleaning-services": seoAbsoluteTitles.cleaningAuckland,
  "international-moving": seoAbsoluteTitles.internationalAuckland,
  "loading-unloading": seoAbsoluteTitles.loadingAuckland,
  "winz-quotes": seoAbsoluteTitles.winzAuckland,
  storage: seoAbsoluteTitles.storage,
  "piano-movers": seoAbsoluteTitles.pianoAuckland,
};

export function absoluteTitleForServiceSlug(slug: string): string | undefined {
  return serviceSlugTitles[slug];
}

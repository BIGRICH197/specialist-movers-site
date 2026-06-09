/**
 * SEO intro lines rendered after the Google rating badge in service heroes.
 * Each line answers: service, location, starting price, and a key credential.
 */

export const serviceSeoIntroBySlug: Record<string, string> = {
  "packing-services":
    "Professional packing across Auckland and the Waikato, fixed from $1,599 excl. GST for a 1-bedroom home. Our SiteWise Gold certified crew packs the day before your move with cartons and wrap supplied.",
  "international-moving":
    "International and inter-island moves from Auckland and Hamilton, quoted in writing before we pack or ship. Licensed crews with 60+ years combined experience coordinate North Island, South Island, and overseas relocations.",
  "loading-unloading":
    "Load-only and unload-only crews across Auckland from $350 excl. GST for smaller jobs. Licensed movers with blankets and straps, ideal when you are driving but need help with the heavy lifting.",
  "grand-piano":
    "Grand piano moving in Auckland and Hamilton from $550 excl. GST locally. Trusted by Steinway and Auckland music retailers, minimum three trained movers with piano boards, shrink wrap, and padded blankets on every job.",
  "upright-piano":
    "Upright piano moving in Auckland and Hamilton from $290 excl. GST locally. Specialist Piano Movers crews wrap, strap, and move through tight hallways with dollies and padded covers, not general furniture labour.",
};

export function getServiceSeoIntro(slug: string): string | undefined {
  return serviceSeoIntroBySlug[slug];
}

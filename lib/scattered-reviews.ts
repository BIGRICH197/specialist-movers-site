import { googleReviews, type GoogleReview } from "@/lib/google-reviews";

/** Stable offset per page slot so the same slot always shows the same reviews. */
function slotOffset(slot: string, length: number): number {
  let h = 0;
  for (let i = 0; i < slot.length; i++) {
    h = (h * 31 + slot.charCodeAt(i)) >>> 0;
  }
  return h % length;
}

/** Pick `count` reviews for a layout slot (no duplicates within the slot). */
export function pickReviewsForSlot(slot: string, count: number): GoogleReview[] {
  if (googleReviews.length === 0 || count <= 0) return [];
  const start = slotOffset(slot, googleReviews.length);
  const out: GoogleReview[] = [];
  for (let i = 0; i < count && i < googleReviews.length; i++) {
    out.push(googleReviews[(start + i) % googleReviews.length]);
  }
  return out;
}

/**
 * Substantive reviews for the /reviews page, server-rendered.
 *
 * Ranked by rating first, then by how much the reviewer actually wrote, so the
 * page leads with reviews that say something specific rather than "Great
 * service." Deterministic: no Date/random, so the build output is stable.
 */
export function pickFeaturedReviews(count: number): GoogleReview[] {
  return [...googleReviews]
    .sort((a, b) => b.rating - a.rating || b.text.length - a.text.length)
    .slice(0, Math.max(0, count));
}

/** "28/09/2025" (NZ order) → "2025-09-28" for schema.org datePublished. */
export function reviewDateToIso(date: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.trim());
  if (!match) return null;
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

/** Reviews that mention pianos , for piano pages. */
export function pickPianoReviews(count: number): GoogleReview[] {
  const piano = googleReviews.filter((r) => /piano/i.test(r.text));
  if (piano.length >= count) return piano.slice(0, count);
  return [...piano, ...pickReviewsForSlot("piano-fallback", count - piano.length)].slice(
    0,
    count,
  );
}

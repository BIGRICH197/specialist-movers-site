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

/** Reviews that mention pianos , for piano pages. */
export function pickPianoReviews(count: number): GoogleReview[] {
  const piano = googleReviews.filter((r) => /piano/i.test(r.text));
  if (piano.length >= count) return piano.slice(0, count);
  return [...piano, ...pickReviewsForSlot("piano-fallback", count - piano.length)].slice(
    0,
    count,
  );
}

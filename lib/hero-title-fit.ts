/** Guess hero h1 size before layout measure (reduces load flash). */
export function estimateHeroTitlePx(
  text: string,
  containerWidth: number,
  maxPx = 44,
  minPx = 22,
): number {
  if (containerWidth > 0) {
    const byWidth = Math.floor(containerWidth / (text.length * 0.52));
    return Math.max(minPx, Math.min(maxPx, byWidth));
  }

  const n = text.length;
  if (n > 34) return 26;
  if (n > 28) return 30;
  if (n > 22) return 34;
  if (n > 16) return 38;
  return maxPx;
}

/** Binary-search font size so text fits one line in containerWidth. */
export function fitHeroTitlePx(
  containerWidth: number,
  maxPx: number,
  minPx: number,
  measure: (px: number) => number,
): number {
  if (containerWidth <= 0) return maxPx;

  let lo = minPx;
  let hi = maxPx;
  let best = minPx;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (measure(mid) <= containerWidth) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return best;
}

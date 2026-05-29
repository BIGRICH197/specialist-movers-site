import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");

function clean(text) {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/\s+/g, " ")
    .trim();
}

function parseReviews(html) {
  const blocks = html.split("wpsr-review-template-google");
  const reviews = [];
  for (const block of blocks.slice(1)) {
  const name = clean(block.match(/wpsr-reviewer-name">([^<]+)/)?.[1] ?? "");
  const text = clean(block.match(/data-num-words-trim="10">([^<]+)<\/p>/)?.[1] ?? "");
  if (!name || !text || text.startsWith("Bad planning")) continue;

  const avatarUrl = block.match(/wpsr-reviewer-avatar"[^>]*src="([^"]+)"/)?.[1] ?? null;
  const rating = Number(block.match(/data-rating="(\d)"/)?.[1] ?? "5");
  const date = clean(
    block.match(/class="wpsr-review-date"[^>]*>\s*([^<]+)/)?.[1] ??
      block.match(/data-time="([^"]+)"/)?.[1] ??
      "",
  );

    reviews.push({
      name,
      text,
      rating: Number.isFinite(rating) ? rating : 5,
      date,
      avatarUrl,
    });
  }
  return reviews;
}

const temp = process.env.TEMP || process.env.TMP || "/tmp";
const candidates = [
  path.join(temp, "sm-reviews.html"),
  path.join(root, "tmp-live-home.html"),
].filter((p) => fs.existsSync(p));

if (candidates.length === 0) {
  throw new Error(
    "Save https://specialistmovers.co.nz/reviews/ as %TEMP%\\sm-reviews.html",
  );
}

let reviews = [];
let source = candidates[0];
for (const p of candidates) {
  const parsed = parseReviews(fs.readFileSync(p, "utf8"));
  if (parsed.length > reviews.length) {
    reviews = parsed;
    source = p;
  }
}

const html = fs.readFileSync(source, "utf8");
const ratingMatch = html.match(/"ratingValue":\s*"([\d.]+)"/);
const googleRating = ratingMatch ? Number(ratingMatch[1]) : 4.9;

const out = `/**
 * Google reviews from specialistmovers.co.nz (WP Social Reviews feed).
 * Refresh: save /reviews/ HTML to %TEMP%\\\\sm-reviews.html, then: node scripts/build-google-reviews.mjs
 */
export type GoogleReview = {
  name: string;
  text: string;
  rating: number;
  date: string;
  avatarUrl: string | null;
};

/** Google Business Profile aggregate rating (from live site schema). */
export const googleRating = ${Number.isFinite(googleRating) ? googleRating : 4.9};

/** Marketing total on Google (align with live Trustindex / GBP). */
export const googleReviewCount = 331;

export const googleReviews: GoogleReview[] = ${JSON.stringify(reviews, null, 2)};
`;

fs.writeFileSync(path.join(root, "lib", "google-reviews.ts"), out);
console.log("Wrote", reviews.length, "reviews from", source);

import { googleRating, googleReviewCount } from "@/lib/google-reviews";

/** Shared AggregateRating block for JSON-LD (aligns with Google / Trustindex). */
export const aggregateRatingSchema = {
  "@type": "AggregateRating" as const,
  ratingValue: googleRating,
  reviewCount: googleReviewCount,
  bestRating: 5,
  worstRating: 1,
};

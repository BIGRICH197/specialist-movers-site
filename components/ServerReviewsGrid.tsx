import { Star } from "lucide-react";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { googleRating, googleReviewCount } from "@/lib/google-reviews";
import { pickFeaturedReviews } from "@/lib/scattered-reviews";
import { cn } from "@/lib/utils";

type Props = {
  count?: number;
  className?: string;
};

/**
 * Server-rendered review grid.
 *
 * The Trustindex widget below this is client-only (`ssr: false`), so its
 * reviews never reach the initial HTML. AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot , all allowed in robots.ts) don't run JavaScript, which left
 * the page named "Reviews" with no reviews in it for them to read. This block
 * guarantees real, named, dated proof is in the markup for every crawler.
 *
 * Trustindex stays for live freshness; this is the floor, not a replacement.
 */
export function ServerReviewsGrid({ count = 9, className }: Props) {
  const reviews = pickFeaturedReviews(count);

  if (reviews.length === 0) return null;

  return (
    <section className={cn("min-w-0", className)} aria-labelledby="customer-reviews-heading">
      <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
        <h2
          id="customer-reviews-heading"
          className="font-heading text-2xl font-bold text-brand-purple sm:text-3xl"
        >
          What our customers say
        </h2>
        <p className="text-sm font-semibold text-brand-purple/70">
          {googleRating} out of 5, from {googleReviewCount}+ Google reviews
        </p>
      </div>

      <div className="mt-2 flex justify-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" strokeWidth={0} />
        ))}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={`${review.name}-${review.date}-${review.text.slice(0, 24)}`} className="min-w-0">
            <GoogleReviewCard review={review} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { ReviewQuoteCard } from "@/components/ReviewQuoteCard";
import { googleReviewsUrl } from "@/lib/homepage-copy";
import { googleReviewCount } from "@/lib/google-reviews";
import {
  pickPianoReviews,
  pickReviewsForSlot,
} from "@/lib/scattered-reviews";
import { cn } from "@/lib/utils";

type Props = {
  /** Unique slot id per placement (e.g. home-faq-sidebar, service-house-moving-faq). */
  slot: string;
  count?: number;
  /** Use piano-keyword reviews when true. */
  piano?: boolean;
  variant?: "compact" | "sidebar" | "pullquote" | "row";
  className?: string;
  showFooterLink?: boolean;
  /** When false, skip the “What customers say” label (parent provides it). */
  showHeading?: boolean;
};

/**
 * Stack of real Google reviews for sidebar / dead-zone placements.
 */
export function ScatteredReviews({
  slot,
  count = 2,
  piano = false,
  variant = "sidebar",
  className,
  showFooterLink = true,
  showHeading = true,
}: Props) {
  const reviews = piano ? pickPianoReviews(count) : pickReviewsForSlot(slot, count);

  if (reviews.length === 0) return null;

  const isPullquote = variant === "pullquote";
  const isRow = variant === "row";
  const cardVariant = isRow ? "compact" : variant;

  return (
    <aside className={cn("min-w-0", className)} aria-label="Customer reviews">
      {!isPullquote && showHeading ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wider text-brand-purple/50",
            isRow && "text-center sm:text-left",
          )}
        >
          What customers say
        </p>
      ) : null}
      <ul
        className={cn(
          isRow
            ? "mt-4 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:thin]"
            : cn("space-y-3", !isPullquote && showHeading && "mt-3", !isPullquote && !showHeading && "mt-0"),
        )}
      >
        {reviews.map((review) => (
          <li
            key={`${slot}-${review.name}-${review.text.slice(0, 20)}`}
            className={isRow ? "w-[min(85vw,18rem)] shrink-0 snap-start sm:w-[17rem]" : undefined}
          >
            <ReviewQuoteCard review={review} variant={cardVariant} className={isRow ? "h-full" : undefined} />
          </li>
        ))}
      </ul>
      {showFooterLink ? (
        <p className="mt-4 text-xs leading-snug text-brand-purple/65">
          <Link
            href="/reviews"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            More reviews
          </Link>
          {" · "}
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            {googleReviewCount}+ on Google
          </a>
        </p>
      ) : null}
    </aside>
  );
}

import { Star } from "lucide-react";
import type { GoogleReview } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

type Variant = "compact" | "sidebar" | "pullquote";

type Props = {
  review: GoogleReview;
  variant?: Variant;
  className?: string;
};

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-brand-yellow", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
      ))}
    </div>
  );
}

/**
 * Single Google review card , used in scattered placements site-wide.
 */
export function ReviewQuoteCard({ review, variant = "sidebar", className }: Props) {
  const isPullquote = variant === "pullquote";

  return (
    <figure
      className={cn(
        "rounded-2xl border border-brand-purple/12 bg-white shadow-sm",
        variant === "compact" && "p-4",
        variant === "sidebar" && "p-4",
        isPullquote &&
          "border-brand-purple/15 bg-brand-purple/[0.04] p-6 sm:p-7",
        className,
      )}
    >
      <figcaption className="sr-only">Google review from {review.name}</figcaption>
      <Stars className={isPullquote ? "mb-3" : "mb-2"} />
      <blockquote
        className={cn(
          "text-brand-purple/85",
          variant === "compact" && "line-clamp-4 text-xs leading-relaxed",
          variant === "sidebar" && "text-sm leading-relaxed",
          isPullquote && "font-heading text-base leading-relaxed sm:text-lg",
        )}
      >
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <p
        className={cn(
          "mt-3 font-semibold text-brand-purple",
          variant === "compact" ? "text-xs" : "text-sm",
        )}
      >
        {review.name}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-brand-purple/45">
        Google review
      </p>
    </figure>
  );
}

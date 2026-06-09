import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { googleReviewsUrl } from "@/lib/homepage-copy";
import { googleRating, googleReviewCount } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

type Props = {
  slot: string;
  /** Pick piano-keyword reviews when true. */
  piano?: boolean;
  excerptCount?: number;
  className?: string;
};

/**
 * Visible aggregate rating (4.9, 331+) plus readable excerpts, not link-only.
 */
export function GoogleReviewsBand({
  slot,
  piano = false,
  excerptCount = 3,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-brand-purple/12 bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
      aria-label="Google customer reviews"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/icons/google-logo.svg"
            alt=""
            width={72}
            height={22}
            className="h-5 w-auto"
            aria-hidden
          />
          <div>
            <p className="font-heading text-4xl font-bold leading-none text-brand-purple">
              {googleRating}
            </p>
            <div className="mt-1 flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-brand-yellow text-brand-yellow"
                  strokeWidth={0}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold text-brand-purple/85">
          Based on {googleReviewCount}+ Google reviews
        </p>
      </div>

      <ScatteredReviews
        slot={slot}
        count={excerptCount}
        piano={piano}
        variant="row"
        showFooterLink={false}
        showHeading={false}
        className="mt-6"
      />

      <p className="mt-4 text-sm text-brand-purple/70">
        <Link href="/reviews" className="font-semibold text-brand-purple underline underline-offset-2">
          Read more customer reviews
        </Link>
        {" · "}
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-purple underline underline-offset-2"
        >
          View on Google
        </a>
      </p>
    </section>
  );
}

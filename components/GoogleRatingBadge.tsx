import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { googleReviewsUrl } from "@/lib/homepage-copy";
import { googleRating, googleReviewCount } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

const reviewLine = (count: number) => `Based on ${count}+ reviews`;

type Props = {
  className?: string;
  /** Square tile for desktop hero gap; compact bar for mobile above the fold */
  variant?: "tile" | "compact";
};

/**
 * Google rating — square tile (desktop) or compact horizontal bar (mobile).
 */
export function GoogleRatingBadge({ className, variant = "tile" }: Props) {
  const label = `${googleRating} out of 5 on Google, ${reviewLine(googleReviewCount)}`;

  if (variant === "compact") {
    return (
      <Link
        href={googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex w-full items-center justify-between gap-4 rounded-xl border border-white/25 bg-white/95 px-4 py-3 text-brand-purple shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-brand-yellow/45 hover:shadow-[0_10px_32px_-8px_rgba(151,57,176,0.3)]",
          className,
        )}
        aria-label={label}
      >
        <span className="flex shrink-0 flex-col items-center gap-1">
          <Image
            src="/brand/icons/google-logo.svg"
            alt=""
            width={64}
            height={20}
            className="h-4 w-auto"
            aria-hidden
          />
          <span className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow"
                strokeWidth={0}
              />
            ))}
          </span>
        </span>

        <p className="min-w-0 flex-1 text-right text-sm font-semibold leading-snug text-brand-purple/85 transition-colors group-hover:text-brand-purple">
          {reviewLine(googleReviewCount)}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group mx-auto flex aspect-square w-[10.5rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-white/25 bg-white/95 p-4 text-center text-brand-purple shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] hover:border-brand-yellow/50 hover:bg-white hover:shadow-[0_16px_44px_-10px_rgba(151,57,176,0.35)] sm:w-[11rem]",
        className,
      )}
      aria-label={label}
    >
      <Image
        src="/brand/icons/google-logo.svg"
        alt="Google"
        width={74}
        height={24}
        className="mx-auto block h-[1.125rem] w-auto sm:h-5"
      />
      <p className="w-full text-center font-heading text-3xl font-bold leading-none text-brand-purple transition-colors duration-200 group-hover:text-[#6b2880]">
        {googleRating}
      </p>
      <div className="flex justify-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-brand-yellow text-brand-yellow sm:h-[1.125rem] sm:w-[1.125rem]"
            strokeWidth={0}
          />
        ))}
      </div>
      <p className="w-full px-0.5 text-center text-[10px] font-semibold leading-snug tracking-wide text-brand-purple/80 transition-colors duration-200 group-hover:text-brand-purple">
        {reviewLine(googleReviewCount)}
      </p>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star } from "lucide-react";
import type { GoogleReview } from "@/lib/google-reviews";
import { googleReviewsUrl } from "@/lib/homepage-copy";
import { cn } from "@/lib/utils";

const TRIM_AT = 160;

type Props = {
  review: GoogleReview;
  className?: string;
};

function ReviewerAvatar({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  const initial = (name.trim()[0] ?? "?").toUpperCase();

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 rounded-full object-cover"
        unoptimized
      />
    );
  }

  return (
    <span
      className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple/15 font-heading text-xl font-bold text-brand-purple"
      aria-hidden
    >
      {initial}
    </span>
  );
}

/**
 * Google-style review tile , matches live WP Social Reviews grid cards.
 */
export function GoogleReviewCard({ review, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  const needsTrim = review.text.length > TRIM_AT;
  const displayText =
    expanded || !needsTrim ? review.text : `${review.text.slice(0, TRIM_AT).trim()}…`;

  return (
    <article
      className={cn(
        "relative flex flex-col items-center rounded-2xl border border-brand-purple/10 bg-white px-5 pb-6 pt-10 text-center shadow-md",
        className,
      )}
    >
      <Image
        src="/brand/icons/google-g.svg"
        alt="Google"
        width={22}
        height={22}
        className="absolute left-4 top-4"
      />

      <ReviewerAvatar name={review.name} avatarUrl={review.avatarUrl} />

      <p className="mt-3 font-heading text-base font-bold text-brand-purple">{review.name}</p>

      <div className="mt-2 flex justify-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < review.rating
                ? "fill-brand-yellow text-brand-yellow"
                : "fill-brand-purple/10 text-brand-purple/15",
            )}
          />
        ))}
      </div>

      {review.date ? (
        <p className="mt-1.5 text-xs text-brand-purple/50">{review.date}</p>
      ) : null}

      <p className="mt-4 text-sm leading-relaxed text-brand-purple/80">{displayText}</p>

      {needsTrim && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 text-sm font-semibold text-[#1a73e8] hover:underline"
        >
          Read more
        </button>
      ) : null}

      <Link
        href={googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-xs font-semibold text-brand-purple/45 hover:text-brand-purple/70"
      >
        View on Google
      </Link>
    </article>
  );
}

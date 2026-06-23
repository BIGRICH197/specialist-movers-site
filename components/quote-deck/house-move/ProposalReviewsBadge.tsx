import Image from "next/image";

const googleReviewsBadgeSrc = "/brand/sig_google_reviews_badge.png";

/** Google reviews badge image — used on proposal footer */
export function ProposalReviewsBadge({ className = "" }: { className?: string }) {
  return (
    <Image
      src={googleReviewsBadgeSrc}
      alt="Google 4.9 stars, Top Rated Service 2026, verified by Trustindex"
      width={280}
      height={72}
      className={`proposal-reviews-badge h-auto w-[13.5rem] max-w-full sm:w-[17.5rem] ${className}`}
    />
  );
}

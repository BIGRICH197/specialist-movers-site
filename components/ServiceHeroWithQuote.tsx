import type { ReactNode } from "react";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const defaultTrustPills = [
  "Licensed & insured",
  "7 days a week",
  regions.serviceAreaBadge,
  "Callback in 15 min",
] as const;

type Props = {
  topNav?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Desktop left column; optional extra block below trust pills on mobile */
  lead?: ReactNode;
  subline?: ReactNode;
  meta?: ReactNode;
  photo?: ReactNode;
  quote: ReactNode;
  trustPills?: readonly string[];
  showGoogleBadge?: boolean;
  showPhone?: boolean;
  className?: string;
};

/**
 * Service page hero — on mobile matches homepage order:
 * intro → photo → (Google bar) → quote → phone → trust pills.
 * Desktop: full intro + photo in left column, sticky quote on the right.
 */
export function ServiceHeroWithQuote({
  topNav,
  eyebrow,
  title,
  lead,
  subline,
  meta,
  photo,
  quote,
  trustPills = defaultTrustPills,
  showGoogleBadge = true,
  showPhone = true,
  className,
}: Props) {
  const phoneLink = showPhone ? (
    <a
      href={`tel:${phoneNumber}`}
      className="inline-flex font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
    >
      {phoneDisplay}
    </a>
  ) : null;

  const trustPillList = (
    <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/95">
      {trustPills.map((label) => (
        <span
          key={label}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
        >
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <section
      className={cn(
        "overflow-visible border-b border-white/10 bg-brand-purple py-12 pb-16 text-white sm:py-16 sm:pb-20 lg:py-20 lg:pb-24",
        className,
      )}
    >
      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Mobile: compact intro → photo → Google bar */}
          <div className="flex min-w-0 flex-col gap-5 lg:hidden">
            {topNav}
            {eyebrow}
            {title}
            {photo}
            {showGoogleBadge ? <GoogleRatingBadge variant="compact" /> : null}
          </div>

          {/* Quote form — high on mobile, sticky right on desktop */}
          <div
            id="quote"
            className="min-w-0 scroll-mt-28 self-start lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28"
          >
            {quote}
          </div>

          {/* Mobile: phone + trust below form */}
          <div className="flex flex-col gap-5 lg:hidden">
            {phoneLink}
            {trustPillList}
            {lead}
            {subline}
            {meta}
          </div>

          {/* Desktop: full left column */}
          <div className="hidden min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:flex">
            {topNav}
            {eyebrow}
            {title}
            {lead}
            {subline}
            {meta}
            {phoneLink}
            {trustPillList}
            {photo}
          </div>
        </div>
      </div>
    </section>
  );
}

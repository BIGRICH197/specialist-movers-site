import type { ReactNode } from "react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
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

const HEADING_CLASS =
  "font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:leading-[1.12]";

type Props = {
  topNav?: ReactNode;
  eyebrow?: ReactNode;
  heading: string;
  lead?: ReactNode;
  /** Extra lines shown after trust pills, before hero photo on desktop. */
  heroDetail?: readonly string[];
  subline?: ReactNode;
  meta?: ReactNode;
  photo?: ReactNode;
  quote: ReactNode;
  trustPills?: readonly string[];
  showPhone?: boolean;
  heroVariant?: "moving" | "piano";
  /** Extra lift for desktop Google badge (cm). Piano Auckland landing passes 0. */
  googleBadgeLiftCm?: number;
  /** SEO intro rendered after the Google rating badge (does not move the badge). */
  seoIntro?: ReactNode;
  className?: string;
};

/**
 * Service page hero. Desktop copy order matches HomeHero so the Google badge
 * sits in the gutter without overlapping text. Trustindex band renders below.
 */
export function ServiceHeroWithQuote({
  topNav,
  eyebrow,
  heading,
  lead,
  heroDetail = [],
  subline,
  meta,
  photo,
  quote,
  trustPills = defaultTrustPills,
  showPhone = true,
  heroVariant = "moving",
  googleBadgeLiftCm = 3.5,
  seoIntro,
  className,
}: Props) {
  const badgeTopCm = (heroVariant === "piano" ? 6.5 : 5.5) + googleBadgeLiftCm;
  const phoneLink = showPhone ? (
    <a
      href={`tel:${phoneNumber}`}
      className="mt-6 inline-flex font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
    >
      {phoneDisplay}
    </a>
  ) : null;

  const trustPillList = (
    <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-white/95">
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

  const seoIntroBlock = seoIntro ? (
    <div className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
      {seoIntro}
    </div>
  ) : null;

  const heroDetailBlock =
    heroDetail.length > 0 ? (
      <div className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-white/80 sm:text-base">
        {heroDetail.map((line) => (
          <p key={line.slice(0, 48)}>{line}</p>
        ))}
      </div>
    ) : null;

  const photoBlock = photo ? <div className="mt-8">{photo}</div> : null;

  return (
    <section
      className={cn(
        "hero-ambient relative scroll-mt-24 overflow-visible border-b border-white/10 bg-brand-purple py-12 pb-16 text-white sm:py-16 sm:pb-20 lg:py-20 lg:pb-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BrandLogomarkWatermark mark="yellow" position="bottom-right" size={300} opacity={0.065} />
        <BrandLogomarkWatermark mark="yellow" position="top-right" size={200} opacity={0.04} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <GoogleRatingBadge
          className="pointer-events-auto absolute left-[calc(50%+1cm)] z-20 hidden -translate-x-1/2 xl:flex"
          style={{ top: `calc(54% - ${badgeTopCm}cm)` }}
        />

        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Mobile: intro + photo + compact Google bar */}
          <div className="flex min-w-0 flex-col gap-5 lg:hidden">
            {topNav}
            {eyebrow}
            <h1 className={HEADING_CLASS}>{heading}</h1>
            {lead}
            {subline}
            {photo ? <div className="mt-2">{photo}</div> : null}
            <GoogleRatingBadge variant="compact" />
            {seoIntroBlock}
          </div>

          <div
            id="quote"
            className="min-w-0 scroll-mt-28 self-start lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28"
          >
            {quote}
          </div>

          <div className="flex flex-col gap-5 lg:hidden">
            {heroDetailBlock}
            {phoneLink}
            {trustPillList}
            {meta ? <div className="mt-3">{meta}</div> : null}
          </div>

          {/* Desktop: same copy order as HomeHero */}
          <div className="hidden min-w-0 flex-col lg:col-start-1 lg:row-start-1 lg:flex">
            {topNav}
            {eyebrow}
            <p className={HEADING_CLASS} role="heading" aria-level={1}>
              {heading}
            </p>
            {lead ? <div className="mt-4">{lead}</div> : null}
            {subline ? <div className="mt-3">{subline}</div> : null}
            {phoneLink}
            {trustPillList}
            {seoIntroBlock}
            {meta ? <div className="mt-4">{meta}</div> : null}
            {heroDetailBlock}
            {photoBlock}
          </div>
        </div>
      </div>
    </section>
  );
}

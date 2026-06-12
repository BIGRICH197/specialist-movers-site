import type { ReactNode } from "react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { HeroPhotoFrame } from "@/components/hero/HeroPhotoFrame";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const defaultTrustPills = [
  "Licensed & insured",
  "7 days a week",
  regions.serviceAreaBadge,
  "Callback in 15 min",
] as const;

const MOBILE_HEADING_CLASS =
  "font-heading text-3xl leading-[1.12] text-white sm:text-4xl";

type Props = {
  topNav?: ReactNode;
  /** Yellow title above photo (desktop). */
  heading: string;
  /** White eyebrow pill above photo (desktop). */
  eyebrowLabel?: string;
  /** Optional legacy eyebrow slot (mobile / custom). */
  eyebrow?: ReactNode;
  /** Line under photo on desktop, same as homepage h1Sub. */
  headingSub?: string;
  lead?: ReactNode;
  /** Extra lines shown after trust pills on desktop. */
  heroDetail?: readonly string[];
  subline?: ReactNode;
  meta?: ReactNode;
  photo?: ReactNode;
  quote: ReactNode;
  trustPills?: readonly string[];
  showPhone?: boolean;
  heroVariant?: "moving" | "piano";
  /** SEO intro rendered after trust pills on desktop. */
  seoIntro?: ReactNode;
  /** Allow long headings to wrap on desktop (e.g. niche pages). */
  headingNowrap?: boolean;
  /** Optional override for desktop phone + trust pills block spacing. */
  phoneBlockClassName?: string;
  className?: string;
};

/**
 * Service page hero — desktop layout matches HomeHero (title stack + photo, copy below).
 */
export function ServiceHeroWithQuote({
  topNav,
  heading,
  eyebrowLabel,
  eyebrow,
  headingSub,
  lead,
  heroDetail = [],
  subline,
  meta,
  photo,
  quote,
  trustPills = defaultTrustPills,
  showPhone = true,
  heroVariant = "moving",
  seoIntro,
  headingNowrap = true,
  phoneBlockClassName = "mt-6",
  className,
}: Props) {
  const pianoTrustPills =
    heroVariant === "piano"
      ? ([
          "Licensed & insured",
          "7 days a week",
          regions.serviceAreaBadge,
          "Piano specialists",
        ] as const)
      : trustPills;

  const phoneLink = showPhone ? (
    <a
      href={`tel:${phoneNumber}`}
      className="inline-flex font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
    >
      {phoneDisplay}
    </a>
  ) : null;

  const trustPillList = (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/95">
        {pianoTrustPills.map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
          >
            {label}
          </span>
        ))}
      </div>
      <GoogleRatingBadge className="pointer-events-auto absolute bottom-0 right-0 z-20 hidden shrink-0 xl:flex" />
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

  return (
    <section
      id="quote"
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
        <div className="flex flex-col gap-5 overflow-visible lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Mobile */}
          <div className="flex min-w-0 flex-col gap-5 lg:hidden">
            {topNav}
            {eyebrow ? <div className="self-start">{eyebrow}</div> : null}
            {!eyebrow && eyebrowLabel ? (
              <p className="inline-flex w-fit max-w-[95%] self-start rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-yellow sm:px-3 sm:py-1.5 sm:text-xs">
                {eyebrowLabel}
              </p>
            ) : null}
            <h1 className={MOBILE_HEADING_CLASS}>{heading}</h1>
            {headingSub ? (
              <p className="max-w-2xl font-heading text-xl leading-snug text-white/95">
                {headingSub}
              </p>
            ) : null}
            {lead}
            {subline}
            {photo ? <div className="mt-2">{photo}</div> : null}
            <GoogleRatingBadge variant="compact" />
            {seoIntroBlock}
          </div>

          {/* Quote form */}
          <div
            id="instant-quote"
            className="relative -mt-1 min-w-0 scroll-mt-24 self-start overflow-visible lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28"
          >
            {quote}
          </div>

          {/* Mobile: detail + phone + pills */}
          <div className="flex flex-col gap-5 lg:hidden">
            {heroDetailBlock}
            {phoneLink}
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/95">
              {pianoTrustPills.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
                >
                  {label}
                </span>
              ))}
            </div>
            {meta ? <div className="mt-3">{meta}</div> : null}
          </div>

          {/* Desktop — matches HomeHero */}
          <div className="hidden w-full min-w-0 flex-col lg:col-start-1 lg:row-start-1 lg:flex lg:gap-0">
            {topNav ? <div className="mb-4">{topNav}</div> : null}
            {photo ? (
              <HeroPhotoFrame
                heading={heading}
                eyebrowLabel={eyebrowLabel}
                headingNowrap={headingNowrap}
                photo={photo}
              />
            ) : null}
            {headingSub ? (
              <p className="mt-4 max-w-2xl font-heading text-2xl leading-snug text-white xl:text-[1.75rem]">
                {headingSub}
              </p>
            ) : null}
            {lead ? <div className="mt-5 max-w-2xl">{lead}</div> : null}
            {subline ? <div className="mt-3 self-start">{subline}</div> : null}
            <div className={cn("flex flex-col gap-4", phoneBlockClassName)}>
              {phoneLink}
              {trustPillList}
            </div>
            {heroDetailBlock}
            {seoIntroBlock}
            {meta ? <div className="mt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

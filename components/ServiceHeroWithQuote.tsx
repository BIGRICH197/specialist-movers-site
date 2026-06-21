import type { ReactNode } from "react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { HeroPhotoFrame } from "@/components/hero/HeroPhotoFrame";
import { ServiceMobileHeroHead } from "@/components/ServiceMobileHeroHead";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { ServiceHeroTrustStack } from "@/components/ServiceHeroTrustStack";
import { cn } from "@/lib/utils";

const defaultTrustPills = [
  "Licensed & insured",
  "7 days a week",
  regions.serviceAreaBadge,
  "Callback in 15 min",
] as const;

const MOBILE_PHONE_CLASS =
  "inline-flex items-center justify-center font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white";

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
  /** Piano hub / city pages: partner logos above Google badge on mobile. */
  showMobilePartnerMarquee?: boolean;
  /** Service slug for mobile fitted title overrides (winz-quotes, storage, etc.). */
  titleSlug?: string;
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
  showMobilePartnerMarquee = false,
  titleSlug,
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
      className={cn(
        MOBILE_PHONE_CLASS,
        "lg:inline-flex lg:justify-start lg:text-3xl",
      )}
    >
      {phoneDisplay}
    </a>
  ) : null;

  const mobileTrustPills = (
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
        "hero-ambient relative scroll-mt-24 overflow-visible border-b border-white/10 bg-brand-purple py-12 pb-16 text-white max-lg:pt-7 sm:py-16 sm:pb-20 lg:py-20 lg:pb-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BrandLogomarkWatermark mark="yellow" position="bottom-right" size={300} opacity={0.065} />
        <BrandLogomarkWatermark mark="yellow" position="top-right" size={200} opacity={0.04} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <div className="flex flex-col gap-5 overflow-visible lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Mobile — pill copy becomes fitted white title; service h1 stays for SEO only */}
          <ServiceMobileHeroHead
            heading={heading}
            eyebrowLabel={eyebrowLabel}
            eyebrow={eyebrow}
            photo={photo}
            heroVariant={heroVariant}
            showMobilePartnerMarquee={showMobilePartnerMarquee}
            titleSlug={titleSlug}
          />

          {/* Quote form (desktop: quote only; mobile: quote then pricing pill) */}
          <div
            id="instant-quote"
            className="relative -mt-1 min-w-0 scroll-mt-24 self-start overflow-visible lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28"
          >
            {quote}
            {subline ? <div className="mt-5 lg:hidden">{subline}</div> : null}
          </div>

          {/* Mobile: service pages show call above form (below Google); piano keeps phone here */}
          <div className="flex flex-col gap-5 lg:hidden">
            {heroVariant === "piano" ? phoneLink : null}
            {mobileTrustPills}
            {meta ? <div>{meta}</div> : null}
          </div>

          {/* Desktop — matches HomeHero */}
          <div className="hidden w-full min-w-0 flex-col lg:col-start-1 lg:row-start-1 lg:flex lg:gap-0 lg:-translate-y-[1cm]">
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
            {(subline || showPhone) ? (
              <ServiceHeroTrustStack
                className={subline ? "mt-3" : phoneBlockClassName}
                subline={subline ?? null}
                trustPills={pianoTrustPills}
                phone={phoneLink}
              />
            ) : null}
            {heroDetailBlock}
            {seoIntroBlock}
            {meta ? <div className="mt-4">{meta}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

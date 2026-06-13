"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { HeroPhotoFrame } from "@/components/hero/HeroPhotoFrame";
import { HeroVisual } from "@/components/HeroVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { regions } from "@/lib/regions";
import { motionDuration, motionStagger, motionTransition } from "@/lib/motion";
import type { JobType } from "@/lib/site-data";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { ServiceHeroSublinePrice } from "@/components/ServiceHeroSublinePrice";
import { ServiceHeroTrustStack } from "@/components/ServiceHeroTrustStack";

type HeroCopy = {
  eyebrow: string;
  h1: string;
  h1Sub?: string;
  lead: string;
  subline: string;
  photoTagline?: string;
};

type Props = {
  hero: HeroCopy;
  photoSrc: string;
  photoAlt: string;
  photoHoverSrc?: string;
  photoHoverAlt?: string;
  defaultJobType?: JobType;
  heroVariant?: "moving" | "piano";
  mobileTitle?: string;
  mobileBadge?: string;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: motionStagger.normal, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const trustPills = [
  "Licensed & insured",
  "7 days a week",
  regions.serviceAreaBadge,
  "Piano specialists",
] as const;

/** Mobile hero copy only (desktop uses full hero from props). */
const MOBILE_HERO_TITLE = "Specialist Movers";
const MOBILE_HERO_BADGE = "Trusted movers · Auckland & Hamilton";

export function HomeHero({
  hero,
  photoSrc,
  photoAlt,
  photoHoverSrc,
  photoHoverAlt,
  defaultJobType,
  heroVariant = "moving",
  mobileTitle,
  mobileBadge,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const t = motionTransition(motionDuration.normal, reduced);

  const heroVisual = (
    <HeroVisual
      variant={heroVariant}
      photoSrc={photoSrc}
      photoAlt={photoAlt}
      photoHoverSrc={photoHoverSrc}
      photoHoverAlt={photoHoverAlt}
      overlayCaption={hero.photoTagline}
      priority
      className="hero-photo-ambient"
    />
  );

  const desktopHeroVisual = (
    <HeroVisual
      variant={heroVariant}
      photoSrc={photoSrc}
      photoAlt={photoAlt}
      photoHoverSrc={photoHoverSrc}
      photoHoverAlt={photoHoverAlt}
      overlayCaption={hero.photoTagline}
      priority
      captionBottomFadeOnly
      className="hero-photo-ambient"
    />
  );

  return (
    <section
      id="quote"
      className="hero-ambient relative scroll-mt-24 border-b border-white/10 bg-brand-purple py-12 pb-16 text-white sm:py-16 sm:pb-20 lg:py-20 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <BrandLogomarkWatermark mark="yellow" position="bottom-right" size={300} opacity={0.065} />
        <BrandLogomarkWatermark mark="yellow" position="top-right" size={200} opacity={0.04} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <div className="flex flex-col gap-5 overflow-visible lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Left column: one h1 for mobile + desktop (different text per breakpoint). */}
          <motion.div
            className="flex w-full min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:gap-0 lg:-translate-y-[1cm]"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="inline-flex w-fit max-w-[95%] self-start rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-yellow sm:px-3 sm:py-1.5 sm:text-xs sm:tracking-wider lg:hidden"
            >
              {mobileBadge ?? MOBILE_HERO_BADGE}
            </motion.p>
            <motion.h1
              variants={reduced ? undefined : item}
              transition={t}
              className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:hidden"
            >
              {mobileTitle ?? MOBILE_HERO_TITLE}
            </motion.h1>
            <motion.div variants={reduced ? undefined : item} transition={t} className="lg:hidden">
              {heroVisual}
            </motion.div>
            <motion.div variants={reduced ? undefined : item} transition={t} className="lg:hidden">
              <GoogleRatingBadge variant="compact" />
            </motion.div>
            <motion.div
              variants={reduced ? undefined : item}
              transition={t}
              className="hidden w-full min-w-0 lg:block"
            >
              <HeroPhotoFrame
                heading={hero.h1}
                eyebrowLabel={hero.eyebrow}
                photo={desktopHeroVisual}
              />
            </motion.div>
            {hero.h1Sub ? (
              <motion.p
                variants={reduced ? undefined : item}
                transition={t}
                className="mt-4 hidden max-w-2xl font-heading text-2xl leading-snug text-white lg:block xl:text-[1.75rem]"
              >
                {hero.h1Sub}
              </motion.p>
            ) : null}
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-5 hidden max-w-2xl text-base leading-relaxed text-white/85 lg:block"
            >
              {hero.lead}
            </motion.p>
            <motion.div
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-3 hidden lg:block"
            >
              <ServiceHeroTrustStack
                trustPills={trustPills}
                phone={
                  <a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
                  >
                    {phoneDisplay}
                  </a>
                }
              />
            </motion.div>
          </motion.div>

          {/* Quote form (mobile + desktop) */}
          <motion.div
            id="instant-quote"
            className={cn(
              "relative -mt-1 flex min-w-0 flex-col gap-5 scroll-mt-24 self-start overflow-visible lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28",
            )}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduced ? 0 : 0.35 }}
          >
            <QuoteForm defaultJobType={defaultJobType} />
            <ServiceHeroSublinePrice>{hero.subline}</ServiceHeroSublinePrice>
          </motion.div>

          {/* Mobile: phone + trust pills below form */}
          <motion.div
            className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:hidden"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <motion.a
              variants={reduced ? undefined : item}
              transition={t}
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white"
              whileHover={reduced ? undefined : { scale: 1.01 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              {phoneDisplay}
            </motion.a>
            <motion.div
              variants={reduced ? undefined : item}
              transition={t}
              className="flex flex-wrap gap-2 text-xs font-semibold text-white/95"
            >
              {trustPills.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

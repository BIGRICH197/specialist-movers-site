"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { HeroVisual } from "@/components/HeroVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { regions } from "@/lib/regions";
import { motionDuration, motionStagger, motionTransition } from "@/lib/motion";
import type { JobType } from "@/lib/site-data";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type HeroCopy = {
  eyebrow: string;
  h1: string;
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
            className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:gap-0"
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
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mb-3 hidden w-fit max-w-[95%] self-start rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow lg:inline-flex"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={reduced ? undefined : item}
              transition={t}
              className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              <span className="lg:hidden">{mobileTitle ?? MOBILE_HERO_TITLE}</span>
              <span className="hidden lg:inline">{hero.h1}</span>
            </motion.h1>
            <motion.div variants={reduced ? undefined : item} transition={t} className="lg:hidden">
              {heroVisual}
            </motion.div>
            <motion.div variants={reduced ? undefined : item} transition={t} className="lg:hidden">
              <GoogleRatingBadge variant="compact" />
            </motion.div>
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-4 hidden max-w-2xl text-base leading-relaxed text-white/85 lg:block"
            >
              {hero.lead}
            </motion.p>
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-3 hidden w-fit max-w-xl self-start rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90 lg:inline-block"
            >
              {hero.subline}
            </motion.p>
            <motion.div
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-6 hidden flex-col gap-4 lg:flex"
            >
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
              >
                {phoneDisplay}
              </a>
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
            </motion.div>
            <motion.div variants={reduced ? undefined : item} transition={t} className="mt-8 hidden lg:block">
              {heroVisual}
            </motion.div>
          </motion.div>

          {/* Quote form (mobile + desktop) */}
          <motion.div
            id="instant-quote"
            className={cn(
              "relative -mt-1 min-w-0 scroll-mt-24 self-start overflow-visible lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28",
            )}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduced ? 0 : 0.35 }}
          >
            <GoogleRatingBadge
              className={cn(
                "pointer-events-auto absolute right-full z-20 hidden shrink-0 xl:flex",
                heroVariant === "piano"
                  ? "top-[calc(23rem-3.5cm)] mr-[1cm]"
                  : "top-[calc(23rem-2cm)] mr-[1.5cm]",
              )}
            />
            <QuoteForm defaultJobType={defaultJobType} />
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

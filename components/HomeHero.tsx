"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { HeroVisual } from "@/components/HeroVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { regions } from "@/lib/regions";
import { motionDuration, motionStagger, motionTransition } from "@/lib/motion";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

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
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const t = motionTransition(motionDuration.normal, reduced);

  const heroVisual = (
    <HeroVisual
      variant="moving"
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
        <GoogleRatingBadge className="pointer-events-auto absolute left-1/2 top-[42%] z-20 hidden -translate-x-1/2 -translate-y-1/2 xl:flex" />

        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:gap-12">
          {/* Mobile: badge → title → photo → Google bar */}
          <motion.div
            className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:hidden"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow"
            >
              {MOBILE_HERO_BADGE}
            </motion.p>
            <motion.h1
              variants={reduced ? undefined : item}
              transition={t}
              className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl"
            >
              {MOBILE_HERO_TITLE}
            </motion.h1>
            <motion.div variants={reduced ? undefined : item} transition={t}>
              {heroVisual}
            </motion.div>
            <motion.div variants={reduced ? undefined : item} transition={t}>
              <GoogleRatingBadge variant="compact" />
            </motion.div>
          </motion.div>

          {/* Quote form (mobile + desktop) */}
          <motion.div
            className="-mt-1 min-w-0 self-start lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: reduced ? 0 : 0.35 }}
          >
            <QuoteForm />
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

          {/* Desktop left column */}
          <motion.div
            className="hidden min-w-0 lg:col-start-1 lg:row-start-1 lg:block"
            variants={reduced ? undefined : container}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mb-3 inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={reduced ? undefined : item}
              transition={t}
              className="font-heading text-3xl leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
            >
              {hero.h1}
            </motion.h1>
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-4 max-w-2xl text-base leading-relaxed text-white/85"
            >
              {hero.lead}
            </motion.p>
            <motion.p
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-3 inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90"
            >
              {hero.subline}
            </motion.p>
            <motion.a
              variants={reduced ? undefined : item}
              transition={t}
              href={`tel:${phoneNumber}`}
              className="mt-6 inline-flex items-center font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:mt-6 sm:text-3xl"
              whileHover={reduced ? undefined : { scale: 1.01 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              {phoneDisplay}
            </motion.a>
            <motion.div
              variants={reduced ? undefined : item}
              transition={t}
              className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-white/95"
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
            <motion.div variants={reduced ? undefined : item} transition={t} className="mt-8">
              {heroVisual}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

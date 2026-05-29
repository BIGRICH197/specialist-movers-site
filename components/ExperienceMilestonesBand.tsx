"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/CountUp";
import { ProcessIllustration } from "@/components/ProcessIllustration";
import type { experienceMilestones } from "@/lib/homepage-sections";
import { motionOffset, motionStagger, revealSpring } from "@/lib/motion";
import { useRevealInView } from "@/lib/use-reveal-in-view";

type Props = {
  data: typeof experienceMilestones;
  className?: string;
};

/**
 * Volume stats , fixed background photo (scrolls behind text), animated count-up figures.
 */
export function ExperienceMilestonesBand({ data, className = "" }: Props) {
  const reduced = useReducedMotion() ?? false;
  const { ref: revealRef, inView } = useRevealInView<HTMLDivElement>();
  const active = reduced || inView;

  const bg = data.backgroundImage;

  return (
    <section
      className={`relative border-t border-brand-purple/15 py-12 sm:py-16 ${
        bg ? "parallax-section-bg" : "bg-brand-purple"
      } ${className}`}
      style={bg ? { backgroundImage: `url(${bg})` } : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/65"
        aria-hidden
      />

      <div ref={revealRef} className="relative mx-auto min-w-0 max-w-7xl container-px">
        <motion.h2
          className="text-center font-heading text-lg uppercase leading-snug tracking-wide text-white sm:text-xl"
          variants={{
            hidden: { opacity: 0, y: motionOffset.y * 0.5 },
            visible: { opacity: 1, y: 0, transition: revealSpring },
          }}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
        >
          {data.title}
        </motion.h2>

        <motion.ul
          className="mt-8 grid list-none gap-8 p-0 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-4 lg:gap-6"
          initial="hidden"
          animate={active ? "show" : "hidden"}
          variants={
            reduced
              ? undefined
              : {
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: motionStagger.normal,
                      delayChildren: 0.12,
                    },
                  },
                }
          }
        >
          {data.items.map((item) => (
            <motion.li
              key={item.label}
              className="flex min-w-0 flex-col items-center px-1 text-center"
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: motionOffset.y * 0.55 },
                      show: { opacity: 1, y: 0, transition: revealSpring },
                    }
              }
            >
              <motion.div
                className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { opacity: 0, scale: 0.88 },
                        show: { opacity: 1, scale: 1, transition: revealSpring },
                      }
                }
              >
                <ProcessIllustration src={item.icon} alt={item.iconAlt} />
              </motion.div>
              <p className="mt-3 font-heading text-2xl font-bold tabular-nums text-white sm:text-3xl">
                <CountUp value={item.value} />
              </p>
              <p className="mt-2 max-w-[10rem] text-xs font-semibold uppercase leading-snug tracking-wide text-white/90 sm:max-w-none sm:text-sm">
                {item.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

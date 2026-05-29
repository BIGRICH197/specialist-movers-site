"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  motionOffset,
  motionStagger,
  revealSpring,
} from "@/lib/motion";
import { useRevealInView } from "@/lib/use-reveal-in-view";

export type VisualProcessStep = {
  readonly title: string;
  readonly body?: string;
  readonly image: string;
  readonly imageAlt: string;
};

type Props = {
  steps: readonly VisualProcessStep[];
  className?: string;
  /** Cartoon icons from the live site (default) vs circular team photos */
  variant?: "illustration" | "photo";
};

/**
 * Four-step process , horizontal on desktop with animated connectors.
 */
export function MovingProcessVisual({
  steps,
  className = "",
  variant = "illustration",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const isIllustration = variant === "illustration";
  const { ref, inView } = useRevealInView<HTMLOListElement>();
  const active = reduced || inView;

  return (
    <motion.ol
      ref={ref}
      className={`m-0 flex list-none flex-col gap-10 p-0 lg:flex-row lg:items-start lg:justify-center lg:gap-4 xl:gap-6 ${className}`}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      variants={
        reduced
          ? undefined
          : {
              hidden: {},
              show: {
                transition: {
                  staggerChildren: motionStagger.relaxed,
                  delayChildren: 0.1,
                },
              },
            }
      }
    >
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          className="flex flex-col items-center lg:flex-row lg:items-start"
          variants={
            reduced
              ? undefined
              : {
                  hidden: { opacity: 0, y: motionOffset.y * 0.65 },
                  show: { opacity: 1, y: 0, transition: revealSpring },
                }
          }
        >
          {index > 0 ? (
            <motion.div
              className="my-4 flex items-center justify-center lg:mx-2 lg:my-0 lg:mt-10 xl:mx-3"
              aria-hidden
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, scaleX: 0 },
                      show: { opacity: 1, scaleX: 1 },
                    }
              }
              transition={{ ...revealSpring, delay: reduced ? 0 : 0.15 }}
              style={{ originX: 0 }}
            >
              <ArrowRight
                className="hidden h-8 w-8 shrink-0 text-brand-yellow lg:block"
                strokeWidth={2.5}
              />
              <div className="h-px w-12 bg-brand-yellow/60 lg:hidden" />
            </motion.div>
          ) : null}
          <div className="flex max-w-xs flex-col items-center text-center lg:max-w-[11.5rem] xl:max-w-[13rem]">
            <div
              className={
                isIllustration
                  ? "relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-40 sm:w-40"
                  : "relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-brand-yellow shadow-md sm:h-32 sm:w-32"
              }
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                sizes={isIllustration ? "160px" : "128px"}
                className={isIllustration ? "object-contain" : "object-cover"}
              />
            </div>
            <span className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow font-heading text-sm font-bold text-brand-purple">
              {index + 1}
            </span>
            <h3 className="mt-3 font-heading text-base leading-snug text-brand-purple sm:text-lg">
              {step.title}
            </h3>
            {step.body ? (
              <p className="mt-2 text-sm leading-relaxed text-brand-purple/75">{step.body}</p>
            ) : null}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  motionOffset,
  motionStagger,
  revealSpring,
} from "@/lib/motion";
import { useRevealInView } from "@/lib/use-reveal-in-view";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Staggers direct children on scroll-into-view (service cards, grids).
 */
export function StaggerChildren({ children, className = "" }: Props) {
  const reduced = useReducedMotion() ?? false;
  const { ref, inView } = useRevealInView<HTMLDivElement>();
  const active = reduced || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
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
                  delayChildren: 0.08,
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: motionOffset.y * 0.85 },
              show: {
                opacity: 1,
                y: 0,
                transition: revealSpring,
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

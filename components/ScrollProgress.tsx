"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const BAR_H = 2;

/** Thin yellow progress bar at the very top of the viewport (above header/logo). */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  const barScale = reduced ? scrollYProgress : progress;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-2"
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 w-full bg-brand-yellow/20"
        style={{ height: BAR_H }}
      />
      <motion.div
        className="absolute left-0 top-0 w-full origin-left bg-brand-yellow"
        style={{ height: BAR_H, scaleX: barScale }}
      />
    </div>
  );
}

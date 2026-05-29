"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  formatStatValue,
  motionDuration,
  parseStatValue,
  revealViewport,
} from "@/lib/motion";

type Props = {
  value: string;
  className?: string;
};

/**
 * Count-up when scrolled into view; shows final value if animation cannot run.
 */
export function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, revealViewport);
  const reduced = useReducedMotion();
  const { target, decimals, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const durationMs = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(formatStatValue(target * eased, decimals, suffix));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    setDisplay(formatStatValue(0, decimals, suffix));
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, target, decimals, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: motionDuration.normal }}
    >
      {display}
    </motion.span>
  );
}

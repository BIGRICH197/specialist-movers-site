"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealVariants, type SectionRevealDirection } from "@/lib/motion";
import { useRevealInView } from "@/lib/use-reveal-in-view";

export type { SectionRevealDirection } from "@/lib/motion";
export { sectionRevealDirection } from "@/lib/motion";

export function SectionReveal({
  children,
  className = "",
  id,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: SectionRevealDirection;
}) {
  const reduced = useReducedMotion() ?? false;
  const { ref, inView } = useRevealInView<HTMLElement>();
  const variants = revealVariants(direction);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      animate={reduced || inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

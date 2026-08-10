"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { revealVariants, type SectionRevealDirection } from "@/lib/motion";
import { useRevealInView } from "@/lib/use-reveal-in-view";

const narrowMq = "(max-width: 1023px)";

function subscribeNarrowMq(onChange: () => void) {
  const mq = window.matchMedia(narrowMq);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getNarrowMq() {
  return window.matchMedia(narrowMq).matches;
}

/** Horizontal slide reveals widen the page by 48px on phones — use vertical only. */
function useNarrowViewport() {
  return useSyncExternalStore(subscribeNarrowMq, getNarrowMq, () => true);
}

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
  const narrow = useNarrowViewport();
  const { ref, inView, hydrated } = useRevealInView<HTMLElement>();
  const variants = revealVariants(narrow ? "up" : direction);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      // initial={false} renders straight at the `animate` state with no mount
      // animation, so the server emits no opacity:0. Before hydration `animate`
      // resolves to "visible" — see the LCP note in use-reveal-in-view.ts. Do
      // NOT put initial="hidden" back: that is what made LCP 17.7s on /about.
      initial={false}
      animate={!hydrated || reduced || inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

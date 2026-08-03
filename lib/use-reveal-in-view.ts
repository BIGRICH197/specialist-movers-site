"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { revealViewport } from "@/lib/motion";

/**
 * How long to wait for the scroll observer before revealing anyway.
 *
 * Audit M4: 44 homepage sections ship at opacity:0 and depend on
 * IntersectionObserver. Non-JS crawlers are unaffected — the text is in the raw
 * HTML — but the JS-rendering path is a real risk: Googlebot, Bing and the AI
 * Overviews render step run a headless browser that does not necessarily
 * scroll, and anything past roughly 1.28 viewport heights stays invisible.
 *
 * Rather than redesign the reveals across 33 files, the failure mode is
 * inverted. The reveal now fails VISIBLE. A real visitor scrolls in well under
 * a second and never sees this fire; a renderer that never scrolls gets the
 * content anyway.
 */
const REVEAL_FALLBACK_MS = 1200;

/** Reliable scroll reveal trigger (prefer over whileInView in Next.js). */
export function useRevealInView<T extends HTMLElement = HTMLElement>(
  options?: UseInViewOptions,
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { ...revealViewport, ...options });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (inView || timedOut) return;
    const timer = window.setTimeout(() => setTimedOut(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [inView, timedOut]);

  return { ref, inView: inView || timedOut };
}

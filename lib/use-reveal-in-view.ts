"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { revealViewport } from "@/lib/motion";

/**
 * How long to wait for the scroll observer before revealing anyway.
 *
 * Audit M4: sections ship at opacity:0 and depend on IntersectionObserver.
 * Non-JS crawlers are unaffected — the text is in the raw HTML — but the
 * JS-rendering path is a real risk: Googlebot, Bing and the AI Overviews render
 * step run a headless browser that does not necessarily scroll, and anything
 * past roughly 1.28 viewport heights stays invisible.
 *
 * Rather than redesign the reveals across 33 files, the failure mode is
 * inverted. The reveal fails VISIBLE. A real visitor scrolls in well under a
 * second and never sees this fire; a renderer that never scrolls gets the
 * content anyway.
 */
const REVEAL_FALLBACK_MS = 1200;

/**
 * Reliable scroll reveal trigger (prefer over whileInView in Next.js).
 *
 * `hydrated` is false on the server and for the first client paint, and the
 * caller must treat that as "show the content".
 *
 * Why: REVEAL_FALLBACK_MS above cannot rescue LCP, because it is a useEffect —
 * the timer does not start until React hydrates. The 2026-08-07 audit measured
 * this directly on PageSpeed Insights (mobile, 4x CPU throttle): /about had
 * TTI 18.8s and LCP 17.7s, the ~1.1s gap being this timer firing the instant
 * hydration finished. The homepage was LCP 6.9s against FCP 2.6s. 432 sections
 * across 117 of 118 pages were serving `opacity:0;transform:translateY(64px)`
 * in the initial HTML.
 *
 * So the hidden state is now applied only AFTER hydration, never in the SSR
 * output. Sections that are off-screen at that point flip to hidden where
 * nobody can see it happen, then animate in on scroll exactly as before.
 * Anything already on screen — or within revealViewport's 28% below-fold
 * margin — is in view by then and simply stays visible.
 *
 * Net effect: identical animation for real visitors, but the initial HTML is
 * readable and paintable, so LCP is no longer gated on hydration.
 */
export function useRevealInView<T extends HTMLElement = HTMLElement>(
  options?: UseInViewOptions,
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { ...revealViewport, ...options });
  const [timedOut, setTimedOut] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (inView || timedOut) return;
    const timer = window.setTimeout(() => setTimedOut(true), REVEAL_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [inView, timedOut]);

  return { ref, inView: inView || timedOut, hydrated };
}

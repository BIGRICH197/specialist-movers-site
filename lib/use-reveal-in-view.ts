"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useRef } from "react";
import { revealViewport } from "@/lib/motion";

/** Reliable scroll reveal trigger (prefer over whileInView in Next.js). */
export function useRevealInView<T extends HTMLElement = HTMLElement>(
  options?: UseInViewOptions,
) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { ...revealViewport, ...options });
  return { ref, inView };
}

/** Shared motion tokens , keep durations/easing consistent site-wide. */

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  fast: 0.18,
  /** Hero load-in, hovers, small UI */
  normal: 0.45,
  /** Sections and cards scrolling into view (spring uses this as baseline) */
  reveal: 1.05,
  slow: 0.9,
} as const;

export const motionStagger = {
  tight: 0.08,
  normal: 0.15,
  relaxed: 0.22,
} as const;

export const motionOffset = {
  y: 64,
  x: 48,
} as const;

/** Start reveal while the block is still below the fold so you see it land while scrolling. */
export const revealViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px 28% 0px",
} as const;

/** Visible “drop into place” , spring, not a fast ease-out. */
export const revealSpring = {
  type: "spring" as const,
  stiffness: 58,
  damping: 15,
  mass: 1.05,
};

export type SectionRevealDirection = "up" | "left" | "right";

export function revealVariants(direction: SectionRevealDirection = "up") {
  const hidden =
    direction === "left"
      ? { opacity: 0, x: -motionOffset.x }
      : direction === "right"
        ? { opacity: 0, x: motionOffset.x }
        : { opacity: 0, y: motionOffset.y };

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: revealSpring,
    },
  };
}

/** Framer transition with reduced-motion fallback (instant). */
export function motionTransition(
  duration: number = motionDuration.normal,
  reducedMotion: boolean,
) {
  return reducedMotion
    ? { duration: 0 }
    : { duration, ease: motionEase };
}

/** Parse milestone strings like "4,000+" for count-up. */
export function parseStatValue(value: string): {
  target: number;
  decimals: number;
  suffix: string;
} {
  const trimmed = value.trim();
  const suffixMatch = trimmed.match(/^([\d,.\s]+)(.*)$/);
  const numPart = (suffixMatch?.[1] ?? trimmed).replace(/,/g, "");
  const suffix = suffixMatch?.[2] ?? "";
  const target = Number.parseFloat(numPart) || 0;
  const decimals = numPart.includes(".") ? (numPart.split(".")[1]?.length ?? 0) : 0;
  return { target, decimals, suffix };
}

export function formatStatValue(
  n: number,
  decimals: number,
  suffix: string,
): string {
  const formatted =
    decimals > 0
      ? n.toLocaleString("en-NZ", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(n).toLocaleString("en-NZ");
  return `${formatted}${suffix}`;
}

/** Alternate left/right/up by section index on long pages. */
export function sectionRevealDirection(index: number): SectionRevealDirection {
  if (index % 3 === 1) return "left";
  if (index % 3 === 2) return "right";
  return "up";
}

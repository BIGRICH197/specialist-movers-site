import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

/** SPECIALIST cap baseline from top of wordmark (SVG 27.77/50.64, nudged up to match nav optically). */
const SPECIALIST_BASELINE_RATIO = 0.62;

type Props = {
  className?: string;
  /** Circle diameter */
  circleSize?: string;
  wordmarkHeight?: string;
  /** Pin SPECIALIST baseline to primary nav text (Services row) */
  wordmarkAlign?: "top" | "nav";
  /** Header row: full circle beside wordmark. Corner: clipped off top-left. */
  variant?: "header" | "corner";
};

/**
 * Yellow logomark + wordmark lockup.
 */
export function BrandCornerLockup({
  className,
  circleSize = "clamp(3.5rem, 7vw, 5.5rem)",
  wordmarkHeight = "clamp(1.65rem, 2.8vw, 2.65rem)",
  wordmarkAlign = "top",
  variant = "corner",
}: Props) {
  const wordmarkLeftCorner = "calc(var(--circle-size) * 0.9 - 0.2cm)";

  if (variant === "header") {
    return (
      <div
        className={cn("flex items-center gap-[0.3cm]", className)}
        style={
          {
            "--circle-size": circleSize,
            "--wm-h": wordmarkHeight,
          } as React.CSSProperties
        }
      >
        {/* Circle can exceed wordmark height without shifting the wordmark */}
        <div
          className="relative flex shrink-0 items-center justify-center overflow-visible"
          style={{ width: "var(--circle-size)", height: "var(--wm-h)" }}
          aria-hidden
        >
          <Image
            src={brandAssets.logomarkYellow}
            alt=""
            width={176}
            height={176}
            unoptimized
            priority
            className="pointer-events-none absolute h-[var(--circle-size)] w-[var(--circle-size)] shrink-0 select-none"
          />
        </div>
        <Image
          src={brandAssets.wordmarkYellow2xPng}
          alt="Specialist Movers"
          width={502}
          height={102}
          unoptimized
          priority
          className="pointer-events-none h-[var(--wm-h)] w-auto shrink-0 select-none"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative", className)}
      style={
        {
          "--circle-size": circleSize,
          "--wm-h": wordmarkHeight,
        } as React.CSSProperties
      }
    >
      <Image
        src={brandAssets.logomarkYellow}
        alt=""
        width={176}
        height={176}
        unoptimized
        priority
        className="pointer-events-none absolute left-0 top-0 h-[var(--circle-size)] w-[var(--circle-size)] -translate-x-[calc(10%+0.5cm)] -translate-y-[calc(10%+0.5cm)] select-none"
      />
      {wordmarkAlign === "nav" ? (
        <Image
          src={brandAssets.wordmarkYellow2xPng}
          alt="Specialist Movers"
          width={502}
          height={102}
          unoptimized
          priority
          className="pointer-events-none absolute top-[calc(2.125rem-var(--wm-h)*var(--specialist-baseline))] select-none lg:top-[calc(2.5rem-var(--wm-h)*var(--specialist-baseline))] xl:top-[calc(2.625rem-var(--wm-h)*var(--specialist-baseline))]"
          style={{
            left: wordmarkLeftCorner,
            height: wordmarkHeight,
            width: "auto",
            ["--specialist-baseline" as string]: String(SPECIALIST_BASELINE_RATIO),
          }}
        />
      ) : (
        <Image
          src={brandAssets.wordmarkYellow2xPng}
          alt="Specialist Movers"
          width={502}
          height={102}
          unoptimized
          priority
          className="pointer-events-none absolute top-[0.3cm] select-none"
          style={{
            left: wordmarkLeftCorner,
            height: wordmarkHeight,
            width: "auto",
          }}
        />
      )}
    </div>
  );
}

import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left"
  | "center-right";
type Mark = "yellow" | "purple";

/** Keep marks inside the section — positive translate-x caused page-wide horizontal overflow. */
const positionClass: Record<Position, string> = {
  "top-left": "left-0 top-0 -translate-x-1/4 -translate-y-1/4",
  "top-right": "right-0 top-0 translate-x-1/4 -translate-y-1/4",
  "bottom-right": "right-0 bottom-0 translate-x-1/4 translate-y-1/4",
  "bottom-left": "left-0 bottom-0 -translate-x-1/4 translate-y-1/4",
  "center-right": "right-0 top-1/2 -translate-y-1/2 translate-x-1/4",
};

const markSrc: Record<Mark, string> = {
  yellow: brandAssets.logomarkYellow,
  purple: brandAssets.logomarkPurple,
};

/**
 * Large faded circle logomark , sits behind content on purple or light sections.
 */
export function BrandLogomarkWatermark({
  mark = "yellow",
  position = "bottom-right",
  size = 260,
  opacity = 0.07,
  className,
}: {
  /** Yellow on purple sections; purple on light sections */
  mark?: Mark;
  position?: Position;
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <Image
      src={markSrc[mark]}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none",
        positionClass[position],
        className,
      )}
      style={{ opacity }}
    />
  );
}

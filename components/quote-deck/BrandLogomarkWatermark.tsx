import Image from "next/image";
import { brandAssets } from "@/lib/quote-deck/brand-assets";
import { cn } from "@/lib/quote-deck/utils";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left"
  | "center-right";
type Mark = "yellow" | "purple";

const positionClass: Record<Position, string> = {
  "top-left": "left-0 top-0 -translate-x-[24%] -translate-y-[14%]",
  "top-right": "right-0 top-0 translate-x-[18%] -translate-y-[12%]",
  "bottom-right": "right-0 bottom-0 translate-x-[20%] translate-y-[18%]",
  "bottom-left": "left-0 bottom-0 -translate-x-[22%] translate-y-[16%]",
  "center-right": "right-0 top-1/2 -translate-y-1/2 translate-x-[24%]",
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

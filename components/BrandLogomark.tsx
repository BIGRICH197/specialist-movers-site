import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type Mark = "yellow" | "purple";

const markSrc: Record<Mark, string> = {
  yellow: brandAssets.logomarkYellow,
  purple: brandAssets.logomarkPurple,
};

/** Full-colour circle logomark (not the faded watermark treatment). */
export function BrandLogomark({
  mark = "yellow",
  size = 160,
  className,
  priority,
}: {
  mark?: Mark;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={markSrc[mark]}
      alt=""
      width={size}
      height={size}
      unoptimized
      priority={priority}
      className={cn("shrink-0 select-none", className)}
    />
  );
}

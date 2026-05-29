import { cn } from "@/lib/utils";

type Color = "purple" | "yellow";

type Props = {
  src: string;
  alt: string;
  color?: Color;
  className?: string;
};

const colorClass: Record<Color, string> = {
  purple: "bg-brand-purple",
  yellow: "bg-brand-yellow",
};

/**
 * Gold/line-art PNGs from the live site , recoloured via mask (keeps cartoon detail).
 */
export function BrandIllustration({ src, alt, color = "purple", className }: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(colorClass[color], className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

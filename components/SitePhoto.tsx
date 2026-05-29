import Image from "next/image";
import { getPhotoHoverProps } from "@/lib/photo-hover";
import { photoFrameClass } from "@/lib/photo-fade";

type Aspect = "video" | "wide" | "hero" | "card";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[16/10]",
  hero: "aspect-[4/3] min-h-[12rem] sm:aspect-[16/10] sm:min-h-[14rem]",
  card: "aspect-[4/3]",
};

type Props = {
  src: string;
  alt: string;
  aspect?: Aspect;
  priority?: boolean;
  className?: string;
  /** Light purple wash on photo (off for homepage service cards) */
  overlay?: boolean;
  /** Set false to disable hover swap on this instance */
  hoverSwap?: boolean;
};

export function SitePhoto({
  src,
  alt,
  aspect = "wide",
  priority = false,
  className = "",
  overlay = false,
  hoverSwap = false,
}: Props) {
  const hover = hoverSwap ? getPhotoHoverProps(src) : undefined;
  const hasHoverSwap = Boolean(hover?.src);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] ${
        hasHoverSwap ? "group/photo-swap" : ""
      } ${overlay ? photoFrameClass : ""} ${aspectClass[aspect]} ${className}`}
      {...(hasHoverSwap
        ? { tabIndex: 0, role: "img", "aria-label": alt }
        : {})}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={hasHoverSwap ? "" : alt}
          fill
          priority={priority}
          quality={82}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
          className={`object-cover object-center ${
            hasHoverSwap
              ? "transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover/photo-swap:opacity-0 group-hover:opacity-0"
              : ""
          }`}
          aria-hidden={hasHoverSwap ? true : undefined}
        />
        {hover?.src ? (
          <Image
            src={hover.src}
            alt={hover.alt}
            fill
            quality={82}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
            className="object-cover object-center opacity-0 transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover/photo-swap:opacity-100 group-hover:opacity-100"
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}

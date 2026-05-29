import Image from "next/image";
import { getPhotoHoverProps } from "@/lib/photo-hover";
import { photoFrameCaptionClass, photoFrameClass } from "@/lib/photo-fade";

type Props = {
  variant?: "moving" | "piano";
  className?: string;
  /** When set, shows real photography instead of the SVG placeholder */
  photoSrc?: string;
  photoAlt?: string;
  priority?: boolean;
  /** Short line over the photo (e.g. homepage couch gag) */
  overlayCaption?: string;
  /** Optional second image on hover (fade stays; caption unchanged) */
  photoHoverSrc?: string;
  photoHoverAlt?: string;
  /** Auto-pick hover image from photo map (homepage moments only; default off) */
  hoverSwap?: boolean;
  /** Override default aspect ratio for landscape moments */
  aspectClassName?: string;
  /** CSS object-position (e.g. "center 20%" keeps faces in frame) */
  imageObjectPosition?: string;
};

/**
 * Hero image , real photo when `photoSrc` is provided, otherwise brand SVG placeholder.
 */
export function HeroVisual({
  variant = "moving",
  className = "",
  photoSrc,
  photoAlt,
  priority = false,
  overlayCaption,
  photoHoverSrc,
  photoHoverAlt,
  hoverSwap = false,
  aspectClassName = "aspect-[4/3] min-h-[12rem] sm:aspect-[16/10] sm:min-h-[14rem]",
  imageObjectPosition = "center",
}: Props) {
  if (photoSrc) {
    const frameClass = overlayCaption ? photoFrameCaptionClass : photoFrameClass;
    const hover =
      photoHoverSrc != null
        ? { src: photoHoverSrc, alt: photoHoverAlt ?? "" }
        : hoverSwap
          ? getPhotoHoverProps(photoSrc)
          : undefined;
    const hoverSrc = hover?.src;
    const hoverAlt = hover?.alt;
    const hasHoverSwap = Boolean(hoverSrc);

    return (
      <div
        className={`${frameClass} relative overflow-hidden rounded-2xl border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] ${
          hasHoverSwap ? "group/hero-photo" : ""
        } ${
          overlayCaption ? "border-white/15" : "border-brand-purple/15 shadow-md"
        } ${aspectClassName} ${className}`}
        {...(hasHoverSwap
          ? {
              tabIndex: 0,
              role: "img",
              "aria-label": photoAlt ?? "Specialist Movers team at work",
            }
          : {})}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={photoSrc}
            alt={hasHoverSwap ? "" : (photoAlt ?? "Specialist Movers team at work")}
            fill
            priority={priority}
            quality={82}
            sizes="(max-width: 1024px) 100vw, 560px"
            className={`object-cover ${
              hasHoverSwap
                ? "transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover/hero-photo:opacity-0 group-focus-visible/hero-photo:opacity-0"
                : ""
            }`}
            style={{ objectPosition: imageObjectPosition }}
            aria-hidden={hasHoverSwap ? true : undefined}
          />
          {hoverSrc ? (
            <Image
              src={hoverSrc}
              alt={hoverAlt ?? ""}
              fill
              quality={82}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover/hero-photo:opacity-100 group-focus-visible/hero-photo:opacity-100"
              style={{ objectPosition: imageObjectPosition }}
              aria-hidden
            />
          ) : null}
        </div>
        {overlayCaption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-20 sm:px-6 sm:pb-5 sm:pt-24">
            <p className="max-w-xl font-heading text-xl font-bold leading-[1.12] text-brand-yellow sm:text-2xl lg:leading-[1.1]">
              {overlayCaption}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  if (variant === "piano") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-brand-purple/15 bg-gradient-to-br from-brand-purple/[0.07] via-white to-brand-yellow/15 shadow-sm ${className}`}
        aria-hidden
      >
        <svg
          className="h-full w-full min-h-[12rem] sm:min-h-[14rem]"
          viewBox="0 0 440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="220" cy="200" rx="180" ry="28" fill="#9739b0" fillOpacity="0.08" />
          <rect
            x="48"
            y="72"
            width="200"
            height="100"
            rx="10"
            fill="#9739b0"
            fillOpacity="0.12"
          />
          <rect x="72" y="88" width="152" height="12" rx="4" fill="#f3d02a" fillOpacity="0.5" />
          <rect x="72" y="108" width="120" height="8" rx="3" fill="#9739b0" fillOpacity="0.2" />
          <rect x="72" y="124" width="100" height="8" rx="3" fill="#9739b0" fillOpacity="0.15" />
          <circle cx="340" cy="120" r="48" fill="#f3d02a" fillOpacity="0.35" />
          <path
            d="M320 120h40M340 100v40"
            stroke="#9739b0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-brand-purple/15 bg-gradient-to-br from-brand-purple/[0.07] via-white to-brand-yellow/15 shadow-sm ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full min-h-[12rem] sm:min-h-[14rem]"
        viewBox="0 0 440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="220" cy="200" rx="180" ry="28" fill="#9739b0" fillOpacity="0.08" />
        <rect x="40" y="100" width="280" height="72" rx="12" fill="#9739b0" fillOpacity="0.15" />
        <rect x="56" y="116" width="80" height="40" rx="6" fill="#f3d02a" fillOpacity="0.6" />
        <circle cx="100" cy="188" r="18" fill="#9739b0" fillOpacity="0.25" />
        <circle cx="260" cy="188" r="18" fill="#9739b0" fillOpacity="0.25" />
        <rect x="300" y="88" width="100" height="56" rx="8" fill="#f3d02a" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

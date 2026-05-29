import { HeroVisual } from "@/components/HeroVisual";
import { PhotoMomentCtas } from "@/components/PhotoMomentCtas";
import type { JobType } from "@/lib/site-data";

type Props = {
  photoSrc: string;
  photoAlt: string;
  caption: string;
  /** half = hero-column width; full = spans content area */
  size?: "half" | "full";
  layout?: "wide" | "hero";
  /** overlay = yellow line on photo; beside = image + text columns on lg */
  captionPlacement?: "overlay" | "beside";
  /** Free quote + call back buttons under beside caption */
  showCta?: boolean;
  defaultJobType?: JobType;
  openFromHash?: boolean;
  /** Match PagePhotoMomentStrip , light strip uses purple copy */
  tone?: "purple" | "light";
  body?: string;
  className?: string;
  imageObjectPosition?: string;
  aspectClassName?: string;
  hoverSwap?: boolean;
};

const aspectWide =
  "aspect-[16/9] min-h-[12rem] sm:min-h-[14rem] lg:min-h-[16rem]";
const aspectHero =
  "aspect-[4/3] min-h-[12rem] sm:aspect-[16/10] sm:min-h-[14rem]";

/**
 * Brand moment , photo with yellow caption on image, or beside on desktop.
 */
export function PhotoMoment({
  photoSrc,
  photoAlt,
  caption,
  size = "half",
  layout = "hero",
  captionPlacement = "overlay",
  showCta = false,
  defaultJobType,
  openFromHash = true,
  tone = "purple",
  body,
  className = "",
  imageObjectPosition,
  aspectClassName: aspectOverride,
  hoverSwap = false,
}: Props) {
  const aspectClassName =
    aspectOverride ?? (layout === "wide" ? aspectWide : aspectHero);

  const onLight = tone === "light";
  const captionClass = onLight
    ? "font-heading text-2xl font-bold leading-[1.12] text-brand-purple sm:text-3xl lg:leading-[1.1]"
    : "font-heading text-2xl font-bold leading-[1.12] text-brand-yellow sm:text-3xl lg:leading-[1.1]";
  const bodyClass = onLight
    ? "mt-4 max-w-md text-base leading-relaxed text-brand-purple/85"
    : "mt-4 max-w-md text-base leading-relaxed text-white/85";

  if (captionPlacement === "beside") {
    return (
      <div
        className={`grid w-full gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-12 ${className}`}
      >
        <HeroVisual
          variant="moving"
          photoSrc={photoSrc}
          photoAlt={photoAlt}
          hoverSwap={hoverSwap}
          aspectClassName={aspectClassName}
          imageObjectPosition={imageObjectPosition}
          className="w-full max-w-none lg:max-h-[20rem]"
        />
        <div className="flex max-w-xl flex-col justify-center px-0 text-center lg:mx-0 lg:px-2 lg:text-left">
          <p className={captionClass}>{caption}</p>
          {body ? <p className={`${bodyClass} lg:max-w-md`}>{body}</p> : null}
          {showCta ? (
            <PhotoMomentCtas
              defaultJobType={defaultJobType}
              openFromHash={openFromHash}
              tone={tone}
            />
          ) : null}
        </div>
      </div>
    );
  }

  const sizeClass =
    size === "half"
      ? "w-full max-w-xl sm:max-w-2xl lg:max-w-[min(100%,40rem)]"
      : "w-full";

  if (showCta) {
    return (
      <div className={`w-full space-y-6 ${className}`}>
        <HeroVisual
          variant="moving"
          photoSrc={photoSrc}
          photoAlt={photoAlt}
          hoverSwap={hoverSwap}
          overlayCaption={caption}
          aspectClassName={aspectClassName}
          imageObjectPosition={imageObjectPosition}
          className={sizeClass}
        />
        {body ? (
          <p
            className={`mx-auto max-w-2xl text-center text-base leading-relaxed lg:text-left ${onLight ? "text-brand-purple/85" : "text-white/85"}`}
          >
            {body}
          </p>
        ) : null}
        <PhotoMomentCtas
          defaultJobType={defaultJobType}
          openFromHash={openFromHash}
          tone={tone}
        />
      </div>
    );
  }

  return (
    <HeroVisual
      variant="moving"
      photoSrc={photoSrc}
      photoAlt={photoAlt}
      hoverSwap={hoverSwap}
      overlayCaption={caption}
      aspectClassName={aspectClassName}
      imageObjectPosition={imageObjectPosition}
      className={`${sizeClass} ${className}`}
    />
  );
}

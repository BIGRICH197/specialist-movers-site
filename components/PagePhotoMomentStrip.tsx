import { PhotoMoment } from "@/components/PhotoMoment";
import { SectionReveal } from "@/components/SectionReveal";
import { getPagePhotoMoment, type PagePhotoMoment } from "@/lib/page-photo-moments";

type StripTone = "purple" | "light";

type Props = {
  momentKey: string;
  moment?: PagePhotoMoment;
  className?: string;
  /** Purple band (default) or white band below a purple hero */
  tone?: StripTone;
  /** Set false when the page hero already has id="quote" (e.g. service landings) */
  useQuoteAnchor?: boolean;
};

/**
 * Brand moment , half-width overlay (default) or full-width beside layout.
 */
export function PagePhotoMomentStrip({
  momentKey,
  moment,
  className = "",
  tone = "purple",
  useQuoteAnchor = true,
}: Props) {
  const data = moment ?? getPagePhotoMoment(momentKey);
  if (!data) return null;

  const isBeside = data.captionPlacement === "beside";
  const isHalf = data.photoWrap === "half" || !isBeside;

  const quoteAnchorId =
    data.showCta && useQuoteAnchor && momentKey !== "home" ? "quote" : undefined;

  const stripSurface =
    tone === "light"
      ? "border-t border-brand-purple/10 bg-brand-white"
      : "border-t border-brand-purple/10 bg-brand-purple";

  return (
    <SectionReveal
      id={quoteAnchorId}
      className={`${stripSurface} py-10 sm:py-12 scroll-mt-24 ${className}`}
    >
      <div
        className={`mx-auto max-w-7xl container-px ${
          isHalf && !isBeside ? "flex justify-center" : ""
        }`}
      >
        <PhotoMoment
          size={isHalf ? "half" : "full"}
          layout={data.layout ?? "hero"}
          captionPlacement={data.captionPlacement ?? "overlay"}
          photoSrc={data.photo}
          photoAlt={data.alt}
          caption={data.caption}
          showCta={data.showCta}
          defaultJobType={data.defaultJobType}
          openFromHash={momentKey !== "home"}
          tone={tone}
          body={data.body}
          aspectClassName={data.aspectClassName}
          imageObjectPosition={data.imageObjectPosition}
          hoverSwap={momentKey === "home"}
        />
      </div>
    </SectionReveal>
  );
}

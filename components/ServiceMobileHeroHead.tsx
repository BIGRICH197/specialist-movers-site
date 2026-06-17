"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";
import { ServiceHeroTitleFit } from "@/components/hero/ServiceHeroTitleFit";
import { getServiceMobileHeroTitle } from "@/lib/mobile-hero-title-reference";
import {
  getPianoMobileTitle,
  PIANO_MOBILE_TRUST_PILL,
} from "@/lib/piano-mobile-hero";

const MOBILE_HEADING_CLASS =
  "font-heading text-3xl leading-[1.12] text-white sm:text-4xl";

const MOBILE_PILL_CLASS =
  "inline-flex w-fit max-w-[95%] self-start rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-yellow sm:px-3 sm:py-1.5 sm:text-xs sm:tracking-wider";

function measurePhotoWidth(wrap: HTMLDivElement | null): number {
  if (!wrap) return 0;
  const photo =
    (wrap.firstElementChild as HTMLElement | null) ?? wrap;
  return photo.clientWidth;
}

type Props = {
  heading: string;
  eyebrowLabel?: string;
  eyebrow?: ReactNode;
  photo?: ReactNode;
  heroVariant?: "moving" | "piano";
  /** Piano pages: retailer marquee above Google badge on mobile only. */
  showMobilePartnerMarquee?: boolean;
  /** Service slug for mobile-only fitted title overrides (e.g. winz-quotes, storage). */
  titleSlug?: string;
};

function FittedHeroTitle({
  text,
  seoHeading,
  photoWidthPx,
}: {
  text: string;
  seoHeading?: string;
  photoWidthPx?: number;
}) {
  const showSeo = Boolean(seoHeading && seoHeading !== text);

  return (
    <div className="-mt-0.5 flex w-full min-w-0 justify-center">
      <ServiceHeroTitleFit
        as={showSeo ? "div" : "h1"}
        text={text}
        targetWidthPx={photoWidthPx}
        className="font-normal uppercase"
      />
      {showSeo ? <h1 className="sr-only">{seoHeading}</h1> : null}
    </div>
  );
}

/** Mobile service hero — fitted title (+ Steinway pill on piano pages). */
export function ServiceMobileHeroHead({
  heading,
  eyebrowLabel,
  eyebrow,
  photo,
  heroVariant = "moving",
  showMobilePartnerMarquee = false,
  titleSlug,
}: Props) {
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const [photoWidthPx, setPhotoWidthPx] = useState<number>();
  const isPiano = heroVariant === "piano";
  const pianoTitle = isPiano ? getPianoMobileTitle(heading, titleSlug) : null;
  const mobileTitleText = getServiceMobileHeroTitle(titleSlug, heading, eyebrowLabel);

  useLayoutEffect(() => {
    const wrap = photoWrapRef.current;
    if (!wrap) {
      setPhotoWidthPx(undefined);
      return;
    }

    const sync = () => {
      const width = measurePhotoWidth(wrap);
      if (width > 0) setPhotoWidthPx(width);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(wrap);
    const photoEl = wrap.firstElementChild;
    if (photoEl) observer.observe(photoEl);

    return () => observer.disconnect();
  }, [photo]);

  const photoBlock = photo ? (
    <div ref={photoWrapRef} className="w-full min-w-0">
      {photo}
    </div>
  ) : null;

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:hidden">
      {eyebrow ? <div className="self-start">{eyebrow}</div> : null}
      {!eyebrow && isPiano && pianoTitle ? (
        <>
          <FittedHeroTitle
            text={pianoTitle}
            seoHeading={heading}
            photoWidthPx={photoWidthPx}
          />
          <h2 className={MOBILE_PILL_CLASS}>{PIANO_MOBILE_TRUST_PILL}</h2>
          {photoBlock}
        </>
      ) : !eyebrow ? (
        <>
          <FittedHeroTitle
            text={mobileTitleText}
            seoHeading={eyebrowLabel ? heading : undefined}
            photoWidthPx={photoWidthPx}
          />
          {photoBlock}
        </>
      ) : (
        <>
          <h1 className={MOBILE_HEADING_CLASS}>{heading}</h1>
          {photoBlock}
        </>
      )}
      {showMobilePartnerMarquee ? (
        <PianoPartnerMarquee variant="hero" />
      ) : null}
      <GoogleRatingBadge variant="compact" />
    </div>
  );
}

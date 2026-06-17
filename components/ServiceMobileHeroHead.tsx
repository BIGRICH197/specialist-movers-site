"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { ServiceHeroTitleFit } from "@/components/hero/ServiceHeroTitleFit";
import { normalizeServiceMobileHeroTitle } from "@/lib/mobile-hero-title-reference";

const MOBILE_HEADING_CLASS =
  "font-heading text-3xl leading-[1.12] text-white sm:text-4xl";

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
};

/** Mobile service hero — title line width always matches photo width. */
export function ServiceMobileHeroHead({
  heading,
  eyebrowLabel,
  eyebrow,
  photo,
}: Props) {
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const [photoWidthPx, setPhotoWidthPx] = useState<number>();
  const mobileTitleText = normalizeServiceMobileHeroTitle(eyebrowLabel ?? heading);

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

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:hidden">
      {eyebrow ? <div className="self-start">{eyebrow}</div> : null}
      {!eyebrow ? (
        <>
          <div className="-mt-0.5 flex w-full min-w-0 justify-center">
            <ServiceHeroTitleFit
              as={eyebrowLabel ? "div" : "h1"}
              text={mobileTitleText}
              targetWidthPx={photoWidthPx}
              className="font-normal uppercase"
            />
            {eyebrowLabel ? <h1 className="sr-only">{heading}</h1> : null}
          </div>
          {photo ? (
            <div ref={photoWrapRef} className="w-full min-w-0">
              {photo}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <h1 className={MOBILE_HEADING_CLASS}>{heading}</h1>
          {photo ? <div className="w-full">{photo}</div> : null}
        </>
      )}
      <GoogleRatingBadge variant="compact" />
    </div>
  );
}

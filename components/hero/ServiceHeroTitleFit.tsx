"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { fitHeroTitlePx } from "@/lib/hero-title-fit";
import { cn } from "@/lib/utils";

const LINE_HEIGHT = 1.12;
/** Match HomeHero mobile title (maxPx 28) — keeps gap to photo the same. */
const TITLE_RESERVE_PX = 28;
const MAX_PX = TITLE_RESERVE_PX;
const MIN_PX = 8;

type Props = {
  text: string;
  /** Measured photo width — title line matches this exactly. */
  targetWidthPx?: number;
  as?: "h1" | "div";
  className?: string;
};

/** Service mobile hero title — one line, width locked to photo. Home uses HeroTitleFit. */
export function ServiceHeroTitleFit({
  text,
  targetWidthPx,
  as: Tag = "div",
  className,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const ready = targetWidthPx != null && targetWidthPx > 0;

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title || !ready || !targetWidthPx) return;

    let cancelled = false;

    const fit = async () => {
      await document.fonts.ready;
      if (cancelled) return;

      const width = targetWidthPx;

      let size = fitHeroTitlePx(width, MAX_PX, MIN_PX, (px) => {
        title.style.fontSize = `${px}px`;
        return title.scrollWidth;
      });

      title.style.fontSize = `${size}px`;
      while (size > MIN_PX && title.scrollWidth > width) {
        size -= 1;
        title.style.fontSize = `${size}px`;
      }

      setVisible(true);
    };

    setVisible(false);
    void fit();

    return () => {
      cancelled = true;
    };
  }, [text, targetWidthPx, ready]);

  const titleClassName = cn(
    "block w-full min-w-0 whitespace-nowrap text-center font-heading leading-[1.12] text-white",
    ready && visible ? "opacity-100" : "opacity-0",
    className,
  );

  return (
    <div
      className="mx-auto min-w-0"
      style={{
        width: ready ? targetWidthPx : "100%",
        minHeight: `calc(${TITLE_RESERVE_PX}px * ${LINE_HEIGHT})`,
      }}
    >
      {Tag === "div" ? (
        <div ref={titleRef} className={titleClassName}>
          {text}
        </div>
      ) : (
        <h1 ref={titleRef} className={titleClassName}>
          {text}
        </h1>
      )}
    </div>
  );
}

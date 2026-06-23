"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { fitHeroTitlePx } from "@/lib/hero-title-fit";
import { formatHeadingText } from "@/lib/heading-ampersand";
import { isMultilineServiceMobileHeroTitle } from "@/lib/mobile-hero-title-reference";
import { cn } from "@/lib/utils";

const LINE_HEIGHT = 1.12;
/** Match HomeHero mobile title max — keeps gap to photo the same. */
const TITLE_RESERVE_PX = 34;
const MAX_PX = TITLE_RESERVE_PX;
const MIN_PX = 10;

type Props = {
  text: string;
  /** Measured photo width — title line matches this exactly. */
  targetWidthPx?: number;
  as?: "h1" | "div";
  className?: string;
};

/** Service mobile hero title — one or two lines, width locked to photo. Home uses HeroTitleFit. */
export function ServiceHeroTitleFit({
  text,
  targetWidthPx,
  as: Tag = "div",
  className,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [fittedPx, setFittedPx] = useState<number>();
  const ready = targetWidthPx != null && targetWidthPx > 0;

  const lines = isMultilineServiceMobileHeroTitle(text)
    ? text.split("\n").map((line) => line.trim()).filter(Boolean)
    : [text];
  const multiline = lines.length > 1;

  const placeholderMinHeight = MIN_PX * LINE_HEIGHT * lines.length;
  const minHeightPx = multiline
    ? visible && fittedPx != null
      ? fittedPx * LINE_HEIGHT * lines.length
      : placeholderMinHeight
    : TITLE_RESERVE_PX * LINE_HEIGHT;

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title || !ready || !targetWidthPx) return;

    let cancelled = false;

    const fit = async () => {
      await document.fonts.ready;
      if (cancelled) return;

      const width = targetWidthPx;

      const measureWidth = (px: number) => {
        title.style.fontSize = `${px}px`;
        if (multiline) {
          return Math.max(
            0,
            ...lineRefs.current.map((line) => line?.scrollWidth ?? 0),
          );
        }
        return title.scrollWidth;
      };

      let size = fitHeroTitlePx(width, MAX_PX, MIN_PX, measureWidth);

      title.style.fontSize = `${size}px`;
      while (size > MIN_PX && measureWidth(size) > width) {
        size -= 1;
        title.style.fontSize = `${size}px`;
      }

      setFittedPx(size);
      setVisible(true);
    };

    setVisible(false);
    setFittedPx(undefined);
    void fit();

    return () => {
      cancelled = true;
    };
  }, [text, targetWidthPx, ready, multiline]);

  const titleClassName = cn(
    "block w-full min-w-0 text-center font-heading leading-[1.12] text-white",
    !multiline && "whitespace-nowrap",
    ready && visible ? "opacity-100" : "opacity-0",
    className,
  );

  const content = multiline ? (
    <>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(node) => {
            lineRefs.current[index] = node;
          }}
          className="block whitespace-nowrap"
        >
          {formatHeadingText(line)}
        </span>
      ))}
    </>
  ) : (
    formatHeadingText(text)
  );

  return (
    <div
      className="mx-auto min-w-0"
      style={{
        width: ready ? targetWidthPx : "100%",
        minHeight: minHeightPx,
      }}
    >
      {Tag === "div" ? (
        <div ref={titleRef} className={titleClassName}>
          {content}
        </div>
      ) : (
        <h1 ref={titleRef} className={titleClassName}>
          {content}
        </h1>
      )}
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  estimateHeroTitlePx,
  fitHeroTitlePx,
} from "@/lib/hero-title-fit";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  maxPx?: number;
  minPx?: number;
  tone?: "yellow" | "white";
  as?: "h1" | "span";
  /** Shrink fit width (e.g. 0.9 keeps text inside a photo below). */
  fitScale?: number;
};

const LINE_HEIGHT = 1.12;

/** Shrinks hero title text until it fits one line inside its column. */
export function HeroTitleFit({
  text,
  className,
  maxPx = 44,
  minPx = 22,
  tone = "yellow",
  as: Tag = "h1",
  fitScale = 1,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    let cancelled = false;

    const fit = async () => {
      await document.fonts.ready;
      if (cancelled) return;

      const width = Math.floor(container.clientWidth * fitScale);
      const size = fitHeroTitlePx(width, maxPx, minPx, (px) => {
        title.style.fontSize = `${px}px`;
        return title.scrollWidth;
      });

      title.style.fontSize = `${size}px`;
      setVisible(true);
    };

    void fit();

    const observer = new ResizeObserver(() => {
      void fit();
    });
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [text, maxPx, minPx, fitScale]);

  const initialPx = estimateHeroTitlePx(text, 0, maxPx, minPx);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0"
      style={{ minHeight: `calc(${maxPx}px * ${LINE_HEIGHT})` }}
    >
      <Tag
        ref={titleRef}
        className={cn(
          "block w-full min-w-0 whitespace-nowrap font-heading leading-[1.12]",
          tone === "white" ? "text-white" : "text-brand-yellow",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ fontSize: `${initialPx}px` }}
      >
        {text}
      </Tag>
    </div>
  );
}

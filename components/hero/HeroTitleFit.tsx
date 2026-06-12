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
};

const LINE_HEIGHT = 1.12;

/** Shrinks desktop hero h1 until it fits one line inside its column. */
export function HeroTitleFit({
  text,
  className,
  maxPx = 44,
  minPx = 22,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    let cancelled = false;

    const fit = async () => {
      await document.fonts.ready;
      if (cancelled) return;

      const width = container.clientWidth;
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
  }, [text, maxPx, minPx]);

  const initialPx = estimateHeroTitlePx(text, 0, maxPx, minPx);

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0"
      style={{ minHeight: `calc(${maxPx}px * ${LINE_HEIGHT})` }}
    >
      <h1
        ref={titleRef}
        className={cn(
          "w-full whitespace-nowrap font-heading leading-[1.12] text-brand-yellow",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ fontSize: `${initialPx}px` }}
      >
        {text}
      </h1>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { ServiceHeroSublinePrice } from "@/components/ServiceHeroSublinePrice";
import { cn } from "@/lib/utils";

type Props = {
  subline?: ReactNode;
  trustPills: readonly string[];
  phone?: ReactNode;
  className?: string;
};

/**
 * Desktop hero block — price pill width matches the trust-pills row (e.g. ends at Piano specialists).
 */
export function ServiceHeroTrustStack({ subline, trustPills, phone, className }: Props) {
  const trustRowRef = useRef<HTMLDivElement>(null);
  const lastPillRef = useRef<HTMLSpanElement>(null);
  const [pillMaxWidth, setPillMaxWidth] = useState<number>();

  useLayoutEffect(() => {
    const row = trustRowRef.current;
    const lastPill = lastPillRef.current;
    if (!row || !lastPill) return;

    const sync = () => {
      const rowLeft = row.getBoundingClientRect().left;
      const lastRight = lastPill.getBoundingClientRect().right;
      setPillMaxWidth(Math.ceil(lastRight - rowLeft));
    };
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(row);
    observer.observe(lastPill);
    return () => observer.disconnect();
  }, [trustPills]);

  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-6", className)}>
      {subline ? (
        <div
          className="min-w-0 max-w-full self-start"
          style={pillMaxWidth ? { maxWidth: pillMaxWidth } : undefined}
        >
          {typeof subline === "string" ? (
            <ServiceHeroSublinePrice>{subline}</ServiceHeroSublinePrice>
          ) : (
            subline
          )}
        </div>
      ) : null}
      {phone}
      <div className="relative w-full">
        <div
          ref={trustRowRef}
          className="flex flex-wrap gap-2 text-xs font-semibold text-white/95 xl:pr-[10.75rem]"
        >
          {trustPills.map((label, index) => (
            <span
              key={label}
              ref={index === trustPills.length - 1 ? lastPillRef : undefined}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
            >
              {label}
            </span>
          ))}
        </div>
        {/* Nudged 2mm right (Richard, 2026-08-03). Real mm unit rather than a
            px guess, so it is the distance he actually asked for. */}
        <GoogleRatingBadge className="pointer-events-auto absolute bottom-0 right-0 z-20 hidden shrink-0 translate-x-[2mm] xl:flex" />
      </div>
    </div>
  );
}

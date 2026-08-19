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
  const [pillMaxWidth, setPillMaxWidth] = useState<number>();

  useLayoutEffect(() => {
    const row = trustRowRef.current;
    if (!row) return;

    const sync = () => {
      const pills = Array.from(row.children);
      if (!pills.length) return;
      const rowLeft = row.getBoundingClientRect().left;
      /*
       * Measure the widest pill row, not the last pill. The pills wrap, and
       * once they do the last one sits alone on the final line — capping to
       * its right edge collapsed the price pill to that single pill's width
       * (123px instead of 433px on /piano-movers at 1600px). On a single
       * line the last pill is still the rightmost, so this is unchanged
       * where the row does not wrap.
       */
      const widestRight = Math.max(
        ...pills.map((pill) => pill.getBoundingClientRect().right),
      );
      setPillMaxWidth(Math.ceil(widestRight - rowLeft));
    };
    sync();

    /*
     * Observe each pill as well as the row. A late webfont can change pill
     * widths without changing the row box, which would otherwise leave the
     * cap stale.
     */
    const observer = new ResizeObserver(sync);
    observer.observe(row);
    Array.from(row.children).forEach((pill) => observer.observe(pill));
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
          {trustPills.map((label) => (
            <span
              key={label}
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

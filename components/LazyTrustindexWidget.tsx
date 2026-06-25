"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const TrustindexWidget = dynamic(
  () =>
    import("@/components/TrustindexWidget").then((m) => ({
      default: m.TrustindexWidget,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[8rem] w-full animate-pulse rounded-2xl bg-brand-purple/[0.06]"
        aria-hidden
      />
    ),
  },
);

type Props = ComponentProps<typeof TrustindexWidget> & {
  /** Placeholder min-height while off-screen (layout stability). */
  placeholderClassName?: string;
};

/** Defers Trustindex loader.js until the band nears the viewport. */
export function LazyTrustindexWidget({
  className,
  placeholderClassName,
  ...props
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={hostRef} className={cn("w-full", className)}>
      {visible ? (
        <TrustindexWidget {...props} />
      ) : (
        <div
          className={cn(
            "min-h-[8rem] w-full rounded-2xl bg-brand-purple/[0.04]",
            placeholderClassName,
          )}
          aria-hidden
        />
      )}
    </div>
  );
}

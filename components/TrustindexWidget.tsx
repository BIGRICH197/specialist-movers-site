"use client";

import { useEffect, useRef, useState } from "react";
import { trustindexWidgetId } from "@/lib/trustindex-config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /**
   * Trustindex widget ID from admin (Save and get code).
   * Use a second ID for a different layout, e.g. carousel on homepage vs grid on /reviews.
   */
  widgetId?: string;
  /** full = reviews page; carousel = homepage band; badge-square = hero tile */
  layout?: "full" | "carousel" | "badge-square";
};

const layoutClass: Record<NonNullable<Props["layout"]>, string> = {
  "badge-square":
    "mx-auto flex aspect-square w-[10.5rem] items-center justify-center sm:w-[11rem] [&_.ti-widget]:!m-0 [&_.ti-widget]:!h-full [&_.ti-widget]:!w-full [&_.ti-widget]:!max-w-none",
  carousel:
    "w-full [&_.ti-widget]:relative [&_.ti-widget]:mx-auto [&_.ti-widget]:max-w-full [&_.ti-widget]:!mb-0 [&_.ti-widget-container]:!pb-0",
  full: "min-h-[20rem] w-full sm:min-h-[24rem] [&_.ti-widget]:relative [&_.ti-widget]:mx-auto [&_.ti-widget]:max-w-full",
};

/** Trustindex “floating” layouts clone the widget onto document.body , remove those copies. */
function removeOrphanTrustindexWidgets(keepInside: HTMLElement) {
  document.querySelectorAll(".ti-widget").forEach((el) => {
    if (!keepInside.contains(el)) {
      el.remove();
    }
  });

  document.body.querySelectorAll(":scope > div").forEach((el) => {
    if (keepInside.contains(el)) return;
    if (el.querySelector(".ti-widget") && !el.classList.contains("trustindex-host")) {
      el.remove();
    }
  });
}

/**
 * Live Google reviews via Trustindex loader.js.
 * The script must live inside this host , Trustindex replaces the script with the widget
 * in place (Next.js <Script> at the document end puts reviews under the footer).
 * @see https://admin.trustindex.io
 */
export function TrustindexWidget({
  className = "",
  widgetId,
  layout = "full",
}: Props) {
  const id = widgetId ?? trustindexWidgetId;
  const hostRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setLoadError(false);
    host.replaceChildren();

    removeOrphanTrustindexWidgets(host);

    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?${id}`;
    script.defer = true;
    script.async = true;
    script.onerror = () => setLoadError(true);

    host.appendChild(script);

    const hostObserver = new MutationObserver(() => {
      const widget = host.querySelector(".ti-widget");
      if (widget?.textContent?.includes("Widget not found")) {
        setLoadError(true);
      }
    });
    hostObserver.observe(host, { childList: true, subtree: true });

    const sweeps = [400, 1200, 3000, 6000].map((ms) =>
      window.setTimeout(() => removeOrphanTrustindexWidgets(host), ms),
    );

    return () => {
      hostObserver.disconnect();
      sweeps.forEach((t) => window.clearTimeout(t));
      host.replaceChildren();
      removeOrphanTrustindexWidgets(host);
    };
  }, [id]);

  return (
    <div
      className={cn("trustindex-host relative isolate z-0 w-full", className)}
      aria-label="Google reviews"
      data-trustindex-widget-id={id}
      data-layout={layout}
    >
      <div ref={hostRef} className={cn(layoutClass[layout])} />
      {loadError ? (
        <p className="mt-4 text-center text-sm text-brand-purple/70">
          Reviews could not load. Check your Trustindex subscription is active, then refresh.
        </p>
      ) : null}
    </div>
  );
}

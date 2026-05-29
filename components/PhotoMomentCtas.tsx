"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import type { JobType } from "@/lib/site-data";

type PanelMode = "choose" | "callback";

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple shadow-[0_10px_24px_-12px_rgba(243,208,42,0.9)] ring-2 ring-white/20 transition hover:brightness-[1.05]";
const btnSecondaryPurple =
  "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/15";
const btnSecondaryLight =
  "inline-flex items-center justify-center rounded-full border-2 border-brand-purple/25 bg-white px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]";

type Props = {
  defaultJobType?: JobType;
  tone?: "purple" | "light";
  /** Open form when URL hash is #quote (brand-moment pages, not homepage hero) */
  openFromHash?: boolean;
};

/**
 * Brand-moment CTAs , opens the quote form in place (no jump to homepage hero).
 */
export function PhotoMomentCtas({
  defaultJobType,
  tone = "purple",
  openFromHash = true,
}: Props) {
  const btnSecondary = tone === "light" ? btnSecondaryLight : btnSecondaryPurple;
  const [open, setOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>("choose");
  const panelRef = useRef<HTMLDivElement>(null);

  const openForm = useCallback((mode: PanelMode) => {
    setPanelMode(mode);
    setOpen(true);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, []);

  useEffect(() => {
    if (!openFromHash) return;

    const syncHash = () => {
      if (window.location.hash !== "#quote") return;
      openForm("choose");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [openFromHash, openForm]);

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <button type="button" onClick={() => openForm("choose")} className={btnPrimary}>
          Free quote
        </button>
        <button type="button" onClick={() => openForm("callback")} className={btnSecondary}>
          Request a call back
        </button>
      </div>
      {open ? (
        <div ref={panelRef} className="mt-8 w-full scroll-mt-24">
          <QuoteForm
            key={`${panelMode}-${defaultJobType ?? "any"}`}
            compact
            initialMode={panelMode === "callback" ? "callback" : undefined}
            defaultJobType={panelMode === "choose" ? defaultJobType : undefined}
          />
        </div>
      ) : null}
    </>
  );
}

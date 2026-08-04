"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { formatNzd } from "@/lib/quote-deck/house-move-quote";

// Interactive add-ons + accept flow around a hosted quote. The add-ons live in a
// purple panel ABOVE the quote (tick cleaning/packing/insurance). The quote price
// breakdown is passed as children. The total + owner's-risk + Accept button sit
// BELOW the quote. Selections flow to /api/quote-accept (Slack) and into the
// booking form via query params.

type Props = {
  quoteRef: string;
  moveInclGst: number;
  cleaningQuoted: boolean;
  cleaningPriceInclGst: number | null;
  packingQuoted: boolean;
  packingPriceInclGst: number;
  /** The quote price breakdown — rendered between the add-ons and the checkout. */
  children: ReactNode;
};

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={
        "proposal-addon-checkbox mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border " +
        (on ? "border-brand-yellow bg-brand-yellow text-brand-purple" : "border-white/45 bg-transparent")
      }
      aria-hidden
    >
      {on ? (
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
          <path d="M10.2 2.8 4.5 8.5 1.8 5.8l-.9.9 3.6 3.6 6.6-6.6-.9-.9Z" />
        </svg>
      ) : null}
    </span>
  );
}

export function QuoteCustomise({
  quoteRef,
  moveInclGst,
  cleaningQuoted,
  cleaningPriceInclGst,
  packingQuoted,
  packingPriceInclGst,
  children,
}: Props) {
  const router = useRouter();
  const [cleaningOn, setCleaningOn] = useState(cleaningQuoted);
  const [packingOn, setPackingOn] = useState(packingQuoted);
  const [insuranceOn, setInsuranceOn] = useState(false);
  const [ownerRisk, setOwnerRisk] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [callState, setCallState] = useState<"idle" | "sending" | "done">("idle");

  const cleaningHasPrice = cleaningPriceInclGst != null;
  const liveTotal =
    moveInclGst +
    (cleaningOn && cleaningHasPrice ? cleaningPriceInclGst! : 0) +
    (packingOn && packingQuoted ? packingPriceInclGst : 0);

  const canAccept = insuranceOn || ownerRisk;

  async function accept() {
    if (accepting || !canAccept) return;
    setAccepting(true);
    try {
      await fetch("/api/quote-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref: quoteRef,
          addOns: { cleaning: cleaningOn, packing: packingOn && packingQuoted, insurance: insuranceOn },
        }),
      });
    } catch {
      /* notify is best-effort; still proceed to the form */
    }
    const qs = new URLSearchParams({
      clean: cleaningOn ? "1" : "0",
      pack: packingOn && packingQuoted ? "1" : "0",
      ins: insuranceOn ? "1" : "0",
    }).toString();
    router.push(`/quote/${quoteRef}/book?${qs}`);
  }

  async function requestCall() {
    if (callState !== "idle") return;
    setCallState("sending");
    try {
      await fetch("/api/quote-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: quoteRef }),
      });
      setCallState("done");
    } catch {
      setCallState("idle");
    }
  }

  const rowCls = "flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed sm:text-sm";

  return (
    <>
      {/* ── Add-ons (purple panel, ABOVE the quote) ── */}
      <div className="proposal-purple-panel proposal-addons-panel mb-4 px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-heading text-xs font-bold text-brand-yellow sm:text-sm">Add-ons</h3>
        <p className="mt-1 text-[10px] text-white/60 sm:text-xs">Tick to add to your move</p>

        <ul className="proposal-addon-list mt-2.5 space-y-2.5">
          <li>
            <label className={rowCls} onClick={() => setCleaningOn((v) => !v)}>
              <Tick on={cleaningOn} />
              <span className="flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className={cleaningOn ? "text-white" : "text-white/75"}>Exit cleaning</span>
                  <span className={cleaningOn ? "text-white" : "text-white/75"}>
                    {cleaningHasPrice ? `${formatNzd(cleaningPriceInclGst!)} incl GST` : "Price on request"}
                  </span>
                </span>
                <span className="mt-0.5 block text-[10px] text-white/55 sm:text-xs">
                  A professional end-of-tenancy clean, fixed price.
                  {!cleaningHasPrice ? " Our team will confirm the price." : ""}{" "}
                  <a
                    href="/cleaning-schedule"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-semibold text-brand-yellow underline underline-offset-2"
                  >
                    View the cleaning schedule →
                  </a>
                </span>
              </span>
            </label>
          </li>

          <li>
            <label className={rowCls} onClick={() => setPackingOn((v) => !v)}>
              <Tick on={packingOn} />
              <span className="flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className={packingOn ? "text-white" : "text-white/75"}>Full packing, packers come in the day before</span>
                  <span className={packingOn ? "text-white" : "text-white/75"}>
                    {packingQuoted ? `${formatNzd(packingPriceInclGst)} incl GST` : "Price on request"}
                  </span>
                </span>
                <span className="mt-0.5 block text-[10px] text-white/55 sm:text-xs">
                  {packingQuoted
                    ? "Untick if you would rather pack yourself."
                    : "Tick to add it and our team will confirm the price."}
                </span>
              </span>
            </label>
          </li>

          <li>
            <label className={rowCls} onClick={() => setInsuranceOn((v) => !v)}>
              <Tick on={insuranceOn} />
              <span className="flex-1">
                <span className={insuranceOn ? "text-white" : "text-white/75"}>Request insurance cover</span>
                <span className="mt-0.5 block text-[10px] text-white/55 sm:text-xs">
                  Our team will send you insurance options. Your move is otherwise carried at owner&apos;s risk.
                </span>
              </span>
            </label>
          </li>
        </ul>
      </div>

      {/* ── The quote price breakdown ── */}
      {children}

      {/* ── Checkout (total + owner's-risk + Accept, BELOW the quote) ── */}
      <div className="mt-4 rounded-2xl border border-brand-purple/15 bg-brand-canvas/40 p-4 text-brand-purple sm:p-5">
        {!insuranceOn ? (
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={ownerRisk}
              onChange={(e) => setOwnerRisk(e.target.checked)}
            />
            <span>
              I understand my goods are moved at owner&apos;s risk under the Contract and Commercial
              Law Act 2017, unless I arrange separate insurance cover.
            </span>
          </label>
        ) : null}

        <div className="mt-3 flex items-center justify-between border-t border-brand-purple/10 pt-3 first:mt-0 first:border-0 first:pt-0">
          <span className="text-sm text-brand-purple/70">Your total</span>
          <span className="font-heading text-xl">{formatNzd(liveTotal)} incl GST</span>
        </div>

        <div className="mt-4 flex flex-col items-stretch gap-2">
          <button
            type="button"
            onClick={accept}
            disabled={accepting || !canAccept}
            className="w-full rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {accepting ? "One moment…" : "Accept & continue to booking"}
          </button>
          {!canAccept ? (
            <p className="text-center text-xs font-medium text-brand-purple/60">
              Tick insurance, or confirm owner&apos;s risk above, to continue.
            </p>
          ) : null}

          {callState === "done" ? (
            <p className="text-center text-sm font-medium text-brand-purple">Thanks, we&apos;ll call you shortly.</p>
          ) : (
            <button
              type="button"
              onClick={requestCall}
              disabled={callState === "sending"}
              className="text-sm font-semibold text-brand-purple underline-offset-4 hover:underline disabled:opacity-60"
            >
              {callState === "sending" ? "Sending…" : "Or request a call back"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

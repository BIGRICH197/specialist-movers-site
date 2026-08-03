"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatNzd } from "@/lib/quote-deck/house-move-quote";

// Interactive add-ons, in the same purple panel style as before, shown ABOVE
// the quote. The customer ticks/unticks cleaning (always) and packing (only if
// we quoted it), and can request insurance. The total updates live. If they do
// NOT request insurance, they confirm owner's risk before accepting. Selections
// flow to /api/quote-accept (Slack) and into the booking form via query params.

type Props = {
  quoteRef: string;
  moveInclGst: number;
  cleaningQuoted: boolean;
  cleaningPriceInclGst: number | null;
  packingQuoted: boolean;
  packingPriceInclGst: number;
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
    <div className="proposal-purple-panel proposal-addons-panel mb-4 px-4 py-4 sm:px-5 sm:py-5">
      <h3 className="font-heading text-xs font-bold text-brand-yellow sm:text-sm">Add-ons</h3>
      <p className="mt-1 text-[10px] text-white/60 sm:text-xs">Tick to add to your move</p>

      <ul className="proposal-addon-list mt-2.5 space-y-2.5">
        {/* Exit cleaning — always available */}
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
                {!cleaningHasPrice ? " Our team will confirm the price." : ""}
              </span>
            </span>
          </label>
        </li>

        {/* Professional packing */}
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

        {/* Insurance — a request, no price */}
        <li>
          <label className={rowCls} onClick={() => setInsuranceOn((v) => !v)}>
            <Tick on={insuranceOn} />
            <span className="flex-1">
              <span className={insuranceOn ? "text-white" : "text-white/75"}>
                Request insurance cover
              </span>
              <span className="mt-0.5 block text-[10px] text-white/55 sm:text-xs">
                Our team will send you insurance options. Your move is otherwise carried at owner&apos;s risk.
              </span>
            </span>
          </label>
        </li>
      </ul>

      {/* Owner's-risk acknowledgement when insurance is not requested */}
      {!insuranceOn ? (
        <label className="mt-3 flex cursor-pointer items-start gap-2.5 rounded-lg border border-brand-yellow/50 bg-white/10 px-3 py-2.5 text-[10px] text-white sm:text-xs">
          <input
            type="checkbox"
            className="mt-0.5 accent-brand-yellow"
            checked={ownerRisk}
            onChange={(e) => setOwnerRisk(e.target.checked)}
          />
          <span>
            I understand my goods are moved at owner&apos;s risk under the Contract and Commercial
            Law Act 2017, unless I arrange separate insurance cover.
          </span>
        </label>
      ) : null}

      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
        <span className="text-xs text-white/70 sm:text-sm">Your total</span>
        <span className="font-heading text-lg text-white sm:text-xl">{formatNzd(liveTotal)} incl GST</span>
      </div>

      <div className="mt-3 flex flex-col items-stretch gap-2">
        <button
          type="button"
          onClick={accept}
          disabled={accepting || !canAccept}
          className="w-full rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-purple shadow-lg transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
        >
          {accepting ? "One moment…" : "Accept & continue to booking"}
        </button>
        {!canAccept ? (
          <p className="text-center text-[10px] font-medium text-white/60 sm:text-xs">
            Tick insurance, or confirm owner&apos;s risk above, to continue.
          </p>
        ) : null}

        {callState === "done" ? (
          <p className="text-center text-xs font-medium text-white sm:text-sm">
            Thanks, we&apos;ll call you shortly.
          </p>
        ) : (
          <button
            type="button"
            onClick={requestCall}
            disabled={callState === "sending"}
            className="text-xs font-semibold text-white underline-offset-4 hover:underline disabled:opacity-60 sm:text-sm"
          >
            {callState === "sending" ? "Sending…" : "Or request a call back"}
          </button>
        )}
      </div>
    </div>
  );
}

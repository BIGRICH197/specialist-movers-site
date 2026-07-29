"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatNzd } from "@/lib/quote-deck/house-move-quote";

// Interactive add-ons on a hosted quote: the customer ticks/unticks cleaning
// (always), packing (only if we quoted it), and insurance (a request, surfaced
// to the team on Slack when they accept). The total updates live. If they do
// NOT request insurance, they confirm goods move at owner's risk before
// accepting. Selections flow to /api/quote-accept (Slack) and into the booking
// form via query params.

type Props = {
  quoteRef: string;
  moveInclGst: number;
  /** Cleaning already on the quote? Drives the default tick state. */
  cleaningQuoted: boolean;
  /** Cleaning price incl GST — from the quote if quoted, else computed from the
   *  bedroom count. null means we can't price it, so cleaning is a request. */
  cleaningPriceInclGst: number | null;
  /** Only show the packing toggle when we actually quoted packing. */
  packingQuoted: boolean;
  packingPriceInclGst: number;
};

const rowCls =
  "flex items-start gap-3 rounded-xl border border-brand-purple/15 bg-white px-4 py-3";

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

  // Must either request insurance or acknowledge owner's risk before accepting.
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
          addOns: {
            cleaning: cleaningOn,
            packing: packingOn && packingQuoted,
            insurance: insuranceOn,
          },
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

  return (
    <div className="proposal-card mt-4 rounded-2xl border border-brand-purple/15 bg-brand-canvas/40 p-4 text-brand-purple sm:p-5">
      <h3 className="font-heading text-lg">Customise your quote</h3>
      <p className="mt-1 text-sm text-brand-purple/70">
        Add or remove options, then accept to book.
      </p>

      <div className="mt-4 space-y-2.5">
        {/* Cleaning — always available */}
        <label className={rowCls}>
          <input
            type="checkbox"
            className="mt-1"
            checked={cleaningOn}
            onChange={(e) => setCleaningOn(e.target.checked)}
          />
          <span className="flex-1">
            <span className="flex items-center justify-between gap-3 font-semibold">
              <span>Exit cleaning</span>
              <span>
                {cleaningHasPrice
                  ? `${formatNzd(cleaningPriceInclGst!)} incl GST`
                  : "Price on request"}
              </span>
            </span>
            <span className="mt-0.5 block text-xs text-brand-purple/60">
              A professional end-of-tenancy clean, fixed price.
              {!cleaningHasPrice ? " Our team will confirm the price." : ""}
            </span>
          </span>
        </label>

        {/* Packing — firm price if we quoted it, otherwise a request the team
            confirms (we can't price packing on the spot without a look). */}
        <label className={rowCls}>
          <input
            type="checkbox"
            className="mt-1"
            checked={packingOn}
            onChange={(e) => setPackingOn(e.target.checked)}
          />
          <span className="flex-1">
            <span className="flex items-center justify-between gap-3 font-semibold">
              <span>Professional packing</span>
              <span>
                {packingQuoted
                  ? `${formatNzd(packingPriceInclGst)} incl GST`
                  : "Price on request"}
              </span>
            </span>
            <span className="mt-0.5 block text-xs text-brand-purple/60">
              {packingQuoted
                ? "We pack everything the day before. Untick if you would rather pack yourself."
                : "We pack everything the day before. Tick to add it and our team will confirm the price, we may arrange a quick look first."}
            </span>
          </span>
        </label>

        {/* Insurance — a request, no price */}
        <label className={rowCls}>
          <input
            type="checkbox"
            className="mt-1"
            checked={insuranceOn}
            onChange={(e) => setInsuranceOn(e.target.checked)}
          />
          <span className="flex-1">
            <span className="font-semibold">Request insurance cover</span>
            <span className="mt-0.5 block text-xs text-brand-purple/60">
              Our team will send you insurance options. Your move is otherwise carried at owner&apos;s risk.
            </span>
          </span>
        </label>
      </div>

      {/* Owner's-risk acknowledgement when insurance is not requested */}
      {!insuranceOn ? (
        <label className="mt-3 flex items-start gap-3 rounded-xl border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-3 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={ownerRisk}
            onChange={(e) => setOwnerRisk(e.target.checked)}
          />
          <span>
            I understand my goods are moved at owner&apos;s risk under the Contract and
            Commercial Law Act 2017, unless I arrange separate insurance cover.
          </span>
        </label>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-brand-purple/10 pt-3">
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
          <p className="text-center text-sm font-medium text-brand-purple">
            Thanks, we&apos;ll call you shortly.
          </p>
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
  );
}

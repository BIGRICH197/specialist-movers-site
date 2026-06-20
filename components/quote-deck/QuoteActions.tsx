"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Action bar shown under a hosted quote: Accept (-> booking form) and Request a call.

export function QuoteActions({ quoteRef }: { quoteRef: string }) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const [callState, setCallState] = useState<"idle" | "sending" | "done">("idle");

  async function accept() {
    if (accepting) return;
    setAccepting(true);
    try {
      await fetch("/api/quote-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: quoteRef }),
      });
    } catch {
      /* notify is best-effort; still proceed to the form */
    }
    router.push(`/quote/${quoteRef}/book`);
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
    <div className="quote-actions bg-white px-6 pb-12 pt-2 sm:pb-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-purple/60">
          Happy with your quote?
        </p>
        <button
          type="button"
          onClick={accept}
          disabled={accepting}
          className="w-full max-w-sm rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:opacity-60"
        >
          {accepting ? "One moment…" : "Accept & book your move"}
        </button>

        {callState === "done" ? (
          <p className="text-sm font-medium text-brand-purple">
            Thanks — we&apos;ll call you shortly.
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

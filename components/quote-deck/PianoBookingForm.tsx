"use client";

import { useEffect, useRef, useState } from "react";
import { bookingTerms, BOOKING_TERMS_VERSION } from "@/lib/quote-deck/booking-terms";

// Direct piano / large-item book-in form (no quote link needed) — replaces the
// piano JotForm. Submits to /api/book-in, which creates the Trello job card and
// matches/creates the Closed Won deal.

const TYPE_OPTIONS = [
  "Upright Piano",
  "Grand Piano",
  "Spa Pool",
  "Vending Machine",
  "Art Work",
  "Other",
];

const labelCls = "block text-sm font-semibold text-brand-purple";
const inputCls =
  "mt-1.5 w-full rounded-lg border border-brand-purple/20 bg-white px-3 py-2.5 text-sm text-brand-purple outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple";

export function PianoBookingForm() {
  const [f, setF] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    phone: "",
    dropoffPhone: "",
    moveDate: "",
    pianoType: "",
    pickupAddress: "",
    dropoffAddress: "",
    stairs: "",
    anythingElse: "",
  });
  const [agree, setAgree] = useState(false);
  const [signature, setSignature] = useState("");
  const [termsScrolled, setTermsScrolled] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    const el = termsRef.current;
    if (!el) return;
    setTermsScrolled(el.scrollHeight <= el.clientHeight + 4);
  }, []);

  function handleTermsScroll() {
    const el = termsRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) setTermsScrolled(true);
  }

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const canSign = termsScrolled && agree && signature.trim().length > 1;

  function getMissing(): string[] {
    const required: Array<[string, string]> = [
      ["fullName", "Full name"],
      ["phone", "Phone"],
      ["email", "Email"],
      ["moveDate", "Move date"],
      ["pianoType", "Type of piano or item"],
      ["pickupAddress", "Pick-up address"],
      ["dropoffAddress", "Drop-off address"],
      ["stairs", "Are there stairs?"],
    ];
    return required.filter(([k]) => !f[k]?.trim()).map(([, label]) => label);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const gaps = getMissing();
    if (gaps.length || !canSign) {
      setMissing(gaps);
      return;
    }
    setMissing([]);
    setStatus("sending");
    const fields = {
      ...f,
      agreeTerms: "yes",
      termsSignature: signature.trim(),
      termsSignedAt: new Date().toISOString(),
      termsVersion: BOOKING_TERMS_VERSION,
      termsScrolled: "yes",
    };
    try {
      const res = await fetch("/api/book-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType: "piano", fields }),
      });
      const data = (await res.json()) as { ok?: boolean };
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-brand-canvas px-6 text-center text-brand-purple">
        <h1 className="font-heading text-2xl sm:text-3xl">Booking confirmed</h1>
        <p className="mt-3 max-w-md text-brand-purple/75">
          Thanks {f.fullName?.split(" ")[0] || ""} — your booking is in. Our team will be in
          touch to confirm the details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6">
      <form onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">
          Book your piano or large item move
        </h1>
        <p className="mt-2 text-sm text-brand-purple/70">
          A few details to lock in your move.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Full name</label>
            <input className={inputCls} required value={f.fullName} onChange={(e) => set("fullName", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} type="tel" required value={f.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Email</label>
            <input className={inputCls} type="email" required value={f.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Move date</label>
            <input className={inputCls} type="date" required value={f.moveDate} onChange={(e) => set("moveDate", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Type of piano or item</label>
            <select className={inputCls} required value={f.pianoType} onChange={(e) => set("pianoType", e.target.value)}>
              <option value="">Select…</option>
              {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Pick-up address</label>
            <input className={inputCls} required value={f.pickupAddress} onChange={(e) => set("pickupAddress", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Drop-off phone (optional)</label>
            <input className={inputCls} type="tel" value={f.dropoffPhone} onChange={(e) => set("dropoffPhone", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Drop-off address</label>
            <input className={inputCls} required value={f.dropoffAddress} onChange={(e) => set("dropoffAddress", e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <span className={labelCls}>Are there stairs at either end?</span>
            <div className="mt-2 flex gap-6 text-sm text-brand-purple">
              {["YES", "NO"].map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input type="radio" name="stairs" value={o} required checked={f.stairs === o} onChange={() => set("stairs", o)} />
                  {o === "YES" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Anything else we should know?</label>
            <p className="mt-0.5 text-xs text-brand-purple/60">
              e.g. narrow doorways, tight corners, a turn in the stairs, parking.
            </p>
            <textarea className={inputCls} rows={2} value={f.anythingElse} onChange={(e) => set("anythingElse", e.target.value)} />
          </div>
        </div>

        <div className="mt-7">
          <span className={labelCls}>Terms and conditions</span>
          <p className="mt-1 text-xs text-brand-purple/60">
            Please read these in full. Scroll to the end to sign and accept.
          </p>
          <div
            ref={termsRef}
            onScroll={handleTermsScroll}
            className="mt-2 h-56 overflow-y-auto rounded-lg border border-brand-purple/20 bg-brand-canvas/40 p-4 text-sm leading-relaxed text-brand-purple/85"
          >
            {bookingTerms.map((s) => (
              <div key={s.heading} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-brand-purple">{s.heading}</h3>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-1.5">{p}</p>
                ))}
                {s.bullets ? (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5">
                    {s.bullets.map((b) => <li key={b.slice(0, 30)}>{b}</li>)}
                  </ul>
                ) : null}
                {s.tail ? s.tail.map((p) => <p key={p.slice(0, 30)} className="mt-1.5">{p}</p>) : null}
              </div>
            ))}
          </div>

          {!termsScrolled ? (
            <p className="mt-2 text-xs font-semibold text-brand-purple/60">
              Scroll to the bottom of the terms to sign and continue.
            </p>
          ) : null}

          <div className={termsScrolled ? "mt-4" : "mt-4 pointer-events-none opacity-40"}>
            <label className={labelCls}>Sign — type your full name</label>
            <input
              className={`${inputCls} font-heading text-lg`}
              placeholder="Your full name"
              autoComplete="name"
              disabled={!termsScrolled}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <label className="mt-3 flex items-start gap-3 text-sm text-brand-purple">
              <input type="checkbox" className="mt-1" checked={agree} disabled={!termsScrolled} onChange={(e) => setAgree(e.target.checked)} />
              <span>I have read these terms and conditions of Specialist Movers in full, and I agree to them.</span>
            </label>
          </div>
        </div>

        {missing.length > 0 && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-semibold">Please answer these before confirming:</p>
            <ul className="mt-1 list-disc pl-5">
              {missing.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-red-600">
            Something went wrong submitting your booking. Please try again or call us on (021) 228 2728.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-6 w-full rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Submitting…" : "Sign & confirm booking"}
        </button>
      </form>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { bookingTerms, BOOKING_TERMS_VERSION } from "@/lib/quote-deck/booking-terms";

// Branded booking form — mirrors the JotForm "House move booking confirmation"
// fields, prefilled from the quote. On submit it posts to /api/bookings, which
// notifies the team and (via n8n) moves the deal to Closed Won + makes the Trello card.

export type BookingPrefill = {
  fullName?: string;
  email?: string;
  phone?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  moveDate?: string;
  sizeOfMove?: string;
  typeOfMove?: string;
  cleaningBooked?: string;
  packing?: string;
};

const SIZE_OPTIONS = ["Single Item", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom+", "Office Move"];
const MOVERS_OPTIONS = ["2 MOVERS", "3 MOVERS", "4 MOVERS", "Other"];
const TYPE_OPTIONS = ["House Move", "Apartment Move", "Town House Move", "Office Move", "Single Item"];
const PAYMENT_OPTIONS = ["Cash", "Invoice"];
const CLEANING_OPTIONS = ["Yes Cleaning", "No Cleaning"];
const CLEANING_SAMEDAY_OPTIONS = ["Yes it does", "No no it doesnt"];
const PACKING_OPTIONS = ["Yes packing", "No not packing"];
const UNPACKING_OPTIONS = ["Yes unpacking", "No not unpacking"];
const WHAT_PACKING_OPTIONS = [
  "Whole house",
  "Just Kitchen",
  "Just bubble wrapping TV's and screens",
  "Just bubble wrapping some large fragile items like a china cabinet",
  "Just Art Work",
];

const labelCls = "block text-sm font-semibold text-brand-purple";
const inputCls =
  "mt-1.5 w-full rounded-lg border border-brand-purple/20 bg-white px-3 py-2.5 text-sm text-brand-purple outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple";

export function BookingForm({
  quoteRef,
  prefill,
}: {
  quoteRef: string;
  prefill: BookingPrefill;
}) {
  const [f, setF] = useState<Record<string, string>>({
    fullName: prefill.fullName ?? "",
    email: prefill.email ?? "",
    phone: prefill.phone ?? "",
    pickupAddress: prefill.pickupAddress ?? "",
    dropoffAddress: prefill.dropoffAddress ?? "",
    moveDate: prefill.moveDate ?? "",
    sizeOfMove: prefill.sizeOfMove ?? "",
    howManyMovers: "",
    typeOfMove: prefill.typeOfMove ?? "",
    payment: "",
    cleaningBooked: prefill.cleaningBooked ?? "",
    cleaningSameDay: "",
    packing: prefill.packing ?? "",
    unpacking: "",
    packingNotes: "",
    fragileItems: "",
    furnitureDismantle: "",
    accessRestrictions: "",
    settlementDay: "",
  });
  const [whatPacking, setWhatPacking] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [signature, setSignature] = useState("");
  const [termsScrolled, setTermsScrolled] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // If the terms box is short enough not to scroll, count it as already read.
  useEffect(() => {
    const el = termsRef.current;
    if (el && el.scrollHeight <= el.clientHeight + 4) setTermsScrolled(true);
  }, []);

  function handleTermsScroll() {
    const el = termsRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) setTermsScrolled(true);
  }

  const canSubmit = termsScrolled && agree && signature.trim().length > 1;

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const togglePacking = (opt: string) =>
    setWhatPacking((p) => (p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]));

  const showCleaningSameDay = f.cleaningBooked === "Yes Cleaning";
  const showPackingDetail = f.packing === "Yes packing";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;
    setStatus("sending");
    const fields = {
      ...f,
      whatPacking: whatPacking.join(", "),
      agreeTerms: "yes",
      termsSignature: signature.trim(),
      termsSignedAt: new Date().toISOString(),
      termsVersion: BOOKING_TERMS_VERSION,
      termsScrolled: "yes",
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: quoteRef, fields }),
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
          touch to confirm the details. We look forward to your move.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6">
      <form onSubmit={submit} className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">Complete your booking</h1>
        <p className="mt-2 text-sm text-brand-purple/70">
          A few details to lock in your move. We&apos;ve filled in what we can from your quote.
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
          <div className="sm:col-span-2">
            <label className={labelCls}>Pick-up address</label>
            <input className={inputCls} required value={f.pickupAddress} onChange={(e) => set("pickupAddress", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Drop-off address</label>
            <input className={inputCls} required value={f.dropoffAddress} onChange={(e) => set("dropoffAddress", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Move date</label>
            <input className={inputCls} required value={f.moveDate} onChange={(e) => set("moveDate", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Size of move</label>
            <select className={inputCls} required value={f.sizeOfMove} onChange={(e) => set("sizeOfMove", e.target.value)}>
              <option value="">Select…</option>
              {SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Number of movers</label>
            <select className={inputCls} required value={f.howManyMovers} onChange={(e) => set("howManyMovers", e.target.value)}>
              <option value="">Select…</option>
              {MOVERS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Type of move</label>
            <select className={inputCls} required value={f.typeOfMove} onChange={(e) => set("typeOfMove", e.target.value)}>
              <option value="">Select…</option>
              {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>How would you like to pay</label>
            <select className={inputCls} value={f.payment} onChange={(e) => set("payment", e.target.value)}>
              <option value="">Select…</option>
              {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Have you booked cleaning?</label>
            <select className={inputCls} required value={f.cleaningBooked} onChange={(e) => set("cleaningBooked", e.target.value)}>
              <option value="">Select…</option>
              {CLEANING_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {showCleaningSameDay && (
            <div>
              <label className={labelCls}>Cleaning same day as moving?</label>
              <select className={inputCls} value={f.cleaningSameDay} onChange={(e) => set("cleaningSameDay", e.target.value)}>
                <option value="">Select…</option>
                {CLEANING_SAMEDAY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className={labelCls}>Are we packing for you?</label>
            <select className={inputCls} required value={f.packing} onChange={(e) => set("packing", e.target.value)}>
              <option value="">Select…</option>
              {PACKING_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Are we unpacking for you?</label>
            <select className={inputCls} required value={f.unpacking} onChange={(e) => set("unpacking", e.target.value)}>
              <option value="">Select…</option>
              {UNPACKING_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {showPackingDetail && (
            <>
              <div className="sm:col-span-2">
                <span className={labelCls}>What are we packing?</span>
                <div className="mt-2 space-y-2">
                  {WHAT_PACKING_OPTIONS.map((o) => (
                    <label key={o} className="flex items-start gap-2 text-sm text-brand-purple">
                      <input type="checkbox" className="mt-1" checked={whatPacking.includes(o)} onChange={() => togglePacking(o)} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Any notes for packing?</label>
                <textarea className={inputCls} rows={2} value={f.packingNotes} onChange={(e) => set("packingNotes", e.target.value)} />
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <label className={labelCls}>Oversized or fragile items?</label>
            <p className="mt-0.5 text-xs text-brand-purple/60">
              Tells us what to bring — e.g. double-door fridge, pool table, fish tank, treadmill, large china cabinet.
            </p>
            <textarea className={inputCls} rows={2} required value={f.fragileItems} onChange={(e) => set("fragileItems", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Any furniture to be dismantled?</label>
            <p className="mt-0.5 text-xs text-brand-purple/60">So we bring the right tools.</p>
            <textarea className={inputCls} rows={2} required value={f.furnitureDismantle} onChange={(e) => set("furnitureDismantle", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Any access restrictions?</label>
            <p className="mt-0.5 text-xs text-brand-purple/60">
              e.g. apartment building, no on-site parking, stairs, no lift, narrow driveway, long walk to the door.
            </p>
            <textarea className={inputCls} rows={2} required value={f.accessRestrictions} onChange={(e) => set("accessRestrictions", e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <span className={labelCls}>Are you moving on settlement day?</span>
            <div className="mt-2 flex gap-6 text-sm text-brand-purple">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input type="radio" name="settlementDay" value={o} checked={f.settlementDay === o} onChange={() => set("settlementDay", o)} />
                  {o}
                </label>
              ))}
            </div>
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
              <input
                type="checkbox"
                className="mt-1"
                checked={agree}
                disabled={!termsScrolled}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I have read these terms and conditions of Specialist Movers in full,
                and I agree to them.
              </span>
            </label>
          </div>
        </div>

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-red-600">
            Something went wrong submitting your booking. Please try again or call us on (021) 228 2728.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="mt-6 w-full rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Submitting…" : "Sign & confirm booking"}
        </button>
      </form>
    </main>
  );
}

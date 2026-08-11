"use client";

import { useEffect, useRef, useState } from "react";
import {
  bookingTerms,
  cleaningTerms,
  BOOKING_TERMS_VERSION,
  type BookingTermsSection,
} from "@/lib/quote-deck/booking-terms";
import { isDialable, PHONE_ERROR } from "@/lib/phone";

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
  howManyMovers?: string;
  typeOfMove?: string;
  cleaningBooked?: string;
  packing?: string;
};

const SIZE_OPTIONS = ["Single Item", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom+", "Office Move"];
const MOVERS_OPTIONS = ["2 MOVERS", "3 MOVERS", "4 MOVERS", "Other"];
const TYPE_OPTIONS = ["Home Move", "Apartment Move", "Townhouse Move", "Office Move", "Single Item"];
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
  quoteType,
  standalone = false,
  bookServiceType = "house",
  heading = "Complete your booking",
  termsSet = bookingTerms,
  termsVersion = BOOKING_TERMS_VERSION,
  hiddenFields = [],
}: {
  quoteRef?: string;
  prefill: BookingPrefill;
  quoteType?: string;
  /** When true, this is a direct book-in (no prior quote): submit to
   *  /api/book-in, which creates the Trello job card + matches the deal. */
  standalone?: boolean;
  /** Service type sent to /api/book-in when standalone (e.g. "house", "office").
   *  Both use the same house-style fields; only the deal/card label differs. */
  bookServiceType?: string;
  /** Page heading shown at the top of the form. */
  heading?: string;
  /** Terms shown in the scroll-to-sign box. Defaults to residential moving terms;
   *  the office/commercial flow passes commercialTerms. */
  termsSet?: BookingTermsSection[];
  /** Version string recorded with the signature for the chosen terms set. */
  termsVersion?: string;
  /** Field keys to hide + drop from validation (e.g. office move omits
   *  sizeOfMove, typeOfMove, payment). */
  hiddenFields?: string[];
}) {
  const [f, setF] = useState<Record<string, string>>({
    fullName: prefill.fullName ?? "",
    email: prefill.email ?? "",
    phone: prefill.phone ?? "",
    pickupAddress: prefill.pickupAddress ?? "",
    dropoffAddress: prefill.dropoffAddress ?? "",
    moveDate: prefill.moveDate ?? "",
    sizeOfMove: prefill.sizeOfMove ?? "",
    howManyMovers: prefill.howManyMovers ?? "",
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
  const [missing, setMissing] = useState<string[]>([]);

  // Cleaning T&Cs are shown in addition to the moving terms when the job
  // includes cleaning (cleaning quote, or "Yes Cleaning" selected on the form).
  const showCleaning =
    quoteType === "cleaning" || f.cleaningBooked === "Yes Cleaning";
  const terms = showCleaning ? [...termsSet, ...cleaningTerms] : termsSet;

  // Re-evaluate the scroll gate whenever the term set changes: reset to
  // "not read" so the customer must scroll the new content, unless it is short
  // enough not to scroll at all.
  useEffect(() => {
    const el = termsRef.current;
    if (!el) return;
    setTermsScrolled(el.scrollHeight <= el.clientHeight + 4);
  }, [showCleaning]);

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

  // Every question is compulsory. Returns the labels of anything left blank so
  // we can tell the customer exactly what to complete. Conditional questions
  // (cleaning same-day, what packing) only count when their section is shown.
  function getMissing(): string[] {
    const required: Array<[string, string]> = [
      ["fullName", "Full name"],
      ["phone", "Phone"],
      ["email", "Email"],
      ["pickupAddress", "Pick-up address"],
      ["dropoffAddress", "Drop-off address"],
      ["moveDate", "Move date"],
      ["sizeOfMove", "Size of move"],
      ["howManyMovers", "Number of movers"],
      ["typeOfMove", "Type of move"],
      ["payment", "How would you like to pay"],
      ["cleaningBooked", "Have you booked cleaning?"],
      ["packing", "Are we packing for you?"],
      ["unpacking", "Are we unpacking for you?"],
      ["fragileItems", "Oversized or fragile items?"],
      ["furnitureDismantle", "Any furniture to be dismantled?"],
      ["accessRestrictions", "Any access restrictions?"],
      ["settlementDay", "Are you moving on settlement day?"],
    ];
    const out = required
      .filter(([k]) => !hiddenFields.includes(k))
      .filter(([k]) => !f[k]?.trim())
      .map(([, label]) => label);
    if (showCleaningSameDay && !f.cleaningSameDay?.trim())
      out.push("Cleaning same day as moving?");
    if (showPackingDetail && whatPacking.length === 0) out.push("What are we packing?");
    // A filled-in Phone box is not the same as a phone number. Full name and
    // Phone sit side by side in this grid, and a surname in the phone field
    // reached ShiftMate four times before this check existed (2026-08-11) —
    // see lib/phone.ts.
    if (f.phone?.trim() && !isDialable(f.phone)) out.push(PHONE_ERROR);
    return out;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const gaps = getMissing();
    if (gaps.length || !canSubmit) {
      setMissing(gaps);
      return;
    }
    setMissing([]);
    setStatus("sending");
    const fields = {
      ...f,
      whatPacking: whatPacking.join(", "),
      agreeTerms: "yes",
      termsSignature: signature.trim(),
      termsSignedAt: new Date().toISOString(),
      termsVersion: termsVersion,
      termsScrolled: "yes",
    };
    try {
      const res = await fetch(standalone ? "/api/book-in" : "/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          standalone
            ? { serviceType: bookServiceType, fields }
            : { ref: quoteRef, fields },
        ),
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
        <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">{heading}</h1>
        <p className="mt-2 text-sm text-brand-purple/70">
          A few details to lock in your move.
          {!standalone && " We’ve filled in what we can from your quote."}
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
            <input className={inputCls} type={standalone ? "date" : undefined} required value={f.moveDate} onChange={(e) => set("moveDate", e.target.value)} />
          </div>
          {!hiddenFields.includes("sizeOfMove") && (
          <div>
            <label className={labelCls}>Size of move</label>
            <select className={inputCls} required value={f.sizeOfMove} onChange={(e) => set("sizeOfMove", e.target.value)}>
              <option value="">Select…</option>
              {SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          )}
          <div>
            <label className={labelCls}>Number of movers</label>
            <select className={inputCls} required value={f.howManyMovers} onChange={(e) => set("howManyMovers", e.target.value)}>
              <option value="">Select…</option>
              {MOVERS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {!hiddenFields.includes("typeOfMove") && (
          <div>
            <label className={labelCls}>Type of move</label>
            <select className={inputCls} required value={f.typeOfMove} onChange={(e) => set("typeOfMove", e.target.value)}>
              <option value="">Select…</option>
              {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          )}
          {!hiddenFields.includes("payment") && (
          <div>
            <label className={labelCls}>How would you like to pay</label>
            <select className={inputCls} required value={f.payment} onChange={(e) => set("payment", e.target.value)}>
              <option value="">Select…</option>
              {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          )}

          <div>
            <label className={labelCls}>
              Have you booked cleaning?{" "}
              <a href="/cleaning-schedule" target="_blank" rel="noreferrer" className="font-normal text-brand-purple/70 underline underline-offset-2">
                (see what&apos;s included)
              </a>
            </label>
            <select className={inputCls} required value={f.cleaningBooked} onChange={(e) => set("cleaningBooked", e.target.value)}>
              <option value="">Select…</option>
              {CLEANING_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {showCleaningSameDay && (
            <div>
              <label className={labelCls}>Cleaning same day as moving?</label>
              <select className={inputCls} required value={f.cleaningSameDay} onChange={(e) => set("cleaningSameDay", e.target.value)}>
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
                  <input type="radio" name="settlementDay" value={o} required checked={f.settlementDay === o} onChange={() => set("settlementDay", o)} />
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
            {terms.map((s) => (
              <div key={s.heading} className="mb-4 last:mb-0">
                <h3 className="font-semibold text-brand-purple">{s.heading}</h3>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-1.5">{p}</p>
                ))}
                {s.bullets ? (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5">
                    {s.bullets.map((b) => (
                      <li key={b.slice(0, 30)}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {s.tail
                  ? s.tail.map((p) => (
                      <p key={p.slice(0, 30)} className="mt-1.5">{p}</p>
                    ))
                  : null}
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

        {missing.length > 0 && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-semibold">Please answer these before confirming:</p>
            <ul className="mt-1 list-disc pl-5">
              {missing.map((m) => (
                <li key={m}>{m}</li>
              ))}
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
          disabled={!canSubmit || status === "sending"}
          className="mt-6 w-full rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Submitting…" : "Sign & confirm booking"}
        </button>
      </form>
    </main>
  );
}

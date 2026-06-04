"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  bathroomsForBedrooms,
  propertySizeFromRooms,
  type CleaningPropertySize,
} from "@/lib/cleaning-pricing";
import { regions } from "@/lib/regions";

const field =
  "h-12 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-sm text-brand-purple shadow-sm outline-none transition placeholder:text-brand-purple/40 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30";
const selectField =
  "h-12 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-sm font-medium text-brand-purple shadow-sm outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30";
const label = "text-xs font-bold uppercase tracking-wide text-brand-purple/70";

type FormState = {
  bedrooms: number;
  bathrooms: number;
  extraLivingRooms: number;
  propertyAddress: string;
  preferredDate: string;
  cleaningType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  loading: boolean;
  error: string;
};

type PricingResult = {
  totalIncGst: number;
  priceExclGst: number;
  propertyLabel: string;
  extraLivingRooms: number;
};

const initial: FormState = {
  bedrooms: 2,
  bathrooms: 2,
  extraLivingRooms: 0,
  propertyAddress: "",
  preferredDate: "",
  cleaningType: "exit-tenancy",
  name: "",
  phone: "",
  email: "",
  message: "",
  loading: false,
  error: "",
};

export function CleaningBookingForm({ className = "" }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [pricing, setPricing] = useState<PricingResult | null>(null);

  const bathOptions = useMemo(
    () => bathroomsForBedrooms(form.bedrooms),
    [form.bedrooms],
  );

  const propertySize: CleaningPropertySize | null = useMemo(
    () => propertySizeFromRooms(form.bedrooms, form.bathrooms),
    [form.bedrooms, form.bathrooms],
  );

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: val, error: "" }));

  function onBedroomsChange(bedrooms: number) {
    const baths = bathroomsForBedrooms(bedrooms);
    const nextBath = baths.includes(form.bathrooms) ? form.bathrooms : baths[0] ?? 1;
    setForm((prev) => ({ ...prev, bedrooms, bathrooms: nextBath, error: "" }));
  }

  async function submitQuote() {
    if (!form.name.trim() || !form.phone.trim()) {
      set("error", "Please enter your name and phone number.");
      return;
    }
    if (!form.propertyAddress.trim()) {
      set("error", "Please enter the property address.");
      return;
    }
    if (!propertySize) {
      set("error", "Please choose a valid bedroom and bathroom combination.");
      return;
    }

    set("loading", true);
    set("error", "");

    try {
      const res = await fetch("/api/cleaning-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          propertyAddress: form.propertyAddress.trim(),
          preferredDate: form.preferredDate || undefined,
          propertySize,
          extraLivingRooms: form.extraLivingRooms,
          cleaningType: form.cleaningType,
          message: form.message.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        pricing?: PricingResult;
      };
      if (!res.ok || !data.ok || !data.pricing) {
        set("error", data.error ?? "Something went wrong. Please call us.");
        return;
      }
      setPricing(data.pricing);
      setStep(3);
    } catch {
      set("error", "Could not send. Please call us on (021) 228 2728.");
    } finally {
      set("loading", false);
    }
  }

  function reset() {
    setForm(initial);
    setPricing(null);
    setStep(0);
  }

  // Step 3 — price (after contact)
  if (step === 3 && pricing) {
    return (
      <div
        className={`rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-lg sm:p-6 ${className}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow">
          Your quote
        </p>
        <h3 className="mt-1 font-heading text-xl text-brand-purple">Here&apos;s your price</h3>

        <div className="mt-5 rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/15 p-5 text-center">
          <p className="font-heading text-4xl text-brand-purple">
            $
            {pricing.totalIncGst.toLocaleString("en-NZ", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="mt-1 text-xs font-medium text-brand-purple/60">incl. GST (fixed price)</p>
        </div>

        <div className="mt-4 rounded-xl border border-brand-purple/10 bg-white p-4 text-sm text-brand-purple/80">
          <p>{pricing.propertyLabel}</p>
          {pricing.extraLivingRooms > 0 ? (
            <p className="mt-1">Extra living rooms: {pricing.extraLivingRooms}</p>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-brand-purple/75">
          Thanks{form.name ? ` ${form.name.split(" ")[0]}` : ""}! We&apos;ll call you within{" "}
          <strong>15 minutes</strong> to confirm your clean.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-4 text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-2"
        >
          Start a new quote
        </button>

        <TrustPoints />
      </div>
    );
  }

  // Step 2 — contact
  if (step === 2) {
    return (
      <div
        className={`rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-lg sm:p-6 ${className}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow">Almost done</p>
        <h3 className="mt-1 font-heading text-xl text-brand-purple">Your details</h3>
        <p className="mt-2 text-sm text-brand-purple/75">
          Enter your contact info and we&apos;ll calculate your fixed price.
        </p>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-purple/70 hover:text-brand-purple"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>

        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Full name *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Phone number *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={field}
              placeholder="021..."
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={field}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {form.error ? (
          <p className="mt-3 text-xs font-medium text-red-600" role="alert">
            {form.error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={submitQuote}
          disabled={form.loading || !form.name.trim() || !form.phone.trim()}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {form.loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Get my price
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <TrustPoints />
      </div>
    );
  }

  // Step 1 — property details
  if (step === 1) {
    const canProceed = Boolean(form.propertyAddress.trim());
    return (
      <div
        className={`rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-lg sm:p-6 ${className}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow">
          Exit cleaning
        </p>
        <h3 className="mt-1 font-heading text-xl text-brand-purple">Property details</h3>
        <p className="mt-2 text-sm text-brand-purple/75">
          Where is the clean, and when do you need it?
        </p>

        <button
          type="button"
          onClick={() => setStep(0)}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-purple/70 hover:text-brand-purple"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>

        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Type of clean</label>
            <select
              value={form.cleaningType}
              onChange={(e) => set("cleaningType", e.target.value)}
              className={selectField}
            >
              <option value="exit-tenancy">Exit and tenancy clean</option>
              <option value="settlement">Settlement day clean</option>
              <option value="moving">House moving clean</option>
              <option value="construction">Construction clean</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={label}>Property address *</label>
            <input
              value={form.propertyAddress}
              onChange={(e) => set("propertyAddress", e.target.value)}
              className={field}
              placeholder="Street address, suburb"
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Preferred clean date</label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => set("preferredDate", e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Notes (optional)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className={`${field} h-auto py-3`}
              placeholder="Access, keys, agent details"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!canProceed}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>

        <TrustPoints />
      </div>
    );
  }

  // Step 0 — rooms (no prices)
  const canProceed = propertySize != null;
  return (
    <div
      className={`rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-lg sm:p-6 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow">
        Free quote
      </p>
      <h3 className="mt-1 font-heading text-xl text-brand-purple">Your property</h3>
      <p className="mt-2 text-sm text-brand-purple/75">
        Tell us the size of the home. We&apos;ll show your fixed price after your details.
      </p>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className={label}>Bedrooms</label>
            <select
              value={form.bedrooms}
              onChange={(e) => onBedroomsChange(Number(e.target.value))}
              className={selectField}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={label}>Bathrooms</label>
            <select
              value={form.bathrooms}
              onChange={(e) => set("bathrooms", Number(e.target.value))}
              className={selectField}
            >
              {bathOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={label}>Extra living rooms</label>
          <select
            value={form.extraLivingRooms}
            onChange={(e) => set("extraLivingRooms", Number(e.target.value))}
            className={selectField}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "None" : n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!canProceed ? (
        <p className="mt-2 text-xs text-brand-purple/60">
          Choose a valid bedroom and bathroom combination to continue.
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setStep(1)}
        disabled={!canProceed}
        className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </button>

      <TrustPoints />
    </div>
  );
}

function TrustPoints() {
  const points = [
    "Hundreds of 5-star reviews",
    "Fixed price, no surprises",
    regions.quoteTrustLine,
  ];
  return (
    <ul className="mt-4 space-y-2">
      {points.map((line) => (
        <li
          key={line}
          className="flex items-center gap-2 text-xs font-medium text-brand-purple/80"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-yellow drop-shadow-sm" />
          {line}
        </li>
      ))}
    </ul>
  );
}

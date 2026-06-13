"use client";

import { useId, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Phone,
} from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import {
  bathroomsForBedrooms,
  propertySizeFromRooms,
  type CleaningPropertySize,
} from "@/lib/cleaning-pricing";
import { regions } from "@/lib/regions";

const field =
  "h-12 w-full scroll-mt-24 rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-base text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45 sm:text-sm";

const selectField =
  "h-12 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-3 text-sm text-brand-purple outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45 appearance-none";

const dateField =
  "quote-date-field h-12 w-full min-w-0 max-w-full box-border rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-base text-brand-purple outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45 sm:text-sm";

const label = "text-xs font-semibold text-brand-purple";

const primaryBtn =
  "group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100";

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

const cleaningTypeLabels: Record<string, string> = {
  "exit-tenancy": "Exit and tenancy clean",
  settlement: "Settlement day clean",
  moving: "House moving clean",
  construction: "Construction clean",
  other: "Other",
};

export function CleaningBookingForm({ className = "" }: { className?: string }) {
  const addressFieldId = `${useId().replace(/:/g, "")}-cleaning-address`;
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
    const nextBath = baths.includes(form.bathrooms)
      ? form.bathrooms
      : (baths[0] ?? 1);
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
          bedrooms: form.bedrooms,
          extraLivingRooms: form.extraLivingRooms,
          cleaningType: form.cleaningType,
          message: form.message.trim() || undefined,
          sourcePage: window.location.pathname,
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

  if (step === 3 && pricing) {
    return (
      <Wrapper className={className}>
        <Header tag="Your quote" title="Here's your price" />

        <div className="space-y-2 rounded-xl border border-brand-purple/10 bg-brand-purple/[0.03] px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/55">
            Quote breakdown
          </p>
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-brand-purple/70">Clean type</span>
            <span className="text-right font-semibold text-brand-purple">
              {cleaningTypeLabels[form.cleaningType] ?? form.cleaningType}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-brand-purple/70">Property</span>
            <span className="text-right font-semibold text-brand-purple">
              {pricing.propertyLabel}
            </span>
          </div>
          {pricing.extraLivingRooms > 0 ? (
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-brand-purple/70">Living rooms</span>
              <span className="font-semibold text-brand-purple">
                {pricing.extraLivingRooms}
              </span>
            </div>
          ) : null}
          {form.propertyAddress ? (
            <div className="border-t border-brand-purple/10 pt-2 text-sm text-brand-purple/65">
              {form.propertyAddress}
            </div>
          ) : null}
        </div>

        <div className="mt-4 rounded-xl border-2 border-brand-yellow/50 bg-brand-yellow/10 px-4 py-4 text-center sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/55">
            Fixed price
          </p>
          <p className="mt-1 font-heading text-2xl text-brand-purple sm:text-3xl">
            $
            {pricing.totalIncGst.toLocaleString("en-NZ", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="mt-1 text-xs font-medium text-brand-purple/60">
            incl. GST
          </p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-brand-purple/70">
          Thanks{form.name ? ` ${form.name.split(" ")[0]}` : ""}! We&apos;ll call you
          within <strong>15 minutes</strong> to confirm your clean.
        </p>

        <div className="mt-4 space-y-2">
          <a
            href="tel:0212282728"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-6 text-sm font-bold text-white transition hover:bg-brand-purple/90"
          >
            <Phone className="h-4 w-4" />
            Call us now
          </a>
          <button
            type="button"
            onClick={reset}
            className="flex h-12 w-full items-center justify-center text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-2"
          >
            Start a new quote
          </button>
        </div>

        <TrustPoints />
      </Wrapper>
    );
  }

  if (step === 2) {
    return (
      <Wrapper className={className}>
        <Header
          tag="Almost done"
          title="Your details"
          subtitle="Enter your contact info and we'll calculate your fixed price."
        />
        <BackButton onClick={() => setStep(1)} />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Full name *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
              placeholder="Your name"
              autoComplete="name"
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
              autoComplete="tel"
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
              autoComplete="email"
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
          className={primaryBtn}
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
      </Wrapper>
    );
  }

  if (step === 1) {
    const canProceed = Boolean(form.propertyAddress.trim());
    return (
      <Wrapper className={className}>
        <Header
          tag="Exit cleaning"
          title="Property details"
          subtitle="Where is the clean, and when do you need it?"
        />
        <BackButton onClick={() => setStep(0)} />

        <div className="space-y-4">
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
            <label htmlFor={addressFieldId} className={label}>
              Property address *
            </label>
            <AddressAutocomplete
              id={addressFieldId}
              value={form.propertyAddress}
              onChange={(v) => set("propertyAddress", v)}
              placeholder="Start typing street address…"
              className={field}
              aria-label="Property address"
            />
          </div>
          <div className="min-w-0 max-w-full space-y-1.5">
            <label className={label}>Preferred clean date</label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => set("preferredDate", e.target.value)}
              className={dateField}
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
          className={primaryBtn}
        >
          Next
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>

        <TrustPoints />
      </Wrapper>
    );
  }

  const canProceed = propertySize != null;
  return (
    <Wrapper className={className}>
      <Header
        tag="Free quote"
        title="Your property"
        subtitle="Tell us the size of the home. We'll show your fixed price after your details."
      />

      <div className="space-y-4">
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
          <label className={label}>Living rooms</label>
          <select
            value={form.extraLivingRooms}
            onChange={(e) => set("extraLivingRooms", Number(e.target.value))}
            className={selectField}
          >
            {[0, 1, 2].map((n) => (
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
        className={primaryBtn}
      >
        Next
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </button>

      <TrustPoints />
    </Wrapper>
  );
}

function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] border-2 border-brand-purple/10 border-t-brand-yellow bg-white shadow-[0_20px_60px_-12px_rgba(151,57,176,0.2),0_0_0_1px_rgba(243,208,42,0.25)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1 rounded-t-[1.2rem] bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-purple/30" />
      <div className="relative p-4 sm:p-7">{children}</div>
    </div>
  );
}

function Header({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 border-b border-brand-purple/10 pb-5">
      <p className="inline-block rounded-md bg-brand-yellow/90 px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-widest text-brand-purple">
        {tag}
      </p>
      <p className="mt-2 font-heading text-xl uppercase tracking-wide text-brand-purple sm:text-2xl">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-1.5 text-sm leading-relaxed text-brand-purple/75">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 flex items-center gap-1 text-xs font-semibold text-brand-purple/60 transition hover:text-brand-purple"
    >
      <ArrowLeft className="h-3 w-3" />
      Back
    </button>
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

"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  calculateCleaningPriceExclGst,
  cleaningPackagesForProperty,
  cleaningPropertyOptions,
  EXTRA_LIVING_ROOM_EXCL_GST,
  formatNzMoney,
  getCleaningPropertyOption,
  type CleaningPackage,
  type CleaningPropertySize,
} from "@/lib/cleaning-pricing";

const GST_MULTIPLIER = 1.15;

type FormState = {
  propertySize: CleaningPropertySize;
  cleaningPackage: CleaningPackage;
  extraLivingRooms: number;
  propertyAddress: string;
  preferredDate: string;
  cleaningType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  loading: boolean;
  sent: boolean;
  error: string;
};

const initial: FormState = {
  propertySize: "2-2",
  cleaningPackage: "option1",
  extraLivingRooms: 0,
  propertyAddress: "",
  preferredDate: "",
  cleaningType: "exit-tenancy",
  name: "",
  phone: "",
  email: "",
  message: "",
  loading: false,
  sent: false,
  error: "",
};

export function CleaningBookingForm({ className = "" }: { className?: string }) {
  const [form, setForm] = useState<FormState>(initial);

  const propertyOption = getCleaningPropertyOption(form.propertySize);
  const packages = propertyOption ? cleaningPackagesForProperty(propertyOption) : [];

  const priceExclGst = useMemo(
    () =>
      calculateCleaningPriceExclGst({
        propertySize: form.propertySize,
        package: form.cleaningPackage,
        extraLivingRooms: form.extraLivingRooms,
      }),
    [form.propertySize, form.cleaningPackage, form.extraLivingRooms],
  );

  const priceIncGst =
    priceExclGst != null ? Math.round(priceExclGst * GST_MULTIPLIER) : null;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onPropertyChange(size: CleaningPropertySize) {
    const opt = getCleaningPropertyOption(size);
    const pkg =
      opt?.option2 == null || form.cleaningPackage === "option1"
        ? "option1"
        : form.cleaningPackage;
    setForm((prev) => ({
      ...prev,
      propertySize: size,
      cleaningPackage: opt?.option2 == null ? "option1" : pkg,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      update("error", "Name and phone are required.");
      return;
    }
    if (!form.propertyAddress.trim()) {
      update("error", "Property address is required.");
      return;
    }
    if (priceExclGst == null) {
      update("error", "Please choose a valid property size and package.");
      return;
    }

    update("loading", true);
    update("error", "");

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
          propertySize: form.propertySize,
          propertyLabel: propertyOption?.label,
          cleaningPackage: form.cleaningPackage,
          extraLivingRooms: form.extraLivingRooms,
          cleaningType: form.cleaningType,
          priceExclGst,
          priceIncGst,
          message: form.message.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        update("error", data.error ?? "Something went wrong. Please call us.");
        return;
      }
      update("sent", true);
    } catch {
      update("error", "Could not send. Please call us on (021) 228 2728.");
    } finally {
      update("loading", false);
    }
  }

  if (form.sent) {
    return (
      <div
        className={`rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-lg ${className}`}
      >
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-brand-purple" aria-hidden />
          <p className="mt-4 font-heading text-xl text-brand-purple">Quote request sent</p>
          <p className="mt-2 text-sm text-brand-purple/80">
            We will call you back shortly to confirm your clean.
            {priceIncGst != null ? (
              <>
                {" "}
                Fixed price quoted: {formatNzMoney(priceIncGst)} incl. GST.
              </>
            ) : null}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-lg sm:p-6 ${className}`}
    >
      <p className="font-heading text-lg text-brand-purple">Fixed price cleaning quote</p>
      <p className="mt-1 text-xs text-brand-purple/75">
        Choose bedrooms and bathrooms. Your price updates as you go.
      </p>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Property size
        <select
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm text-brand-purple"
          value={form.propertySize}
          onChange={(e) => onPropertyChange(e.target.value as CleaningPropertySize)}
        >
          {cleaningPropertyOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {packages.length > 1 ? (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-brand-purple">Cleaning package</legend>
          <div className="mt-2 space-y-2">
            {packages.map((pkg) => (
              <label
                key={pkg.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-brand-purple/15 px-3 py-2.5 text-sm has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/[0.04]"
              >
                <input
                  type="radio"
                  name="cleaningPackage"
                  value={pkg.id}
                  checked={form.cleaningPackage === pkg.id}
                  onChange={() => update("cleaningPackage", pkg.id)}
                  className="text-brand-purple"
                />
                <span className="flex-1 text-brand-purple/90">
                  {pkg.label} — {formatNzMoney(pkg.priceExclGst)} excl. GST
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="mt-3 text-sm text-brand-purple/80">
          Fixed price: {formatNzMoney(packages[0]?.priceExclGst ?? 0)} excl. GST
        </p>
      )}

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Extra living rooms (+{formatNzMoney(EXTRA_LIVING_ROOM_EXCL_GST)} excl. GST each)
        <input
          type="number"
          min={0}
          max={10}
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm text-brand-purple"
          value={form.extraLivingRooms}
          onChange={(e) =>
            update("extraLivingRooms", Math.max(0, parseInt(e.target.value, 10) || 0))
          }
        />
      </label>

      {priceExclGst != null ? (
        <div className="mt-4 rounded-xl bg-brand-yellow/25 px-4 py-3">
          <p className="text-sm font-semibold text-brand-purple">
            Your fixed price: {formatNzMoney(priceExclGst)} excl. GST
          </p>
          {priceIncGst != null ? (
            <p className="text-xs text-brand-purple/80">
              {formatNzMoney(priceIncGst)} incl. GST
            </p>
          ) : null}
        </div>
      ) : null}

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Type of clean
        <select
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.cleaningType}
          onChange={(e) => update("cleaningType", e.target.value)}
        >
          <option value="exit-tenancy">Exit and tenancy clean</option>
          <option value="settlement">Settlement day clean</option>
          <option value="moving">House moving clean</option>
          <option value="construction">Construction clean</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Property address
        <input
          required
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.propertyAddress}
          onChange={(e) => update("propertyAddress", e.target.value)}
          placeholder="Street address, suburb"
        />
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Preferred clean date
        <input
          type="date"
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.preferredDate}
          onChange={(e) => update("preferredDate", e.target.value)}
        />
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Your name
        <input
          required
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Phone
        <input
          required
          type="tel"
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Email (optional)
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </label>

      <label className="mt-4 block text-sm font-semibold text-brand-purple">
        Notes (optional)
        <textarea
          rows={3}
          className="mt-1 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Access, keys, agent details"
        />
      </label>

      {form.error ? (
        <p className="mt-3 text-sm font-semibold text-red-700" role="alert">
          {form.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={form.loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-4 py-3 font-heading text-sm font-bold text-white transition hover:bg-brand-purple/90 disabled:opacity-60"
      >
        {form.loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Request quote"
        )}
      </button>
    </form>
  );
}

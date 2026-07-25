"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getAttribution } from "@/lib/attribution";

type Props = { className?: string };

/**
 * Simple enquiry form for hard-to-shift jobs: name, email, from/to, and
 * what needs moving. No bedrooms, stairs, or instant pricing.
 */
export function HardToShiftEnquiryForm({ className = "" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const field =
    "h-12 w-full rounded-xl border border-brand-purple/20 bg-brand-white px-4 text-sm text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20";

  return (
    <form
      className={`rounded-[1.25rem] border border-brand-purple/10 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(151,57,176,0.15)] sm:p-7 ${className}`}
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        try {
          const res = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "hard-to-shift",
              name,
              email,
              pickupAddress,
              dropoffAddress,
              message,
              sourcePage: window.location.pathname,
              attribution: getAttribution(),
            }),
          });
          const data = (await res.json()) as { ok?: boolean; error?: string };
          if (!res.ok || !data.ok) {
            throw new Error(data.error || "Request failed");
          }
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "quote_submit",
            form_type: "hard-to-shift",
          });
          setSuccess(`Thanks ${name}! We'll get back to you shortly.`);
          setMessage("");
        } catch {
          setError(
            "Something went wrong sending your enquiry. Please call us instead.",
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <h2 className="font-heading text-xl uppercase tracking-wide text-brand-purple sm:text-2xl">
        Hard to shift enquiry
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-purple/75">
        Tell us what you need moved and where. We&apos;ll reply with a clear quote.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="hts-name">
            Full name
          </label>
          <input
            id="hts-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className={field}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="hts-email">
            Email
          </label>
          <input
            id="hts-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label
            className="text-xs font-semibold text-brand-purple"
            htmlFor="hts-from"
          >
            From (pickup)
          </label>
          <input
            id="hts-from"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            required
            placeholder="Pickup address"
            className={field}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="hts-to">
            To (drop-off)
          </label>
          <input
            id="hts-to"
            value={dropoffAddress}
            onChange={(e) => setDropoffAddress(e.target.value)}
            required
            placeholder="Drop-off address"
            className={field}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label
            className="text-xs font-semibold text-brand-purple"
            htmlFor="hts-message"
          >
            What are we shifting?
          </label>
          <textarea
            id="hts-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder="e.g. spa pool, safe, gym equipment, piano..."
            className={`${field} h-auto resize-none py-3`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-lg transition hover:brightness-[1.02] active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "Sending..." : "Send enquiry"}
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </button>
      <p className="mt-3 text-xs text-brand-purple/60">
        Prefer a call? (021) 228 2728
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 rounded-xl border border-brand-purple/20 bg-brand-purple/[0.06] p-4 text-sm font-medium text-brand-purple">
          {success}
        </p>
      )}
    </form>
  );
}

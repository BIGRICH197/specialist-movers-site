"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getAttribution } from "@/lib/attribution";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

type Props = { className?: string };

const field =
  "h-12 w-full scroll-mt-24 rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-base text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45 sm:text-sm";

const label = "text-xs font-semibold text-brand-purple";

const primaryBtn =
  "group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100";

/**
 * Simple enquiry form for hard-to-shift jobs: name, phone, email, from/to, and
 * what needs moving. Same card chrome as QuoteForm.
 *
 * Phone is required. It was missing from this form entirely until 2026-08-11,
 * so every hard-to-shift lead reached HubSpot with no number — the API route
 * papered over the gap with the literal string "Via website", which meant the
 * field looked populated while being unusable. Taine flagged three in a row
 * (deals 340303418057, 340254804717, 339863119592), all jobs that need a
 * conversation before they can be quoted.
 */
export function HardToShiftEnquiryForm({ className = "" }: Props) {
  // This form renders from ServicePageTemplate, ServiceLandingSections and
  // HamiltonServicePage, so a page can mount it more than once. Static ids
  // produced duplicate #hts-* ids and broke every label association after the
  // first instance.
  const uid = useId().replace(/:/g, "");
  const fieldId = (suffix: string) => `${uid}-${suffix}`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (success) {
    return (
      <Wrapper className={className}>
        <Header tag="Enquiry sent" title="Thanks, we'll be in touch" />
        <p className="text-sm leading-relaxed text-brand-purple/75">
          Thanks{name ? ` ${name.split(" ")[0]}` : ""}! We&apos;ll reply shortly with a
          clear quote for your hard-to-shift job.
        </p>
        <a
          href={`tel:${phoneNumber}`}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-6 text-sm font-bold text-white transition hover:bg-brand-purple/90"
        >
          Call us now · {phoneDisplay}
        </a>
        <TrustPoints />
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;
          setSubmitting(true);
          setError("");
          try {
            const res = await fetch("/api/quote", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                mode: "hard-to-shift",
                name,
                phone,
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
            setSuccess(true);
          } catch {
            setError(
              "Something went wrong sending your enquiry. Please call us instead.",
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Header
          tag="Free quote"
          title="Hard to shift enquiry"
          subtitle="Tell us what you need moved and where. We'll reply with a clear quote."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className={label} htmlFor={fieldId("hts-name")}>
              Full name *
            </label>
            <input
              id={fieldId("hts-name")}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label} htmlFor={fieldId("hts-email")}>
              Email *
            </label>
            <input
              id={fieldId("hts-email")}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="you@example.com"
              className={field}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className={label} htmlFor={fieldId("hts-phone")}>
              Phone *
            </label>
            <input
              id={fieldId("hts-phone")}
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="tel"
              inputMode="tel"
              placeholder="021..."
              className={field}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className={label} htmlFor={fieldId("hts-from")}>
              From (pickup) *
            </label>
            <input
              id={fieldId("hts-from")}
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              required
              placeholder="Pickup address"
              className={field}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className={label} htmlFor={fieldId("hts-to")}>
              To (drop-off) *
            </label>
            <input
              id={fieldId("hts-to")}
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              required
              placeholder="Drop-off address"
              className={field}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className={label} htmlFor={fieldId("hts-message")}>
              What are we shifting? *
            </label>
            <textarea
              id={fieldId("hts-message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="e.g. spa pool, safe, gym equipment, piano..."
              className={`${field} h-auto resize-none py-3`}
            />
          </div>
        </div>

        <button type="submit" disabled={submitting} className={primaryBtn}>
          {submitting ? "Sending..." : "Send enquiry"}
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <TrustPoints />
      </form>
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

function TrustPoints() {
  const points = [
    "Hundreds of 5-star reviews",
    "No obligation, clear quotes",
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

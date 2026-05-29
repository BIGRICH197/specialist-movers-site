"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const field =
    "h-12 w-full rounded-xl border border-brand-purple/20 bg-brand-white px-4 text-sm text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20";

  return (
    <form
      className="rounded-[1.25rem] border border-brand-purple/10 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(151,57,176,0.15)] sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const payload = { name, email, phone, message };
        console.log("Contact submitted", payload);
        setSuccess(`Thanks ${name}! We'll get back to you shortly.`);
        setMessage("");
      }}
    >
      <h2 className="font-heading text-xl uppercase tracking-wide text-brand-purple sm:text-2xl">
        Send a message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-purple/75">
        Tell us what you need , we&apos;ll respond as soon as we can.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="cf-name">
            Full name
          </label>
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className={field}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-brand-purple" htmlFor="cf-phone">
            Phone
          </label>
          <input
            id="cf-phone"
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
          <label className="text-xs font-semibold text-brand-purple" htmlFor="cf-message">
            Message
          </label>
          <textarea
            id="cf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="What do you need moved?"
            className={`${field} resize-none py-3`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-lg transition hover:brightness-[1.02] active:scale-[0.99] sm:w-auto sm:px-10"
      >
        Send message
        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
      </button>
      <p className="mt-3 text-xs text-brand-purple/60">Prefer a call? Use the number above.</p>

      {success && (
        <p className="mt-4 rounded-xl border border-brand-purple/20 bg-brand-purple/[0.06] p-4 text-sm font-medium text-brand-purple">
          {success}
        </p>
      )}
    </form>
  );
}

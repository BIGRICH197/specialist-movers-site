import type { Metadata } from "next";
import {
  cleaningAgreementNote,
  cleaningRooms,
  cleaningOptionalExtras,
  cleaningExclusionsIntro,
  cleaningExclusions,
} from "@/lib/cleaning-schedule";

export const metadata: Metadata = {
  title: "End of Tenancy Cleaning Schedule | Specialist Movers",
  description:
    "Exactly what's included in a Specialist Movers end-of-tenancy clean, room by room, plus optional extras.",
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-purple/85">
          <span className="mt-0.5 select-none text-brand-purple" aria-hidden>✓</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CleaningSchedulePage() {
  return (
    <main className="min-h-screen bg-brand-canvas">
      {/* Branded header */}
      <header className="bg-brand-purple px-6 py-10 text-center text-white sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
          Specialist Cleaners
        </p>
        <h1 className="mt-2 font-heading text-3xl sm:text-4xl">
          End of Tenancy Cleaning Schedule
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
          Exactly what we clean, room by room, so you know precisely what your
          end-of-tenancy clean covers.
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Agreement note */}
        <div className="rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-lg text-brand-purple">
            Before your clean: check your agreement
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-purple/80">
            {cleaningAgreementNote}
          </p>
        </div>

        {/* Included rooms */}
        <h2 className="mt-10 font-heading text-2xl text-brand-purple">
          Included in every end-of-tenancy clean
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cleaningRooms.map((room) => (
            <section
              key={room.title}
              className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-lg text-brand-purple">{room.title}</h3>
              <CheckList items={room.items} />
            </section>
          ))}
        </div>

        {/* Optional extras */}
        <section className="mt-8 rounded-2xl border border-brand-yellow/60 bg-brand-yellow/10 p-6">
          <h2 className="font-heading text-xl text-brand-purple">Optional extras</h2>
          <p className="mt-1 text-sm text-brand-purple/75">
            Add any of these to your clean. Just ask us.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {cleaningOptionalExtras.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm text-brand-purple/85">
                <span className="mt-0.5 select-none text-brand-purple" aria-hidden>+</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exclusions */}
        <section className="mt-8 rounded-2xl border border-brand-purple/12 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl text-brand-purple">Not included</h2>
          <p className="mt-1 text-sm text-brand-purple/75">{cleaningExclusionsIntro}</p>
          <ul className="mt-4 space-y-2.5">
            {cleaningExclusions.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-purple/80">
                <span className="mt-0.5 select-none text-brand-purple/50" aria-hidden>•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-center text-sm text-brand-purple/70">
          Questions about your clean? Get in touch and we&apos;ll be happy to help.
        </p>
      </div>
    </main>
  );
}

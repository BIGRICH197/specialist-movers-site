import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CleaningBookingForm } from "@/components/CleaningBookingForm";
import { HeroVisual } from "@/components/HeroVisual";
import { SectionReveal } from "@/components/SectionReveal";
import {
  cleaningPropertyOptions,
  EXTRA_LIVING_ROOM_EXCL_GST,
  formatNzMoney,
} from "@/lib/cleaning-pricing";
import { getServicePhoto } from "@/lib/site-photos";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

const serviceSections = [
  {
    title: "Exit and tenancy cleaning",
    body:
      "End-of-lease cleans that help you hand the keys back with confidence. We work to agent checklists, kitchens, bathrooms, windows, and skirting boards included in your package.",
  },
  {
    title: "Settlement day cleaning",
    body:
      "Moving into a new home? We deep clean cupboards, wardrobes, and neglected areas so your new place is ready on settlement day.",
  },
  {
    title: "House moving cleaning",
    body:
      "Vacating or moving in? We can clean both properties around your move date so you are not juggling cleaners and movers.",
  },
  {
    title: "Construction cleaning",
    body:
      "Post-build dust, paint splatter, and debris removed so the site is safe and ready for occupancy.",
  },
] as const;

export function CleaningBookingsPage() {
  const heroPhoto = getServicePhoto("cleaning-services");

  return (
    <div className="bg-brand-white">
      <section className="border-b border-white/10 bg-brand-purple py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start container-px">
          <div>
            <Breadcrumbs
              light
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Cleaning bookings" },
              ]}
            />
            <h1 className="mt-2 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Exit cleaning Auckland
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
              Fixed-price exit, settlement, and moving cleans across Auckland. Choose your
              property size and package, add extra living rooms if needed, and book online.
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="mt-6 inline-flex font-heading text-xl font-bold text-brand-yellow transition-colors duration-200 hover:text-white sm:text-2xl"
            >
              {phoneDisplay}
            </a>
          </div>
          {heroPhoto ? (
            <HeroVisual
              photoSrc={heroPhoto}
              photoAlt="Specialist Movers professional cleaning service Auckland"
            />
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl py-12 container-px lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-12 lg:items-start">
        <div className="min-w-0">
          <h2 className="font-heading text-2xl text-brand-purple">Fixed cleaning prices</h2>
          <p className="mt-2 text-sm text-brand-purple/80">
            All prices excl. GST. Add {formatNzMoney(EXTRA_LIVING_ROOM_EXCL_GST)} excl. GST per
            extra living room on either package.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-purple/15 shadow-sm">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-brand-purple/5 text-brand-purple">
                <tr>
                  <th className="px-4 py-3 font-heading">Property size</th>
                  <th className="px-4 py-3 font-heading">Option 1</th>
                  <th className="px-4 py-3 font-heading">Option 2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-purple/10 text-brand-purple/85">
                {cleaningPropertyOptions.map((row) => (
                  <tr key={row.id} className="bg-white">
                    <td className="px-4 py-3 font-semibold">{row.label}</td>
                    <td className="px-4 py-3">{formatNzMoney(row.option1)}</td>
                    <td className="px-4 py-3">
                      {row.option2 != null ? formatNzMoney(row.option2) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SectionReveal className="mt-10 space-y-8">
            {serviceSections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl text-brand-purple">{section.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
                  {section.body}
                </p>
              </div>
            ))}
          </SectionReveal>

          <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl text-brand-purple">Also from Specialist Movers</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-purple/85">
              {[
                "House moving across Auckland",
                "Packing (packers come in the day before)",
                "Retirement and apartment moves",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/services/house-moving"
                className="rounded-full border border-brand-purple/20 px-3 py-1.5 text-xs font-semibold text-brand-purple hover:border-brand-purple/40"
              >
                House moving
              </Link>
              <Link
                href="/services/cleaning-services"
                className="rounded-full border border-brand-purple/20 px-3 py-1.5 text-xs font-semibold text-brand-purple hover:border-brand-purple/40"
              >
                Exit cleaning overview
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:sticky lg:top-28">
          <CleaningBookingForm />
        </div>
      </section>
    </div>
  );
}

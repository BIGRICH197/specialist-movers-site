import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Home,
  Package,
  Piano,
  Sparkles,
  Truck,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import { serviceBlurbs } from "@/lib/homepage-copy";
import { serviceHref } from "@/lib/service-links";
import { phoneDisplay, phoneNumber, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "House moving, piano moving, commercial relocations, packing, exit cleaning, international moves and more, Auckland and the Waikato.",
};

const icons = [
  Home,
  Building2,
  Piano,
  Package,
  Truck,
  Sparkles,
  Home,
  Truck,
  Package,
];

export default function ServicesPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="What we move"
        title="Moving services"
        description="Choose the service you need, then request a fast quote. With Auckland and Hamilton bases we service Auckland and the Waikato with the same careful standards on every job."
      >
        <a
          href={`tel:${phoneNumber}`}
          className="mt-6 inline-flex font-heading text-xl font-bold text-brand-purple sm:text-2xl"
        >
          {phoneDisplay}
        </a>
      </PageHero>

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = icons[idx] ?? Truck;
            const blurb = serviceBlurbs[service.slug];
            return (
              <Link
                key={service.slug}
                href={serviceHref(service.slug)}
                className="group flex flex-col rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-purple/30 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-xl text-brand-purple group-hover:underline">
                      {blurb?.title ?? service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-purple/78">
                      {blurb?.excerpt ?? service.description}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-brand-purple/10 p-3 text-brand-purple transition group-hover:bg-brand-yellow/40">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-purple/55">
                  View details →
                </span>
              </Link>
            );
          })}
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.04] py-10">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 container-px">
          <ScatteredReviews
            slot="services-footer-1"
            count={1}
            variant="compact"
            showFooterLink={false}
          />
          <ScatteredReviews
            slot="services-footer-2"
            count={1}
            variant="compact"
            showFooterLink={false}
          />
        </div>
        <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-brand-purple/70 container-px">
          <Link href="/reviews" className="font-semibold text-brand-purple underline">
            More Google reviews →
          </Link>
        </p>
      </SectionReveal>

      <PagePhotoMomentStrip momentKey="services" />
    </div>
  );
}

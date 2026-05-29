import type { Metadata } from "next";
import Link from "next/link";
import { InclusionAccordion } from "@/components/InclusionAccordion";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionReveal } from "@/components/SectionReveal";
import {
  moveInclusionCategories,
  movingDistanceHub,
  storageHub,
  whatsIncludedPage,
} from "@/lib/service-clusters";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "What's Included in Every Move",
  description: `Wrapping, protection, labour, and transport standards on every Specialist Movers job. ${regions.serviceArea}. Transparent quotes.`,
};

export default function WhatsIncludedPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow={whatsIncludedPage.eyebrow}
        title={whatsIncludedPage.title}
        description={whatsIncludedPage.lead}
      >
        <a
          href={`tel:${phoneNumber}`}
          className="mt-6 inline-flex font-heading text-xl font-bold text-brand-purple sm:text-2xl"
        >
          {phoneDisplay}
        </a>
      </PageHero>

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
          <div>
            <InclusionAccordion categories={moveInclusionCategories} />
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href={movingDistanceHub.path}
                className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-brand-purple transition hover:bg-brand-yellow/30"
              >
                Moving by distance →
              </Link>
              <Link
                href={storageHub.path}
                className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-brand-purple transition hover:bg-brand-yellow/30"
              >
                Storage options →
              </Link>
              <Link
                href="/services/house-moving"
                className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-brand-purple transition hover:bg-brand-yellow/30"
              >
                House moving →
              </Link>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.05] p-6">
              <h2 className="font-heading text-xl text-brand-purple">
                {whatsIncludedPage.asideTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
                {whatsIncludedPage.asideBody}
              </p>
            </div>
            <div id="quote">
              <p className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple">
                Request a free quote
              </p>
              <QuoteForm defaultJobType="House Move" />
            </div>
          </aside>
        </div>
      </SectionReveal>

      <PagePhotoMomentStrip momentKey="services" />
    </div>
  );
}

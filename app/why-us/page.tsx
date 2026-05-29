import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Shield, Star, Truck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import {
  siteWideBullets,
  whyChooseShort,
  whyUsPage,
} from "@/lib/homepage-copy";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "SiteWise Gold, 90%+ safety scores, specialist crews and seven-day service. Why Auckland and Waikato clients choose Specialist Movers NZ.",
};

const highlights = [
  {
    icon: Star,
    title: "60+ years combined",
    text: "Deep team experience in furniture, piano and awkward-item moves.",
  },
  {
    icon: Truck,
    title: "Two bases",
    text: "Auckland (Wairau Valley) and Hamilton, servicing Auckland and the Waikato.",
  },
  {
    icon: Shield,
    title: "SiteWise Gold",
    text: "Audited health & safety systems you can rely on.",
  },
  {
    icon: CalendarDays,
    title: "7 days",
    text: "Monday–Sunday availability when timing matters.",
  },
];

export default function WhyUsPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Trust & standards"
        title="Why choose Specialist Movers"
        description={whyUsPage.intro}
      />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
            >
              <Icon className="h-6 w-6 text-brand-purple" />
              <h2 className="mt-4 font-heading text-xl text-brand-purple">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-purple/80">{text}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-7xl py-10 container-px">
        <div className="grid gap-4 sm:grid-cols-2">
          <ScatteredReviews
            slot="why-us-spot-1"
            count={1}
            variant="sidebar"
            showFooterLink={false}
          />
          <ScatteredReviews
            slot="why-us-spot-2"
            count={1}
            variant="sidebar"
            showFooterLink={false}
          />
        </div>
        <p className="mt-6 text-center text-sm text-brand-purple/70">
          <Link href="/reviews" className="font-semibold text-brand-purple underline">
            See all customer reviews →
          </Link>
        </p>
      </SectionReveal>

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12">
        <div className="mx-auto max-w-3xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple">
            Health, safety & compliance
          </h2>
          <NumberedInfoGrid
            className="mt-6"
            columns={2}
            items={siteWideBullets.map((line) => ({ body: line }))}
          />
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="rounded-2xl border border-brand-purple/15 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-lg leading-relaxed text-brand-purple/85">
            {whyChooseShort}
          </p>
          <p className="mt-6 text-base leading-relaxed text-brand-purple/80">
            {whyUsPage.closing}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-brand-yellow px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple shadow-sm transition hover:brightness-[1.02]"
          >
            Talk to us
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}

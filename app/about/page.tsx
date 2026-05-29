import type { Metadata } from "next";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { sitePhotos } from "@/lib/site-photos";
import { PageHero } from "@/components/PageHero";
import { AboutTeamSection } from "@/components/AboutTeamSection";
import { SectionReveal } from "@/components/SectionReveal";
import { ExperienceMilestonesBand } from "@/components/ExperienceMilestonesBand";
import { aboutPage } from "@/lib/homepage-copy";
import { experienceMilestones } from "@/lib/homepage-sections";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NZ-owned movers with Auckland and Hamilton bases , house, piano, commercial and specialist moves across Auckland and the Waikato.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Our team"
        title="About Specialist Movers NZ"
        description={aboutPage.intro}
      />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-base leading-relaxed text-brand-purple/85">
            <p>{aboutPage.story}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#quote"
                className="rounded-full bg-brand-yellow px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple shadow-sm transition hover:brightness-[1.02]"
              >
                Get a quote
              </Link>
              <a
                href={`tel:${phoneNumber}`}
                className="rounded-full border border-brand-purple/25 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple transition hover:border-brand-purple/45"
              >
                {phoneDisplay}
              </a>
            </div>
          </div>
          <HeroVisual
            variant="moving"
            photoSrc={sitePhotos.aboutTeam}
            photoAlt="Specialist Movers team in uniform with company trucks"
          />
        </div>
      </SectionReveal>

      <AboutTeamSection />

      <ExperienceMilestonesBand data={experienceMilestones} />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <h2 className="font-heading text-2xl text-brand-purple">Coverage</h2>
        <p className="mt-4 max-w-3xl text-brand-purple/85">
          {regions.basesLong}. Day to day we service{" "}
          <strong className="text-brand-purple">{regions.serviceArea}</strong>, with{" "}
          {regions.widerNorthIsland.toLowerCase()} when you need it. International and
          specialist freight moves are quoted on a case-by-case basis.
        </p>
        <div className="mt-8 h-56 rounded-2xl border border-brand-purple/15 bg-gradient-to-br from-brand-purple/[0.06] to-brand-yellow/15 p-6 text-sm text-brand-purple/70">
          <p className="font-heading text-lg text-brand-purple/80">Map visual</p>
          <p className="mt-2 max-w-md">
            Drop in a static map or illustration here when ready , Taupo through Auckland to
            Cape Reinga.
          </p>
        </div>
      </SectionReveal>
    </div>
  );
}

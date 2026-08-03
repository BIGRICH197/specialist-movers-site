import type { Metadata } from "next";
import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { AboutPageJsonLd } from "@/components/AboutPageJsonLd";
import { PageUpdatedStamp } from "@/components/PageUpdatedStamp";
import { siteContentUpdated } from "@/lib/content-dates";
import { aboutStoryHeroIntro, aboutStorySections } from "@/lib/about-story";
import { legacyMetaDescription } from "@/lib/legacy-meta-descriptions";
import { buildPageMetadata } from "@/lib/seo";
import { seoAbsoluteTitles } from "@/lib/seo-meta-titles";
import { sitePhotos } from "@/lib/site-photos";
import { PageHero } from "@/components/PageHero";
import { AboutTeamSection } from "@/components/AboutTeamSection";
import { SectionReveal } from "@/components/SectionReveal";
import { CoverageMap } from "@/components/CoverageMap";
import { ExperienceMilestonesBand } from "@/components/ExperienceMilestonesBand";
import { experienceMilestones } from "@/lib/homepage-sections";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { AuthorityCitations } from "@/components/AuthorityCitations";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: seoAbsoluteTitles.about },
  description: legacyMetaDescription("about"),
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-brand-white">
      <AboutPageJsonLd />
      <PageHero
        variant="light"
        eyebrow="Our story"
        title="About Specialist Movers Auckland & Hamilton"
        description={aboutStoryHeroIntro}
      />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <PageUpdatedStamp date={siteContentUpdated} className="mb-8" />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="space-y-10 text-base leading-relaxed text-brand-purple/88 sm:text-lg">
            {aboutStorySections.map((section) => (
              <div key={section.heading ?? section.paragraphs[0]?.slice(0, 32)}>
                {section.heading ? (
                  <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                    {section.heading}
                  </h2>
                ) : null}
                <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
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
            className="lg:sticky lg:top-28"
          />
        </div>
      </SectionReveal>

      <AboutTeamSection />

      <ExperienceMilestonesBand data={experienceMilestones} />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">Coverage</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-purple/85 sm:text-lg">
          {regions.basesLong}. Day to day we service{" "}
          <strong className="text-brand-purple">{regions.serviceArea}</strong>, with{" "}
          {regions.widerNorthIsland.toLowerCase()} when you need it. International and
          specialist freight moves are quoted on a case-by-case basis.
        </p>
        <CoverageMap />
      </SectionReveal>
      <AuthorityCitations />
    </div>
  );
}

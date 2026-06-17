import Link from "next/link";
import { ChevronRight, MapPin, Piano } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { HomePurplePanel } from "@/components/home/HomePurplePanel";
import { PianoExpertiseSection } from "@/components/PianoExpertiseSection";
import { PianoGallerySection } from "@/components/PianoGallerySection";
import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";
import { QuoteForm } from "@/components/QuoteForm";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { ServiceProcessSection } from "@/components/ServiceLandingSections";
import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";
import { SectionReveal } from "@/components/SectionReveal";
import { SitePhoto } from "@/components/SitePhoto";
import { contactCta, googleReviewsUrl, pianoStatsStrip } from "@/lib/homepage-copy";
import { sectionRevealDirection } from "@/lib/motion";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { pianoMovingProcess } from "@/lib/moving-process";
import { pianoFaqs } from "@/lib/piano-faqs";
import { formatHeadingText } from "@/lib/heading-ampersand";
import { ServiceHeroSublinePrice } from "@/components/ServiceHeroSublinePrice";
import { getServiceHeroSubline } from "@/lib/service-hero-detail";
import {
  pianoHubCities,
  pianoHubCitiesIntro,
  pianoHubHero,
  pianoHubServicesIntro,
} from "@/lib/piano-hub-copy";
import { sitePhotos } from "@/lib/site-photos";
import { phoneDisplay, phoneNumber, pianoServices } from "@/lib/site-data";

export function PianoHubPage() {
  const hubPianoServices = pianoServices.filter((p) => p.slug !== "piano-tuning");

  const hubFaqs = pianoFaqs;

  return (
    <div className="bg-brand-canvas">
      <FaqPageJsonLd items={hubFaqs} />
      <ServiceHeroWithQuote
        heroVariant="piano"
        heading={pianoHubHero.h1}
        titleSlug="piano-movers"
        eyebrowLabel={pianoHubHero.eyebrow}
        headingSub={pianoHubHero.h1Sub}
        lead={
          <p className="text-base leading-relaxed text-white/85">
            {pianoHubHero.lead}
          </p>
        }
        subline={
          <ServiceHeroSublinePrice>
            {getServiceHeroSubline("piano-movers")}
          </ServiceHeroSublinePrice>
        }
        photo={
          <HeroVisual
            variant="piano"
            photoSrc={sitePhotos.pianoMove}
            photoAlt="Specialist Movers crew moving a piano with specialist equipment"
            photoHoverSrc={sitePhotos.pianoAbout}
            photoHoverAlt="Specialist Piano Movers team beside a wrapped piano and company truck"
            overlayCaption={pianoHubHero.photoTagline}
            captionBottomFadeOnly
            priority
            className="hero-photo-ambient"
          />
        }
        quote={<QuoteForm defaultJobType="Piano Move" />}
        showMobilePartnerMarquee
      />

      <ServiceTrustindexBand />

      <div className="mx-auto hidden max-w-7xl container-px pb-2 pt-8 sm:pb-4 sm:pt-10 lg:block">
        <PianoPartnerMarquee />
      </div>

      <SectionReveal
        direction={sectionRevealDirection(0)}
        className="mx-auto max-w-7xl py-10 container-px sm:py-12"
      >
        <h2 className="font-heading text-3xl text-brand-purple sm:mt-2">
          {pianoHubCitiesIntro.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-purple/85">
          {pianoHubCitiesIntro.body}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {pianoHubCities.map((city) => (
            <Link
              key={city.id}
              href={city.href}
              className="card-interactive group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-purple/15 bg-white shadow-sm"
            >
              <SitePhoto
                src={city.id === "auckland" ? sitePhotos.pianoMove : sitePhotos.pianoCare}
                alt={city.title}
                aspect="card"
                overlay={false}
                hoverSwap={false}
                className="rounded-none border-0 shadow-none"
              />
              <div className="flex flex-1 flex-col p-6">
                <MapPin className="h-5 w-5 text-brand-purple" aria-hidden />
                <h3 className="mt-3 font-heading text-xl text-brand-purple group-hover:underline">
                  {city.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-purple/80">
                  {city.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
                  {city.cta}
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal
        direction={sectionRevealDirection(1)}
        className="border-t border-brand-purple/10 bg-white py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {pianoHubServicesIntro.title}
          </h2>
          <p className="mt-3 max-w-2xl text-brand-purple/80">{pianoHubServicesIntro.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubPianoServices.map((p) => (
              <Link
                key={p.slug}
                href={`/piano-movers/${p.slug}`}
                className="card-interactive group flex h-full flex-col rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 shadow-sm"
              >
                <Piano className="h-5 w-5 text-brand-purple" aria-hidden />
                <h3 className="mt-3 font-heading text-lg text-brand-purple group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-purple/78">
                  {p.whyChooseCopy}
                </p>
              </Link>
            ))}
            <Link
              href="/piano-movers/piano-tuning"
              className="card-interactive group flex h-full flex-col rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 shadow-sm"
            >
              <Piano className="h-5 w-5 text-brand-purple" aria-hidden />
              <h3 className="mt-3 font-heading text-lg text-brand-purple group-hover:underline">
                Piano tuning
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-purple/78">
                Standard tuning and pitch correction after your move settles in.
              </p>
            </Link>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal direction={sectionRevealDirection(2)} className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <HomePurplePanel
          eyebrow="Why us"
          title="Dedicated piano crews, not general furniture labour"
          description="Minimum three trained movers on standard piano jobs. Piano boards, shrink wrap, and trucks built for instruments."
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pianoStatsStrip.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-5"
              >
                <p className="font-heading text-2xl text-brand-yellow">{item.value}</p>
                <p className="mt-1 text-sm text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </HomePurplePanel>
      </SectionReveal>

      <ServiceProcessSection
        title={pianoMovingProcess.title}
        steps={pianoMovingProcess.steps}
        reviewSlot="piano-hub-process"
        piano
      />

      <PianoExpertiseSection />
      <PianoGallerySection />

      <SectionReveal
        direction={sectionRevealDirection(3)}
        className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 sm:py-14"
      >
        <div className="mx-auto max-w-6xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Piano moving questions
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <dl className="min-w-0 space-y-6">
              {hubFaqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
                >
                  <dt className="font-heading text-base text-brand-purple">
                    {formatHeadingText(item.q)}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">{item.a}</dd>
                </div>
              ))}
            </dl>
            <ScatteredReviews slot="piano-hub-faq" count={2} piano variant="sidebar" />
          </div>
          <p className="mt-6 text-center text-sm text-brand-purple/70">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-purple underline underline-offset-2"
            >
              See hundreds of 5-star Google reviews →
            </a>
          </p>
        </div>
      </SectionReveal>

      <section className="border-t border-brand-purple/10 bg-brand-purple py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center container-px">
          <div className="mx-auto w-full max-w-xl space-y-5 sm:space-y-6 lg:mx-0">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">Contact us</h2>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex font-heading text-xl font-bold leading-none text-brand-yellow transition hover:text-white sm:text-2xl"
            >
              {phoneDisplay}
            </a>
            <p className="text-base leading-relaxed text-white/90">{contactCta}</p>
          </div>
          <QuoteForm compact defaultJobType="Piano Move" />
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { HeroVisual } from "@/components/HeroVisual";
import { MovingBanners } from "@/components/MovingBanners";
import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";
import { ProcessStepsGrid } from "@/components/ProcessStepsGrid";
import { ReviewSidebarColumn } from "@/components/ReviewSidebarColumn";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionReveal } from "@/components/SectionReveal";
import { faqs, googleReviewsUrl, statsStrip } from "@/lib/homepage-copy";
import { getServiceProcessSteps } from "@/lib/process-steps-with-images";
import { pianoFaqs } from "@/lib/piano-faqs";
import { regions } from "@/lib/regions";
import { resolveServiceLink } from "@/lib/service-links";
import type { ServiceLandingConfig } from "@/lib/service-landings";
import { halfPhotoWrap } from "@/lib/photo-layout";
import { phoneDisplay, phoneNumber, pianoServices } from "@/lib/site-data";

type Props = {
  config: ServiceLandingConfig;
};

/**
 * Lead-focused landing layout (booking page flow), hero + quote form, trust bar,
 * about, why us, process, related links, FAQ, final CTA.
 */
export function ServiceLandingPage({ config }: Props) {
  const landingFaqs =
    config.slug === "piano-movers" ? [...pianoFaqs] : faqs.slice(0, 4);
  const processTitle = config.processTitle ?? "How we run your move";
  const processSteps = getServiceProcessSteps(config.slug);

  return (
    <div className="bg-brand-white">
      {/* Hero + lead form */}
      <section className="overflow-visible border-b border-white/10 bg-brand-purple py-12 pb-16 text-white sm:py-16 sm:pb-20 lg:py-20 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-start lg:gap-12 container-px">
          <div className="min-w-0">
            <p className="mb-3 inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow">
              {config.eyebrow}
            </p>
            <h1 className="font-heading text-3xl leading-[1.15] text-white sm:text-4xl lg:leading-[1.12]">
              {config.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              {config.lead}
            </p>
            <p className="mt-3 inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90">
              {config.subline}
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="mt-6 inline-flex items-center font-heading text-2xl font-bold tracking-tight text-brand-yellow transition-colors duration-200 hover:text-white sm:text-3xl"
            >
              {phoneDisplay}
            </a>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-white/95">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                Licensed & insured
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                7 days a week
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                {regions.serviceAreaBadge}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                Callback in 15 min
              </span>
            </div>
            <HeroVisual
              variant="moving"
              className={`mt-8 ${config.wrapHeroPhoto ? halfPhotoWrap : ""}`}
              photoSrc={config.heroGagPhoto}
              photoAlt={config.heroGagAlt}
              overlayCaption={config.heroOverlayCaption}
              priority
            />
          </div>
          <div id="quote" className="lg:sticky lg:top-28">
            <p className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-yellow">
              Request a free quote
            </p>
            <QuoteForm defaultJobType={config.defaultJobType} />
          </div>
        </div>
      </section>

      {/* Trust ticker */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        {config.showPianoPartners ? <PianoPartnerMarquee /> : null}
        {config.showMovingBanner ? <MovingBanners /> : null}
      </div>

      {/* About + highlights */}
      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="min-w-0">
            <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
              {config.aboutTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
              {config.aboutBody}
            </p>
          </div>
          {config.showAboutSideImage !== false ? (
            <HeroVisual
              variant="moving"
              photoSrc={config.aboutSidePhoto ?? config.heroPhoto}
              photoAlt={config.aboutSidePhotoAlt ?? config.heroPhotoAlt}
              className="w-full"
            />
          ) : null}
        </div>
        <NumberedInfoGrid
          columns={3}
          className="mt-8"
          items={config.trustHighlights.map((item) => ({
            title: item.title,
            body: item.text,
          }))}
        />

        <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="font-heading text-xl text-brand-purple">What we handle</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {config.includedBullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-brand-purple/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      {/* Why choose */}
      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 sm:py-14">
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {config.whyTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-purple/85">
            {config.whyBody}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsStrip.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm"
              >
                <p className="font-heading text-2xl text-brand-purple">{item.value}</p>
                <p className="mt-1 text-xs text-brand-purple/75">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Process */}
      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
              {processTitle}
            </h2>
            <ProcessStepsGrid steps={processSteps} />
          </div>
          <div className="lg:pt-12">
            <ScatteredReviews
              slot={`service-${config.slug}-process`}
              count={1}
              piano={config.slug === "piano-movers"}
              variant="sidebar"
            />
          </div>
        </div>
      </SectionReveal>

      {/* Piano sub-services or related */}
      {config.showPianoSubServices ? (
        <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Piano services
          </h2>
          <p className="mt-3 max-w-2xl text-brand-purple/80">
            Upright, grand, international shipping, or storage. Pick the option that fits your
            piano.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pianoServices.map((p) => (
              <Link
                key={p.slug}
                href={`/piano-movers/${p.slug}`}
                className="group rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm transition hover:border-brand-purple/30 hover:shadow-md"
              >
                <h3 className="font-heading text-lg text-brand-purple group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-brand-purple/78">{p.whyChooseCopy}</p>
              </Link>
            ))}
          </div>
        </SectionReveal>
      ) : (
        <SectionReveal className="border-t border-brand-purple/10 py-12 container-px">
          <h2 className="font-heading text-xl text-brand-purple">Related services</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {config.relatedSlugs.map((slug) => {
              const link = resolveServiceLink(slug);
              if (!link) return null;
              return (
                <Link
                  key={slug}
                  href={link.href}
                  className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </SectionReveal>
      )}

      {/* FAQ */}
      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {config.faqHeading}
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <dl className="min-w-0 space-y-6">
              {landingFaqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
                >
                  <dt className="font-heading text-base text-brand-purple">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
            <ReviewSidebarColumn
              reviewSlot={`service-${config.slug}-faq`}
              reviewCount={2}
              piano={config.slug === "piano-movers"}
            />
          </div>
          <p className="mt-6 text-center text-sm text-brand-purple/70 lg:hidden">
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

      {/* Final CTA */}
      <section className="border-t border-brand-purple/10 bg-brand-purple py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center container-px">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl">
              Get your free quote today
            </h2>
            <p className="mt-4 max-w-lg text-white/85">
              Fill in the form and we will call you back within 15 minutes with a fair quote and
              our next available slot. Or call{" "}
              <a href={`tel:${phoneNumber}`} className="font-bold text-brand-yellow hover:underline">
                {phoneDisplay}
              </a>
              .
            </p>
          </div>
          <QuoteForm defaultJobType={config.defaultJobType} />
        </div>
      </section>
    </div>
  );
}

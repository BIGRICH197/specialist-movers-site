import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { HeroVisual } from "@/components/HeroVisual";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { ProcessStepsGrid } from "@/components/ProcessStepsGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { SectionReveal } from "@/components/SectionReveal";
import { getServiceProcessSteps } from "@/lib/process-steps-with-images";
import { houseMovingProcess } from "@/lib/moving-process";
import { googleReviewsUrl, statsStrip } from "@/lib/homepage-copy";
import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import { halfPhotoWrap } from "@/lib/photo-layout";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

type Props = {
  config: NicheServicePageConfig;
};

export function NicheServicePage({ config }: Props) {
  const crumbs: Crumb[] = config.breadcrumbs.map((c) => ({
    label: c.label,
    href: c.href,
  }));
  const processSteps =
    config.processTitle === houseMovingProcess.title
      ? getServiceProcessSteps("house-moving")
      : houseMovingProcess.steps.map((s) => ({ title: s.title, body: s.body }));

  return (
    <div className="bg-brand-white">
      <FaqPageJsonLd items={config.faqs} />
      <ServiceHeroWithQuote
        topNav={<Breadcrumbs items={crumbs} light />}
        eyebrow={
          <p className="inline-flex w-fit max-w-[95%] rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow">
            {config.eyebrow}
          </p>
        }
        title={
          <h1 className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:leading-[1.12]">
            {config.h1}
          </h1>
        }
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/85">
            {config.lead}
          </p>
        }
        subline={
          <p className="inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90">
            {config.subline}
          </p>
        }
        photo={
          <HeroVisual
            variant="moving"
            className={halfPhotoWrap}
            photoSrc={config.heroPhoto}
            photoAlt={config.heroPhotoAlt}
            overlayCaption={config.heroOverlayCaption}
            priority
          />
        }
        quote={<QuoteForm defaultJobType={config.defaultJobType} />}
      />

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
          <HeroVisual
            variant="moving"
            photoSrc={config.heroPhoto}
            photoAlt={config.heroPhotoAlt}
            className="w-full"
          />
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

      {config.processTitle ? (
        <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {config.processTitle}
          </h2>
          <ProcessStepsGrid steps={processSteps} />
        </SectionReveal>
      ) : null}

      <SectionReveal className="border-t border-brand-purple/10 py-12 container-px">
        <h2 className="font-heading text-xl text-brand-purple">Related services</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {config.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 sm:py-14">
        <div className="mx-auto max-w-3xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {config.faqHeading}
          </h2>
          <dl className="mt-8 space-y-6">
            {config.faqs.map((item) => (
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

      <section className="border-t border-brand-purple/10 bg-brand-purple py-12 text-white sm:py-16">
        <div className="mx-auto max-w-3xl text-center container-px">
          <h2 className="font-heading text-2xl sm:text-3xl">Get your free quote today</h2>
          <p className="mt-4 text-white/85">
            Use the quote form at the top of this page and we will call you back within 15 minutes.
            Or call{" "}
            <a href={`tel:${phoneNumber}`} className="font-bold text-brand-yellow hover:underline">
              {phoneDisplay}
            </a>
            .
          </p>
          <a
            href="#quote"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-yellow px-8 py-3 font-heading text-sm font-bold uppercase text-brand-purple ring-1 ring-white/25 transition hover:brightness-[1.05]"
          >
            Back to quote form
          </a>
        </div>
      </section>
    </div>
  );
}

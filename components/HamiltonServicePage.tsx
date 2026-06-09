import Link from "next/link";

import { Check, MapPin } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";

import { GoogleReviewsBand } from "@/components/GoogleReviewsBand";

import { HeroVisual } from "@/components/HeroVisual";

import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";

import { PianoGallerySection } from "@/components/PianoGallerySection";

import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";

import { ProcessStepsGrid } from "@/components/ProcessStepsGrid";

import { CleaningBookingForm } from "@/components/CleaningBookingForm";

import { QuoteForm } from "@/components/QuoteForm";

import { SectionReveal } from "@/components/SectionReveal";

import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";

import type { HamiltonPageConfig } from "@/lib/hamilton-pages";

import { phoneDisplay, phoneNumber } from "@/lib/site-data";



type Props = {

  config: HamiltonPageConfig;

};



export function HamiltonServicePage({ config }: Props) {

  const breadcrumbItems = [

    { label: "Home", href: "/" },

    { label: config.parentLabel, href: config.parentHref },

    { label: config.h1 },

  ];



  return (

    <div className="bg-brand-white">

      <BreadcrumbJsonLd items={breadcrumbItems} />

      {config.faqs && config.faqs.length > 0 ? (

        <FaqPageJsonLd items={config.faqs} />

      ) : null}



      <ServiceHeroWithQuote

        topNav={

          <nav className="flex flex-wrap gap-2 text-xs font-semibold text-white/75">

            <Link href="/" className="hover:text-brand-yellow">

              Home

            </Link>

            <span aria-hidden>/</span>

            <Link href={config.parentHref} className="hover:text-brand-yellow">

              {config.parentLabel}

            </Link>

            <span aria-hidden>/</span>

            <span className="text-brand-yellow">Hamilton</span>

          </nav>

        }

        eyebrow={

          <p className="inline-flex w-fit max-w-[95%] rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow">

            Hamilton · Waikato base

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

        meta={

          config.baseSlug === "piano-movers" ? (

            <div className="flex flex-wrap gap-2">

              <Link

                href="/piano-movers/auckland"

                className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"

              >

                Auckland piano page →

              </Link>

            </div>

          ) : null

        }

        photo={

          <HeroVisual

            variant="moving"

            photoSrc={config.heroPhoto}

            photoAlt={config.heroPhotoAlt}

            priority

          />

        }

        quote={

          config.baseSlug === "cleaning-services" ? (

            <CleaningBookingForm />

          ) : (

            <QuoteForm defaultJobType={config.defaultJobType} />

          )

        }

      />



      {config.showPianoPartners ? (

        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">

          <PianoPartnerMarquee />

        </div>

      ) : null}



      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">

        <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">

          {config.paragraphs.map((p, i) => (

            <p key={i}>{p}</p>

          ))}

        </div>



        <NumberedInfoGrid

          className="mt-8"

          columns={2}

          items={config.highlightCards.map((item) => ({

            title: item.title,

            body: item.body,

          }))}

        />



        <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="font-heading text-xl text-brand-purple">What we handle</h2>

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



        <div className="mt-8 rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6">

          <h2 className="font-heading text-lg text-brand-purple">Why choose us in Hamilton</h2>

          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">

            {config.whyChooseCopy}

          </p>

        </div>



        {config.processSteps && config.processSteps.length > 0 ? (

          <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="font-heading text-2xl text-brand-purple">

              {config.processTitle ?? "How we run your move"}

            </h2>

            <ProcessStepsGrid steps={config.processSteps} className="mt-6" />

          </div>

        ) : null}



        <GoogleReviewsBand

          slot={`hamilton-${config.baseSlug}`}

          piano={config.baseSlug === "piano-movers"}

        />



        {config.faqs && config.faqs.length > 0 ? (

          <div className="mt-10">

            <h2 className="font-heading text-2xl text-brand-purple">Common questions</h2>

            <dl className="mt-6 space-y-4">

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

          </div>

        ) : null}



        <div className="mt-8 flex flex-wrap gap-3">

          {config.extraLinks?.map((link) => (

            <Link

              key={link.href}

              href={link.href}

              className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"

            >

              {link.label}

            </Link>

          ))}

          <Link

            href={config.parentHref}

            className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"

          >

            Auckland service page

          </Link>

          <Link

            href={config.locationHref}

            className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"

          >

            <MapPin className="h-3.5 w-3.5" aria-hidden />

            {config.locationLabel}

          </Link>

        </div>

      </SectionReveal>



      {config.showPianoGallery ? <PianoGallerySection /> : null}



      <section className="border-t border-brand-purple/10 bg-brand-purple py-12 text-white sm:py-16">

        <div className="mx-auto max-w-3xl text-center container-px">

          <h2 className="font-heading text-2xl sm:text-3xl">Get your Hamilton quote</h2>

          <p className="mt-4 text-white/85">

            Use the form above or call{" "}

            <a href={`tel:${phoneNumber}`} className="font-bold text-brand-yellow hover:underline">

              {phoneDisplay}

            </a>

            . We call back within 15 minutes.

          </p>

        </div>

      </section>

    </div>

  );

}


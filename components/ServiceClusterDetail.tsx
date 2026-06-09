import Link from "next/link";

import { Check } from "lucide-react";

import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";

import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";

import { HeroVisual } from "@/components/HeroVisual";

import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";

import { QuoteForm } from "@/components/QuoteForm";

import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

import { SectionReveal } from "@/components/SectionReveal";

import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";

import {

  ServiceBottomCta,

  ServiceFaqSection,

  ServiceProcessSection,

  ServiceRelatedLink,

  ServiceRelatedLinksSection,

  ServiceWhyChooseSection,

} from "@/components/ServiceLandingSections";

import { getClusterSeoExtension } from "@/lib/cluster-seo";

import type { ServiceClusterItem } from "@/lib/service-clusters";

import {
  getServiceHeroDetail,
  getServiceHeroOverlayCaption,
  serviceHeroSubline,
} from "@/lib/service-hero-detail";

import { getServiceProcessSteps } from "@/lib/process-steps-with-images";

import { resolveServiceLink } from "@/lib/service-links";

import { getDistinctAboutPhoto, getServicePhoto } from "@/lib/site-photos";



type Props = {

  item: ServiceClusterItem;

  hubLabel: string;

  hubHref: string;

  photoSlug?: string;

};



function clusterMomentSlug(slug: string): string {

  if (slug === "local-moving" || slug === "regional-moving") return "house-moving";

  if (slug.includes("storage") || slug === "piano-storage") return "storage";

  if (slug === "international-moving") return "international-moving";

  return "house-moving";

}



export function ServiceClusterDetail({

  item,

  hubLabel,

  hubHref,

  photoSlug = item.slug,

}: Props) {

  const seo = getClusterSeoExtension(item.slug);

  const breadcrumbs: Crumb[] = [

    { label: "Home", href: "/" },

    { label: "Services", href: "/services" },

    { label: hubLabel, href: hubHref },

    { label: item.title },

  ];



  const heroPhoto = getServicePhoto(photoSlug) ?? getServicePhoto("house-moving");
  const aboutPhoto = getDistinctAboutPhoto(photoSlug, heroPhoto ?? "");

  const faqs = seo?.faqs ?? [];

  const momentKey = `services/${clusterMomentSlug(item.slug)}`;

  const processSteps =

    seo && seo.processSteps.length > 0

      ? seo.processSteps

      : getServiceProcessSteps(clusterMomentSlug(item.slug));

  const reviewSlot = `cluster-${item.slug}`;

  const isPiano = item.slug.includes("piano");



  return (

    <div className="bg-brand-white">

      {faqs.length > 0 ? <FaqPageJsonLd items={faqs} /> : null}

      <ServiceHeroWithQuote

        heroVariant={isPiano ? "piano" : "moving"}

        topNav={<Breadcrumbs items={breadcrumbs} light />}

        title={

          <h1 className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:leading-[1.12]">

            {item.title}

          </h1>

        }

        lead={

          <p className="max-w-2xl text-base leading-relaxed text-white/85">

            {item.description}

          </p>

        }

        heroDetail={getServiceHeroDetail(item.slug)}

        subline={

          <p className="inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90">

            {serviceHeroSubline}

          </p>

        }

        meta={

          <p className="text-sm text-white/75">

            <Link href="/#whats-included" className="underline hover:text-white">

              See what&apos;s included in every move →

            </Link>

          </p>

        }

        photo={

          heroPhoto ? (

            <HeroVisual

              variant={isPiano ? "piano" : "moving"}

              photoSrc={heroPhoto}

              photoAlt={`${item.title}, Specialist Movers`}

              overlayCaption={getServiceHeroOverlayCaption(photoSlug)}

              priority

            />

          ) : undefined

        }

        quote={<QuoteForm defaultJobType={item.defaultJobType} />}

      />



      <ServiceTrustindexBand />



      <PagePhotoMomentStrip momentKey={momentKey} tone="purple" useQuoteAnchor={false} />



      {seo && seo.bodyParagraphs.length > 0 ? (

        <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">

          <div className="mx-auto max-w-7xl container-px">

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">

              <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">

                {seo.bodyParagraphs.map((p) => (

                  <p key={p.slice(0, 48)}>{p}</p>

                ))}

              </div>

              {aboutPhoto ? (

                <HeroVisual

                  photoSrc={aboutPhoto}

                  photoAlt={`${item.title}, Specialist Movers team`}

                  className="w-full"

                />

              ) : null}

            </div>

          </div>

        </SectionReveal>

      ) : null}



      <ServiceWhyChooseSection
        title="Why Specialist Movers"
        body={item.whyChooseCopy}
        showStats={false}
      />

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl container-px">
          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">What&apos;s included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {item.includedBullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-brand-purple/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>



      <ServiceProcessSection

        title={seo?.processTitle ?? "How we run your move"}

        steps={processSteps}

        reviewSlot={`${reviewSlot}-process`}

        piano={isPiano}

      />



      <ServiceRelatedLinksSection>

        {item.relatedSlugs.map((slug) => {

          const link = resolveServiceLink(slug);

          if (!link) return null;

          return (

            <ServiceRelatedLink key={slug} href={link.href}>

              {link.label}

            </ServiceRelatedLink>

          );

        })}

      </ServiceRelatedLinksSection>



      <ServiceFaqSection

        heading="Common questions"

        faqs={faqs}

        reviewSlot={`${reviewSlot}-faq`}

        piano={isPiano}

      />



      <ServiceBottomCta defaultJobType={item.defaultJobType} />

    </div>

  );

}


import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { HamiltonServicePage } from "@/components/HamiltonServicePage";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getHamiltonPageConfig, getHamiltonStaticParams } from "@/lib/hamilton-pages";
import { getServicePhoto } from "@/lib/site-photos";
import { getServiceLandingConfig, isServiceLandingSlug } from "@/lib/service-landings";
import { getServiceSeoExtension } from "@/lib/service-seo-extensions";
import { faqsForService } from "@/lib/service-faqs";
import { hardToShiftPageHeroPhoto } from "@/lib/hard-to-shift-gallery";
import { legacyMetaForServiceSlug } from "@/lib/legacy-meta-descriptions";
import { legacyPathForServiceSlug } from "@/lib/legacy-auckland-urls";
import { absoluteTitleForServiceSlug } from "@/lib/seo-meta-for-slug";
import { services } from "@/lib/site-data";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...getHamiltonStaticParams()];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const hamilton = getHamiltonPageConfig(params.slug);
  if (hamilton) {
    return buildPageMetadata({
      title: { absolute: hamilton.metaTitle },
      description: hamilton.metaDescription,
      path: hamilton.path,
    });
  }

  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  const landing = getServiceLandingConfig(params.slug);
  if (landing) {
    const absTitle = absoluteTitleForServiceSlug(params.slug);
    return buildPageMetadata({
      title: { absolute: absTitle ?? `${landing.h1} | Specialist Movers` },
      description: legacyMetaForServiceSlug(params.slug) ?? landing.lead,
      path: landing.path,
    });
  }
  const legacyPath = legacyPathForServiceSlug(params.slug);
  const legacyDescription = legacyMetaForServiceSlug(params.slug);
  const heroH1 = getServiceHeroH1(params.slug, "Auckland");
  const absTitle = absoluteTitleForServiceSlug(params.slug);
  return buildPageMetadata({
    title: absTitle ? { absolute: absTitle } : heroH1,
    description:
      legacyDescription ??
      `${service.description} Trusted ${service.title.toLowerCase()} specialists. Auckland base. Free quote. Callback in 15 minutes.`,
    path: legacyPath ?? `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const hamilton = getHamiltonPageConfig(params.slug);
  if (hamilton) {
    return <HamiltonServicePage config={hamilton} />;
  }

  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  if (isServiceLandingSlug(params.slug)) {
    const config = getServiceLandingConfig(params.slug);
    if (!config) notFound();
    return <ServiceLandingPage config={config} />;
  }

  const seo = getServiceSeoExtension(params.slug);

  const heroH1 = getServiceHeroH1(service.slug, "Auckland");

  return (
    <ServicePageTemplate
      title={heroH1}
      description={service.description}
      includedBullets={service.includedBullets}
      whyChooseCopy={service.whyChooseCopy}
      relatedSlugs={service.relatedSlugs}
      defaultJobType={service.defaultJobType}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: heroH1 },
      ]}
      heroPhoto={
        params.slug === "hard-to-shift"
          ? hardToShiftPageHeroPhoto
          : getServicePhoto(service.slug)
      }
      heroPhotoAlt={`${service.title} , Specialist Movers Auckland`}
      hamiltonBaseSlug={service.slug}
      useCleaningQuoteForm={params.slug === "cleaning-services"}
      useHardToShiftForm={params.slug === "hard-to-shift"}
      bodyParagraphs={seo?.bodyParagraphs}
      faqs={seo?.faqs ?? faqsForService(params.slug)}
      processTitle={seo?.processTitle}
      processSteps={seo?.processSteps}
      extraRelatedLinks={
        params.slug === "international-moving"
          ? [
              {
                label: "Moving to Australia",
                href: "/international-moving/moving-to-australia",
              },
            ]
          : undefined
      }
      schemaPath={legacyPathForServiceSlug(params.slug) ?? `/services/${params.slug}`}
    />
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { HamiltonServicePage } from "@/components/HamiltonServicePage";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getHamiltonPageConfig, getHamiltonStaticParams } from "@/lib/hamilton-pages";
import { getServicePhoto } from "@/lib/site-photos";
import { getServiceLandingConfig, isServiceLandingSlug } from "@/lib/service-landings";
import { legacyPathForServiceSlug } from "@/lib/legacy-auckland-urls";
import { services } from "@/lib/site-data";

export function generateStaticParams() {
  return [...services.map((s) => ({ slug: s.slug })), ...getHamiltonStaticParams()];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const hamilton = getHamiltonPageConfig(params.slug);
  if (hamilton) {
    return buildPageMetadata({
      title: hamilton.metaTitle,
      description: hamilton.metaDescription,
      path: hamilton.path,
    });
  }

  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  const landing = getServiceLandingConfig(params.slug);
  if (landing) {
    return buildPageMetadata({
      title: landing.h1,
      description: landing.lead,
      path: landing.path,
    });
  }
  const legacyPath = legacyPathForServiceSlug(params.slug);
  return buildPageMetadata({
    title: `${service.title} Auckland`,
    description: `${service.description} Trusted ${service.title.toLowerCase()} specialists. Auckland base. Free quote. Callback in 15 minutes.`,
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

  return (
    <ServicePageTemplate
      title={service.title}
      description={service.description}
      includedBullets={service.includedBullets}
      whyChooseCopy={service.whyChooseCopy}
      relatedSlugs={service.relatedSlugs}
      defaultJobType={service.defaultJobType}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: service.title },
      ]}
      heroPhoto={getServicePhoto(service.slug)}
      heroPhotoAlt={`${service.title} , Specialist Movers Auckland`}
      hamiltonBaseSlug={service.slug}
      useCleaningQuoteForm={params.slug === "cleaning-services"}
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
    />
  );
}

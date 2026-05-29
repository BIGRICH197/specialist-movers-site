import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getServicePhoto } from "@/lib/site-photos";
import { getServiceLandingConfig, isServiceLandingSlug } from "@/lib/service-landings";
import { services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  const landing = getServiceLandingConfig(params.slug);
  if (landing) {
    return {
      title: landing.h1,
      description: landing.lead,
    };
  }
  return {
    title: `${service.title} Auckland & Waikato`,
    description: `${service.description} Trusted ${service.title.toLowerCase()} specialists with Auckland and Hamilton bases , servicing Auckland and the Waikato.`,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
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
      pageMomentKey={`services/${service.slug}`}
    />
  );
}

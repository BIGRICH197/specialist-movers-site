import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getPianoPhoto } from "@/lib/site-photos";
import { pianoServices } from "@/lib/site-data";

export function generateStaticParams() {
  return pianoServices
    .filter((s) => s.slug !== "piano-tuning")
    .map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = pianoServices.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.title} by Auckland's dedicated specialist piano moving team.`,
  };
}

export default function PianoSlugPage({ params }: { params: { slug: string } }) {
  const service = pianoServices.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <ServicePageTemplate
      title={service.title}
      description="Fully insured specialist piano transport with expert handling and communication from pickup to placement."
      includedBullets={service.includedBullets}
      whyChooseCopy={service.whyChooseCopy}
      relatedSlugs={service.relatedSlugs}
      defaultJobType={service.defaultJobType}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Piano moving", href: "/piano-movers" },
        { label: service.title },
      ]}
      heroPhoto={getPianoPhoto(service.slug)}
      heroPhotoAlt={`${service.title} , Specialist Movers`}
      hamiltonBaseSlug="piano-movers"
    />
  );
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { getServiceSeoExtension } from "@/lib/service-seo-extensions";
import { faqsForService } from "@/lib/service-faqs";
import { getPianoPhoto } from "@/lib/site-photos";
import { pianoServices } from "@/lib/site-data";

const RESERVED_PIANO_SLUGS = new Set(["auckland", "hamilton"]);

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
  if (RESERVED_PIANO_SLUGS.has(params.slug)) return {};
  const service = pianoServices.find((s) => s.slug === params.slug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.title,
    description: pianoMetaDescription(service.slug, service.title),
    path: `/piano-movers/${service.slug}`,
  });
}

function pianoMetaDescription(slug: string, title: string): string {
  const bySlug: Record<string, string> = {
    "grand-piano":
      "Grand piano moving in Auckland. Specialist tilt, board, padding, and strapping. Shrink wrap and insured transport. Free quote.",
    "upright-piano":
      "Upright piano movers Auckland. Padded blankets, shrink wrap, and specialist straps. Local and long-distance moves. Free quote.",
    "international-piano":
      "International piano shipping from Auckland. Crating, customs coordination, and door-to-door delivery. Specialist Movers. Free quote.",
  };
  return bySlug[slug] ?? `${title} by Auckland's dedicated specialist piano moving team. Free quote.`;
}

export default function PianoSlugPage({ params }: { params: { slug: string } }) {
  if (RESERVED_PIANO_SLUGS.has(params.slug)) notFound();
  const service = pianoServices.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const seo = getServiceSeoExtension(service.slug);

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
      hamiltonBaseSlug={service.slug}
      overlayCaptionSlug={service.slug}
      momentKey={`piano-movers/${service.slug}`}
      heroVariant="piano"
      bodyParagraphs={seo?.bodyParagraphs}
      faqs={seo?.faqs ?? faqsForService(service.slug)}
      processTitle={seo?.processTitle}
      processSteps={seo?.processSteps}
    />
  );
}

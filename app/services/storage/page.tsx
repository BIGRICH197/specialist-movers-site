import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legacyMetaDescription } from "@/lib/legacy-meta-descriptions";
import { seoAbsoluteTitles } from "@/lib/seo-meta-titles";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import { Clock, Container, Moon, Package, Piano, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { SectionReveal } from "@/components/SectionReveal";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { JsonLd } from "@/components/JsonLd";
import { storageHub, storageServices } from "@/lib/service-clusters";
import { siteUrl } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: seoAbsoluteTitles.storage },
  description: legacyMetaDescription("storage"),
  path: "/services/storage",
});

/** Positional, one per entry in storageServices , keep the order in step. */
const icons = [Clock, Package, Container, Truck, Moon, Piano] as const;

const faqs = [
  {
    q: "How much does storage cost in Auckland?",
    a: "Storage is quoted by volume and duration rather than charged by the hour like the move itself, so the figure depends on how much is going in and how long it stays. We confirm it in writing before anything is collected. The hourly rates and callout fees for the moving side are published in full on our pricing page.",
  },
  {
    q: "What is the difference between container storage and short-term storage?",
    a: "Container storage seals your goods into their own container that is opened on intake and on delivery and not in between, which suits a whole household sitting for weeks or months. Short-term storage keeps your goods reachable, which is the better answer for a part load, a few boxes, or when you know you will need to pull something out.",
  },
  {
    q: "How long can I store my things for?",
    a: "From a single night between move days through to months or years. Overnight and in-transit storage cover multi-day moves, short-term suits settlement gaps, and container or long-term storage handles renovations, overseas postings, and builds that have run over.",
  },
  {
    q: "Do you store pianos?",
    a: "Yes, and not on a general shelf. Pianos are stored with the same crews and equipment that move them, which matters because how an instrument is wrapped and stood affects the condition it comes out in.",
  },
  {
    q: "Are my goods insured while in storage?",
    a: "We carry $2,000,000 of public liability cover and our crews are licensed and insured. Household goods are held at owner's risk under the Contract and Commercial Law Act 2017, which is standard across the industry, and transit cover can be arranged through our broker on request. Pianos carry $2,000 of cover as standard.",
  },
  {
    q: "Where do you store things?",
    a: "At our own depots, Wairau Valley in Auckland and our Hamilton base. Your goods stay with the company that moved them rather than being handed to a third-party yard.",
  },
  {
    q: "Can you move my things into storage and out again?",
    a: "That is the usual arrangement. The same crew that packs and loads takes it into storage and brings it back out, so nobody has to re-learn how your things went in. Storage is quoted as part of the move rather than as a separate job you have to coordinate.",
  },
];

const storageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Storage, Auckland and Hamilton",
  serviceType: "Household and piano storage",
  provider: { "@id": `${siteUrl}/#organization` },
  areaServed: [
    { "@type": "City", name: "Auckland" },
    { "@type": "City", name: "Hamilton" },
  ],
  url: `${siteUrl}/services/storage`,
  description:
    "Household, container and piano storage between moves, from our Wairau Valley and Hamilton depots. Quoted by volume and duration.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Storage options",
    itemListElement: storageServices.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.excerpt,
        url: `${siteUrl}${item.href ?? `${storageHub.path}/${item.slug}`}`,
      },
    })),
  },
};

export default function StorageHubPage() {
  return (
    <>
      <ServiceClusterHub
        eyebrow={storageHub.eyebrow}
        title={getServiceHeroH1("storage-hub", "Auckland")}
        description={storageHub.description}
        basePath={storageHub.path}
        items={storageServices}
        icons={[...icons]}
        allServicesHref="/services/moving"
        allServicesLabel="Moving by distance"
        hamiltonBaseSlug="storage"
      />

      <SectionReveal className="mx-auto max-w-4xl py-12 container-px sm:py-14">
        {/* Answer-shaped block first: this is the passage an assistant lifts. */}
        <div className="rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 sm:p-8">
          <h2 className="font-heading text-xl text-brand-purple">The short answer</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-purple/85">
            <li>
              <strong className="text-brand-purple">What we store:</strong> household furniture and
              boxed goods, whole-house container loads, and pianos, at our Wairau Valley and Hamilton
              depots.
            </li>
            <li>
              <strong className="text-brand-purple">How long:</strong> one night between move days
              through to months or years.
            </li>
            <li>
              <strong className="text-brand-purple">How it is priced:</strong> by volume and
              duration, quoted in writing before collection. Storage is not charged hourly the way
              the move itself is.
            </li>
            <li>
              <strong className="text-brand-purple">Who handles it:</strong> the same crew that packs
              and loads your move, so nothing is handed to a third party mid-job.
            </li>
          </ul>
        </div>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Which kind of storage do you actually need?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            Most people arrive here because two dates did not line up. Settlement moved, the build
            ran over, or the new tenancy starts a fortnight after the old one ends. The right answer
            depends far more on how long the gap is, and whether you need to reach your things, than
            on how much you own.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            For a gap of a few weeks where you might need to pull out a box of documents or the
            winter clothes,{" "}
            <strong className="text-brand-purple">short-term storage</strong> is the sensible choice.
            Your goods stay reachable and there is no long minimum stay.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            For a whole household that is going to sit for months,{" "}
            <strong className="text-brand-purple">container storage</strong> usually wins. Your goods
            are loaded into their own container, sealed, and stored at our depot. It is opened on
            intake and on delivery and not in between, so your furniture is handled twice rather than
            every time something around it moves. Less handling is the single biggest thing that
            keeps furniture unmarked.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            If the move itself spans more than one day, or runs between islands,{" "}
            <strong className="text-brand-purple">overnight</strong> and{" "}
            <strong className="text-brand-purple">in-transit storage</strong> are already part of the
            plan rather than an extra you arrange separately. And{" "}
            <strong className="text-brand-purple">pianos</strong> are stored by the crews who move
            them, with piano boards and proper wrapping, not stood in the corner of a general
            warehouse.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            How storage is priced
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            Storage is quoted by volume and duration. That is different from the moving side, which
            is charged hourly with a callout fee by distance, and which we publish in full on our{" "}
            <a className="font-semibold text-brand-purple underline" href="/pricing">
              pricing page
            </a>
            . We do not publish a per-week storage rate because the honest figure depends on how many
            containers, or how much floor space, your goods actually take. Guessing that from a
            bedroom count is how people end up with a bill that does not match the quote.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            On three bedrooms and up we come and look before quoting. Whatever we quote you get in
            writing, and it does not move afterwards. If a part load would be cheaper than a
            container, we will say so.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Storage questions we get asked
          </h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-heading text-base text-brand-purple">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-purple/85">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </SectionReveal>

      <PagePhotoMomentStrip momentKey="services" />

      <FaqPageJsonLd items={faqs} />
      <JsonLd data={storageSchema} />
    </>
  );
}

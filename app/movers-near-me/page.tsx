import type { Metadata } from "next";
import Link from "next/link";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import {
  aucklandCallout,
  aucklandFromHourly,
  hamiltonCallouts,
  hamiltonFromHourly,
  outerTiers,
} from "@/lib/pricing-page-data";
import { buildPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

const PATH = "/movers-near-me";

export const metadata: Metadata = buildPageMetadata({
  title: {
    absolute: "Movers Near Me | Auckland & Waikato | Specialist Movers",
  },
  description:
    "Looking for movers near you? We run from depots in Wairau Valley, Auckland and Hamilton, 7 days a week. How close we are sets your callout fee, and every zone is published here.",
  path: PATH,
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Movers near me" }];

/**
 * "Movers near me" is a proximity question, not a service question. The honest
 * answer is where our trucks actually start from and what the distance costs,
 * so this page leads with the depots and the callout zones rather than
 * repeating the service copy that already lives on the service pages.
 */
const faqs = [
  {
    q: "Where are you based?",
    a: "Two depots. Auckland is 8/186 Target Road, Wairau Valley on the North Shore, and we run a second base in Hamilton. Crews and trucks start from whichever depot is closer to you, which is what keeps the callout fee down.",
  },
  {
    q: "Do you cover my area?",
    a: "We cover all of Auckland and the Waikato, and we take wider North Island work from Taupo up to Cape Reinga. If you are outside Auckland and the Waikato it is still worth asking, because long-distance legs are quoted individually rather than turned away.",
  },
  {
    q: "How does distance affect what I pay?",
    a: `Distance shows up as a one-off callout fee rather than a higher hourly rate. Close to the depot it is $${aucklandCallout.twoMovers.ex} + GST for two movers. Further out, both the callout and the hourly rate step up into a zone, and all of those figures are published on our pricing page.`,
  },
  {
    q: "How quickly can you get to me?",
    a: "We run 7 days a week, 9am to 7pm, and can often cover short-notice jobs in the same week. Fridays and month-end are the first to fill, and Tuesday is both the quietest and the cheapest day.",
  },
  {
    q: "Are you actually local, or a franchise?",
    a: "Local. Specialist Movers is KB Logistics Limited, founded in 2023, running our own trucks and our own crews from our own depots. The crew that quotes your job is the crew that turns up to it.",
  },
  {
    q: "Do you charge more if I am far from your depot?",
    a: "Yes, and we publish exactly how much rather than adding it at invoice time. The callout fee rises with distance and the outer zones carry a higher hourly rate, because the truck and crew are tied up travelling. Everything is quoted in writing before you book.",
  },
];

const nearMeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Moving services near you, Auckland and Waikato",
  serviceType: "Furniture removals and house moving",
  provider: { "@id": `${siteUrl}/#organization` },
  url: `${siteUrl}${PATH}`,
  description:
    "Movers operating from depots in Wairau Valley, Auckland and Hamilton, covering Auckland, the Waikato and the wider North Island 7 days a week.",
  areaServed: [
    { "@type": "City", name: "Auckland" },
    { "@type": "City", name: "Hamilton" },
    { "@type": "AdministrativeArea", name: "Waikato" },
  ],
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
};

const th =
  "border-b border-brand-purple/15 px-4 py-3 font-heading text-xs uppercase tracking-wider text-brand-purple/70";
const td = "border-b border-brand-purple/10 px-4 py-3 text-brand-purple/85";

export default function MoversNearMePage() {
  return (
    <>
      <PageHero
        eyebrow="Auckland and Waikato, 7 days"
        title="Movers near me"
        description="Two depots, our own trucks, and a callout fee that depends on how far you are from them. Here is exactly where we start from and what the distance costs."
        breadcrumbs={breadcrumbs}
      />

      <SectionReveal className="mx-auto max-w-4xl py-12 container-px sm:py-14">
        {/* Answer-shaped block first: this is the passage an assistant lifts. */}
        <div className="rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 sm:p-8">
          <h2 className="font-heading text-xl text-brand-purple">The short answer</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-purple/85">
            <li>
              <strong className="text-brand-purple">Auckland depot:</strong> 8/186 Target Road,
              Wairau Valley, North Shore.
            </li>
            <li>
              <strong className="text-brand-purple">Hamilton depot:</strong> a second base serving
              Hamilton and the Waikato.
            </li>
            <li>
              <strong className="text-brand-purple">We cover:</strong> all of Auckland and the
              Waikato, plus wider North Island work from Taupo to Cape Reinga.
            </li>
            <li>
              <strong className="text-brand-purple">Hours:</strong> 7 days, 9am to 7pm, with a
              callback usually inside 15 minutes.
            </li>
            <li>
              <strong className="text-brand-purple">From:</strong> ${aucklandFromHourly.ex} + GST per
              hour in Auckland and ${hamiltonFromHourly.ex} + GST in Hamilton, for two movers and a
              truck, plus a callout fee by distance.
            </li>
          </ul>
        </div>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            &ldquo;Near me&rdquo; is really a question about the callout fee
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            Every mover in Auckland will tell you they cover Auckland. What actually differs is where
            the truck starts the day, because that is what you end up paying for. We charge it as a
            single callout fee rather than burying it in the hourly rate, so you can see it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            If you are close to the Wairau Valley depot, the callout is ${aucklandCallout.twoMovers.ex}{" "}
            + GST for two movers and a truck. As you get further out, both the callout and the hourly
            rate step into a zone:
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-purple/15 bg-white shadow-sm">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className={th}>Zone</th>
                  <th className={th}>2 movers, per hour</th>
                  <th className={th}>Callout</th>
                  <th className={th}>Areas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={td}>Auckland metro</td>
                  <td className={td}>from ${aucklandFromHourly.ex} + GST</td>
                  <td className={td}>${aucklandCallout.twoMovers.ex} + GST</td>
                  <td className={td}>Central, North Shore, West and East Auckland</td>
                </tr>
                {outerTiers.map((tier) => (
                  <tr key={tier.label}>
                    <td className={td}>{tier.label}</td>
                    <td className={td}>${tier.twoMovers.ex} + GST</td>
                    <td className={td}>${tier.callout.ex} + GST</td>
                    <td className={td}>{tier.suburbs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-base leading-relaxed text-brand-purple/85">
            Hamilton runs on its own zones from the Hamilton base, with callouts of{" "}
            {hamiltonCallouts.map((zone, i) => (
              <span key={zone.zone}>
                {i > 0 ? ", " : ""}
                ${zone.fee.ex} + GST in Zone {zone.zone}
              </span>
            ))}
            . Every one of these figures, and the full rate table by day of the week, is on our{" "}
            <Link className="font-semibold text-brand-purple underline" href="/pricing">
              pricing page
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Find your suburb
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            We have a page for every Auckland suburb and Waikato town we cover, with the local detail
            that actually matters, parking, access, and the usual traffic on moving day.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              className="rounded-full border border-brand-purple/20 bg-white px-5 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"
              href="/locations"
            >
              All areas we serve
            </Link>
            <Link
              className="rounded-full border border-brand-purple/20 bg-white px-5 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"
              href="/locations/hamilton"
            >
              Hamilton and Waikato
            </Link>
            <Link
              className="rounded-full border border-brand-purple/20 bg-white px-5 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40"
              href="/contact"
            >
              Depot addresses and hours
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Questions people ask before they call
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

        <div className="mt-12 rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 sm:p-8">
          <h2 className="font-heading text-xl text-brand-purple">Get a price for your address</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            Tell us where you are moving from and to and we will confirm the zone, the callout, and
            the rate for your day. Usually inside 15 minutes.
          </p>
          <Link
            className="mt-5 inline-flex rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-purple/90"
            href="/book"
          >
            Get your price now
          </Link>
        </div>
      </SectionReveal>

      <FaqPageJsonLd items={faqs} />
      <JsonLd data={nearMeSchema} />
    </>
  );
}

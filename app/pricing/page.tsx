import type { Metadata } from "next";
import Link from "next/link";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageUpdatedStamp } from "@/components/PageUpdatedStamp";
import { SectionReveal } from "@/components/SectionReveal";
import { contentUpdatedLabelFor } from "@/lib/content-dates";
import { fromPrice, typicalThreeBed } from "@/lib/pricing-copy";
import {
  aucklandCallout,
  aucklandDayRates,
  aucklandFromHourly,
  cleaningRows,
  fixedPriceRows,
  hamiltonCallouts,
  hamiltonDayRates,
  hamiltonFromHourly,
  jobDurations,
  outerTiers,
  pianoRows,
  pianoStairsPerFlight,
  type Rate,
} from "@/lib/pricing-page-data";
import { buildPageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site-config";

const PATH = "/pricing";

export const metadata: Metadata = buildPageMetadata({
  title: {
    absolute: "Moving Prices Auckland & Hamilton | Specialist Movers",
  },
  description: `Our full moving rates. Two movers and a truck from $${aucklandFromHourly.ex} + GST per hour in Auckland ($${aucklandFromHourly.incl} incl GST), with hourly rates by day, callout fees, packing, exit cleaning and piano prices.`,
  path: PATH,
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Pricing" }];

/**
 * Every price on this page is quoted twice: the retail figure a customer pays
 * and the ex-GST figure the rest of the site and the trade quote in. Showing
 * one without the other is how a published rate ends up feeling like a bait
 * and switch at invoice time.
 */
/**
 * Whole dollars stay whole; anything with cents shows both of them. The
 * out-of-town rates are set incl GST, so their ex-GST side is $156.52 and
 * $191.30, and the default formatter would print that second one as "191.3".
 */
function money(value: number): string {
  return value.toLocaleString("en-NZ", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function Money({ value, className }: { value: Rate; className?: string }) {
  return (
    <span className={className}>
      <span className="font-semibold text-brand-purple">${money(value.incl)}</span>
      <span className="whitespace-nowrap text-brand-purple/60"> / ${money(value.ex)} ex</span>
    </span>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-heading text-2xl text-brand-purple sm:text-3xl"
    >
      {children}
    </h2>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-purple/15 bg-white shadow-sm">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

const th = "border-b border-brand-purple/15 px-4 py-3 font-heading text-xs uppercase tracking-wider text-brand-purple/70";
const td = "border-b border-brand-purple/10 px-4 py-3 text-brand-purple/85";

const faqs = [
  {
    q: "How much do movers cost in Auckland?",
    a: `Two movers and a truck cost from $${aucklandFromHourly.incl} an hour including GST ($${aucklandFromHourly.ex} + GST) on our cheapest day, plus a one-off callout fee of $${aucklandCallout.twoMovers.incl} incl GST. A typical three-bedroom move works out around ${typicalThreeBed.auckland} + GST all in. The hourly rate changes by day of the week, so midweek moves cost less than Friday or Saturday.`,
  },
  {
    q: "What is the cheapest day to move house in Auckland?",
    a: `Tuesday. Two movers and a truck are $${aucklandFromHourly.incl} an hour incl GST on a Tuesday against $${aucklandDayRates[aucklandDayRates.length - 1].twoMovers.incl} on our dearest day, so shifting a midweek-flexible move to Tuesday is the single easiest way to lower the bill.`,
  },
  {
    q: "How long does it take to move a three-bedroom house?",
    a: "About 4 hours with two movers if both ends have easy access, and about 6 hours if stairs, long carries or tight parking are involved at both ends. We bill for the hours actually worked, not the estimate.",
  },
  {
    q: "Is there a callout fee?",
    a: `Yes, one per job. It is $${aucklandCallout.twoMovers.incl} incl GST for a two-mover crew and $${aucklandCallout.threeMovers.incl} for three movers in Auckland. It covers getting the truck and crew to you and is charged once, not per leg.`,
  },
  {
    q: "How much does packing cost?",
    a: `Full packing starts from $${fixedPriceRows[0].packing.incl.toLocaleString("en-NZ")} incl GST for a one-bedroom home and from $${fixedPriceRows[3].packing.incl.toLocaleString("en-NZ")} for four bedrooms or more. Packing is an estimate rather than a fixed price, because what it costs depends on how much there is to pack, and on the day we bill the hours actually worked. Our price cap promise protects you either way: if the job runs more than 2 hours over the quoted estimate, the extra time is free. Exit cleaning is different: it is a fixed price from the start, $${cleaningRows[0].price.incl} to $${cleaningRows[cleaningRows.length - 1].price.incl} incl GST by bedrooms and bathrooms.`,
  },
  {
    q: "How much does it cost to move a piano?",
    a: `Piano moves are a fixed job price rather than hourly: from $${pianoRows[0].from.incl} incl GST for an upright and from $${pianoRows[1].from.incl} for a grand. Stairs add $${pianoStairsPerFlight.incl} incl GST per flight, and some outer suburbs carry a travel surcharge.`,
  },
  {
    q: "Are these prices a fixed quote?",
    a: "These are our standard rates, and they are what your written quote is built from. Hourly work and packing are billed on the hours actually worked, so the final figure depends on how the day runs. Exit cleaning and piano moves are fixed prices confirmed in writing before we start. Every quote is backed by our price cap promise: if the job runs more than 2 hours over the quoted estimate, the extra time is free.",
  },
  {
    q: "Do you charge more for stairs or difficult access?",
    a: "Not as a surcharge on house moves. Difficult access simply takes longer, and the extra time shows in the hours. We ask about stairs, lifts and parking when we quote so the estimate reflects the job rather than surprising you on the day. Piano moves are the exception: stairs are charged per flight because the crew and gear needed change.",
  },
] as const;

/**
 * Schema prices use the retail (incl GST) figure, matching the number the page
 * leads with, and say so explicitly with valueAddedTaxIncluded. An assistant
 * reading this should never have to guess which side of GST a number sits on.
 */
/**
 * `kind` decides how firm the published number is. "from" emits minPrice rather
 * than price, which is the honest signal for packing: the figure is a starting
 * point until we have seen the home, so an assistant should quote it as a floor
 * rather than as the price.
 */
function buildOffer(name: string, price: number, kind: "hourly" | "fixed" | "from") {
  return {
    "@type": "Offer",
    name,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      ...(kind === "from" ? { minPrice: price } : { price }),
      priceCurrency: "NZD",
      valueAddedTaxIncluded: true,
      ...(kind === "hourly" ? { unitCode: "HUR", unitText: "per hour" } : {}),
    },
  };
}

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}${PATH}#service`,
  name: "House and office moving",
  serviceType: "Moving company",
  provider: {
    "@type": "MovingCompany",
    name: siteName,
    url: siteUrl,
  },
  areaServed: [
    { "@type": "City", name: "Auckland" },
    { "@type": "City", name: "Hamilton" },
  ],
  offers: {
    "@type": "OfferCatalog",
    name: "Moving rates",
    itemListElement: [
      ...aucklandDayRates.map((row) =>
        buildOffer(`Auckland — 2 movers and a truck, ${row.label}`, row.twoMovers.incl, "hourly"),
      ),
      ...aucklandDayRates.map((row) =>
        buildOffer(`Auckland — 3 movers and a truck, ${row.label}`, row.threeMovers.incl, "hourly"),
      ),
      ...hamiltonDayRates.map((row) =>
        buildOffer(`Hamilton — 2 movers and a truck, ${row.label}`, row.twoMovers.incl, "hourly"),
      ),
      ...fixedPriceRows.map((row) =>
        buildOffer(`Full packing from — ${row.label}`, row.packing.incl, "from"),
      ),
      ...cleaningRows.map((row) =>
        buildOffer(`Exit cleaning — ${row.label}`, row.price.incl, "fixed"),
      ),
      ...pianoRows.map((row) => buildOffer(`${row.label} move`, row.from.incl, "fixed")),
    ],
  },
};

export default function PricingPage() {
  const dearest = aucklandDayRates[aucklandDayRates.length - 1];

  return (
    <div className="bg-brand-white">
      {/* BreadcrumbList is emitted by PageHero -> Breadcrumbs, not here. */}
      <FaqPageJsonLd items={faqs} />
      <JsonLd data={pricingSchema} />

      <PageHero
        variant="light"
        eyebrow="Pricing"
        title="Moving prices, Auckland and Hamilton"
        description={`Two movers and a truck from $${aucklandFromHourly.incl} an hour including GST. These are the rates our quote engine actually charges, published in full rather than hidden behind a form.`}
        breadcrumbs={breadcrumbs}
      />

      <SectionReveal className="mx-auto max-w-4xl py-12 container-px sm:py-14">
        <PageUpdatedStamp date={contentUpdatedLabelFor(PATH)} className="mb-8 text-sm text-brand-purple/60" />

        {/* Answer-shaped summary first: this is the block an assistant lifts. */}
        <div className="rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 sm:p-8">
          <h2 className="font-heading text-xl text-brand-purple">The short answer</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-purple/85">
            <li>
              <strong className="text-brand-purple">Auckland:</strong> two movers and a truck from{" "}
              <Money value={aucklandFromHourly} /> per hour, plus a one-off callout fee of{" "}
              <Money value={aucklandCallout.twoMovers} />.
            </li>
            <li>
              <strong className="text-brand-purple">Hamilton and outer Auckland:</strong> two movers
              and a truck at a flat <Money value={hamiltonFromHourly} /> per hour, every day of the
              week.
            </li>
            <li>
              <strong className="text-brand-purple">Smallest job:</strong> {fromPrice.auckland} + GST in
              Auckland, {fromPrice.hamilton} + GST in Hamilton.
            </li>
            <li>
              <strong className="text-brand-purple">Typical three-bedroom move:</strong>{" "}
              {typicalThreeBed.auckland} + GST in Auckland, {typicalThreeBed.hamilton} + GST in Hamilton.
            </li>
            <li>
              <strong className="text-brand-purple">Cheapest day:</strong> Tuesday, at{" "}
              <Money value={aucklandFromHourly} /> an hour against{" "}
              <Money value={dearest.twoMovers} /> on our dearest day.
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-brand-purple/70">
            Every price on this page shows the retail figure first and the ex-GST figure beside it.
            Hourly work and packing are billed on the hours actually worked; exit cleaning and piano
            moves are fixed prices confirmed in writing before we start. Every quote is backed by our
            price cap promise: if the job runs more than 2 hours over the quoted estimate, the extra
            time is free.
          </p>
        </div>

        <section className="mt-12">
          <SectionHeading id="auckland-hourly">Auckland hourly rates</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            The rate depends on the day. Tuesday is our cheapest day and Friday our dearest, so a move
            you can shift midweek costs less for exactly the same crew and truck.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>Day</th>
                <th className={th}>2 movers + truck</th>
                <th className={th}>3 movers + truck</th>
              </tr>
            </thead>
            <tbody>
              {aucklandDayRates.map((row) => (
                <tr key={row.label}>
                  <td className={td}>
                    {row.label}
                    {row.cheapest && (
                      <span className="ml-2 rounded-full bg-brand-yellow/25 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-purple">
                        Cheapest
                      </span>
                    )}
                  </td>
                  <td className={td}>
                    <Money value={row.twoMovers} />
                  </td>
                  <td className={td}>
                    <Money value={row.threeMovers} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
          <p className="mt-4 text-sm leading-relaxed text-brand-purple/85">
            One callout fee applies per job: <Money value={aucklandCallout.twoMovers} /> for a
            two-mover crew and <Money value={aucklandCallout.threeMovers} /> for three. It is charged
            once, not per leg.
          </p>
        </section>

        <section className="mt-12">
          <SectionHeading id="how-long">How long a move takes</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            Multiply these hours by the rate above to estimate your own job. Tight access means stairs,
            a long carry or awkward parking at both ends.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>House size</th>
                <th className={th}>Crew</th>
                <th className={th}>Easy access</th>
                <th className={th}>Tight access</th>
              </tr>
            </thead>
            <tbody>
              {jobDurations.map((row) => (
                <tr key={row.label}>
                  <td className={td}>{row.label}</td>
                  <td className={td}>{row.crew}</td>
                  <td className={td}>{row.easyHours} hrs</td>
                  <td className={td}>{row.tightHours} hrs</td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </section>

        <section className="mt-12">
          <SectionHeading id="packing-cleaning">Packing and exit cleaning</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            Packing is an estimate: the figures below are where it starts, and on the day we bill the
            hours actually worked. It is covered by our price cap promise, so if the job runs more than
            2 hours over the quoted estimate, the extra time is free. Exit cleaning is different: a
            fixed price from the start, set by bedrooms and bathrooms, and you can book it off the
            table below.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>House size</th>
                <th className={th}>Full packing (from)</th>
              </tr>
            </thead>
            <tbody>
              {fixedPriceRows.map((row) => (
                <tr key={row.label}>
                  <td className={td}>{row.label}</td>
                  <td className={td}>
                    <span className="text-brand-purple/60">from </span>
                    <Money value={row.packing} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>

          <h3 className="mt-8 font-heading text-lg text-brand-purple">Exit cleaning (fixed)</h3>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>Property size</th>
                <th className={th}>Exit clean (fixed)</th>
              </tr>
            </thead>
            <tbody>
              {cleaningRows.map((row) => (
                <tr key={row.label}>
                  <td className={td}>{row.label}</td>
                  <td className={td}>
                    <Money value={row.price} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </section>

        <section className="mt-12">
          <SectionHeading id="piano">Piano moving</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            A fixed job price, not hourly. Stairs add <Money value={pianoStairsPerFlight} /> per flight,
            and some outer suburbs carry a travel surcharge we confirm when we quote.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>Piano</th>
                <th className={th}>From</th>
              </tr>
            </thead>
            <tbody>
              {pianoRows.map((row) => (
                <tr key={row.label}>
                  <td className={td}>{row.label}</td>
                  <td className={td}>
                    <Money value={row.from} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
          <p className="mt-4 text-sm leading-relaxed text-brand-purple/70">
            More detail on how we handle them is on our{" "}
            <Link href="/piano-movers" className="font-semibold text-brand-purple underline">
              piano movers page
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <SectionHeading id="hamilton">Hamilton and Waikato rates</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            One flat hourly rate, every day of the week, matching outer Auckland. What changes in
            Hamilton is the callout, which follows the zone you are in.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>Day</th>
                <th className={th}>2 movers + truck</th>
                <th className={th}>3 movers + truck</th>
              </tr>
            </thead>
            <tbody>
              {hamiltonDayRates.map((row) => (
                <tr key={row.label}>
                  <td className={td}>
                    {row.label}
                    {row.cheapest && (
                      <span className="ml-2 rounded-full bg-brand-yellow/25 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-purple">
                        Cheapest
                      </span>
                    )}
                  </td>
                  <td className={td}>
                    <Money value={row.twoMovers} />
                  </td>
                  <td className={td}>
                    <Money value={row.threeMovers} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
          <p className="mt-4 text-sm leading-relaxed text-brand-purple/85">
            Callout for a two-mover crew depends on the zone:{" "}
            {hamiltonCallouts.map((entry, index) => (
              <span key={entry.zone}>
                {index > 0 ? " · " : ""}Zone {entry.zone} <Money value={entry.fee} />
              </span>
            ))}
            .
          </p>
        </section>

        <section className="mt-12">
          <SectionHeading id="outer-auckland">Outer Auckland and Hamilton</SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            Flat hourly with no cheap day, because the travel is the same whatever day you move. The
            same rate covers Hamilton and the Waikato.
          </p>
          <TableShell>
            <thead>
              <tr>
                <th className={th}>Tier</th>
                <th className={th}>2 movers</th>
                <th className={th}>3 movers</th>
                <th className={th}>Callout</th>
              </tr>
            </thead>
            <tbody>
              {outerTiers.map((row) => (
                <tr key={row.label}>
                  <td className={td}>{row.label}</td>
                  <td className={td}>
                    <Money value={row.twoMovers} />
                  </td>
                  <td className={td}>
                    <Money value={row.threeMovers} />
                  </td>
                  <td className={td}>
                    <Money value={row.callout} />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
          <dl className="mt-4 space-y-2 text-sm leading-relaxed text-brand-purple/85">
            {outerTiers.map((row) => (
              <div key={row.label}>
                <dt className="inline font-semibold text-brand-purple">{row.label} — </dt>
                <dd className="inline">{row.suburbs}.</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <SectionHeading id="what-changes">What changes the price</SectionHeading>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-purple/85">
            <li>
              <strong className="text-brand-purple">The day you move.</strong> The largest single lever.
              Tuesday against Friday is a genuine saving on the same crew and truck.
            </li>
            <li>
              <strong className="text-brand-purple">Access at both ends.</strong> Stairs, long carries
              and tight parking are not surcharged — they simply take longer, and the hours show it.
            </li>
            <li>
              <strong className="text-brand-purple">How much you have.</strong> More to move means more
              hours, and past a certain volume a third mover is faster and cheaper than two working late.
            </li>
            <li>
              <strong className="text-brand-purple">Where you are.</strong> Outer Auckland and the
              Waikato zones carry their own rates, listed above.
            </li>
            <li>
              <strong className="text-brand-purple">How ready you are.</strong> Boxes packed, sealed and
              labelled before the truck arrives is the cheapest hour you will ever save.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <SectionHeading id="faq">Pricing questions</SectionHeading>
          <dl className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
              >
                <dt className="font-heading text-lg text-brand-purple">{item.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-brand-purple/85">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-2xl border border-brand-purple/15 bg-brand-canvas p-6 sm:p-8">
          <h2 className="font-heading text-xl text-brand-purple">Want the number for your move?</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            These rates are the starting point. Tell us the two addresses, the date and roughly what you
            have, and we will put the actual figure in writing before you commit to anything.
          </p>
          <Link
            href="/book"
            className="mt-5 inline-flex rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-white"
          >
            Get a free quote
          </Link>
        </section>
      </SectionReveal>
    </div>
  );
}

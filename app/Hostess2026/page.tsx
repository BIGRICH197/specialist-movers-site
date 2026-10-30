import type { Metadata } from "next";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo";

/**
 * Hostess Kitchens' own delivery rate card (Richard, 2026-10-30). Unlisted:
 * not in the nav or sitemap, and noindex. The figures live in
 * brain/context/clients/kitchen/hostess-kitchens.md; change both together.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Hostess Kitchens delivery rates 2026",
  description: "Kitchen delivery rates for Hostess Kitchens, priced by zone and cabinet count.",
  path: "/Hostess2026",
  robots: { index: false, follow: false },
});

type Zone = {
  zone: number;
  areas: string;
  prices: [number, number, number];
  thirdMover: number;
};

const zones: Zone[] = [
  {
    zone: 1,
    areas:
      "Hamilton City, Cambridge, Taupiri, Ngāruawāhia, Gordonton, Whatawhata, Tamahere, Newstead, Rukuhia",
    prices: [420, 540, 780],
    thirdMover: 120,
  },
  {
    zone: 2,
    areas:
      "Raglan, Huntly, Matamata, Morrinsville, Te Awamutu, Putāruru, Te Kauwhata, Rangiriri",
    prices: [580, 700, 940],
    thirdMover: 160,
  },
  {
    zone: 3,
    areas:
      "Auckland, Tauranga and Mt Maunganui, Waihi and Waihi Beach, Katikati, Thames, Rotorua, Tokoroa",
    prices: [1220, 1370, 1680],
    thirdMover: 300,
  },
  {
    zone: 4,
    areas: "Tairua, Pauanui, Whitianga, Hahei, Coromandel town, Taupō, Whakatāne",
    prices: [1560, 1710, 2000],
    thirdMover: 380,
  },
  {
    zone: 5,
    areas:
      "Deep Coromandel (Colville, Port Jackson, Port Charles, Kennedy Bay) and the lower North Island (Feilding, Palmerston North, Whanganui, New Plymouth, Napier)",
    prices: [2100, 2250, 2550],
    thirdMover: 450,
  },
];

const bands = [
  { label: "Small", detail: "Up to 10 cabinets", onSite: "1.5 hours" },
  { label: "Standard", detail: "11 to 20 cabinets", onSite: "2.25 hours" },
  { label: "Full truck", detail: "21 to 30 cabinets", onSite: "3.5 hours" },
] as const;

const access = [
  {
    name: "Bad access",
    price: 150,
    detail:
      "A carry over 30 m, a steep or narrow driveway, tight or awkward stairs, or nowhere to park near the door.",
  },
  {
    name: "Really bad access",
    price: 300,
    detail:
      "The truck can't get within 50 m, the carry is up a steep section or across rough ground, there are several flights of stairs, or the road in is gravel or unsealed.",
  },
] as const;

const money = (n: number) => `$${n.toLocaleString("en-NZ")}`;

const th = "border-b border-brand-purple/15 px-4 py-3 font-heading text-xs uppercase tracking-wider text-brand-purple/70";
const td = "border-b border-brand-purple/10 px-4 py-3 text-brand-purple/85";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">{children}</h2>;
}

export default function Hostess2026Page() {
  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <p className="inline-flex rounded-full border border-brand-purple/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
          Prepared for Hostess Kitchens
        </p>
        <h1 className="mt-3 font-heading text-3xl text-brand-purple sm:text-4xl">
          Kitchen delivery rates 2026
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-purple/75 sm:text-base">
          One price per delivery from your Te Rapa Park workshop, set by where it&rsquo;s going and how
          many cabinets are on the truck. Two movers, blankets and straps are included. All prices
          are excl. GST.
        </p>

        <section className="mt-10" aria-labelledby="rates">
          <SectionHeading>
            <span id="rates">Delivery rates</span>
          </SectionHeading>

          {/* Desktop and tablet: one table */}
          <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-brand-purple/15 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className={th}>Zone</th>
                  <th className={th}>Areas</th>
                  {bands.map((b) => (
                    <th key={b.label} className={`${th} whitespace-nowrap text-right`}>
                      {b.label}
                      <span className="block font-sans text-[11px] normal-case tracking-normal text-brand-purple/55">
                        {b.detail}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr key={z.zone}>
                    <td className={`${td} font-heading text-lg text-brand-purple`}>{z.zone}</td>
                    <td className={`${td} max-w-sm`}>{z.areas}</td>
                    {z.prices.map((p, i) => (
                      <td key={i} className={`${td} whitespace-nowrap text-right font-semibold text-brand-purple`}>
                        {money(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones: one card per zone */}
          <div className="mt-5 space-y-4 md:hidden">
            {zones.map((z) => (
              <div key={z.zone} className="rounded-2xl border border-brand-purple/15 bg-white p-4">
                <p className="font-heading text-lg text-brand-purple">Zone {z.zone}</p>
                <p className="mt-1 text-sm text-brand-purple/75">{z.areas}</p>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {bands.map((b, i) => (
                    <div key={b.label} className="rounded-xl bg-brand-surface px-2 py-2">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-brand-purple/60">
                        {b.label}
                      </dt>
                      <dd className="mt-1 font-semibold text-brand-purple">{money(z.prices[i])}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <p className="text-xs text-brand-purple/60">
              Small is up to 10 cabinets, Standard 11 to 20, Full truck 21 to 30.
            </p>
          </div>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-brand-purple/80 sm:text-base">
            <p className="rounded-2xl border border-brand-yellow bg-brand-yellow/20 px-4 py-3 text-brand-purple">
              <strong>A temporary fuel surcharge of $25 + GST applies to every delivery.</strong> It is
              not included in the prices above.
            </p>
            <p>
              <strong className="text-brand-purple">Over 30 cabinets:</strong> quoted per job.
            </p>
            <p>
              <strong className="text-brand-purple">Not on the list?</strong> A town that isn&rsquo;t listed
              takes the zone of the nearest listed town. We&rsquo;ll confirm it when you book.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="addons">
          <SectionHeading>
            <span id="addons">Add-ons</span>
          </SectionHeading>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-brand-purple/15 bg-white p-5">
              <h3 className="font-heading text-lg text-brand-purple">Third mover</h3>
              <ul className="mt-3 space-y-1 text-sm text-brand-purple/80">
                {zones.map((z) => (
                  <li key={z.zone} className="flex justify-between">
                    <span>Zone {z.zone}</span>
                    <span className="font-semibold text-brand-purple">+{money(z.thirdMover)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {access.map((a) => (
              <div key={a.name} className="rounded-2xl border border-brand-purple/15 bg-white p-5">
                <h3 className="font-heading text-lg text-brand-purple">{a.name}</h3>
                <p className="mt-1 font-semibold text-brand-purple">+{money(a.price)} per delivery</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-purple/75">{a.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-purple/75 sm:text-base">
            For bad or really bad access, consider booking a third mover. It keeps the day safe and
            on time.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="time">
          <SectionHeading>
            <span id="time">Time on site</span>
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-purple/75 sm:text-base">
            Each price includes time on site for loading and unloading. Past that, it&rsquo;s $40 per 15
            minutes, and we&rsquo;ll always ring you before it starts.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {bands.map((b) => (
              <li key={b.label} className="rounded-2xl border border-brand-purple/15 bg-white px-4 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wide text-brand-purple/60">
                  {b.label}
                </span>
                <span className="font-semibold text-brand-purple">{b.onSite} included</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl bg-brand-purple px-5 py-6 text-white sm:px-8" aria-labelledby="book">
          <h2 id="book" className="font-heading text-2xl">When you book, send us</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-white/90 sm:text-base">
            <li>The full drop-off address and a site contact</li>
            <li>The cabinet count (or the number of kitchens, if it&rsquo;s easier)</li>
            <li>Anything about access: stairs, long carries, steep or gravel driveways</li>
            <li>Your job or purchase order number, so it lands on the invoice</li>
          </ul>
          <p className="mt-4 text-sm text-white/90 sm:text-base">
            Questions? Call us on{" "}
            <a href={`tel:${phoneNumber}`} className="font-semibold text-brand-yellow underline">
              {phoneDisplay}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

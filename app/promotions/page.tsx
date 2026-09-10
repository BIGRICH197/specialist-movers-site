import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Promotions and offer terms",
  description:
    "Current Specialist Movers offers and the terms that go with them, including what counts as a full house pack on the VIP full-pack offer.",
  path: "/promotions",
});

type TermsSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tail?: string[];
};

/**
 * The VIP full-pack offer. The email paragraph and the pricing page link here;
 * this page is the definition the team and Margret (invoicing) work from. The
 * canonical wording lives in brain/context/pricing.md "Discounts" in the
 * automation repo — change both together.
 */
const fullPackOffer: TermsSection[] = [
  {
    heading: "What you get",
    paragraphs: [
      "Book a full house pack together with your move and we upgrade you to our VIP service at no extra charge. Our packers come in the day before, the crew moves you on the day, and our cleaning team does the full exit clean on the home you are leaving after you are out. You hand over the keys.",
      "The exit clean is the standard end-of-tenancy clean for your bedroom and bathroom count, as listed on our pricing page. It is normally $600 or more of work.",
    ],
  },
  {
    heading: "What counts as a full pack",
    paragraphs: ["A full pack means all three of these:"],
    bullets: [
      "Our packers pack every room in the home.",
      "We supply all the cartons, packing paper, bubble wrap, tape and protective materials. Customer-supplied boxes and materials are not part of a full pack.",
      "Nothing is packed before the packers arrive, other than personal papers, valuables, medication and the things you are taking in your own car.",
    ],
    tail: [
      "A kitchen-only pack, a fragile-items-only pack, or a home that has been partly packed before we arrive is a part pack. Part packs are welcome and are priced by the hour, but they do not qualify for the free clean. Our standard bundle discount of $150 off the move applies to them instead.",
    ],
  },
  {
    heading: "The quoted packing price is the minimum charge",
    paragraphs: [
      "The packing figure on your quote is the minimum charge for the pack. If there turns out to be less to pack on the day, because some of it was packed already or your own boxes were used, the quoted packing price still applies.",
      "If there is more to pack than quoted, the extra hours and materials are billed at the rates on your quote, and our price cap promise still protects you: if the job runs more than 2 hours over the quoted estimate, the extra time is free.",
    ],
  },
  {
    heading: "The fine print",
    bullets: [
      "Available on house, apartment and townhouse moves in Auckland and Hamilton booked while the offer is running.",
      "The pack, the move and the clean must be booked together on one booking, and the pack must be a full pack as defined above.",
      "The free clean is the standard exit clean for the home being vacated. Cleaning add-ons from our cleaning schedule, such as carpets or a second oven, are charged at the listed price.",
      "One offer per booking. It cannot be combined with any other discount or promotion.",
      "We can withdraw or change the offer for new bookings at any time. A booking that has already been confirmed keeps the offer it was booked under.",
      "Our standard moving and cleaning terms apply to every part of the job.",
    ],
  },
];

function Section({ s }: { s: TermsSection }) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-purple">{s.heading}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-brand-purple/85">
        {s.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        {s.bullets ? (
          <ul className="list-disc space-y-1 pl-5">
            {s.bullets.map((b) => (
              <li key={b.slice(0, 40)}>{b}</li>
            ))}
          </ul>
        ) : null}
        {s.tail?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
      </div>
    </div>
  );
}

export default function PromotionsPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Offers"
        title="Promotions and offer terms"
        description="What is on offer right now, and exactly what you need to book to get it."
      />

      <div className="mx-auto max-w-4xl space-y-10 py-12 container-px">
        <section>
          <h2 className="font-heading text-2xl text-brand-purple">
            VIP full-pack offer: free exit clean
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-purple/85">
            Book a full house pack with your move and the exit clean on your old home is on us.
            These are the terms behind that offer.
          </p>
          <div className="mt-6 space-y-6">
            {fullPackOffer.map((s) => (
              <Section key={s.heading} s={s} />
            ))}
          </div>
        </section>

        <p className="rounded-xl border border-brand-purple/15 bg-brand-purple/[0.03] p-4 text-xs text-brand-purple/70">
          Packing, cleaning and hourly rates are on our{" "}
          <Link href="/pricing" className="font-semibold text-brand-purple underline">
            pricing page
          </Link>
          . Our full moving and cleaning terms are under{" "}
          <Link href="/policies" className="font-semibold text-brand-purple underline">
            privacy and terms
          </Link>
          . Questions?{" "}
          <Link href="/contact" className="font-semibold text-brand-purple underline">
            Contact us
          </Link>{" "}
          and we will be happy to help.
        </p>
      </div>
    </div>
  );
}

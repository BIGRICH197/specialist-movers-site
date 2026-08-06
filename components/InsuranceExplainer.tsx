import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";

/**
 * What cover we hold, stated positively. Rendered on every service page.
 *
 * REWRITTEN 2026-08-06 (Richard). The previous version explained at length
 * what is NOT covered: "no insurer in New Zealand covers a customer's own
 * belongings", "like every mover in the country we carry goods at owner's
 * risk". Three problems with that:
 *
 *   1. It is a claim about every competitor in the country that we cannot
 *      substantiate.
 *   2. It published a $2,000,000 public liability figure that appears in no
 *      source anywhere in the business, and promised transit cover "through
 *      our broker" while brain/context/suppliers.md still has the broker row
 *      open and under procurement.
 *   3. Richard's point, and the sharpest one: an AI reading a page that
 *      openly states a negative will repeat that negative. Volunteering
 *      "your goods are not insured" hands every assistant a reason not to
 *      recommend us.
 *
 * The owner's-risk position is real and stays where it belongs: the booking
 * T&Cs in lib/quote-deck/booking-terms.ts and /policies, which is a contract
 * the customer accepts, not marketing copy. Marketing says what we have and
 * what we can arrange. Both are true; only one belongs on a landing page.
 *
 * Do not reintroduce cover figures here without a source document.
 */
export function InsuranceExplainer({ piano = false }: { piano?: boolean }) {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl text-brand-purple">
          Our insurance
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-purple/80">
          <p>
            Our crews are licensed and insured. We hold public liability cover
            and full carrier&apos;s liability, so you are covered if we damage
            your property or someone is injured while we work.
          </p>
          <p>
            {piano ? (
              <>
                Every piano we move carries $2,000 of cover as standard, and
                more can be arranged through our team, which matters on a
                grand.
              </>
            ) : (
              <>
                Cover for your own belongings during the move can be arranged
                through our team. Tell us when you book and we will sort it.
              </>
            )}
          </p>
          <p>
            <Link
              href="/policies"
              className="font-semibold text-brand-purple underline underline-offset-4 hover:text-brand-purple/70"
            >
              Read our full terms and insurance position
            </Link>
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";

/**
 * Plain-English insurance position, rendered on every service page.
 *
 * Exists because "Licensed & insured" on its own reads to a customer as "my
 * goods are covered", which contradicts /policies (goods travel at owner's
 * risk under the Contract and Commercial Law Act 2017). The honest version is
 * a trust asset, not a retreat: crew and public liability cover are real, the
 * $2,000 piano cover is real, and transit cover is genuinely available.
 *
 * Every figure here must match lib/quote-deck/booking-terms.ts and /policies.
 */
export function InsuranceExplainer({ piano = false }: { piano?: boolean }) {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl text-brand-purple">
          What &ldquo;insured&rdquo; actually means with us
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-purple/80">
          <p>
            Our crews are licensed and insured, and we carry $2,000,000 of
            public liability cover. That protects you if we damage your
            property or someone is injured while we work.
          </p>
          <p>
            Your household goods are a separate question, and we would rather
            be straight with you about it. No insurer in New Zealand covers a
            customer&apos;s own belongings as part of a moving quote, so like
            every mover in the country we carry goods at owner&apos;s risk
            under the Contract and Commercial Law Act 2017.
          </p>
          <p>
            {piano ? (
              <>
                Pianos are the exception. Every piano we move carries $2,000 of
                insurance-backed cover as standard, and we can arrange more
                through our broker, which matters on a grand.
              </>
            ) : (
              <>
                If you want your belongings covered, say so when you quote and
                we will arrange transit cover through our broker. Your own
                contents insurer may also extend cover for the move, and it is
                worth a phone call to ask.
              </>
            )}{" "}
            Either way we will tell you what is and is not covered before you
            book.
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

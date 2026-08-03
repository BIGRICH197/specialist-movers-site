import { SectionReveal } from "@/components/SectionReveal";

/**
 * H10 — the site had ZERO outbound citations. The only external link anywhere
 * was Facebook. No link to SiteWise, WorkSafe, or either statute our own terms
 * cite by name, while "SiteWise Gold" and "90%+ health and safety score" were
 * asserted on a dozen pages with nothing behind them.
 *
 * Outbound citation to authorities is one of the strongest AI-citability
 * signals available, and it costs nothing but honesty: everything below is a
 * claim we already make, now pointing at the body that can confirm it.
 *
 * Every URL fetched and confirmed 200 on 2026-08-03. `rel="noopener"` without
 * nofollow, because these are genuine citations, not paid or spammy links.
 */

const CITATIONS = [
  {
    claim: "SiteWise Gold certified, 90%+ health and safety score",
    body: "SiteWise",
    href: "https://www.sitewise.co.nz/",
    note: "The prequalification scheme used across NZ construction and managed sites.",
  },
  {
    claim: "Trained crews and safe-lifting practice",
    body: "WorkSafe New Zealand",
    href: "https://www.worksafe.govt.nz/",
    note: "Our manual-handling and site-safety obligations sit under WorkSafe guidance.",
  },
  {
    claim: "Goods carried at owner's risk",
    body: "Contract and Commercial Law Act 2017",
    href: "https://www.legislation.govt.nz/act/public/2017/0007/latest/DLM6622037.html",
    note: "The Act that governs carriage of goods in New Zealand, and the one our terms are written under.",
  },
  {
    claim: "Your consumer rights are preserved",
    body: "Consumer Guarantees Act 1993",
    href: "https://www.legislation.govt.nz/act/public/1993/0091/latest/DLM311053.html",
    note: "Nothing in our terms limits the rights this Act gives you.",
  },
] as const;

export function AuthorityCitations({ className }: { className?: string }) {
  return (
    <SectionReveal
      className={`border-t border-brand-purple/10 bg-brand-canvas py-12 container-px ${className ?? ""}`}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-2xl text-brand-purple">
          Where our claims come from
        </h2>
        <p className="mt-3 text-base leading-relaxed text-brand-purple/80">
          We would rather you could check these than take our word for them.
        </p>
        <dl className="mt-6 space-y-4">
          {CITATIONS.map((c) => (
            <div
              key={c.href}
              className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
            >
              <dt className="font-heading text-base text-brand-purple">{c.claim}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">
                {c.note}{" "}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-brand-purple underline underline-offset-4 hover:text-brand-purple/70"
                >
                  {c.body}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionReveal>
  );
}

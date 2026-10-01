import Link from "next/link";
import { notFound } from "next/navigation";
import { QUOTE_CATEGORIES } from "@/lib/quote-deck/quote-categories";

// Every kind of quote page in one list, with sample numbers, so the team can
// check the wording, photos and booking questions before Joey makes them.
// Never on the live site: production returns 404.

export const metadata = {
  title: "Quote page previews",
  robots: { index: false, follow: false },
};

export default function QuotePreviewIndex() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">Quote page previews</h1>
        <p className="mt-2 text-sm text-brand-purple/70">
          Sample quotes for each kind of job. Nothing here is stored or sent.
        </p>
        <ul className="mt-6 divide-y divide-brand-purple/10">
          {Object.values(QUOTE_CATEGORIES).map((c) => (
            <li key={c.key} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span className="font-semibold text-brand-purple">{c.pill}</span>
              <span className="flex gap-4">
                <Link className="text-brand-purple underline" href={`/quote/preview/${c.key}`}>
                  Quote
                </Link>
                <Link className="text-brand-purple underline" href={`/quote/preview/${c.key}/book`}>
                  Booking form
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

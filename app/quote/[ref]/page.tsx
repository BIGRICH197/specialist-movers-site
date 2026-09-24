import type { Metadata } from "next";
import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { AlreadyBooked } from "@/components/quote-deck/AlreadyBooked";
import { quotePreviewCopy } from "@/lib/quote-preview-meta";
import { siteName, siteUrl } from "@/lib/site-config";
import { HouseMoveDeck } from "@/components/quote-deck/house-move/HouseMoveDeck";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

// Public hosted quote page. Reads the stored quote from KV server-side (the
// browser never touches the store, so quotes can't be enumerated) and renders
// the branded deck. Quotes stay live well past 14 days — see hosted-quotes-spec.md.

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { ref: string };
}): Promise<Metadata> {
  const path = `/quote/${params.ref}`;
  const stored = await getQuote(tokenFromRef(params.ref));

  if (!stored) {
    return {
      title: { absolute: "Quote not found | Specialist Movers" },
      description: "This quote link is no longer available. Contact Specialist Movers for a fresh quote.",
      robots: { index: false, follow: false },
      openGraph: {
        type: "website",
        siteName,
        url: `${siteUrl}${path}`,
        title: "Quote not found | Specialist Movers",
        description: "This quote link is no longer available.",
      },
    };
  }

  const { title, description } = quotePreviewCopy(stored, params.ref);

  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName,
      url: `${siteUrl}${path}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-brand-purple">
      <h1 className="font-heading text-2xl sm:text-3xl">Quote not found</h1>
      <p className="mt-3 max-w-md text-brand-purple/75">
        This quote link is no longer available. Please get in touch and we will
        send you a fresh one.
      </p>
      <a
        href="tel:+6492282728"
        className="mt-6 rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white"
      >
        Call (021) 228 2728
      </a>
    </main>
  );
}

export default async function HostedQuotePage({
  params,
}: {
  params: { ref: string };
}) {
  const token = tokenFromRef(params.ref);
  const stored = await getQuote(token);

  if (!stored) {
    return <NotFound />;
  }

  // Direct book-ins store a stub quote (no line items, no addresses) purely so
  // the booking shows up in the admin list. There is no deck to render for one.
  const hasQuote = (stored.quote?.lineItems?.length ?? 0) > 0;
  if (!hasQuote) {
    return <AlreadyBooked clientName={stored.quote?.clientName} />;
  }

  // Once booked, everyone sees the same thing: the quote they agreed to, with a
  // banner across the top and nothing to click. Read only is what stops a
  // re-accept overwriting the original booking row (same token, same row), and
  // it means the customer can still check what was quoted instead of hitting a
  // dead end. /quote/[ref]/book and POST /api/bookings reject a booked quote
  // too, so there is no way back into the form.
  const booked = stored.status === "booked";

  return (
    <>
      {booked ? (
        <div className="bg-brand-purple px-4 py-3 text-center text-sm text-white">
          <span className="font-semibold">This quote has been accepted.</span>{" "}
          Your move is booked in, so nothing here can be changed. Need to change
          the date or any details? Call{" "}
          <a className="font-semibold underline" href={`tel:${phoneNumber}`}>
            {phoneDisplay}
          </a>
          .
        </div>
      ) : null}
      <HouseMoveDeck
        quote={stored.quote}
        {...(booked ? {} : { quoteRef: params.ref })}
        bedrooms={stored.prefill?.bedrooms}
        bathrooms={stored.prefill?.bathrooms}
      />
    </>
  );
}

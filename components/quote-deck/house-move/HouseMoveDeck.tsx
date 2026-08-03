import { HeroVisual } from "@/components/quote-deck/HeroVisual";
import { ProposalCoverFooter } from "@/components/quote-deck/house-move/ProposalCoverFooter";
import { ProposalWhatsIncludedCompact } from "@/components/quote-deck/house-move/ProposalWhatsIncludedCompact";
import { DeckBrandLogo } from "@/components/quote-deck/deck/DeckBrandLogo";
import { DeckSlide } from "@/components/quote-deck/deck/DeckSlide";
import {
  DeckEyebrow,
  DeckRule,
  DeckTitle,
} from "@/components/quote-deck/deck/DeckTypography";
import { deckHero } from "@/lib/quote-deck/deck-hero";
import { QuoteTable } from "@/components/quote-deck/house-move/QuoteTable";
import { QuoteCustomise } from "@/components/quote-deck/QuoteCustomise";
import {
  formatAddress,
  hasNotes,
  quoteAddOnBreakdown,
  usesXeroQuoteTable,
  type HouseMoveQuote,
} from "@/lib/quote-deck/house-move-quote";
import { getCleaningPriceInclGst } from "@/lib/pricing-data";
import { sitePhotos } from "@/lib/quote-deck/site-photos";

function formatPickupDelivery(addr: HouseMoveQuote["pickup"]): string {
  return addr.access ? `${formatAddress(addr)} (${addr.access})` : formatAddress(addr);
}

/** Move details for quote column — no name (that stays left). */
function QuoteMoveDetails({ quote }: { quote: HouseMoveQuote }) {
  const rows: { label: string; value: string }[] = [];

  if (quote.moveDate) rows.push({ label: "Move date", value: quote.moveDate });
  if (quote.dates?.pack) rows.push({ label: "Pack date", value: quote.dates.pack });
  if (quote.dates?.uplift) rows.push({ label: "Uplift date", value: quote.dates.uplift });
  if (quote.dates?.delivery) rows.push({ label: "Delivery date", value: quote.dates.delivery });

  if (quote.pickup.suburb) {
    rows.push({ label: "Pickup", value: formatPickupDelivery(quote.pickup) });
  }

  if (quote.delivery.suburb) {
    rows.push({ label: "Drop off", value: formatPickupDelivery(quote.delivery) });
  }

  if (rows.length === 0) return null;

  return (
    <dl className="proposal-details proposal-card proposal-quote-move-details mt-3 divide-y divide-brand-purple/10 text-sm font-normal text-brand-purple">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:justify-between sm:gap-6">
          <dt className="text-brand-purple/75">{row.label}</dt>
          <dd className="sm:text-right">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type Props = {
  quote: HouseMoveQuote;
  quoteRef?: string;
  /** Bedroom count (from the quote prefill) — lets us price cleaning that was
   *  not already quoted, for the interactive add-ons. */
  bedrooms?: number;
};

export function HouseMoveDeck({ quote, quoteRef, bedrooms }: Props) {
  const showNotes = hasNotes(quote);
  const addOns = quoteAddOnBreakdown(quote);
  const cleaningPriceInclGst = addOns.cleaningQuoted
    ? addOns.cleaningInclGst
    : getCleaningPriceInclGst(bedrooms);

  return (
    <div className="proposal-root deck-root bg-white font-sans">
      {/* Cover — client details, quote under date, photo right */}
      <DeckSlide id="cover" tone="light" scrollable innerClassName="proposal-cover-inner justify-start !pb-8 !pt-6 sm:!pb-10 sm:!pt-8">
        <div className="proposal-cover-grid">
          <div className="proposal-print-sheet proposal-print-sheet--primary">
            <div className="proposal-cover-logo">
              <DeckBrandLogo />
            </div>

            <div className="proposal-cover-details">
              <p className="proposal-eyebrow-pill inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
                Home relocation proposal
              </p>
              {quote.clientName ? (
                <h1 className="mt-3 font-heading text-3xl leading-tight text-brand-purple sm:text-4xl">
                  {quote.clientName}
                </h1>
              ) : null}
              {quote.quoteDate ? (
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple/50">Quote date</p>
                  <p className="mt-1 text-base text-brand-purple/75">{quote.quoteDate}</p>
                </div>
              ) : null}
            </div>

            <div className="proposal-cover-left">
              <ProposalWhatsIncludedCompact className="proposal-cover-included" />
            </div>

            <HeroVisual
              photoSrc={sitePhotos.homeHero}
              photoAlt="You relax. We move."
              overlayCaption={deckHero.photoTagline}
              imageObjectPosition="center 38%"
              priority
              className="proposal-cover-photo w-full"
            />
          </div>

          <div className="proposal-print-sheet proposal-print-sheet--quote">
            {quote.lineItems.length > 0 ? (
              <div id="quote" className="proposal-quote-block text-sm font-normal text-brand-purple">
                {(() => {
                  const quoteBody = (
                    <>
                      <h2 className="text-sm font-normal">
                        {usesXeroQuoteTable(quote) ? "Price estimate" : "Cost of your move"}
                      </h2>
                      <QuoteMoveDetails quote={quote} />
                      <QuoteTable quote={quote} />
                      {quote.validFor ? (
                        <p className="mt-3 text-brand-purple/75">Valid for {quote.validFor}.</p>
                      ) : null}
                    </>
                  );
                  return quoteRef ? (
                    <QuoteCustomise
                      quoteRef={quoteRef}
                      moveInclGst={addOns.moveInclGst}
                      cleaningQuoted={addOns.cleaningQuoted}
                      cleaningPriceInclGst={cleaningPriceInclGst}
                      packingQuoted={addOns.packingQuoted}
                      packingPriceInclGst={addOns.packingInclGst}
                    >
                      {quoteBody}
                    </QuoteCustomise>
                  ) : (
                    quoteBody
                  );
                })()}
              </div>
            ) : null}

            <ProposalCoverFooter className="proposal-cover-footer" />
          </div>
        </div>
      </DeckSlide>

      {/* Notes */}
      {showNotes ? (
        <DeckSlide id="notes" tone="light" scrollable innerClassName="!py-10 sm:!py-14">
          <DeckEyebrow>Your move</DeckEyebrow>
          <DeckTitle className="mt-4 !text-2xl sm:!text-3xl">Notes</DeckTitle>
          <DeckRule />
          <ul className="mt-6 space-y-3">
            {quote.notes!.filter((n) => n.trim()).map((note) => (
              <li
                key={note}
                className="proposal-card flex gap-3 px-5 py-4 text-sm leading-relaxed text-brand-purple"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </DeckSlide>
      ) : null}

    </div>
  );
}

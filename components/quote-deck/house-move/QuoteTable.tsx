import { Fragment } from "react";
import {
  formatHourlyCalc,
  formatNzd,
  formatQuoteQuantity,
  quoteGstAmount,
  quoteHasSections,
  quoteSections,
  quoteSubtotalExclGst,
  quoteTotalInclGst,
  usesXeroQuoteTable,
  type HouseMoveQuote,
  type QuoteLineItem,
} from "@/lib/quote-deck/house-move-quote";

const thClass =
  "px-3 py-2 text-left text-sm font-normal text-brand-purple sm:px-4";
const thRightClass = `${thClass} text-right`;
const tdClass = "px-3 py-2.5 text-sm font-normal text-brand-purple sm:px-4 sm:py-3";
const tdRightClass = `${tdClass} text-right tabular-nums`;

function QuoteTotals({ quote }: { quote: HouseMoveQuote }) {
  const subtotal = quoteSubtotalExclGst(quote);
  const gst = quoteGstAmount(quote);
  const total = quoteTotalInclGst(quote);
  const xero = usesXeroQuoteTable(quote);

  const rowClass = "flex items-center justify-between gap-4 px-3 py-2 sm:px-4";

  return (
    <div className="border-t border-brand-purple/10 text-sm font-normal text-brand-purple">
      <div className={rowClass}>
        <span>Subtotal</span>
        <span className="tabular-nums">{formatNzd(subtotal)}</span>
      </div>
      <div className={rowClass}>
        <span>{xero ? "TOTAL GST 15%" : "GST (15%)"}</span>
        <span className="tabular-nums">{formatNzd(gst)}</span>
      </div>
      <div className={rowClass}>
        <span>{xero ? "TOTAL NZD" : "Total incl. GST"}</span>
        <span className="tabular-nums">{formatNzd(total)}</span>
      </div>
    </div>
  );
}

/** One line item rendered as a table row, in proposal (2-col) or xero (4-col) form. */
function LineRow({ item, xero }: { item: QuoteLineItem; xero: boolean }) {
  if (xero) {
    const qty = item.quantity ?? item.hours ?? 1;
    const unit = item.unitPriceExclGst ?? item.hourlyRateExclGst ?? item.amountExclGst;
    return (
      <tr className="border-b border-brand-purple/8">
        <td className={`${tdClass} leading-snug`}>{item.description}</td>
        <td className={tdRightClass}>{formatQuoteQuantity(qty)}</td>
        <td className={tdRightClass}>{formatNzd(unit)}</td>
        <td className={tdRightClass}>{formatNzd(item.amountExclGst)}</td>
      </tr>
    );
  }
  const calc = formatHourlyCalc(item);
  return (
    <tr className="border-b border-brand-purple/8">
      <td className={`${tdClass} leading-snug`}>
        <p>{item.description}</p>
        {calc ? <p className="mt-1 text-brand-purple/70">{calc}</p> : null}
      </td>
      <td className={`${tdRightClass} align-top text-brand-purple`}>
        {formatNzd(item.amountExclGst)}
      </td>
    </tr>
  );
}

function TableHead({ xero }: { xero: boolean }) {
  return (
    <thead>
      <tr className="border-b border-brand-purple/10">
        <th className={thClass}>Description</th>
        {xero ? <th className={thRightClass}>Qty</th> : null}
        {xero ? <th className={thRightClass}>Unit price</th> : null}
        <th className={thRightClass}>{xero ? "Amount" : "Excl. GST"}</th>
      </tr>
    </thead>
  );
}

/** Multi-service quote: a header + per-service subtotal for each section. */
function SectionedTable({ quote, xero }: { quote: HouseMoveQuote; xero: boolean }) {
  const sections = quoteSections(quote);
  const cols = xero ? 4 : 2;
  return (
    <table className={`w-full text-sm font-normal ${xero ? "proposal-xero-table min-w-[28rem]" : ""}`}>
      <TableHead xero={xero} />
      <tbody>
        {sections.map((sec) => (
          <Fragment key={sec.title}>
            <tr className="bg-brand-purple/[0.04]">
              <td
                colSpan={cols}
                className="px-3 py-2 text-sm font-bold uppercase tracking-wide text-brand-purple sm:px-4"
              >
                {sec.title}
              </td>
            </tr>
            {sec.items.map((item) => (
              <LineRow key={item.description} item={item} xero={xero} />
            ))}
            <tr className="border-b border-brand-purple/10">
              <td
                colSpan={cols - 1}
                className={`${tdClass} text-right font-semibold`}
              >
                {sec.title} subtotal
              </td>
              <td className={`${tdRightClass} font-semibold`}>
                {formatNzd(sec.subtotalExclGst)}
              </td>
            </tr>
            {sec.title === "Cleaning" ? (
              <tr>
                <td colSpan={cols} className={`${tdClass} bg-brand-purple/[0.02]`}>
                  <a
                    href="/cleaning-schedule"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand-purple underline underline-offset-2"
                  >
                    View the full cleaning schedule →
                  </a>
                </td>
              </tr>
            ) : null}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

function FlatTable({ quote, xero }: { quote: HouseMoveQuote; xero: boolean }) {
  return (
    <table className={`w-full text-sm font-normal ${xero ? "proposal-xero-table min-w-[28rem]" : ""}`}>
      <TableHead xero={xero} />
      <tbody>
        {quote.lineItems.map((item) => (
          <LineRow key={item.description} item={item} xero={xero} />
        ))}
      </tbody>
    </table>
  );
}

export function QuoteTable({ quote }: { quote: HouseMoveQuote }) {
  const xero = usesXeroQuoteTable(quote);
  const sectioned = quoteHasSections(quote);

  return (
    <div className="proposal-quote-table proposal-card mt-3 overflow-hidden font-normal">
      <div className={xero ? "overflow-x-auto" : ""}>
        {sectioned ? (
          <SectionedTable quote={quote} xero={xero} />
        ) : (
          <FlatTable quote={quote} xero={xero} />
        )}
      </div>
      <QuoteTotals quote={quote} />
    </div>
  );
}

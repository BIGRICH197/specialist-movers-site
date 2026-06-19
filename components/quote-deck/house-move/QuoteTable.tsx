import {
  formatHourlyCalc,
  formatNzd,
  formatQuoteQuantity,
  quoteGstAmount,
  quoteSubtotalExclGst,
  quoteTotalInclGst,
  usesXeroQuoteTable,
  type HouseMoveQuote,
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

function ProposalQuoteTable({ quote }: { quote: HouseMoveQuote }) {
  return (
    <table className="w-full text-sm font-normal">
      <thead>
        <tr className="border-b border-brand-purple/10">
          <th className={thClass}>Description</th>
          <th className={thRightClass}>Excl. GST</th>
        </tr>
      </thead>
      <tbody>
        {quote.lineItems.map((item) => {
          const calc = formatHourlyCalc(item);
          return (
            <tr key={item.description} className="border-b border-brand-purple/8">
              <td className={`${tdClass} leading-snug`}>
                <p>{item.description}</p>
                {calc ? <p className="mt-1 text-brand-purple/70">{calc}</p> : null}
              </td>
              <td className={`${tdRightClass} align-top text-brand-purple`}>
                {formatNzd(item.amountExclGst)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function XeroQuoteTable({ quote }: { quote: HouseMoveQuote }) {
  return (
    <div className="overflow-x-auto">
      <table className="proposal-xero-table w-full min-w-[28rem] text-sm font-normal">
        <thead>
          <tr className="border-b border-brand-purple/10">
            <th className={thClass}>Description</th>
            <th className={thRightClass}>Qty</th>
            <th className={thRightClass}>Unit price</th>
            <th className={thRightClass}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {quote.lineItems.map((item) => {
            const qty = item.quantity ?? item.hours ?? 1;
            const unit = item.unitPriceExclGst ?? item.hourlyRateExclGst ?? item.amountExclGst;
            return (
              <tr key={item.description} className="border-b border-brand-purple/8">
                <td className={`${tdClass} leading-snug`}>{item.description}</td>
                <td className={tdRightClass}>{formatQuoteQuantity(qty)}</td>
                <td className={tdRightClass}>{formatNzd(unit)}</td>
                <td className={tdRightClass}>{formatNzd(item.amountExclGst)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function QuoteTable({ quote }: { quote: HouseMoveQuote }) {
  const xero = usesXeroQuoteTable(quote);

  return (
    <div className="proposal-quote-table proposal-card mt-3 overflow-hidden font-normal">
      {xero ? <XeroQuoteTable quote={quote} /> : <ProposalQuoteTable quote={quote} />}
      <QuoteTotals quote={quote} />
    </div>
  );
}

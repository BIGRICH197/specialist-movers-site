import {
  cleaningPropertyOptions,
  EXTRA_LIVING_ROOM_EXCL_GST,
  formatNzMoney,
} from "@/lib/cleaning-pricing";

/** Fixed-price reference table (excl. GST). */
export function CleaningPricingTable() {
  return (
    <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-heading text-2xl text-brand-purple">Fixed cleaning prices</h2>
      <p className="mt-2 text-sm text-brand-purple/80">
        Excl. GST. Add {formatNzMoney(EXTRA_LIVING_ROOM_EXCL_GST)} excl. GST per extra living room.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[20rem] text-left text-sm">
          <thead className="text-brand-purple">
            <tr className="border-b border-brand-purple/15">
              <th className="py-2 pr-4 font-heading">Property</th>
              <th className="py-2 pr-4 font-heading">Option 1</th>
              <th className="py-2 font-heading">Option 2</th>
            </tr>
          </thead>
          <tbody className="text-brand-purple/85">
            {cleaningPropertyOptions.map((row) => (
              <tr key={row.id} className="border-b border-brand-purple/8">
                <td className="py-2.5 pr-4 font-semibold">{row.label}</td>
                <td className="py-2.5 pr-4">{formatNzMoney(row.option1)}</td>
                <td className="py-2.5">
                  {row.option2 != null ? formatNzMoney(row.option2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

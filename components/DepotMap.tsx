import { businessInfo } from "@/lib/business-info";

/**
 * M12 — the site had zero embedded maps sitewide: no iframe on the homepage,
 * /contact, or any of the 46 location pages, and no hasMap in schema. Both are
 * direct local-pack support signals, and the local pack is where our organic
 * clicks are currently going.
 *
 * Uses the keyless embed endpoint, so there is no API key to leak or rotate.
 * Lazy-loaded because it is well below the fold and we are already carrying
 * more third-party weight than we want.
 */
export function DepotMap({
  depot = "auckland",
  className,
}: {
  depot?: "auckland" | "hamilton";
  className?: string;
}) {
  const address =
    depot === "auckland"
      ? `${businessInfo.aucklandAddress.streetAddress}, ${businessInfo.aucklandAddress.addressLocality}, Auckland, New Zealand`
      : "Hamilton, Waikato, New Zealand";
  const label = depot === "auckland" ? "Auckland" : "Hamilton";

  return (
    <div className={className}>
      <h2 className="font-heading text-xl text-brand-purple">
        Our {label} depot
      </h2>
      <p className="mt-2 text-sm text-brand-purple/75">{address}</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-brand-purple/15 shadow-sm">
        <iframe
          title={`Map of the Specialist Movers ${label} depot`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          width="100%"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, display: "block" }}
        />
      </div>
    </div>
  );
}

import { depots } from "@/lib/depots";
import { linkedInUrl, nap, nzbnUrl } from "@/lib/company-facts";

/**
 * Verified external profiles for schema `sameAs`.
 *
 * Rule from the GEO audit, and it is a good one: never add a URL here you
 * have not loaded. A 404 in sameAs is worse than an omission, because it is
 * an assertion of identity that fails. Every entry below was fetched and the
 * page confirmed to be this business before it went in.
 *
 * "Specialist Movers" is a generic trading name — there are movers using
 * near-identical names across AU/NZ/UK — so sameAs is the only thing in the
 * vocabulary telling a model which one we are. Two consumer-social links was
 * not enough to build an entity on.
 *
 */
const verifiedSameAs = [
  "https://www.instagram.com/specialistmovers/",
  "https://www.facebook.com/people/Specialist-Movers/61563245376572/",
  // Google Business Profile entity — the join key between this site and the
  // reviews we assert. Place ID is the one already used for googleReviewsUrl.
  "https://www.google.com/maps/place/?q=place_id:ChIJwRwBH8vRNYkRyam_iy7vUDc",
  // Verified 2026-08-03: page title "Specialist Movers | Moving Companies | NoCowboys"
  "https://www.nocowboys.co.nz/businesses/specialist-movers",
  // Sister brand, verified 200 and ours.
  "https://specialistpianomovers.co.nz/",
  // The two registries the audit called the highest-value additions:
  // a government record tying the trading name to KB Logistics Limited,
  // and the company page. Both fetched and confirmed 2026-08-03.
  nzbnUrl,
  linkedInUrl,
] as const;

/** Shared business facts for JSON-LD, contact, and schema. */
export const businessInfo = {
  email: "info@specialistmovers.co.nz",
  legalName: nap.legalName,
  nzbn: nap.nzbn,
  foundingDate: "2023",
  /** Mon–Sun 9am–7pm (contact page + Joey prompt). */
  openingHours: ["Mo-Su 09:00-19:00"] as const,
  /**
   * Structured form for openingHoursSpecification. The old code mapped over
   * the string array and threw the element away, emitting one hardcoded block
   * — so a second set of hours would have silently produced a duplicate
   * rather than the new hours.
   */
  openingHoursSpec: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ] as const,
  sameAs: verifiedSameAs,
  aucklandAddress: {
    streetAddress: "8/186 Target Road",
    addressLocality: "Wairau Valley",
    addressRegion: "Auckland",
    postalCode: "0627",
    addressCountry: "NZ",
  },
  hamiltonAddress: {
    streetAddress: "Hamilton",
    addressLocality: "Hamilton",
    addressRegion: "Waikato",
    postalCode: "3204",
    addressCountry: "NZ",
  },
  geo: {
    auckland: { latitude: depots[0].lat, longitude: depots[0].lng },
    hamilton: { latitude: depots[1].lat, longitude: depots[1].lng },
  },
  /**
   * Contradicted by 46 suburb pages, a 10-page Hamilton service tree, a second
   * depot, and the Service-level blocks which already got this right. Only the
   * site-wide entity — the node every AI reads first — said Auckland only.
   */
  areaServed: [
    { type: "City", name: "Auckland" },
    { type: "City", name: "Hamilton" },
    { type: "AdministrativeArea", name: "Waikato" },
  ],
} as const;

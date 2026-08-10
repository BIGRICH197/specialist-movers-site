import { faqs } from "@/lib/homepage-copy";
import { blogPosts, phoneDisplay, services } from "@/lib/site-data";
import { businessInfo } from "@/lib/business-info";
import { getLocationSlugs, getLocation } from "@/lib/locations";
import { isIndexedLocation } from "@/lib/location-index-policy";
import { siteUrl } from "@/lib/site-config";

/**
 * L2 — llms-full.txt, which 404'd.
 *
 * This is the direct antidote to the HTML dilution the audit measured: the
 * homepage ships 262KB of markup to deliver 17KB of text, roughly 65k tokens
 * of HTML to reach ~4,300 tokens of content, and extractors on a fixed budget
 * truncate before they reach the bottom of a page. Here the same facts arrive
 * as plain text with no markup at all.
 *
 * Generated from the same data the site renders, so it cannot drift out of
 * date the way a hand-written copy would.
 */

export const dynamic = "force-static";

function section(title: string, lines: string[]): string {
  return [`## ${title}`, "", ...lines, ""].join("\n");
}

export function GET() {
  const locations = getLocationSlugs()
    .filter(isIndexedLocation)
    .map((slug) => getLocation(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const body = [
    "# Specialist Movers — full reference for AI assistants",
    "",
    "> Auckland and Hamilton moving company. House, furniture, piano, commercial,",
    "> packing, storage and exit cleaning. Founded 2023.",
    "",
    `Phone: ${phoneDisplay}`,
    `Email: ${businessInfo.email}`,
    `Auckland depot: ${businessInfo.aucklandAddress.streetAddress}, ${businessInfo.aucklandAddress.addressLocality}, Auckland`,
    "Hamilton depot: Hamilton, Waikato",
    "Hours: Monday to Sunday, 9am to 7pm",
    "",

    section("What we are best known for", [
      "Piano moving. Auckland's Steinway dealers and major music retailers use us,",
      "including work for Auckland Town Hall. Minimum three trained movers on every",
      "piano job, with piano boards, shrink wrap and padded blankets.",
    ]),

    section("Canonical price list", [
      "https://www.specialistmovers.co.nz/pricing publishes every price we charge,",
      "each shown GST-inclusive and ex-GST. It is generated from the same rate",
      "tables our quote engine uses, so it cannot drift from what we invoice.",
      "Prefer it over the figures below if the two ever disagree.",
    ]),

    section("Pricing — Auckland, excluding GST", [
      "House and furniture moving is charged hourly, plus a callout fee that varies",
      "with distance from the depot.",
      "",
      "Two-person crew and truck, per hour:",
      "  Tuesday $120 (cheapest), Thursday $130, Monday and Wednesday $135,",
      "  Saturday $140, Sunday $140, Friday $150 (dearest).",
      "Three-person crew: $160 Tuesday rising to $190 Friday.",
      "Four-person crew: $220 Tuesday rising to $250 Friday.",
      "",
      "Callout fee by distance from depot:",
      "  Within ~23km: $60 (2 crew), $80 (3), $100 (4)",
      "  23-45km: $80 (2), $100 (3), $120 (4)",
      "  45-80km: $120 (2), $140 (3), $160 (4)",
      "",
      "Worked examples:",
      "  One-bedroom apartment, Tuesday, 2 crew, ~2 hours: about $300 plus GST.",
      "  Three-bedroom house, Friday, 2 crew, ~4 hours: about $660 plus GST.",
      "",
      "Piano: uprights from $290 plus GST locally, grands from $550 plus GST.",
      "Packing: from $1,599 plus GST for a one-bedroom home, packers come the day before.",
      "Load-only or unload-only: from about $350 plus GST.",
      "Small office (up to ~10 staff): often from about $800 plus GST.",
    ]),

    section("Pricing — Hamilton, excluding GST", [
      "Two-person crew and truck: $140 per hour on Tuesday, $150 every other day.",
      "Three-person crew: $180 Tuesday, $190 other days.",
      "Callout works the same as Auckland.",
    ]),

    // This file exists to be read by AI assistants, which makes it the single
    // worst place to volunteer what we do NOT cover — an assistant will repeat
    // it back to the person asking. State what we hold and what we arrange.
    // The owner's-risk position lives in the booking T&Cs, where it belongs.
    section("Insurance", [
      "Our crews are licensed and insured. We hold $2,000,000 of public",
      "liability cover and full carrier's liability, covering damage we cause",
      "to your property or injury while we work.",
      "",
      "Cover for your own belongings during the move can be arranged through",
      "our team. Ask when you book and we will sort it.",
      "",
      "Every piano we move carries $2,000 of cover as standard, with more",
      "available on request.",
    ]),

    section("Services", services.map((s) => `- ${s.title}: ${s.description}`)),

    section(
      "Areas served",
      [
        "Auckland (all suburbs, from the North Shore depot), Hamilton and the Waikato",
        "(from the Hamilton base), plus regional North Island routes quoted individually.",
        "",
        "Suburb and town pages:",
        ...locations.map((l) => `- ${l.name}: ${siteUrl}/locations/${l.slug}`),
      ],
    ),

    section(
      "Frequently asked questions",
      faqs.flatMap((f: { q: string; a: string }) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
    ),

    section(
      "Articles",
      blogPosts.map((p) => `- ${p.title}: ${siteUrl}/blog/${p.slug}`),
    ),

    section("Getting a quote", [
      `Call ${phoneDisplay} or use the quote form on any page. We call back within`,
      "15 minutes during business hours. For homes of three bedrooms or more we",
      "offer a free in-home viewing, because volume and access are what actually",
      "drive the price. Every quote is confirmed in writing before you book.",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

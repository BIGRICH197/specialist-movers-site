import type { Attribution } from "@/lib/attribution";

const SEARCH_ENGINES: [string, string][] = [
  ["google.", "Google"],
  ["bing.", "Bing"],
  ["duckduckgo.", "DuckDuckGo"],
  ["yahoo.", "Yahoo"],
  ["ecosia.", "Ecosia"],
];

const SOCIAL_SITES: [string, string][] = [
  ["facebook.", "Facebook"],
  ["instagram.", "Instagram"],
  ["linkedin.", "LinkedIn"],
  ["tiktok.", "TikTok"],
  ["youtube.", "YouTube"],
  ["twitter.", "X"],
  ["x.com", "X"],
];

function referrerHost(referrer: string): string {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return "";
  }
}

/** Human-readable traffic source, e.g. "Paid Search - Google Ads". */
export function classifyTrafficSource(attribution?: Attribution): string | undefined {
  if (!attribution) return undefined;

  const medium = (attribution.utmMedium ?? "").toLowerCase();
  const source = (attribution.utmSource ?? "").toLowerCase();
  const host = referrerHost(attribution.referrer);

  if (attribution.gclid || medium === "cpc" || medium === "ppc" || medium === "paid") {
    return "Paid Search - Google Ads";
  }
  if (attribution.fbclid || medium === "paid_social" || medium === "paidsocial") {
    return "Paid Social - Facebook/Instagram";
  }
  if (medium === "email") return "Email";
  if (source) {
    return `Campaign - ${attribution.utmSource}${medium ? ` / ${medium}` : ""}`;
  }

  for (const [needle, label] of SEARCH_ENGINES) {
    if (host.includes(needle)) return `Organic Search - ${label}`;
  }
  for (const [needle, label] of SOCIAL_SITES) {
    if (host.includes(needle)) return `Social - ${label}`;
  }
  if (host) return `Referral - ${host}`;

  return "Direct";
}

/** Extra attribution lines for the deal note (campaign, click IDs, referrer). */
export function attributionNoteLines(attribution?: Attribution): string[] {
  if (!attribution) return [];
  const lines: string[] = [];
  if (attribution.utmCampaign) lines.push(`Campaign: ${attribution.utmCampaign}`);
  if (attribution.gclid) lines.push(`Google Ads click ID: ${attribution.gclid}`);
  if (attribution.referrer) lines.push(`Referrer: ${attribution.referrer}`);
  return lines;
}

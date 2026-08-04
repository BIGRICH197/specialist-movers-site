import type { Location, LocationFaq } from "@/lib/location-types";
import { phoneDisplay } from "@/lib/site-data";

function parentLabel(location: Location): string {
  if (location.kind === "region") return location.name;
  if (location.kind === "town") return `${location.name} and nearby Waikato towns`;
  return location.name;
}

/** Default local FAQs when a suburb/town has no custom patch FAQs. */
export function getDefaultLocationFaqs(location: Location): LocationFaq[] {
  const place = parentLabel(location);
  const depot = location.group === "waikato" ? "Hamilton" : "Auckland";
  const travel =
    location.group === "waikato"
      ? "Travel from our Hamilton base is included in your written quote for in-area Waikato jobs."
      : "Travel from our Wairau Valley depot is included in your Auckland quote when we scope the job.";

  return [
    {
      q: `How much does it cost to move house in ${place}?`,
      a: `Most ${location.name} home relocations are quoted after a free viewing so stairs, parking, and volume are clear upfront. Smaller local loads often start from around $300 excl. GST. ${travel} Call ${phoneDisplay} for a same-day quote.`,
    },
    {
      q: `Do you cover all of ${location.name}?`,
      a: `Yes. we run ${location.name} jobs regularly from our ${depot} base. Apartments, townhouses, villas, and lifestyle blocks are all in scope. Tell us your addresses and access on the form and we will confirm crew size and timing.`,
    },
    {
      q: `Can you move pianos in ${location.name}?`,
      a: `Yes. upright and grand piano moves in ${location.name} use dedicated piano trucks, padded blankets, shrink wrap, and specialist straps. We are trusted by Auckland music stores and move pianos across the Shore, central suburbs, and Waikato every week.`,
    },
    {
      q: `How do I book movers in ${location.name}?`,
      a: `Fill in the quote form on this page or call ${phoneDisplay}. We call back within 15 minutes, seven days a week. For larger homes we book a free viewing so your fixed price matches the real job.`,
    },
  ];
}

export function getDefaultLocationExtraParagraphs(location: Location): string[] {
  const depot = location.group === "waikato" ? "Hamilton" : "Auckland";
  return [
    `Specialist Movers is a New Zealand-owned company founded in 2023 with Auckland and Hamilton bases. ${location.name} customers get SiteWise Gold safety systems, licensed crews, and the same communication standards as our premium Auckland work.`,
    `We quote home relocations, office moves, piano transport, packing, exit cleans, and hard-to-shift items across ${location.name}. Packers come in the day before your move when you add packing, and fixed-price exit cleaning can align with handover.`,
    `Ready to move in ${location.name}? Call ${phoneDisplay} or use the form on this page. Callback is usually within 15 minutes from our ${depot} team.`,
  ];
}

export function applyLocationDefaults(location: Location): Location {
  const faqs =
    location.faqs && location.faqs.length > 0
      ? location.faqs
      : getDefaultLocationFaqs(location);

  const paragraphs =
    location.paragraphs.length >= 5
      ? location.paragraphs
      : [...location.paragraphs, ...getDefaultLocationExtraParagraphs(location)];

  return { ...location, faqs, paragraphs };
}

import { JsonLd } from "@/components/JsonLd";
import { brandAssets } from "@/lib/brand-assets";
import { businessInfo } from "@/lib/business-info";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { siteName, siteUrl } from "@/lib/site-config";
import { teamLeaders } from "@/lib/team-leaders";

const richardLinkedIn = "https://www.linkedin.com/in/richard-boote-531b7a1b4/";

function personSchema(
  person: (typeof teamLeaders)[number],
  sameAs?: string,
) {
  return {
    "@type": "Person" as const,
    name: person.name,
    jobTitle: person.role,
    ...(person.email ? { email: person.email } : {}),
    ...(person.phone ? { telephone: person.phone } : {}),
    ...(person.photoSrc
      ? { image: `${siteUrl}${person.photoSrc}` }
      : {}),
    worksFor: {
      "@type": "MovingCompany" as const,
      name: siteName,
      url: siteUrl,
    },
    ...(sameAs ? { sameAs: [sameAs] } : {}),
  };
}

export function AboutPageJsonLd() {
  const leadership = teamLeaders.filter((p) =>
    ["richard", "matthew", "danielle", "taine"].includes(p.id),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteName}`,
    url: `${siteUrl}/about`,
    description:
      "Founded in 2023, Specialist Movers runs from Auckland and Hamilton bases with house, piano, and commercial moving teams.",
    mainEntity: {
      "@type": "MovingCompany",
      name: siteName,
      url: siteUrl,
      foundingDate: "2023",
      email: businessInfo.email,
      image: `${siteUrl}${brandAssets.logomarkPurple}`,
      address: {
        "@type": "PostalAddress",
        ...businessInfo.aucklandAddress,
      },
      aggregateRating: aggregateRatingSchema,
      employee: leadership.map((person) =>
        person.id === "richard"
          ? personSchema(person, richardLinkedIn)
          : personSchema(person),
      ),
    },
  };

  return <JsonLd data={data} />;
}

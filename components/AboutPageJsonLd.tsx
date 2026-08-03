import { JsonLd } from "@/components/JsonLd";
import { schemaIds } from "@/lib/schema-graph";
import { siteName, siteUrl } from "@/lib/site-config";
import { teamLeaders } from "@/lib/team-leaders";

const richardLinkedIn = "https://www.linkedin.com/in/richard-boote-531b7a1b4/";

function personSchema(
  person: (typeof teamLeaders)[number],
  sameAs?: string,
) {
  return {
    "@type": "Person" as const,
    "@id": `${siteUrl}/about#${person.id}`,
    name: person.name,
    jobTitle: person.role,
    ...(person.email ? { email: person.email } : {}),
    ...(person.phone ? { telephone: person.phone } : {}),
    ...(person.photoSrc ? { image: `${siteUrl}${person.photoSrc}` } : {}),
    // Reference, not a fresh company. /about used to emit five separate
    // MovingCompany nodes — one per person plus the mainEntity.
    worksFor: { "@id": schemaIds.organization },
    ...(sameAs ? { sameAs: [sameAs] } : {}),
  };
}

export function AboutPageJsonLd() {
  const leadership = teamLeaders.filter((p) =>
    ["richard", "matthew", "danielle", "taine"].includes(p.id),
  );
  const people = leadership.map((person) =>
    person.id === "richard"
      ? personSchema(person, richardLinkedIn)
      : personSchema(person),
  );

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about#webpage`,
        name: `About ${siteName}`,
        url: `${siteUrl}/about`,
        description:
          "Founded in 2023, Specialist Movers grew from weekend piano moves to Auckland's trusted crews for homes, offices, and Steinway dealers. ~20 staff, 5 trucks.",
        isPartOf: { "@id": schemaIds.website },
        mainEntity: { "@id": schemaIds.organization },
      },
      // Employees hang off the one business node. No aggregateRating here —
      // /about does not render the rating anywhere on the page.
      {
        "@id": schemaIds.organization,
        employee: people.map((p) => ({ "@id": p["@id"] })),
      },
      ...people,
    ],
  };

  return <JsonLd data={data} />;
}

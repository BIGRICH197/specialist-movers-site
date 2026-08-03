import { JsonLd } from "@/components/JsonLd";

import { aggregateRatingSchema } from "@/lib/schema-rating";

import { schemaIds } from "@/lib/schema-graph";

import { googleReviewsUrl } from "@/lib/legacy-site-content";

import { siteUrl } from "@/lib/site-config";



type AreaServed = { "@type": string; name: string };



type Props = {

  name: string;

  description: string;

  path: string;

  serviceType?: string;

  areaServed?: AreaServed[];

  includeRating?: boolean;

};



const defaultAreaServed: AreaServed[] = [

  { "@type": "City", name: "Auckland" },

  { "@type": "City", name: "Hamilton" },

  { "@type": "AdministrativeArea", name: "Waikato" },

];



export function ServiceJsonLd({

  name,

  description,

  path,

  serviceType,

  areaServed = defaultAreaServed,

  includeRating = true,

}: Props) {

  const service = {

    "@type": "Service",

    name,

    description,

    url: `${siteUrl}${path}`,

    serviceType: serviceType ?? name,

    // Reference the one business node rather than restating it. The rating
    // rides on that node, and only on pages that visibly render it.
    provider: { "@id": schemaIds.organization },

    areaServed,

  };



  // Service pages do render the rating badge in the hero, so attaching the

  // rating to the business node here is honest. It merges by @id with the

  // site-wide node from the layout rather than creating a second company.

  const data = {

    "@context": "https://schema.org",

    "@graph": includeRating

      ? [

          service,

          {

            "@id": schemaIds.organization,

            aggregateRating: { ...aggregateRatingSchema, url: googleReviewsUrl },

          },

        ]

      : [service],

  };



  return <JsonLd data={data} />;

}


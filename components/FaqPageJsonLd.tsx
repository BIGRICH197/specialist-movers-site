import { JsonLd } from "@/components/JsonLd";

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  items: readonly FaqItem[];
};

export function FaqPageJsonLd({ items }: Props) {
  if (items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}

import type { Crumb } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/site-config";

type Props = {
  items: Crumb[];
};

export function BreadcrumbJsonLd({ items }: Props) {
  if (items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
    })),
  };

  return <JsonLd data={data} />;
}

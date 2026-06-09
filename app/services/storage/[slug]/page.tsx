import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { notFound, redirect } from "next/navigation";
import { ServiceClusterDetail } from "@/components/ServiceClusterDetail";
import { getStorageService, storageHub, storageServices } from "@/lib/service-clusters";
import { isServiceCitySlug } from "@/lib/service-cities";
import { regions } from "@/lib/regions";

export function generateStaticParams() {
  return storageServices.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getStorageService(params.slug);
  if (!item) return {};
  const path = item.href ?? `${storageHub.path}/${item.slug}`;
  return buildPageMetadata({
    title: { absolute: `${item.title} | Specialist Movers` },
    description: `${item.excerpt} ${regions.serviceArea}.`,
    path,
  });
}

export default function StorageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (isServiceCitySlug(params.slug)) {
    if (params.slug === "auckland") redirect("/services/storage");
    if (params.slug === "hamilton") redirect("/services/storage-hamilton");
    notFound();
  }

  const item = getStorageService(params.slug);
  if (!item) notFound();

  if (item.href) {
    redirect(item.href);
  }

  return (
    <ServiceClusterDetail
      item={item}
      hubLabel="Storage"
      hubHref={storageHub.path}
      photoSlug={item.slug}
    />
  );
}

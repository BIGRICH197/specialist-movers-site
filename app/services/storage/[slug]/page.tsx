import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServiceClusterDetail } from "@/components/ServiceClusterDetail";
import { getStorageService, storageHub, storageServices } from "@/lib/service-clusters";
import { regions } from "@/lib/regions";

export function generateStaticParams() {
  return storageServices
    .filter((s) => !s.href)
    .map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getStorageService(params.slug);
  if (!item) return {};
  return {
    title: `${item.title} | Specialist Movers`,
    description: `${item.excerpt} ${regions.serviceArea}.`,
  };
}

export default function StorageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getStorageService(params.slug);
  if (!item) notFound();

  if (item.href) {
    redirect(item.href);
  }

  const photoSlug = item.slug === "piano-storage" ? "piano-movers" : "house-moving";

  return (
    <ServiceClusterDetail
      item={item}
      hubLabel="Storage"
      hubHref={storageHub.path}
      photoSlug={photoSlug}
      pageMomentKey={`services/storage/${item.slug}`}
    />
  );
}

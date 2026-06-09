import type { Metadata } from "next";
import { clusterItemPath } from "@/lib/service-clusters";
import { buildPageMetadata } from "@/lib/seo";
import { notFound, redirect } from "next/navigation";
import { ServiceClusterDetail } from "@/components/ServiceClusterDetail";
import {
  getMovingDistanceService,
  movingDistanceHub,
  movingDistanceServices,
} from "@/lib/service-clusters";
import { isServiceCitySlug } from "@/lib/service-cities";
import { regions } from "@/lib/regions";

export function generateStaticParams() {
  return movingDistanceServices.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getMovingDistanceService(params.slug);
  if (!item) return {};
  return buildPageMetadata({
    title: { absolute: `${item.title} | Specialist Movers` },
    description: `${item.excerpt} ${regions.serviceArea}. Free quote. Callback in 15 minutes.`,
    path: clusterItemPath(movingDistanceHub.path, item),
  });
}

export default function MovingDistancePage({
  params,
}: {
  params: { slug: string };
}) {
  if (isServiceCitySlug(params.slug)) {
    redirect("/services/moving");
  }

  const item = getMovingDistanceService(params.slug);
  if (!item) notFound();

  if (item.href) {
    redirect(item.href);
  }

  return (
    <ServiceClusterDetail
      item={item}
      hubLabel="Moving by distance"
      hubHref={movingDistanceHub.path}
      photoSlug={item.slug}
    />
  );
}

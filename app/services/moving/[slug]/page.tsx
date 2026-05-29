import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServiceClusterDetail } from "@/components/ServiceClusterDetail";
import {
  getMovingDistanceService,
  movingDistanceHub,
  movingDistanceServices,
} from "@/lib/service-clusters";
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
  return {
    title: `${item.title} | Specialist Movers`,
    description: `${item.excerpt} ${regions.serviceArea}. Free quote. Callback in 15 minutes.`,
  };
}

export default function MovingDistancePage({
  params,
}: {
  params: { slug: string };
}) {
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
      photoSlug="house-moving"
      pageMomentKey={`services/moving/${item.slug}`}
    />
  );
}

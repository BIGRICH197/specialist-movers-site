import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Map, MapPin, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import {
  movingDistanceHub,
  movingDistanceServices,
} from "@/lib/service-clusters";
import { regions } from "@/lib/regions";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Local & Regional Moving Auckland | Specialist Movers" },
  description: `Local Auckland and Waikato moves, regional relocations, and long-distance moving across New Zealand. ${regions.basesShort}. Free quote.`,
  path: "/services/moving",
});

const icons = [MapPin, Truck, Map] as const;

export default function MovingDistanceHubPage() {
  return (
    <>
      <ServiceClusterHub
        eyebrow={movingDistanceHub.eyebrow}
        title={movingDistanceHub.title}
        description={movingDistanceHub.description}
        basePath={movingDistanceHub.path}
        items={movingDistanceServices}
        icons={[...icons]}
      />
      <PagePhotoMomentStrip momentKey="services" />
    </>
  );
}

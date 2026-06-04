import type { Metadata } from "next";
import { Map, MapPin, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import {
  movingDistanceHub,
  movingDistanceServices,
} from "@/lib/service-clusters";
import { regions } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Local, Regional & Long-Distance Moving",
  description: `Local Auckland and Waikato moves, regional relocations, and long-distance moving across New Zealand. ${regions.basesShort}. Free quote.`,
};

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

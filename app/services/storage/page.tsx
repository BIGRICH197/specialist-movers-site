import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legacyMetaDescription } from "@/lib/legacy-meta-descriptions";
import { seoAbsoluteTitles } from "@/lib/seo-meta-titles";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import { Clock, Moon, Package, Piano, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { storageHub, storageServices } from "@/lib/service-clusters";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: seoAbsoluteTitles.storage },
  description: legacyMetaDescription("storage"),
  path: "/services/storage",
});

const icons = [Clock, Package, Truck, Moon, Piano] as const;

export default function StorageHubPage() {
  return (
    <>
      <ServiceClusterHub
        eyebrow={storageHub.eyebrow}
        title={getServiceHeroH1("storage-hub", "Auckland")}
        description={storageHub.description}
        basePath={storageHub.path}
        items={storageServices}
        icons={[...icons]}
        allServicesHref="/services/moving"
        allServicesLabel="Moving by distance"
        hamiltonBaseSlug="storage"
      />
      <PagePhotoMomentStrip momentKey="services" />
    </>
  );
}

import legacyAucklandUrls from "@/lib/legacy-auckland-urls.json";
import { nicheServicePages } from "@/lib/niche-service-pages";

/** Homepage + service routes that use the mobile circle wordmark header lockup. */
export function isMobileLogoLockupPath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname.startsWith("/services")) return true;
  if (pathname.startsWith("/piano-movers")) return true;
  if (pathname.startsWith("/international-moving")) return true;

  for (const entry of legacyAucklandUrls) {
    if (pathname === entry.legacyPath) return true;
    for (const alias of entry.aliases ?? []) {
      if (pathname === alias) return true;
    }
  }

  for (const page of nicheServicePages) {
    if (pathname === page.path) return true;
  }

  return false;
}

"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RouteTransition } from "@/components/RouteTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ArohaChat } from "@/components/ArohaChat";

/** Hides global chrome on internal preview routes */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare =
    pathname != null &&
    (pathname === "/patterns" ||
      pathname.startsWith("/patterns/") ||
      pathname === "/portal" ||
      pathname.startsWith("/portal/") ||
      pathname === "/simon-james" ||
      pathname.startsWith("/simon-james/"));

  if (bare) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <RouteTransition>{children}</RouteTransition>
      </main>
      <SiteFooter />
      <ArohaChat />
    </>
  );
}

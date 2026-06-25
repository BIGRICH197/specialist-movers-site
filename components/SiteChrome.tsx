"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RouteTransition } from "@/components/RouteTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JoeyChat } from "@/components/JoeyChat";
import { OverflowGuard } from "@/components/OverflowGuard";
import { HashQuoteScroll } from "@/components/HashQuoteScroll";

/** Hides global chrome on internal preview routes */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare =
    pathname != null &&
    (pathname === "/patterns" ||
      pathname.startsWith("/patterns/") ||
      pathname === "/portal" ||
      pathname.startsWith("/portal/") ||
      pathname === "/quote" ||
      pathname.startsWith("/quote/") ||
      pathname === "/cleaning-schedule");

  if (bare) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <OverflowGuard />
      <HashQuoteScroll />
      <ScrollProgress />
      <SiteHeader />
      <main className="max-w-full overflow-x-clip">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <SiteFooter />
      <JoeyChat />
    </>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToInstantQuote } from "@/lib/scroll-to-quote";

/** Scroll to quote form when landing on /#instant-quote or /#quote. */
export function HashQuoteScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    function scrollIfQuoteHash() {
      const hash = window.location.hash;
      if (hash !== "#instant-quote" && hash !== "#quote") return;
      window.setTimeout(() => scrollToInstantQuote(), 120);
    }

    scrollIfQuoteHash();
    window.addEventListener("hashchange", scrollIfQuoteHash);
    return () => window.removeEventListener("hashchange", scrollIfQuoteHash);
  }, [pathname]);

  return null;
}

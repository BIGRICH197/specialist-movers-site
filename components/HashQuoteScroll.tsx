"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToInstantQuote } from "@/lib/scroll-to-quote";

/** Paths where #quote / #instant-quote scroll to an on-page form. */
const QUOTE_HASH_PATHS = ["/", "/contact"] as const;

/** Scroll to quote form when landing on /#instant-quote, /#quote, or /contact#quote. */
export function HashQuoteScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !QUOTE_HASH_PATHS.includes(pathname as (typeof QUOTE_HASH_PATHS)[number])) {
      return;
    }

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

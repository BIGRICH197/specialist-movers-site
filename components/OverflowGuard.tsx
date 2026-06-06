"use client";

import { useEffect } from "react";

/** Prevent iOS Safari horizontal pan when off-screen content is wider than the viewport. */
export function OverflowGuard() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const lock = () => {
      root.style.overflowX = "hidden";
      body.style.overflowX = "hidden";
      if (root.scrollLeft !== 0) root.scrollLeft = 0;
      if (body.scrollLeft !== 0) body.scrollLeft = 0;
    };

    lock();
    window.addEventListener("resize", lock, { passive: true });
    window.visualViewport?.addEventListener("resize", lock);

    return () => {
      window.removeEventListener("resize", lock);
      window.visualViewport?.removeEventListener("resize", lock);
      root.style.overflowX = "";
      body.style.overflowX = "";
    };
  }, []);

  return null;
}

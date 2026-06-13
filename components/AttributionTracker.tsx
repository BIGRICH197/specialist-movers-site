"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records first-touch attribution (UTM/gclid/referrer) on page load. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}

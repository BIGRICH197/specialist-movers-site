/**
 * First-touch attribution for the visit. Captured on the landing page
 * (where gclid/UTM/referrer evidence exists) and persisted for the
 * session so form submissions made pages later can still report it.
 */

export type Attribution = {
  landingPage: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  fbclid?: string;
};

const STORAGE_KEY = "sm_attribution";

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      gclid: params.get("gclid") ?? undefined,
      fbclid: params.get("fbclid") ?? undefined,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage unavailable (private mode etc.) — attribution is best-effort.
  }
}

export function getAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}

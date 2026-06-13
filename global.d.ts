export {};

declare global {
  interface Window {
    // GTM data layer. Optional because it only exists once GTM loads.
    dataLayer?: Record<string, unknown>[];
  }
}

/** Google Business place ID (Specialist Movers). */
export const trustindexPlaceId = "ChIJwRwBH8vRNYkRyam_iy7vUDc";

/**
 * Trustindex widget ID from admin → Save and get code.
 * Override with TRUSTINDEX_WIDGET_ID or NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID in .env.local
 */
export const trustindexWidgetId =
  process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID ??
  process.env.TRUSTINDEX_WIDGET_ID ??
  "ab8b4ed7225969981756ee12d27";

/** Homepage reviews band (carousel layout in Trustindex admin). */
export const trustindexHomeWidgetId =
  process.env.NEXT_PUBLIC_TRUSTINDEX_HOME_WIDGET_ID ??
  process.env.TRUSTINDEX_HOME_WIDGET_ID ??
  "b6b0f54727ba7177e0763a13f3c";

export const trustindexLoaderSrc = `https://cdn.trustindex.io/loader.js?${trustindexWidgetId}`;

export const trustindexDefaults = {
  templateId: "trustindex-google-widget-html",
  /** Legacy WP loader , prefer trustindexLoaderSrc + widget ID */
  loaderSrc: "https://cdn.trustindex.io/loader.js?wp-widget",
  cssUrl:
    "https://specialistmovers.co.nz/wp-content/uploads/trustindex-google-widget.css",
  /**
   * Optional: WP page with `[trustindex data-widget-id=…]` for template fallback.
   */
  embedPageUrl:
    process.env.TRUSTINDEX_EMBED_URL ?? "https://specialistmovers.co.nz/",
} as const;

"use client";

import Script from "next/script";

type Props = { gtmId: string };

/**
 * GTM with the container moved off the critical path.
 *
 * @next/third-parties' GoogleTagManager hardcodes next/script's default
 * `afterInteractive`, so gtm.js and the GA4 tag it pulls in (309 KB between
 * them) were fetched and evaluated during hydration. Lighthouse measured
 * 261 ms of main-thread blocking from it, against a 1,950 ms LCP render delay
 * on /about and a failing 249 ms INP in the field.
 *
 * The dataLayer shim stays inline and early on purpose. Five forms push
 * `quote_submit` onto window.dataLayer and those pushes have to keep working
 * whether or not the container has arrived; they each guard with
 * `dataLayer || []`, so events queue and GTM replays them when it loads. A
 * quote submission also happens minutes into a session, long after the load
 * event this defers to -- no conversion is lost by waiting.
 */
export function DeferredGoogleTagManager({ gtmId }: Props) {
  return (
    <>
      <Script
        id="gtm-datalayer-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer=window.dataLayer||[];" +
            "window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});",
        }}
      />
      <Script
        id="gtm-container"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`}
      />
    </>
  );
}

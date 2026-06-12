/** Local dev: skip Places verification gates and treat routes as in-area Auckland. */
export function isQuoteDevBypassFromHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function isQuoteDevBypass(): boolean {
  if (process.env.NEXT_PUBLIC_QUOTE_DEV_BYPASS === "true") return true;
  if (process.env.NEXT_PUBLIC_QUOTE_DEV_BYPASS === "false") return false;
  return process.env.NODE_ENV === "development";
}

/** Server/API: localhost, npm run dev, or NEXT_PUBLIC_QUOTE_DEV_BYPASS. */
export function isQuoteDevBypassActive(host?: string | null): boolean {
  if (isQuoteDevBypass()) return true;
  return isQuoteDevBypassFromHost(host);
}

/** Client components: true on localhost without extra env setup. */
export function isQuoteDevBypassClient(): boolean {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  }
  return isQuoteDevBypass();
}

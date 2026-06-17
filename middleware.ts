import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep one live, indexable site.
 *
 * The project's default Vercel domain (specialist-movers-site.vercel.app)
 * serves the same build as the custom domain, which would create a duplicate,
 * indexable copy. We can't delete that default domain in Vercel, so:
 *  - the production Vercel alias 308-redirects to the real site, and
 *  - any other *.vercel.app build (branch previews) stays reachable for
 *    testing but is marked noindex so it never competes in search.
 */
const CANONICAL_HOST = "www.specialistmovers.co.nz";
const PROD_VERCEL_HOST = "specialist-movers-site.vercel.app";

function requestHost(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host
  ).toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = requestHost(request);

  // Production Vercel alias → send everyone (and crawlers) to the real site.
  if (host === PROD_VERCEL_HOST) {
    const target = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${CANONICAL_HOST}`,
    );
    return NextResponse.redirect(target, 308);
  }

  // Branch/preview deployments → usable, but never indexed.
  if (host.endsWith(".vercel.app")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run on real pages only; skip Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)"],
};

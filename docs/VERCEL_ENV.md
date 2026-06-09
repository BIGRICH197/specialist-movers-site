# Vercel deployment — APIs and environment variables

## Build failed on Vercel?

1. Open **Deployments** → failed deployment → **Building** log. The last red line is the real error.
2. This repo ships **Puppeteer** only for local scripts (`scripts/export-simon-james-pdf.mjs`, etc.). Vercel must **not** download Chromium. `vercel.json` and `.npmrc` set `PUPPETEER_SKIP_DOWNLOAD` / `puppeteer_skip_download=true`. If you removed those files, restore them and redeploy.
3. Confirm **Root Directory** is empty (repo root), **Framework** is Next.js, **Build Command** is `npm run build`.
4. Reproduce locally: `npm ci` then `npm run build` (no `.env.local` required for build).

## Which URL is which?

| URL | Stack | Do `/api/*` routes work? |
|-----|--------|---------------------------|
| `https://specialist-movers-site.vercel.app` | Next.js on Vercel | Yes (after env vars below) |
| `https://www.specialistmovers.co.nz` | WordPress (Cloudflare) | **No** — `/api/quote` redirects to a PNG file |
| `https://specialistmovers.co.nz` | WordPress | **No** |

Until DNS for `specialistmovers.co.nz` / `www` points at Vercel, only the `*.vercel.app` URL runs this Next.js app. Forms on the live WordPress site will not hit these APIs.

## Required Vercel environment variables

Set in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if you test preview URLs).

| Variable | Used by | If missing |
|----------|---------|------------|
| `HUBSPOT_ACCESS_TOKEN` | `/api/quote`, `/api/cleaning-booking` | Quote still returns pricing, but **no HubSpot deal** is created |
| `ANTHROPIC_API_KEY` | `/api/chat` (Aroha widget) | Chat returns **500** `API key not configured` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Address autocomplete on quote form | Plain text addresses only (form still works) |

After adding or changing `NEXT_PUBLIC_*` variables, **redeploy** (Vercel → Deployments → Redeploy). Those are baked in at build time.

**Google autocomplete was working but dropdown is empty?** Open browser devtools → Console on the quote form. If you see `exceeded your daily request quota`, Google is blocking requests for today — enable billing in Google Cloud and/or wait for the daily limit to reset (usually midnight US Pacific). The API key is still valid; this is not a missing-env-var problem.

Also enable **Maps JavaScript API** and **Places API (New)** (the quote form uses `PlaceAutocompleteElement`). Add your Vercel URL to API key HTTP referrer restrictions.

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical URLs in sitemap/metadata (defaults to production domain in code)

## Google Maps key referrers

In Google Cloud Console, HTTP referrer restrictions must include:

- `https://specialist-movers-site.vercel.app/*`
- `https://specialistmovers.co.nz/*`
- `https://www.specialistmovers.co.nz/*`
- `http://localhost:3020/*` (local dev; port must match `npm run dev`)

Enable **Maps JavaScript API** and **Places API**.

## Verify APIs on Vercel

Replace the host with your Vercel URL:

```bash
# Quote (should return JSON with ok: true)
curl -s -X POST https://specialist-movers-site.vercel.app/api/quote \
  -H "Content-Type: application/json" \
  -d '{"mode":"callback","name":"Test","phone":"0210000000"}'

# Chat (needs ANTHROPIC_API_KEY)
curl -s -X POST https://specialist-movers-site.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"hi"}]}'

# Cleaning quote (form on /services/cleaning-services)
curl -s -X POST https://specialist-movers-site.vercel.app/api/cleaning-booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"0210000000","propertyAddress":"1 Queen St Auckland","propertySize":"2-2","cleaningPackage":"option1","extraLivingRooms":0,"cleaningType":"exit-tenancy","priceExclGst":420}'
```

## Cutover checklist (production domain)

1. Add `specialistmovers.co.nz` and `www.specialistmovers.co.nz` in Vercel → Domains.
2. Update DNS at your registrar (A/CNAME records Vercel shows).
3. Confirm homepage shows `x-vercel-id` header and `__next` in page source.
4. Re-test `/api/quote` on the live domain (must return JSON, not HTML or PNG).

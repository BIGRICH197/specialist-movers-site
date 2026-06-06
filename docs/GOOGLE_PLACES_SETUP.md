# Google address autocomplete (quote form)

When customers type pickup/drop-off addresses, the site uses **Google Places Autocomplete** (NZ only, biased to Auckland + Waikato) so they pick a full street address instead of typing "Hamilton" or "Auckland" alone.

## What you need

1. **Google Cloud project** (can be the same project as mini PC Maps if you prefer).
2. Enable APIs:
   - **Maps JavaScript API** (quote form autocomplete)
   - **Places API** (legacy Places works with Autocomplete widget)
3. Create an **API key** → Application restrictions → **HTTP referrers** (use `/*` wildcards — required):
   - `https://specialistmovers.co.nz/*`
   - `https://www.specialistmovers.co.nz/*`
   - `https://specialist-movers-site.vercel.app/*` (Vercel preview/production)
   - `https://*.vercel.app/*` (optional, other preview URLs)
   - `http://localhost:3020/*` (dev — match your `npm run dev` port)

   **Important:** Auckland service pages use legacy URLs (e.g. `/house-moving-and-packing-auckland`, `/office-movers-auckland`, `/cleaning-bookings`). If the key only allows `/` or `/services/*`, autocomplete works on the homepage but shows a `!` on service pages (`RefererNotAllowedMapError`). The `/*` entries above cover every path.

4. API restrictions → restrict to Maps JavaScript API + Places API only.

## Local / production env

In `specialist-movers/.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

Restart `npm run dev` after adding the key.

## Without a key (or if Google blocks the referrer / quota)

The form falls back to **plain text inputs** — customers can still type a full street address and suburb. No `!` icon, no dropdown required.

## UX on the form

- When Google is working, user should **select a row from the dropdown** (not only press Enter on partial text).
- When Google is unavailable, typing the full address is fine.
- After both addresses are filled, **RouteBranchHint** shows:
  - Auckland instant estimate
  - Waikato (Hamilton branch) instant estimate
  - Amber warning for Auckland ↔ Waikato (custom quote)

## Billing

Google bills per Autocomplete session. Typical quote form usage is low cost; set budget alerts in Cloud Console.

## Later (optional)

- Use `geometry` + Distance Matrix (server) for exact Hamilton Zone A/B/C (same as mini PC cache).
- Same key pattern as `logs/hamilton_maps_cache.json` on Z:\.

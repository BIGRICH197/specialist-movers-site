# Hamilton pricing , integrated

Rates and zones are in:

- `lib/hamilton-pricing-data.ts` , Hamilton hourly, callouts, zones, keywords
- `lib/pricing.ts` , `detectQuoteBranch()`, Hamilton house/piano/cleaning callouts
- `docs/hamilton-pricing.md` , human reference (canonical Python: `pricing.py` on mini PC)

**Branch logic**

- Both addresses in Waikato in-area (and not Hamilton OOA) → Hamilton rates
- Both in Auckland service area → Auckland tiers
- Mixed (e.g. Hamilton ↔ Auckland suburb) → manual quote (`outOfAuckland: true`)

**Limitations on website**

- Zones use suburb keywords, not Google Maps distance cache (mini PC uses `hamilton_maps_cache.json`)
- Kitchen / insurance / commercial / OOA hourly uplifts not in the public form
- Piano stairs: Hamilton branch uses $100/flight; Auckland suburb map still uses per-suburb surcharges

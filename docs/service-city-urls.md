# Service + city URLs (SEO and backlinks)

Per SEO team guidance (June 2026):

- **Auckland** = main service pages (no city suffix)
- **Hamilton** = separate `-hamilton` pages with unique copy (not find-replace duplicates)
- One homepage, one About, one Why Us (no city variants)
- Hamilton is first in Locations nav; Auckland region pages removed from nav (suburbs remain)

**Total: 12 Hamilton landing pages** plus Auckland parent pages.

## Piano

| City | Canonical URL |
|------|----------------|
| Auckland | `/piano-movers` |
| Hamilton | `/piano-movers-hamilton` |

Redirects (301):

- `/piano-movers-auckland` → `/piano-movers`
- `/piano-movers/auckland` → `/piano-movers`
- `/piano-movers/hamilton` → `/piano-movers-hamilton`

## Main services

Auckland pages use **live WordPress URLs** as the canonical path (see `lib/legacy-auckland-urls.json`). Internal `/services/{slug}` links 301 to the legacy URL at cutover.

| Service | Auckland (canonical, matches live WP) | Hamilton |
|---------|----------------------------------------|----------|
| House moving | `/house-moving-and-packing-auckland` | `/services/house-moving-hamilton` |
| Office moving | `/office-movers-auckland` | `/services/office-moving-hamilton` |
| Commercial moving | `/commercial-moving-auckland` | `/services/commercial-moving-hamilton` |
| Packing | `/packing-services-auckland` | `/services/packing-services-hamilton` |
| Hard to shift | `/hard-to-shift-items` | `/services/hard-to-shift-hamilton` |
| Exit cleaning | `/cleaning-bookings` | `/services/cleaning-services-hamilton` |
| International | `/international-moving` | `/services/international-moving-hamilton` |
| Loading/unloading | `/loading-and-unloading` | `/services/loading-unloading-hamilton` |
| WINZ quote | `/winz-quotes` | `/services/winz-quotes-hamilton` |

Also 301: `/business-relocation-auckland` → `/commercial-moving-auckland`.

## Cluster hubs

| Service | Auckland | Hamilton |
|---------|----------|----------|
| Moving storage | `/services/storage` | `/services/storage-hamilton` |
| Moving (local/regional hub) | `/services/moving` | `/services/moving-hamilton` |

Redirects (301): `/services/{service}/auckland` → `/services/{service}`, `/services/{service}/hamilton` → `/services/{service}-hamilton`.

## Example H1 / title keywords

| URL | H1 |
|-----|-----|
| `/services/hard-to-shift` | Hard to shift Auckland |
| `/services/winz-quotes-hamilton` | WINZ quote Hamilton |
| `/services/storage` | Moving storage Auckland |
| `/services/packing-services-hamilton` | Packing services Hamilton |

## Parent hubs

Link internally from every Hamilton page to its Auckland parent:

- `/piano-movers`, `/services/house-moving`, `/services/storage`, etc.

## Suburb long-tail

`/locations/{suburb}` pages remain for Auckland and Waikato long-tail. Use **city service pages** as primary backlink targets.

## Sitemap

All Hamilton URLs and Auckland service pages are in `/sitemap.xml`.

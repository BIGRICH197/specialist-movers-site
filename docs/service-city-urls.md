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

| Service | Auckland | Hamilton |
|---------|----------|----------|
| House moving | `/services/house-moving` | `/services/house-moving-hamilton` |
| Office moving | `/services/office-moving` | `/services/office-moving-hamilton` |
| Commercial moving | `/services/commercial-moving` | `/services/commercial-moving-hamilton` |
| Packing | `/services/packing-services` | `/services/packing-services-hamilton` |
| Hard to shift | `/services/hard-to-shift` | `/services/hard-to-shift-hamilton` |
| Exit cleaning | `/services/cleaning-services` | `/services/cleaning-services-hamilton` |
| International | `/services/international-moving` | `/services/international-moving-hamilton` |
| Loading/unloading | `/services/loading-unloading` | `/services/loading-unloading-hamilton` |
| WINZ quote | `/services/winz-quotes` | `/services/winz-quotes-hamilton` |

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

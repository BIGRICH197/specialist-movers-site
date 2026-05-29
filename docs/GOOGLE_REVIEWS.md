# Google reviews on the new site

## What you have now

The **/reviews** page and any `GoogleReviewsSection` use branded cards that match the old WordPress grid:

- Google “G” logo (top left)
- Profile photo or initial
- Name, star rating, date
- Review text with **Read more**
- Link to your Google Business Profile

Data is copied from the same **WP Social Reviews** feed as specialistmovers.co.nz (not a live API yet).

## Do you need to do anything?

**No** , if the cards look right on `/reviews`, you are done for launch.

**Optional later:**

1. **Refresh reviews manually** (when new Google reviews pile up):
   - Open https://specialistmovers.co.nz/reviews/
   - Save the page HTML to `%TEMP%\sm-reviews.html`
   - Run: `node scripts/build-google-reviews.mjs`
   - Restart dev / redeploy

2. **Live Trustindex widget** (wired on `/reviews`):
   - Widget ID is in `lib/trustindex-config.ts` (from Trustindex → **Save and get code**).
   - Optional override in `.env.local`:
     `TRUSTINDEX_WIDGET_ID=ab8b4ed7225969981756ee12d27`
   - **Subscription:** Trustindex must be active on your account or the widget will not load after trial ends.
   - Legacy WP embed fallback: `TRUSTINDEX_EMBED_URL=https://specialistmovers.co.nz/your-page-slug/`

### Trustindex layout (grid, row, slider, etc.)

**You choose the layout in Trustindex admin**, not in the Next.js repo:

1. Log in at https://admin.trustindex.io
2. Open your Google widget (or **Create new widget** for a second layout).
3. Pick a **layout type**, for example:
   - **Slider / Carousel** , horizontal row, good for homepage bands
   - **Grid** , multi-column wall of cards (`/reviews` page)
   - **Badge** , small rating strip only (what the old WP export used)
4. Set columns, review count, colours, “read more”, then **Save and get code**.
5. Copy the widget ID into `.env.local` or `lib/trustindex-config.ts`.

**Different layouts on different pages:** create two widgets in Trustindex (e.g. “Home carousel” + “Reviews grid”), then:

```tsx
<TrustindexWidget widgetId="your-carousel-id" />  // homepage
<TrustindexWidget />  // /reviews , uses default ID from config
```

Homepage band uses **Trustindex** (`trustindexHomeWidgetId` in `lib/trustindex-config.ts`, default `b6b0f54727ba7177e0763a13f3c`). Layout (carousel, etc.) is set in Trustindex admin. Override with `NEXT_PUBLIC_TRUSTINDEX_HOME_WIDGET_ID` in `.env.local`.

3. **Google Places API** , only returns 5 reviews per call; not a full grid replacement.

## Scattered quotes

Sidebar “What customers say” blocks still use shorter quote cards. The full Google grid is on **/reviews** and anywhere we add `GoogleReviewsSection`.

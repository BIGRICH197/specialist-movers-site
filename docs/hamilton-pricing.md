# Specialist Movers Hamilton , Pricing Reference

**Canonical source:** All prices below are also defined in `pricing.py`
under the `BRANCH_*` dictionaries keyed `'hamilton'`. Python scripts
should import from `pricing.py`. This doc is the human reference.

All prices excl. GST unless stated.

## Zones (for callouts and piano surcharges)

Distances measured from depot (Hamilton Transport Centre, Bryce Street, Hamilton):

- **Zone A:** ≤23.5 km
- **Zone B:** 23.5–45 km
- **Zone C:** 45–80 km
- **Out of area (OOA):** >80 km , manual quote required, not auto-quoted

Use the HIGHER zone if pickup and dropoff are in different zones.

**In-area towns:** Cambridge, Te Awamutu, Huntly, Morrinsville, Matamata, Ngāruawāhia, Raglan, Ōtorohanga, Te Kūiti, Putāruru.

**OOA examples:** Auckland (any suburb), North Shore, Waitākere, Manukau, Rodney, Thames, Coromandel, Waihi, Te Kauwhata, Mercer, Meremere, Tauranga, Bay of Plenty.

**Distance source.** Distances are measured from depot to suburb via Google Maps Distance Matrix, cached permanently on first lookup. The Hamilton cache is separate from Auckland (`logs/hamilton_maps_cache.json`).

## House Moves , Hourly Rates

Hourly rates are the SAME across all zones. Only the callout changes by zone. Hamilton rates are higher than Auckland by ~$15–20 on weekdays and ~$30 on weekend peak , locked decision (Richard, 2026-05-18).

| Day       | 2 men | 3 men | 4 men |
|-----------|-------|-------|-------|
| Tuesday   | $140  | $180  | $240  |
| Thursday  | $155  | $195  | $255  |
| Monday    | $165  | $205  | $265  |
| Wednesday | $165  | $205  | $265  |
| Sunday    | $180  | $220  | $280  |
| Friday    | $190  | $230  | $290  |
| Saturday  | $190  | $230  | $290  |

Construction rule: 2-man rate is the explicit per-day value; 3-man = 2-man + $40; 4-man = 3-man + $60.

## House Moves , Callout Fees (by Zone)

Hamilton at parity with Auckland for v1 (locked decision).

| Zone   | 2 men | 3 men | 4 men |
|--------|-------|-------|-------|
| Zone A | $60   | $80   | $100  |
| Zone B | $80   | $100  | $120  |
| Zone C | $120  | $140  | $160  |

Formula: `total_cost = (total_hours × hourly_rate) + callout_fee`

## House Moves , Customer Types

- **Retail (cash customer)** , standard zoned Hamilton pricing above.
- **Insurance** , usually quoted fixed upfront. Fallback hourly: retail + $20/hr on rate AND + $20 on callout (still zoned). Uplift constants are shared with Auckland , not branch-keyed.
- **Kitchen companies** , flat hourly rate, no day-of-week variation, no zones. Same rates as Auckland (kitchen pricing is not branch-keyed):
  - 2 men: $60 callout, $140/hr
  - 3 men: $80 callout, $180/hr
  - 4 men: $100 callout, $240/hr

  **Note:** the day-of-week rate matrix above does NOT apply to kitchen clients. Their hourly rate is fixed every day.
- **Commercial** , always manual fixed-price quote. Do not auto-quote.
- **Out of area** , manual. If quoted hourly: +$40/hr on standard rates.

## Piano Moves (2 movers)

Piano pricing is **not branch-keyed** , same rates and surcharges as Auckland.

Base prices by customer type and size:

| Piano size          | Retail | Trade (stores) | Venue |
|---------------------|--------|----------------|-------|
| Upright             | $290   | $220           | $300  |
| Grand (up to 6ft)   | $550   | $550           | $650  |
| Grand (6ft – 7.6ft) | $650   | $650           | $750  |
| Concert (7.7ft+)    | $950   | $950           | $950  |

**Stairs:** +$100 per set (flights >3 steps, either end). Universal across retail, trade, and venue.
Stairs with a turn: cannot quote, flag for manual review.

**Zone surcharge** (retail and trade only , venues are fixed locations):

| Zone   | Piano surcharge |
|--------|-----------------|
| Zone A | no extra        |
| Zone B | +$50            |
| Zone C | +$200           |

**Venue-only surcharges** (on top of base):

- Weekend (Sat/Sun): +$100
- Public holidays: +$300

**Out-of-area pianos:** cannot quote, flag for manual review.

### Dump removal (piano disposal)

Flat rate, no stairs surcharge, Hamilton in-area only. OOA disposal jobs go to manual quote.

| Piano type | Dump rate |
|---|---|
| Upright | $350 + GST |
| Grand (incl. baby grand, mid, concert) | $550 + GST |

Detection: dropoff field contains "dump", "transfer station", or "landfill" (case-insensitive). Digital pianos route as upright ($350).

## Piano Trade Hourly

For piano store-to-store moves or shipment collection. Not customer-facing.

- **$250/hr + GST, minimum 2 hours.**

## Packing

Not branch-keyed , same as Auckland. 3 packers, labour and materials included, day before:

| Bedrooms | Price   |
|----------|---------|
| 1BR      | $1,599  |
| 2BR      | $1,770  |
| 3BR      | $1,962  |
| 4BR      | $2,486  |

Partial packing ("just kitchen") , price by room, not full house.
Packer rate for custom: $180/hr for 3 packers. Callout $80.

**Standard job:** 3 packers. **Additional packers beyond 3:** +$60/hr per packer on top of the $180/hr 3-packer rate.

## Cleaning

Not branch-keyed , same as Auckland:

| Beds / Baths | Price |
|--------------|-------|
| 1BR 1 Bath   | $280  |
| 2BR 1 Bath   | $350  |
| 2BR 2 Bath   | $420  |
| 3BR 1 Bath   | $450  |
| 3BR 2 Bath   | $520  |
| 4BR 2 Bath   | $600  |
| 4BR 3 Bath   | $700  |
| 5BR 3 Bath   | $730  |

Extra lounge: +$40.

**Zone callout (cleaning).** Cleaning jobs incur a zone callout in addition to the fixed rate above:

- Zone A: no callout
- Zone B: +$50
- Zone C: +$100
- OOA (>80 km): manual quote required, not auto-quoted

The callout stacks on the fixed price. Example: a 3BR 2-bath clean in Zone B is $450 + $50 = $500 + GST.

Applies to ALL cleaning jobs , standalone OR as part of a move bundle.

## Other Surcharges

- **Fuel surcharge (cash house moves only):** $25, added automatically by invoicing script
- **Store invoice surcharge (companies only):** 11%, added automatically by invoicing script

## Per-Cubic-Metre (commercial freight option)

- Standard: $90/m³
- After hours (before 6am / after 5pm): $110/m³
- Minimum: 5m³

## What's branch-keyed vs shared

| Item | Hamilton-specific? |
|---|---|
| House hourly rates | **Yes** , different from Auckland on every day |
| House callouts | No , parity with Auckland at launch |
| Zone radii (23.5 / 45 / 80 km) | No , same on both branches |
| OOA keyword list | **Yes** , Hamilton's list is the inverse of Auckland's |
| Depot anchor | **Yes** , Bryce St Hamilton vs Target Rd Glenfield |
| Maps cache file | **Yes** , `hamilton_maps_cache.json` |
| Piano base / surcharges / dump | No |
| Insurance uplift constants | No |
| Kitchen flat rates | No |
| Packing | No |
| Cleaning | No |
| Fuel / store surcharges | No |
| Per-m³ commercial | No |

Source of truth: `pricing.BRANCH_*` dicts in `pricing.py`.

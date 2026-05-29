# Brand illustrations

**Active files** (used by the site):

- `process/` , purple process step cartoons (house moving cards)
- `milestones/` , purple stat icons (60 years band)

**`_gold_backup/`** , original gold versions from the live site (not served; keep for reference).

Paths are wired in `lib/process-illustrations.ts`. Do not run CSS purple masks on these; they are already brand purple.

If exports show a grey checkerboard behind the art, run:

```bash
python scripts/clean-illustration-backgrounds.py
```

Then bump the cache query in `lib/process-illustrations.ts` (e.g. `purple-v2`).

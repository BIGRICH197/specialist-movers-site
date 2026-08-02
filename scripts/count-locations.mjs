import { allLocations } from "../lib/locations.ts";
import { locationSeoPatches } from "../lib/location-seo.ts";

const byKind = {};
for (const l of allLocations) byKind[l.kind] = (byKind[l.kind] ?? 0) + 1;

const patched = Object.keys(locationSeoPatches);
const withPatch = allLocations.filter((l) => locationSeoPatches[l.slug]);

console.log(
  JSON.stringify(
    {
      total: allLocations.length,
      byKind,
      patchedCount: patched.length,
      patchedSlugs: patched,
      withoutPatch: allLocations.length - withPatch.length,
    },
    null,
    2,
  ),
);

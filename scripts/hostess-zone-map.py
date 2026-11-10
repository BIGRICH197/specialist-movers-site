"""Coastline paths + zone shading for /Hostess2026.

Run: python -I scripts/hostess-zone-map.py <world-atlas@2.0.2 land-10m.json> app/Hostess2026/towns.json app/Hostess2026/coastline.ts public/hostess2026
"""
import json, math, sys
from PIL import Image, ImageDraw, ImageChops
land_src, towns_src, out_ts, png_dir = sys.argv[1:5]
t = json.load(open(land_src))
towns = json.load(open(towns_src, encoding="utf-8"))
sc, tr = t["transform"]["scale"], t["transform"]["translate"]
arcs = []
for a in t["arcs"]:
    x = y = 0; pts = []
    for dx, dy in a:
        x += dx; y += dy
        pts.append((x*sc[0]+tr[0], y*sc[1]+tr[1]))
    arcs.append(pts)
arc = lambda i: arcs[i] if i >= 0 else arcs[~i][::-1]
rings = []
for g in t["objects"]["land"]["geometries"]:
    for poly in (g["arcs"] if g["type"] == "MultiPolygon" else [g["arcs"]]):
        for ring in poly:
            pts = []
            for i in ring:
                p = arc(i); pts += p if not pts else p[1:]
            rings.append(pts)
COL = {1: (151,57,176), 2: (224,154,18), 3: (31,158,137), 4: (58,111,216), 5: (209,73,91)}
def build(name, bbox, k, minstep, S=2):
    lon0, lon1, lat0, lat1 = bbox
    c = math.cos(math.radians((lat0+lat1)/2))
    W, H = round((lon1-lon0)*c*k), round((lat0-lat1)*k)
    proj = lambda lo, la: ((lo-lon0)*c*k, (lat0-la)*k)
    near = [r for r in rings if any(lon0-1 < lo < lon1+1 and lat1-1 < la < lat0+1 for lo, la in r)]
    paths = []
    mask = Image.new("1", (W*S, H*S), 0)
    for r in near:
        pp = [proj(*p) for p in r]
        one = Image.new("1", (W*S, H*S), 0)
        ImageDraw.Draw(one).polygon([(x*S, y*S) for x, y in pp], fill=1)
        mask = ImageChops.logical_xor(mask, one)
        keep = [pp[0]]
        for p in pp[1:]:
            if math.dist(p, keep[-1]) >= minstep: keep.append(p)
        if len(keep) < 4: continue
        xs = [p[0] for p in keep]; ys = [p[1] for p in keep]
        if max(xs)-min(xs) < 3 and max(ys)-min(ys) < 3: continue
        paths.append("M" + "L".join(f"{x:.0f} {y:.0f}" for x, y in keep) + "Z")
    # nearest listed town decides the zone (the card's own rule)
    tp = [(proj(tw["lon"], tw["lat"]), tw["zone"]) for tw in towns]
    G = 2  # grid step in output pixels
    gw, gh = W*S//G + 1, H*S//G + 1
    zg = [[0]*gw for _ in range(gh)]
    for gy in range(gh):
        py = gy*G/S
        for gx in range(gw):
            px = gx*G/S
            best = min(tp, key=lambda q: (q[0][0]-px)**2 + (q[0][1]-py)**2)
            zg[gy][gx] = best[1]
    img = Image.new("RGBA", (W*S, H*S), (0,0,0,0))
    px_ = img.load(); m = mask.load()
    for y in range(H*S):
        gy = y//G
        for x in range(W*S):
            if not m[x, y]: continue
            gx = x//G; z = zg[gy][gx]
            edge = (gx+1 < gw and zg[gy][gx+1] != z) or (gy+1 < gh and zg[gy+1][gx] != z)
            r, g, b = COL[z]
            px_[x, y] = (80, 40, 90, 200) if edge else (r, g, b, 70)
    img.save(f"{png_dir}/zones-{name}.png", optimize=True)
    return {"w": W, "h": H, "lon0": lon0, "lat0": lat0, "cos": c, "k": k, "d": "".join(paths)}
res = {"main": build("main", (173.55, 177.65, -36.15, -40.75), 190, 2.0),
       "inset": build("inset", (174.70, 176.00, -37.12, -38.42), 480, 2.0)}
out = ["// Generated from Natural Earth 1:10m land (public domain, world-atlas@2.0.2).",
       "// Equirectangular, x scaled by cos(mid-latitude). Regenerate rather than hand-edit.", ""]
for n, v in res.items():
    out += [f"export const {n}Coast = {{", f"  width: {v['w']},", f"  height: {v['h']},", f"  lon0: {v['lon0']},",
            f"  lat0: {v['lat0']},", f"  cos: {v['cos']:.6f},", f"  k: {v['k']},", f"  d: \"{v['d']}\",", "} as const;", ""]
open(out_ts, "w", encoding="utf-8", newline="\n").write("\n".join(out))
for n, v in res.items(): print(n, v["w"], v["h"])

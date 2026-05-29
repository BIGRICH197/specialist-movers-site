"""Render Simon James zone map. Brand purple title bar. Output: public/clients/simon-james/zone_map.png"""
from pathlib import Path

import contextily as cx
import geopandas as gpd
import matplotlib.patheffects as path_effects
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import Rectangle
from shapely.geometry import Point

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/clients/simon-james/simon_james_zones.geojson"
OUT = ROOT / "public/clients/simon-james/zone_map.png"

BRAND_PURPLE = "#9739b0"
BRAND_TEXT = "#6b2880"

COLORS = {
    "A": "#f3d02a",
    "B": "#9739b0",
    "C": "#be76ef",
    "D": "#6b2880",
    "E": "#e8dfed",
}
OUTLINES = {
    "A": "#6b2880",
    "B": "#4a1f5c",
    "C": "#9739b0",
    "D": "#3d1649",
    "E": "#9739b0",
}

CITY_LABELS = [
    ("Auckland", 174.7633, -36.8485),
    ("Albany", 174.7000, -36.7280),
    ("Pukekohe", 174.9010, -37.2000),
    ("Hamilton", 175.2793, -37.7870),
    ("Whangarei", 174.3240, -35.7250),
]


def classify_zone(row):
    for z in ("A", "B", "C", "D", "E"):
        if z in row.index and pd.notna(row[z]):
            return z
    return None


def main():
    polys = gpd.read_file(SRC)
    polys = polys[polys.geometry.type.isin(["Polygon", "MultiPolygon"])].copy()
    polys["zone"] = polys.apply(classify_zone, axis=1)
    polys = polys[polys["zone"].notna()].copy()
    polys["geometry"] = polys.geometry.buffer(0)

    dissolved = polys.dissolve(by="zone").reset_index()
    dissolved["geometry"] = dissolved.geometry.buffer(0)

    a_geom = dissolved.loc[dissolved.zone == "A", "geometry"].union_all() if (dissolved.zone == "A").any() else None
    b_geom = dissolved.loc[dissolved.zone == "B", "geometry"].union_all() if (dissolved.zone == "B").any() else None
    c_geom = dissolved.loc[dissolved.zone == "C", "geometry"].union_all() if (dissolved.zone == "C").any() else None
    d_geom = dissolved.loc[dissolved.zone == "D", "geometry"].union_all() if (dissolved.zone == "D").any() else None
    e_geom = dissolved.loc[dissolved.zone == "E", "geometry"].union_all() if (dissolved.zone == "E").any() else None

    if b_geom is not None and a_geom is not None:
        b_geom = b_geom.difference(a_geom)
    if c_geom is not None:
        if a_geom is not None:
            c_geom = c_geom.difference(a_geom)
        if b_geom is not None:
            c_geom = c_geom.difference(b_geom)
    if d_geom is not None:
        if a_geom is not None:
            d_geom = d_geom.difference(a_geom)
        if b_geom is not None:
            d_geom = d_geom.difference(b_geom)
        if c_geom is not None:
            d_geom = d_geom.difference(c_geom)
    if e_geom is not None:
        if a_geom is not None:
            e_geom = e_geom.difference(a_geom)
        if b_geom is not None:
            e_geom = e_geom.difference(b_geom)
        if c_geom is not None:
            e_geom = e_geom.difference(c_geom)
        if d_geom is not None:
            e_geom = e_geom.difference(d_geom)

    zones = {"A": a_geom, "B": b_geom, "C": c_geom, "D": d_geom, "E": e_geom}
    final = gpd.GeoDataFrame(
        {"zone": list(zones.keys())},
        geometry=[v for v in zones.values()],
        crs="EPSG:4326",
    ).to_crs("EPSG:3857")
    final = final[~final.geometry.is_empty].copy()

    bounds = final.total_bounds
    pad_x = (bounds[2] - bounds[0]) * 0.05
    pad_y = (bounds[3] - bounds[1]) * 0.05

    fig, ax = plt.subplots(figsize=(16, 10), dpi=120)
    fig.patch.set_facecolor("#f3eff7")

    for z in ["E", "D", "C", "B", "A"]:
        row = final[final.zone == z]
        if row.empty:
            continue
        row.plot(ax=ax, color=COLORS[z], edgecolor=OUTLINES[z], linewidth=1.5, alpha=0.82, zorder=3)

    ax.set_xlim(bounds[0] - pad_x, bounds[2] + pad_x)
    ax.set_ylim(bounds[1] - pad_y, bounds[3] + pad_y)
    try:
        cx.add_basemap(ax, source=cx.providers.OpenStreetMap.Mapnik, zoom=8, attribution=False)
    except Exception as exc:
        print("Basemap:", exc)

    for name, lon, lat in CITY_LABELS:
        pt = gpd.GeoSeries([Point(lon, lat)], crs="EPSG:4326").to_crs("EPSG:3857").iloc[0]
        ax.scatter(pt.x, pt.y, s=60, color="white", edgecolor=BRAND_TEXT, linewidth=1.5, zorder=10)
        label = ax.text(
            pt.x + 3500, pt.y + 1800, name,
            fontsize=14, fontweight="bold", color=BRAND_TEXT, zorder=11,
        )
        label.set_path_effects([
            path_effects.Stroke(linewidth=3, foreground="white"),
            path_effects.Normal(),
        ])

    ax.set_axis_off()
    fig.subplots_adjust(top=0.92, bottom=0.04, left=0.02, right=0.98)
    title_ax = fig.add_axes([0, 0.93, 1, 0.07])
    title_ax.add_patch(Rectangle((0, 0), 1, 1, facecolor=BRAND_PURPLE, edgecolor=None))
    title_ax.text(
        0.02, 0.5, "Simon James delivery zones (from Eden Terrace)",
        color="white", fontsize=18, fontweight="bold", va="center", ha="left",
    )
    title_ax.set_axis_off()

    legend_ax = fig.add_axes([0.03, 0.06, 0.34, 0.22])
    legend_ax.add_patch(Rectangle((0, 0), 1, 1, facecolor="white", edgecolor=BRAND_PURPLE, linewidth=2))
    legend_ax.text(0.05, 0.88, "KEY", fontsize=14, fontweight="bold", color=BRAND_PURPLE, va="top")
    rows = [
        ("A", "Zone A - Inner Auckland"),
        ("B", "Zone B - Wider Metro"),
        ("C", "Zone C - Outer Auckland"),
        ("D", "Zone D - Mangawhai / Waikato"),
        ("E", "Zone E - Far Afield"),
    ]
    for i, (z, label) in enumerate(rows):
        y = 0.72 - i * 0.12
        legend_ax.add_patch(Rectangle((0.05, y - 0.07), 0.12, 0.08, facecolor=COLORS[z], edgecolor=BRAND_TEXT))
        legend_ax.text(0.22, y - 0.03, label, fontsize=11, color=BRAND_TEXT, va="center")
    legend_ax.set_axis_off()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT, dpi=120, bbox_inches="tight", facecolor="#f3eff7")
    print("Wrote", OUT)


if __name__ == "__main__":
    main()

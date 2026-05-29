"""Recolor gold icons to brand purple, preserving shading + transparency."""
from PIL import Image
import colorsys
from pathlib import Path

BRAND_R, BRAND_G, BRAND_B = 0x97, 0x39, 0xb0  # #9739b0
target_h, target_s, target_v = colorsys.rgb_to_hsv(BRAND_R/255, BRAND_G/255, BRAND_B/255)

ROOT = Path(r"C:\Users\richa\Desktop\specialist-movers\public\illustrations")
FILES = [
    ROOT / "process" / "step-1-form.webp",
    ROOT / "process" / "step-2-move-day.webp",
    ROOT / "process" / "step-3-deliver.webp",
    ROOT / "process" / "step-4-final-check.webp",
    ROOT / "milestones" / "families.png",
    ROOT / "milestones" / "pianos.png",
    ROOT / "milestones" / "spa-pools.png",
    ROOT / "milestones" / "commercial.png",
]

def recolor(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            hh, ss, vv = colorsys.rgb_to_hsv(r/255, g/255, b/255)
            # Only shift colored pixels (skip near-grayscale strokes/whites)
            if ss < 0.10:
                continue
            # Replace hue + saturation with brand purple, keep original value (brightness)
            nr, ng, nb = colorsys.hsv_to_rgb(target_h, target_s, vv)
            px[x, y] = (int(nr*255), int(ng*255), int(nb*255), a)
    img.save(path)
    print(f"recolored {path.name}")

for f in FILES:
    recolor(f)
print("done")

"""Export logo-lab lockup: yellow logomark + wordmark, transparent background."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand" / "logos"
OUT = BRAND / "exports"

# Matches logo-lab.html at lg breakpoint (13rem circle, 5rem wordmark height).
CM = 96 / 2.54  # px per cm at 96dpi
CIRCLE_PX = round(13 * 16)  # 13rem
WORDMARK_H = round(5 * 16)  # 5rem
GAP_PX = round(0.3 * CM)
TOP_PX = round(0.3 * CM)


def load_logomark(size: int) -> Image.Image:
    svg_path = BRAND / "svg" / "Logomark Yellow.svg"
    png_candidates = [
        BRAND / "png" / "Logomark Yellow@2x.png",
        ROOT / "public" / "brand" / "logos" / "png" / "Logomark Yellow@2x.png",
    ]
    for png in png_candidates:
        if png.exists():
            img = Image.open(png).convert("RGBA")
            return img.resize((size, size), Image.Resampling.LANCZOS)

    try:
        import cairosvg

        buf = cairosvg.svg2png(url=str(svg_path), output_width=size, output_height=size)
        from io import BytesIO

        return Image.open(BytesIO(buf)).convert("RGBA")
    except Exception as exc:
        raise RuntimeError(
            "Need Logomark Yellow PNG or cairosvg to rasterise the logomark SVG."
        ) from exc


def main() -> None:
    wordmark_path = BRAND / "wordmark-yellow-2x.png"
    if not wordmark_path.exists():
        raise FileNotFoundError(wordmark_path)

    mark = load_logomark(CIRCLE_PX)
    wordmark = Image.open(wordmark_path).convert("RGBA")
    wm_w = round(wordmark.width * (WORDMARK_H / wordmark.height))
    wordmark = wordmark.resize((wm_w, WORDMARK_H), Image.Resampling.LANCZOS)

    canvas_w = CIRCLE_PX + GAP_PX + wm_w
    canvas_h = max(CIRCLE_PX, TOP_PX + WORDMARK_H)
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    canvas.alpha_composite(mark, (0, 0))
    canvas.alpha_composite(wordmark, (CIRCLE_PX + GAP_PX, TOP_PX))

    OUT.mkdir(parents=True, exist_ok=True)

    png_1x = OUT / "specialist-movers-lockup-yellow.png"
    png_2x = OUT / "specialist-movers-lockup-yellow@2x.png"
    canvas.save(png_1x, "PNG")
    canvas.resize((canvas_w * 2, canvas_h * 2), Image.Resampling.LANCZOS).save(png_2x, "PNG")

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 {canvas_w} {canvas_h}" width="{canvas_w}" height="{canvas_h}">
  <image xlink:href="../svg/Logomark Yellow.svg" x="0" y="0" width="{CIRCLE_PX}" height="{CIRCLE_PX}"/>
  <image xlink:href="../wordmark-yellow-2x.png" x="{CIRCLE_PX + GAP_PX}" y="{TOP_PX}" height="{WORDMARK_H}" width="{wm_w}"/>
</svg>
"""
    (OUT / "specialist-movers-lockup-yellow.svg").write_text(svg, encoding="utf-8")

    print(f"Saved {png_1x}")
    print(f"Saved {png_2x}")
    print(f"Saved {OUT / 'specialist-movers-lockup-yellow.svg'}")
    print(f"Size: {canvas_w}x{canvas_h}px (transparent)")


if __name__ == "__main__":
    main()

"""
Remove baked-in checkerboard / white export backgrounds from brand illustrations.
Run: python scripts/clean-illustration-backgrounds.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIRS = [
    ROOT / "public" / "illustrations" / "process",
    ROOT / "public" / "illustrations" / "milestones",
]

# Neutral light pixels (checkerboard + white matte) -> transparent
CHROMA_MAX = 34
LIGHTNESS_MIN = 172


def is_background(r: int, g: int, b: int) -> bool:
    chroma = max(r, g, b) - min(r, g, b)
    lightness = (r + g + b) / 3
    return chroma <= CHROMA_MAX and lightness >= LIGHTNESS_MIN


def clean_image(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    cleared = 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if is_background(r, g, b):
                pixels[x, y] = (r, g, b, 0)
                cleared += 1

    if path.suffix.lower() == ".webp":
        img.save(path, "WEBP", lossless=True)
    else:
        img.save(path, "PNG", optimize=True)

    print(f"{path.name}: cleared {cleared} px ({cleared * 100 // (w * h)}%)")


def main() -> None:
    for folder in DIRS:
        if not folder.is_dir():
            continue
        for path in sorted(folder.iterdir()):
            if path.suffix.lower() in {".webp", ".png"} and path.is_file():
                clean_image(path)


if __name__ == "__main__":
    main()

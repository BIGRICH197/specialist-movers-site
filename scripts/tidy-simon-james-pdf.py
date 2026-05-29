"""
Crop dead space from Simon James deck PDF (Chrome print output).
Usage: python scripts/tidy-simon-james-pdf.py [input.pdf] [output.pdf]
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

import fitz
import numpy as np

WHITE_THRESH = 252
CONTENT_ROW = 0.06
MARGIN_PT = 10
MIN_PAGE_AREA_RATIO = 0.06


def _is_blank_row(row: np.ndarray) -> bool:
    return float(row.mean()) >= 254.2 and float(row.std()) < 2.5


def _trim_rows(gray: np.ndarray) -> tuple[int, int]:
    h = gray.shape[0]
    density = (gray < WHITE_THRESH).mean(axis=1)

    y0 = 0
    while y0 < h and density[y0] < CONTENT_ROW:
        y0 += 1

    # Chrome dead space: pure white bands at bottom (and sometimes top)
    y1 = h - 1
    while y1 > y0 and _is_blank_row(gray[y1, :]):
        y1 -= 1
    while y1 > y0 and density[y1] < CONTENT_ROW:
        y1 -= 1

    return y0, y1


def _trim_cols(gray: np.ndarray) -> tuple[int, int]:
    density = (gray < WHITE_THRESH).mean(axis=0)
    w = density.size
    x0 = 0
    while x0 < w and density[x0] < CONTENT_ROW:
        x0 += 1
    x1 = w - 1
    while x1 > x0 and _is_blank_row(gray[:, x1]):
        x1 -= 1
    while x1 > x0 and density[x1] < CONTENT_ROW:
        x1 -= 1
    return x0, x1


def content_rect(page: fitz.Page, zoom: float = 2.0) -> fitz.Rect:
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    h, w = pix.height, pix.width
    samples = np.frombuffer(pix.samples, dtype=np.uint8).reshape(h, w, pix.n)
    gray = samples[..., :3].mean(axis=2) if pix.n >= 3 else samples[..., 0].astype(np.float32)

    y0, y1 = _trim_rows(gray)
    x0, x1 = _trim_cols(gray)

    if y1 <= y0 or x1 <= x0:
        return page.rect

    rect = fitz.Rect(x0 / zoom, y0 / zoom, (x1 + 1) / zoom, (y1 + 1) / zoom)
    rect = rect + (-MARGIN_PT, -MARGIN_PT, MARGIN_PT, MARGIN_PT)
    return rect & page.rect


def is_mostly_blank(page: fitz.Page) -> bool:
    r = content_rect(page)
    return (r.width * r.height) < (page.rect.width * page.rect.height * MIN_PAGE_AREA_RATIO)


def main() -> None:
    default_in = Path.home() / "Downloads" / "Simon-James-Pitch-Deck-2026.pdf"
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else default_in
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src

    if not src.is_file():
        raise SystemExit(f"Not found: {src}")

    tmp = dst.with_suffix(".tmp.pdf")
    backup = src.with_suffix(".backup.pdf")

    doc = fitz.open(src)
    out = fitz.open()

    kept = 0
    for i in range(doc.page_count):
        page = doc[i]
        if is_mostly_blank(page):
            continue
        crop = content_rect(page)
        if crop.is_empty or crop.height < 36:
            continue

        new_page = out.new_page(width=crop.width, height=crop.height)
        new_page.show_pdf_page(new_page.rect, doc, i, clip=crop)
        kept += 1

    if kept == 0:
        doc.close()
        out.close()
        raise SystemExit("No pages kept after trim.")

    if dst.resolve() == src.resolve() and not backup.exists():
        shutil.copy2(src, backup)

    out.save(tmp, garbage=4, deflate=True)
    out.close()
    doc.close()

    tmp.replace(dst)
    print(f"Trimmed {kept} pages (removed blank/dead space) -> {dst}")
    if backup.exists():
        print(f"Backup: {backup}")


if __name__ == "__main__":
    main()

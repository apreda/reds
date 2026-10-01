"""City tee photos: each team's Printful photo of the plain SELL tee
(public/mockups/<slug>.png) with the city line from its city print file added
in the same place and scale Printful uses, shaded by the fabric. Saves
public/mockups/city/<slug>.png. Bump ART_VERSION in lib/art.ts after rerunning.

    BASE_URL=http://localhost:3000 python3 scripts/city-mockups.py [slug ...]

BASE_URL serves this code's /api/print/... files. Needs numpy, scipy, Pillow.
"""

import io
import os
import re
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

ROOT = Path(__file__).resolve().parent.parent
BASE = os.environ.get("BASE_URL", "http://localhost:3000").rstrip("/")

# Where SELL lands in Printful's 1000px flat-lay tee photo, against where it is
# in the 1800x2400 print file. Same for every color (measured on the photos).
PRINT_BOX = (38, 634, 1763, 1108)
PHOTO_BOX = (337, 309, 662, 397)
SX = (PHOTO_BOX[2] - PHOTO_BOX[0]) / (PRINT_BOX[2] - PRINT_BOX[0])
SY = (PHOTO_BOX[3] - PHOTO_BOX[1]) / (PRINT_BOX[3] - PRINT_BOX[1])


def fetch(path: str) -> Image.Image:
    with urllib.request.urlopen(f"{BASE}{path}") as r:
        return Image.open(io.BytesIO(r.read())).convert("RGBA")


def city_layer(slug: str) -> Image.Image:
    """The city line alone: the city print file minus the plain SELL print."""
    plain = np.asarray(fetch(f"/api/print/{slug}.png")).astype(np.float32)
    city = np.asarray(fetch(f"/api/print/city/{slug}.png")).astype(np.float32)
    alpha = np.clip(city[..., 3] - plain[..., 3], 0, 255)
    out = city.copy()
    out[..., 3] = alpha
    return Image.fromarray(out.astype(np.uint8))


def composite(photo: Image.Image, layer: Image.Image) -> Image.Image:
    # Scale the print layer into photo space (premultiplied, so edges stay clean).
    a = np.asarray(layer).astype(np.float32) / 255
    pm = np.dstack([a[..., :3] * a[..., 3:4], a[..., 3:4]])
    w, h = round(layer.width * SX), round(layer.height * SY)
    pm = np.dstack(
        [np.asarray(Image.fromarray((pm[..., i] * 255).round().astype(np.uint8)).resize((w, h), Image.LANCZOS)) for i in range(4)]
    ).astype(np.float32) / 255
    x0 = round(PHOTO_BOX[0] - PRINT_BOX[0] * SX)
    y0 = round(PHOTO_BOX[1] - PRINT_BOX[1] * SY)
    P = np.asarray(photo).astype(np.float32) / 255
    H, W = P.shape[:2]
    canvas = np.zeros((H, W, 4), np.float32)
    ys, xs = slice(max(y0, 0), min(y0 + h, H)), slice(max(x0, 0), min(x0 + w, W))
    canvas[ys, xs] = pm[ys.start - y0 : ys.stop - y0, xs.start - x0 : xs.stop - x0]
    canvas = np.dstack([gaussian_filter(canvas[..., i], 0.35) for i in range(4)])
    # Shade the ink with the fabric's light and shadow, like the printed SELL above it.
    L = P[..., :3] @ np.array([0.299, 0.587, 0.114], np.float32)
    shade = np.clip(L / np.maximum(gaussian_filter(L, 10), 1e-3), 0.85, 1.1)
    alpha = canvas[..., 3:4] * 0.97
    ink = np.where(canvas[..., 3:4] > 1e-4, canvas[..., :3] / np.maximum(canvas[..., 3:4], 1e-4), 0)
    ink = np.clip(ink * shade[..., None], 0, 1)
    rgb = P[..., :3] * (1 - alpha) + ink * alpha
    return Image.fromarray((np.dstack([rgb, P[..., 3:4]]) * 255).round().astype(np.uint8))


def main() -> None:
    slugs = re.findall(r'\["([a-z0-9-]+)", "[a-z-]+",', (ROOT / "lib/teams.ts").read_text())
    only = set(sys.argv[1:])
    out = ROOT / "public/mockups/city"
    out.mkdir(parents=True, exist_ok=True)
    for slug in slugs:
        if only and slug not in only:
            continue
        photo = Image.open(ROOT / f"public/mockups/{slug}.png").convert("RGBA")
        composite(photo, city_layer(slug)).save(out / f"{slug}.png", optimize=True)
        print("city", slug)


if __name__ == "__main__":
    main()

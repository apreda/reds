"""Fallback mockups: prints each team's artwork onto Printful's own catalog photo
of the blank Bella+Canvas 3001 in that team's color, and saves it to
public/mockups/<slug>.png. Use scripts/generate-mockups.mjs (Printful's Mockup
Generator) instead when a Printful token is available.

    BASE_URL=http://localhost:3000 python3 scripts/composite-mockups.py [slug ...]

BASE_URL serves this code's /api/print/<slug>.png. Needs numpy, scipy, Pillow.
"""

import io
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, map_coordinates

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000").rstrip("/")

# Printful's catalog photos all share one model and pose (700x1000). Measured on
# that photo: shirt body ~20" (size M) across 270px, neckline at x=348, y=307.
PX_PER_IN = 13.5
NECK = (348, 307)
PRINT_DROP_IN = 1.5  # top of the 12"x16" print area below the neckline
CROP = (88, 245, 608, 895)  # torso, 4:5
SCALE = 2  # output 1040x1300
TILE = np.array([0xF5, 0xF4, 0xF0], np.float32) / 255  # --tile, replaces the white backdrop


def fetch(url: str) -> bytes:
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "sell-the-team"})) as r:
        return r.read()


def teams() -> list[dict]:
    src = (ROOT / "lib/teams.ts").read_text()
    rows = re.findall(r'\["([a-z-]+)", "[a-z-]+", "[^"]+", "[^"]+", "[^"]+", "([^"]+)"', src)
    return [{"slug": slug, "shirt": shirt} for slug, shirt in rows]


def blank_photos() -> dict[str, str]:
    product = json.loads(fetch("https://api.printful.com/products/71"))["result"]
    return {v["color"]: v["image"] for v in product["variants"] if v["size"] == "M"}


def composite(photo: Image.Image, art: Image.Image) -> Image.Image:
    photo = photo.convert("RGB").crop(CROP)
    photo = photo.resize((photo.width * SCALE, photo.height * SCALE), Image.LANCZOS)
    P = np.asarray(photo).astype(np.float32) / 255
    H, W = P.shape[:2]
    ppi = PX_PER_IN * SCALE

    # Scale the print file to the shirt, resizing premultiplied so edges stay clean.
    s = ppi * 12 / art.width
    w, h = round(art.width * s), round(art.height * s)
    a = np.asarray(art.convert("RGBA")).astype(np.float32) / 255
    pm = np.dstack([a[..., :3] * a[..., 3:4], a[..., 3:4]])
    pm = np.dstack(
        [np.asarray(Image.fromarray((pm[..., i] * 255).round().astype(np.uint8)).resize((w, h), Image.LANCZOS)) for i in range(4)]
    ).astype(np.float32) / 255
    x0 = round((NECK[0] - CROP[0]) * SCALE - w / 2)
    y0 = round((NECK[1] - CROP[1]) * SCALE + PRINT_DROP_IN * ppi)
    layer = np.zeros((H, W, 4), np.float32)
    layer[y0 : y0 + h, x0 : x0 + w] = pm[: H - y0, : W - x0]

    # Let the fabric move and shade the ink: a small displacement along the
    # folds, the folds' light and shadow, and the knit texture showing through.
    L = P @ np.array([0.299, 0.587, 0.114], np.float32)
    gy, gx = np.gradient(gaussian_filter(L, 3 * SCALE))
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    k = 25.0 * SCALE
    layer = np.dstack([map_coordinates(layer[..., i], [yy - gy * k, xx - gx * k], order=1) for i in range(4)])
    layer = np.dstack([gaussian_filter(layer[..., i], 0.5 * SCALE) for i in range(4)])
    alpha = layer[..., 3:4] * 0.96
    ink = np.where(alpha > 1e-4, layer[..., :3] / np.maximum(layer[..., 3:4], 1e-4), 0)
    shade = np.clip(L / np.maximum(gaussian_filter(L, 12 * SCALE), 1e-3), 0.75, 1.2)
    knit = np.clip(L / np.maximum(gaussian_filter(L, 1.2 * SCALE), 1e-3), 0.85, 1.15)
    ink = np.clip(ink * shade[..., None] * (0.6 + 0.4 * knit[..., None]), 0, 1)

    out = (P * (1 - alpha) + ink * alpha) * TILE
    return Image.fromarray((out * 255).round().astype(np.uint8))


def main() -> None:
    only = set(sys.argv[1:])
    photos = blank_photos()
    cache: dict[str, Image.Image] = {}
    out_dir = ROOT / "public/mockups"
    out_dir.mkdir(parents=True, exist_ok=True)
    for team in teams():
        if only and team["slug"] not in only:
            continue
        shirt = team["shirt"]
        if shirt not in cache:
            cache[shirt] = Image.open(io.BytesIO(fetch(photos[shirt])))
        art = Image.open(io.BytesIO(fetch(f"{BASE_URL}/api/print/{team['slug']}.png")))
        path = out_dir / f"{team['slug']}.png"
        composite(cache[shirt], art).save(path, optimize=True)
        print(f"{team['slug']}: {shirt} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()

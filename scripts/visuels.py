#!/usr/bin/env python3
"""Fabrique les visuels web à partir des rendus livrés par le bureau d'études.

Les fichiers sources (PNG haute définition, fond studio blanc) sont attendus
à la racine du dépôt ; les fichiers produits vont dans `public/img/`.

    python3 scripts/visuels.py            # régénère tout
    python3 scripts/visuels.py --profil   # + relève le profil et les points chauds

Trois traitements :

* **détourage** (`Sac face avant`, `Image Capuche dépliée`) — inondation
  depuis les bords pour le fond blanc, puis croissance de région à tolérance
  locale qui descend le dégradé de l'ombre portée sans franchir l'arête de
  l'objet, puis rattrapage des trouées de fond enfermées par les bretelles.
  Le bord est reconstruit depuis la luminance et sa couleur décontaminée,
  sans quoi un liseré blanc borde l'objet sur fond sombre.
* **désannotation** (`Image technique`) — la planche « Bag synthesis » est
  légendée en anglais : lignes de rappel, textes et pastilles numérotées sont
  effacés par inpainting. Pas de détourage ici : la face avant du second sac
  est aussi sombre que son ombre portée, aucun seuil ne les sépare.
* **conversion** (`Image stand`) — simple passage en WebP.

Dépendances : numpy, scipy, scikit-image, opencv-python, Pillow, et `cwebp`
(paquet webp de Homebrew).

    pip install numpy scipy scikit-image opencv-python Pillow
"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.segmentation import flood

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "img"
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

# Recadrage de la planche technique (repère source), et pointes des lignes de
# rappel qui donnent la position des points chauds de la section « Anatomie ».
# Quelques-unes sont recentrées à la main sur la pièce désignée plutôt que sur
# le pixel exact où la flèche touchait le sac ; `rfid` et `laptop` n'étaient
# pas légendés — posés sur la poche de bretelle et sur la face avant.
PLANCHE_CROP = (330, 52, 1345, 838)
PLANCHE_TIPS = {
    "straps": (548, 111),
    "hood-pocket": (629, 147),
    "piping": (1256, 231),
    "rfid": (401, 300),
    "cord": (512, 305),
    "fabric": (1227, 304),
    "shoulder": (386, 423),
    "trolley": (546, 474),
    "laptop": (1105, 470),
    "foam": (648, 646),
    "secret": (711, 647),
    "bottle": (768, 669),
}


def detourer(path: Path, floor: float = 45, step: float = 14) -> Image.Image:
    """Détoure un rendu posé sur fond studio blanc, ombre portée comprise."""
    rgb = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    lum = rgb @ LUMA
    h, w = lum.shape

    bg = np.zeros((h, w), bool)
    for seed in [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1),
                 (h // 2, 0), (h // 2, w - 1), (0, w // 2), (h - 1, w // 2)]:
        if not bg[seed]:
            bg |= flood(lum, seed, tolerance=70)

    # Descente du dégradé de l'ombre : une arête d'objet chute bien plus vite
    # que `step` par pixel, la croissance s'y arrête d'elle-même.
    for _ in range(400):
        near = ndimage.grey_dilation(np.where(bg, lum, -1e6), size=3)
        grow = ~bg & (near > -1e5) & (lum >= near - step) & (lum > floor)
        if not grow.any():
            break
        bg |= grow

    core = ~bg

    # Trouées de fond enfermées par l'objet (entre les bretelles) : l'inondation
    # depuis les bords ne les atteint pas. On exige qu'elles survivent à une
    # érosion — un reflet spéculaire, lui, est trop fin pour y résister.
    gaps = ndimage.binary_erosion(core & (lum > 235), iterations=1)
    lab, n = ndimage.label(gaps)
    if n:
        sizes = ndimage.sum(gaps, lab, range(1, n + 1))
        big = np.isin(lab, 1 + np.flatnonzero(sizes >= 60))
        core &= ~ndimage.binary_dilation(big, iterations=2)

    lab, n = ndimage.label(core)
    if n > 1:
        sizes = ndimage.sum(core, lab, range(1, n + 1))
        core = np.isin(lab, 1 + np.flatnonzero(sizes >= 0.0002 * h * w))

    # Bord : reconstruit depuis la luminance sur le fond blanc, simplement
    # adouci ailleurs — au contact du sol la luminance ne dit plus rien de la
    # couverture du pixel.
    inner = ndimage.binary_erosion(core, iterations=3)
    outer = ndimage.binary_dilation(core, iterations=3)
    edge = outer & ~inner
    white_near = ndimage.grey_dilation(lum, size=7) > 232
    blurred = ndimage.gaussian_filter(core.astype(np.float32), 0.6)

    # Un pixel de lisière est un mélange du fond et de l'objet : sa couverture
    # vaut (fond − lui) / (fond − objet). Les deux bornes sont relevées dans le
    # voisinage — les supposer (l'ancien barème plaçait l'objet à 215 quand le
    # sac est à 40) sature la rampe : la silhouette part en escalier et garde
    # le fond qu'elle a mêlé, d'où un liseré clair sur la nuit du hero.
    bg_lum = ndimage.grey_dilation(np.where(bg, lum, -1e6), size=7)
    bg_lum = np.where(bg_lum > -1e5, bg_lum, 255.0)
    obj_lum = ndimage.grey_erosion(np.where(core, lum, 1e6), size=5)
    obj_lum = np.where(obj_lum < 1e5, obj_lum, 0.0)
    contraste = bg_lum - obj_lum
    soft = np.clip((bg_lum - lum) / np.maximum(contraste, 1.0), 0.0, 1.0)

    # La rampe ne vaut que pour les pixels qui touchent vraiment le fond : un
    # cran plus profond, une arête claire est l'objet et non du studio qui
    # transparaît. Et sous 60 niveaux d'écart, la luminance ne sépare plus rien.
    lisiere = (ndimage.binary_dilation(core, iterations=2)
               & ~ndimage.binary_erosion(core, iterations=1))
    alpha = np.where(
        edge,
        np.where(lisiere & white_near & (contraste > 60), soft, blurred),
        core.astype(np.float32),
    )

    # Décontamination : on retire du pixel de bord la part de fond qu'il
    # contient, mesurée localement (au sol, ce fond est gris et non blanc).
    masked = np.where(bg[..., None], rgb, -1e6)
    bg_local = np.stack(
        [ndimage.grey_dilation(masked[..., c], size=7) for c in range(3)], -1
    )
    bg_local = np.where(bg_local > -1e5, bg_local, 255.0)
    mix = (edge & (alpha > 0.02) & (alpha < 1.0))[..., None]
    a = alpha[..., None]
    out = np.where(mix, (rgb - (1.0 - a) * bg_local) / np.maximum(a, 0.02), rgb)

    rgba = np.dstack([np.clip(out, 0, 255), alpha * 255.0]).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    return img.crop(img.getbbox())


def desannoter(path: Path) -> Image.Image:
    """Efface les légendes anglaises de la planche « Bag synthesis »."""
    rgb = np.asarray(Image.open(path).convert("RGB")).astype(np.int16)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = rgb @ LUMA

    # Seuil serré : les boucleries laiton (R−max(G,B) ≈ 30) ne doivent pas
    # passer pour du rouge.
    red = (r - np.maximum(g, b) > 45) & (r > 110)
    # Halo rosé des lignes, cherché seulement dans les zones quasi blanches
    # pour ne mordre ni sur le bois du bidon ni sur la doublure kaki.
    pink = (r > 200) & (g > 175) & (b > 175) & (r - np.minimum(g, b) > 6)
    navy = (b - r > 18) & (lum < 110)  # pastilles numérotées

    # Tout ce qui est sombre sans appartenir aux deux plus gros sujets est une
    # légende. Le rouge est exclu du calcul : les lignes de rappel relieraient
    # sinon les pastilles aux sacs.
    dark = (lum < 170) & ~red
    lab, n = ndimage.label(ndimage.binary_closing(dark, iterations=3))
    sizes = ndimage.sum(dark, lab, range(1, n + 1))
    bags = np.isin(lab, 1 + np.argsort(sizes)[::-1][:2])

    erase = (ndimage.binary_dilation(red | pink, iterations=2)
             | ndimage.binary_dilation((dark & ~bags) | navy, iterations=4))
    clean = cv2.inpaint(np.ascontiguousarray(rgb.astype(np.uint8)),
                        erase.astype(np.uint8), 3, cv2.INPAINT_NS)
    return Image.fromarray(clean).crop(PLANCHE_CROP)


def webp(img: Image.Image, dest: Path, quality: int) -> None:
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        img.save(tmp.name)
        subprocess.run(
            ["cwebp", "-quiet", "-m", "6", "-q", str(quality),
             "-alpha_q", "100", tmp.name, "-o", str(dest)],
            check=True,
        )
    print(f"{dest.relative_to(ROOT)}  {img.size[0]}×{img.size[1]}  "
          f"{dest.stat().st_size // 1024} ko")


def profil_silhouette(img: Image.Image, n: int = 72) -> list[float]:
    """Relève la ligne de crête du sac — c'est elle qui arrête la pluie."""
    opaque = np.asarray(img)[..., 3] > 128
    h, w = opaque.shape
    out = []
    for i in range(n):
        x0 = round(i * w / n)
        x1 = max(x0 + 1, round((i + 1) * w / n))
        rows = np.nonzero(opaque[:, x0:x1].any(axis=1))[0]
        out.append(round(rows[0] / h, 3) if len(rows) else 1)
    return out


def main() -> None:
    sac = detourer(ROOT / "Sac face avant.png")
    webp(sac, OUT / "sac-face-avant.webp", 92)

    capuche = detourer(ROOT / "Image Capuche dépliée.png")
    webp(capuche, OUT / "capuche-depliee.webp", 92)

    planche = desannoter(ROOT / "Image technique.  .png")
    webp(planche, OUT / "schema-technique.webp", 90)

    webp(Image.open(ROOT / "Image stand.png").convert("RGB"),
         OUT / "stand-salon.webp", 86)

    if "--profil" in sys.argv:
        print("\n# lib/bag-silhouette.ts — BAG_TOP_EDGE")
        print(f"# BAG_IMAGE = {{ width: {sac.size[0]}, height: {sac.size[1]} }}")
        print(json.dumps(profil_silhouette(sac)))

        print("\n# components/Anatomy.tsx — HOTSPOT_POS (%)")
        x0, y0 = PLANCHE_CROP[0], PLANCHE_CROP[1]
        w, h = PLANCHE_CROP[2] - x0, PLANCHE_CROP[3] - y0
        print(json.dumps({
            k: {"x": round((x - x0) / w * 100, 1), "y": round((y - y0) / h * 100, 1)}
            for k, (x, y) in PLANCHE_TIPS.items()
        }))


if __name__ == "__main__":
    main()

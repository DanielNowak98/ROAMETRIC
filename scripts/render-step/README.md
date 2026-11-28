# Produkt-Renderings aus STEP

Eigener STEP-Leser (`steptess.py`) und Software-Renderer (`render.py`), ohne CAD-Kernel.
Benötigt nur Python 3 mit numpy, scipy, matplotlib und Pillow.

```bash
python3 scripts/render-step/final.py ~/CAD/roametric-step public/assets/products/teile
```

In `final.py` ist je Produkt hinterlegt: STEP-Datei, zwei Ansichten (Hochachse, Drehwinkel, Neigung) und Farbe.
Neues Teil: Eintrag in `P` ergänzen, Produkt in `app/data.ts` und Texte in `app/product-details.ts` anlegen.

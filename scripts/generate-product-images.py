#!/usr/bin/env python3
"""Erzeugt einheitliche Produkt-Renderings (SVG) für alle ROAMETRIC-Beispielprodukte.

Jedes Bauteil wird als 2D-Frontprofil beschrieben und durch gestapelte Kopien
"extrudiert" — so entsteht ein ruhiger, additiv gefertigter Look in mattem Schwarz.

Aufruf:  python3 scripts/generate-product-images.py
Ausgabe: public/assets/products/<slug>.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'assets' / 'products'
W = H = 800
DX, DY = 0.9, -0.75  # Extrusionsrichtung pro Schritt (nach hinten oben rechts)

MATERIAL = {
    'PA12': ('#2b2f2c', '#1c1f1d', '#121413', '#4a504b'),
    'PETG-CF': ('#303231', '#202221', '#141515', '#55585a'),
    'ASA': ('#33373a', '#222527', '#15171a', '#5a6066'),
    'TPU': ('#262626', '#191919', '#0f0f0f', '#444444'),
}


def part(d, depth=34, kind='fill', w=0, color=None):
    """Ein extrudiertes Element. kind='fill' (Fläche, evenodd für Löcher) oder 'stroke' (Profil mit Breite w)."""
    return {'d': d, 'depth': depth, 'kind': kind, 'w': w, 'color': color}


def rrect(x, y, w, h, r):
    return f'M{x+r} {y}H{x+w-r}A{r} {r} 0 0 1 {x+w} {y+r}V{y+h-r}A{r} {r} 0 0 1 {x+w-r} {y+h}H{x+r}A{r} {r} 0 0 1 {x} {y+h-r}V{y+r}A{r} {r} 0 0 1 {x+r} {y}Z'


def circle(cx, cy, r):
    return f'M{cx-r} {cy}a{r} {r} 0 1 0 {2*r} 0a{r} {r} 0 1 0 {-2*r} 0Z'


def slots(x0, y0, cols, rows, sw, sh, gx, gy, r=None):
    r = sh / 2 if r is None else r
    return ''.join(rrect(x0 + c * gx, y0 + j * gy, sw, sh, r) for c in range(cols) for j in range(rows))


# ---------------------------------------------------------------- Produkte
PRODUCTS = {
    # BJJ & Budo
    'gi-guertel-wandhalter': ('PA12', [
        part(rrect(230, 250, 340, 250, 26) + circle(275, 295, 11) + circle(525, 295, 11), depth=24),
        part('M320 360V470Q320 545 395 545Q440 545 452 505', kind='stroke', w=34, depth=40),
        part('M480 360V470Q480 545 555 545Q600 545 612 505', kind='stroke', w=34, depth=40),
    ]),
    'mundschutz-case': ('PA12', [
        part(rrect(240, 300, 330, 210, 100) + slots(300, 360, 4, 3, 46, 14, 56, 34), depth=70),
        part('M262 340H548', kind='stroke', w=5, depth=72, color='hinge'),
    ]),
    'tape-spender-gymbag': ('PETG-CF', [
        part(circle(400, 400, 128) + circle(400, 400, 54), depth=46, color='#e9e4da'),
        part(rrect(250, 260, 300, 300, 40) + circle(400, 400, 112), depth=58),
        part('M262 560 L282 586 L302 560 L322 586 L342 560 L362 586 L382 560 L402 586 L422 560 L442 586 L462 560 L482 586 L502 560 L522 586 L538 560 Z', depth=58),
        part(rrect(380, 180, 40, 90, 14), depth=40),
    ]),
    'obi-display': ('PA12', [
        part(rrect(150, 300, 500, 90, 22) + circle(180, 345, 9) + circle(620, 345, 9), depth=26),
        *[part(rrect(210 + i * 78, 380, 34, 150, 17), depth=44) for i in range(6)],
    ]),
    'bokken-wandhalter': ('PETG-CF', [
        part('M120 395 Q400 330 690 300 L700 318 Q410 352 128 418 Z', depth=22, color='#b58c5c'),
        part('M190 300H290V420Q290 470 240 470Q190 470 190 420Z' + circle(240, 400, 30), depth=50),
        part('M500 270H600V390Q600 440 550 440Q500 440 500 390Z' + circle(550, 370, 30), depth=50),
    ]),
    'schuetzer-trockenstaender': ('PA12', [
        part(rrect(230, 520, 340, 60, 22), depth=90),
        part('M320 520V320Q320 280 350 280', kind='stroke', w=30, depth=40),
        part('M480 520V320Q480 280 450 280', kind='stroke', w=30, depth=40),
        part(slots(262, 535, 4, 1, 52, 14, 74, 0), depth=92, color='vent'),
    ]),
    # Fahrrad
    'lenker-smartphone-halter': ('PA12', [
        part(circle(400, 520, 90) + circle(400, 520, 52), depth=60),
        part(rrect(380, 380, 40, 70, 12), depth=50),
        part(rrect(280, 200, 240, 200, 28) + rrect(310, 230, 180, 140, 14), depth=40),
        part(rrect(266, 186, 50, 50, 12) + rrect(484, 186, 50, 50, 12) + rrect(266, 364, 50, 50, 12) + rrect(484, 364, 50, 50, 12), depth=46),
    ]),
    'flaschenhalter-adapter': ('PETG-CF', [
        part(rrect(330, 170, 140, 460, 60) + rrect(352, 230, 96, 22, 11) + rrect(352, 548, 96, 22, 11), depth=30),
        part(circle(400, 340, 30) + circle(400, 340, 12) + circle(400, 460, 30) + circle(400, 460, 12), depth=48),
    ]),
    'unterrohr-werkzeugbox': ('PA12', [
        part(rrect(180, 300, 440, 190, 95), depth=90),
        part('M300 300V490M500 300V490', kind='stroke', w=7, depth=92, color='hinge'),
        part(rrect(250, 380, 300, 30, 15), depth=94, color='vent'),
    ]),
    # Van
    'molle-panel-halterung': ('PA12', [
        part(rrect(210, 200, 380, 400, 22) + slots(250, 245, 3, 7, 80, 22, 104, 48), depth=26),
        part('M560 260H640V340', kind='stroke', w=30, depth=34),
    ]),
    'schubladen-sicherung': ('TPU', [
        part('M170 430 C 260 300, 340 560, 430 430 S 600 300, 640 400', kind='stroke', w=58, depth=30),
        part(circle(170, 430, 46) + circle(170, 430, 18) + circle(640, 400, 46) + circle(640, 400, 18), depth=32),
    ]),
    'gewuerzregal-modul': ('ASA', [
        part('M190 300H610V520Q610 560 570 560H230Q190 560 190 520Z' + circle(280, 420, 46) + circle(400, 420, 46) + circle(520, 420, 46), depth=80),
        part(rrect(170, 280, 460, 34, 12), depth=86),
    ]),
    # Boot
    'sonnensegel-halter': ('ASA', [
        part(circle(360, 470, 110) + circle(360, 470, 66), depth=70),
        part(rrect(440, 300, 70, 120, 30), depth=50),
        part(circle(530, 280, 72) + circle(530, 280, 38), depth=40),
    ]),
    'fender-halter-reling': ('ASA', [
        part('M300 300 A110 110 0 1 0 470 270', kind='stroke', w=44, depth=70),
        part(rrect(430, 360, 200, 70, 35) + rrect(470, 383, 120, 24, 12), depth=50),
    ]),
    'persenning-clip-set': ('PA12', [
        part('M210 360 A70 70 0 1 1 300 420', kind='stroke', w=30, depth=36),
        part('M390 330 A90 90 0 1 1 505 410', kind='stroke', w=34, depth=40),
        part('M300 560 A58 58 0 1 1 375 610', kind='stroke', w=26, depth=32),
        part('M520 560 A58 58 0 1 1 595 610', kind='stroke', w=26, depth=32),
    ]),
}


def render(slug, material, parts):
    face, side, back, edge = MATERIAL[material]
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
           '<defs>',
           '<radialGradient id="bg" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#f4efe6"/><stop offset=".65" stop-color="#e6dfd3"/><stop offset="1" stop-color="#d6cdbf"/></radialGradient>',
           f'<linearGradient id="face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{face}"/><stop offset="1" stop-color="{side}"/></linearGradient>',
           '<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>',
           '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>',
           '</defs>',
           f'<rect width="{W}" height="{H}" fill="url(#bg)"/>',
           '<ellipse cx="420" cy="628" rx="290" ry="40" fill="#3a332a" opacity=".3" filter="url(#shadow)"/>',
           '<g transform="translate(400 410) scale(1.18) translate(-400 -410)">']
    for n, p in enumerate(parts):
        pid = f'{slug}-p{n}'
        special = p['color']
        if p['kind'] == 'stroke':
            shape = f'<path id="{pid}" d="{p["d"]}" fill="none" stroke-width="{p["w"]}" stroke-linecap="round" stroke-linejoin="round"/>'
        else:
            shape = f'<path id="{pid}" d="{p["d"]}" fill-rule="evenodd"/>'
        out.append(f'<defs>{shape}</defs>')
        if special in ('hinge', 'vent'):
            # Fuge bzw. Lüftungsschlitz: dunkle Linie auf der Front, keine eigene Extrusion
            ox, oy = 0, 0
            attr = 'stroke' if p['kind'] == 'stroke' else 'fill'
            out.append(f'<use href="#{pid}" {attr}="{back}" opacity=".9"/>')
            continue
        base = special if special and special.startswith('#') else None
        side_c = base and shade(base, .72) or back
        face_c = base or 'url(#face)'
        edge_c = base and shade(base, 1.12) or edge
        attr = 'stroke' if p['kind'] == 'stroke' else 'fill'
        for i in range(p['depth'], 0, -1):
            col = side_c if i > 1 else shade_mid(side_c)
            out.append(f'<use href="#{pid}" {attr}="{col}" transform="translate({i*DX:.1f} {i*DY:.1f})"/>')
        out.append(f'<use href="#{pid}" {attr}="{face_c}"/>')
        out.append(f'<use href="#{pid}" {attr}="#000" filter="url(#grain)"/>')
        if p['kind'] == 'fill':
            out.append(f'<use href="#{pid}" fill="none" stroke="{edge_c}" stroke-width="1.6" opacity=".75"/>')
    out.append('</g></svg>')
    return '\n'.join(out)


def shade(hex_color, f):
    h = hex_color.lstrip('#')
    r, g, b = (int(h[i:i+2], 16) for i in (0, 2, 4))
    c = lambda v: max(0, min(255, int(v * f)))
    return f'#{c(r):02x}{c(g):02x}{c(b):02x}'


def shade_mid(hex_color):
    return shade(hex_color, 1.25)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (material, parts) in PRODUCTS.items():
        (OUT / f'{slug}.svg').write_text(render(slug, material, parts), encoding='utf-8')
        print('✓', slug)


if __name__ == '__main__':
    main()

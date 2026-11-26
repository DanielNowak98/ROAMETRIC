#!/usr/bin/env python3
"""Erzeugt einheitliche Produkt-Renderings (SVG) für alle ROAMETRIC-Beispielprodukte.

Jedes Bauteil wird als 2D-Frontprofil beschrieben und durch gestapelte Kopien extrudiert.
Licht kommt von oben links: Seitenflächen mit Verlauf, Fasen-Glanz an den Kanten,
matte Pulver-Oberfläche (PA12) bzw. Faserstruktur (PETG-CF), Gravur und Kontaktschatten.

Aufruf:  python3 scripts/generate-product-images.py
Ausgabe: public/assets/products/<slug>.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'public' / 'assets' / 'products'
W = H = 800
DX, DY = 0.62, -0.78  # Extrusion nach hinten oben rechts

# face-top, face-bottom, side-front, side-back, rim-highlight
MATERIAL = {
    'PA12': ('#383c39', '#1f2220', '#2a2d2b', '#0e100f', '#7d847f'),
    'PETG-CF': ('#3a3c3d', '#232526', '#2c2e2f', '#0f1011', '#8a8f93'),
    'ASA': ('#40454a', '#272a2e', '#30343a', '#111316', '#8f979f'),
    'TPU': ('#2f2f2f', '#181818', '#232323', '#0b0b0b', '#6d6d6d'),
}


def part(d, depth=34, kind='fill', w=0, tone=None, logo=None):
    """Ein extrudiertes Element.
    kind  'fill' (Fläche, evenodd für Löcher) oder 'stroke' (Profil mit Breite w)
    tone  None (Material), '#rrggbb' (eigene Farbe, z. B. Holz), 'groove' (Fuge/Schlitz)
    logo  (x, y, size[, rotation]) für eine eingravierte ROAMETRIC-Schrift"""
    return {'d': d, 'depth': depth, 'kind': kind, 'w': w, 'tone': tone, 'logo': logo}


def rrect(x, y, w, h, r):
    r = min(r, w / 2, h / 2)
    return f'M{x+r} {y}H{x+w-r}A{r} {r} 0 0 1 {x+w} {y+r}V{y+h-r}A{r} {r} 0 0 1 {x+w-r} {y+h}H{x+r}A{r} {r} 0 0 1 {x} {y+h-r}V{y+r}A{r} {r} 0 0 1 {x+r} {y}Z'


def circle(cx, cy, r):
    return f'M{cx-r} {cy}a{r} {r} 0 1 0 {2*r} 0a{r} {r} 0 1 0 {-2*r} 0Z'


def slots(x0, y0, cols, rows, sw, sh, gx, gy, r=None):
    r = sh / 2 if r is None else r
    return ''.join(rrect(x0 + c * gx, y0 + j * gy, sw, sh, r) for c in range(cols) for j in range(rows))


def screw(cx, cy, r=13):
    """Senkkopfschraube mit Kreuzschlitz (wird separat gezeichnet)."""
    return ('screw', cx, cy, r)


# ---------------------------------------------------------------- Produkte
PRODUCTS = {
    # ---- BJJ & Budo
    'gi-guertel-wandhalter': ('PA12', [
        part(rrect(220, 230, 360, 230, 34) + circle(268, 278, 12) + circle(532, 278, 12), depth=26, logo=(400, 290, 15)),
        part('M318 345V478Q318 560 398 560Q450 560 466 515', kind='stroke', w=40, depth=44),
        part('M482 345V478Q482 560 562 560Q614 560 630 515', kind='stroke', w=40, depth=44),
        part(rrect(298, 330, 40, 26, 8) + rrect(462, 330, 40, 26, 8), depth=46),
        screw(268, 278), screw(532, 278),
    ]),
    'mundschutz-case': ('PA12', [
        part(rrect(225, 300, 350, 230, 108), depth=86),
        part('M250 352H550', kind='stroke', w=4, depth=0, tone='groove'),
        part(slots(296, 388, 4, 3, 48, 13, 58, 30), depth=0, tone='groove'),
        part(rrect(372, 290, 56, 22, 10), depth=92),
        part('', depth=0, logo=(400, 505, 13)),
    ]),
    'tape-spender-gymbag': ('PETG-CF', [
        part(rrect(392, 170, 36, 110, 14) + rrect(400, 182, 20, 60, 8), depth=36),
        part(circle(410, 410, 132) + circle(410, 410, 52), depth=54, tone='#ece6da'),
        part(rrect(250, 250, 320, 320, 54) + circle(410, 410, 118), depth=66, logo=(410, 552, 13)),
        part('M262 570 ' + ' '.join(f'L{272+i*20} 598 L{282+i*20} 570' for i in range(14)) + ' L558 570 Z', depth=66),
    ]),
    'obi-display': ('PA12', [
        part(rrect(130, 285, 540, 100, 26) + circle(165, 335, 10) + circle(635, 335, 10), depth=28, logo=(400, 318, 14)),
        *[part(rrect(196 + i * 80, 372, 36, 170, 18), depth=48) for i in range(6)],
        *[part(rrect(190 + i * 80, 520, 48, 26, 12), depth=50) for i in range(6)],
        screw(165, 335, 11), screw(635, 335, 11),
    ]),
    'bokken-wandhalter': ('PETG-CF', [
        part('M95 410 Q400 345 700 292 L712 314 Q410 368 106 436 Z', depth=24, tone='#b48955'),
        part('M640 300 L700 292 L712 314 L652 322 Z', depth=24, tone='#2a1d12'),
        part('M180 280H300V420Q300 482 240 482Q180 482 180 420Z' + circle(240, 402, 36), depth=56),
        part('M490 248H610V388Q610 450 550 450Q490 450 490 388Z' + circle(550, 370, 36), depth=56),
        screw(240, 312, 10), screw(550, 280, 10),
    ]),
    'schuetzer-trockenstaender': ('PA12', [
        part(rrect(226, 578, 40, 18, 6) + rrect(534, 578, 40, 18, 6), depth=104, tone='#1a1a1a'),
        part(rrect(210, 515, 380, 70, 26), depth=110, logo=(400, 566, 12)),
        part(slots(250, 532, 5, 1, 44, 12, 62, 0), depth=0, tone='groove'),
        part('M316 515V320Q316 262 370 262', kind='stroke', w=34, depth=44),
        part('M484 515V320Q484 262 430 262', kind='stroke', w=34, depth=44),
    ]),
    # ---- Fahrrad
    'lenker-smartphone-halter': ('PA12', [
        part(circle(400, 540, 92) + circle(400, 540, 52), depth=70),
        part(circle(400, 540, 52) + circle(400, 540, 42), depth=72, tone='#151515'),
        part(rrect(372, 395, 56, 80, 14), depth=56),
        part(rrect(270, 190, 260, 215, 32) + rrect(304, 224, 192, 147, 16), depth=44, logo=(400, 392, 11)),
        part(rrect(254, 174, 56, 56, 14) + rrect(490, 174, 56, 56, 14) + rrect(254, 365, 56, 56, 14) + rrect(490, 365, 56, 56, 14), depth=52),
        screw(452, 540, 12),
    ]),
    'flaschenhalter-adapter': ('PETG-CF', [
        part(rrect(325, 150, 150, 500, 66) + rrect(350, 212, 100, 22, 11) + rrect(350, 566, 100, 22, 11), depth=34, logo=(400, 520, 11, -90)),
        part(circle(400, 336, 32) + circle(400, 336, 13) + circle(400, 464, 32) + circle(400, 464, 13), depth=54),
    ]),
    'unterrohr-werkzeugbox': ('PA12', [
        part(rrect(165, 300, 470, 200, 100), depth=100, logo=(470, 412, 15)),
        part('M300 300V500', kind='stroke', w=5, depth=0, tone='groove'),
        part(slots(330, 316, 1, 6, 270, 10, 0, 28, 5), depth=0, tone='groove'),
        part(rrect(184, 372, 70, 56, 20), depth=104),
    ]),
    # ---- Van
    'molle-panel-halterung': ('PA12', [
        part(rrect(200, 190, 400, 420, 26) + slots(242, 240, 3, 7, 84, 22, 108, 48), depth=28, logo=(400, 590, 12)),
        part('M560 235H648V330', kind='stroke', w=34, depth=36),
        part('M240 235H152V330', kind='stroke', w=34, depth=36),
    ]),
    'schubladen-sicherung': ('TPU', [
        part('M175 440 C 260 300, 340 570, 430 440 S 595 310, 630 405', kind='stroke', w=62, depth=32),
        part(circle(175, 440, 50) + circle(175, 440, 19) + circle(630, 405, 50) + circle(630, 405, 19), depth=34),
        part(circle(630, 405, 30), depth=60, tone='#2a2d2b'),
    ]),
    'gewuerzregal-modul': ('ASA', [
        part('M180 300H620V520Q620 568 572 568H228Q180 568 180 520Z' + circle(282, 430, 52) + circle(400, 430, 52) + circle(518, 430, 52), depth=94, logo=(400, 548, 12)),
        part(rrect(160, 276, 480, 38, 14), depth=100),
        part(circle(282, 430, 52) + circle(282, 430, 44) + circle(400, 430, 52) + circle(400, 430, 44) + circle(518, 430, 52) + circle(518, 430, 44), depth=0, tone='groove'),
    ]),
    # ---- Boot
    'sonnensegel-halter': ('ASA', [
        part(circle(350, 480, 116) + circle(350, 480, 68), depth=80, logo=(350, 588, 11)),
        part(rrect(432, 300, 76, 140, 30), depth=56),
        part(circle(540, 270, 78) + circle(540, 270, 40), depth=44),
        screw(470, 412, 12),
    ]),
    'fender-halter-reling': ('ASA', [
        part('M300 292 A118 118 0 1 0 480 262', kind='stroke', w=48, depth=80),
        part(rrect(420, 360, 220, 78, 39) + rrect(462, 386, 136, 26, 13), depth=56, logo=(530, 430, 9)),
    ]),
    'persenning-clip-set': ('PA12', [
        part('M200 360 A74 74 0 1 1 296 426', kind='stroke', w=32, depth=40),
        part('M388 322 A96 96 0 1 1 510 408', kind='stroke', w=36, depth=44),
        part('M292 566 A60 60 0 1 1 370 618', kind='stroke', w=28, depth=34),
        part('M520 566 A60 60 0 1 1 598 618', kind='stroke', w=28, depth=34),
    ]),
}


def shade(hex_color, f):
    h = hex_color.lstrip('#')
    r, g, b = (int(h[i:i+2], 16) for i in (0, 2, 4))
    c = lambda v: max(0, min(255, int(v * f)))
    return f'#{c(r):02x}{c(g):02x}{c(b):02x}'


def mix(a, b, t):
    a, b = a.lstrip('#'), b.lstrip('#')
    ca = [int(a[i:i+2], 16) for i in (0, 2, 4)]
    cb = [int(b[i:i+2], 16) for i in (0, 2, 4)]
    return '#' + ''.join(f'{int(x + (y - x) * t):02x}' for x, y in zip(ca, cb))


def render(slug, material, parts):
    f_top, f_bot, s_front, s_back, rim = MATERIAL[material]
    texture = 'fiber' if material == 'PETG-CF' else 'powder'
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">', '<defs>',
         '<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3eee5"/><stop offset=".62" stop-color="#e7e0d4"/><stop offset=".63" stop-color="#e2dacd"/><stop offset="1" stop-color="#d3c9ba"/></linearGradient>',
         '<radialGradient id="glow" cx="45%" cy="30%" r="60%"><stop offset="0" stop-color="#fffaf2" stop-opacity=".9"/><stop offset="1" stop-color="#fffaf2" stop-opacity="0"/></radialGradient>',
         '<filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="26"/></filter>',
         '<filter id="tight" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>',
         '<filter id="powder"><feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .09 0"/></filter>',
         '<filter id="fiber"><feTurbulence type="fractalNoise" baseFrequency="0.02 1.4" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .12 0"/></filter>',
         f'<linearGradient id="face" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="{f_top}"/><stop offset="1" stop-color="{f_bot}"/></linearGradient>',
         '<radialGradient id="spec" cx="30%" cy="22%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".13"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>',
         '</defs>',
         f'<rect width="{W}" height="{H}" fill="url(#bg)"/>',
         f'<rect width="{W}" height="{H}" fill="url(#glow)"/>',
         '<ellipse cx="430" cy="636" rx="300" ry="46" fill="#3b3329" opacity=".26" filter="url(#soft)"/>',
         '<ellipse cx="420" cy="626" rx="220" ry="16" fill="#2a241d" opacity=".32" filter="url(#tight)"/>',
         '<g transform="translate(400 410) scale(1.16) translate(-400 -410)">']
    for n, p in enumerate(parts):
        if isinstance(p, tuple) and p[0] == 'screw':
            _, cx, cy, r = p
            o.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#9aa0a3"/><circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#5d6366" stroke-width="2"/>'
                     f'<circle cx="{cx-r*.3}" cy="{cy-r*.3}" r="{r*.55}" fill="#d9dcdd" opacity=".55"/>'
                     f'<path d="M{cx-r*.55} {cy}H{cx+r*.55}M{cx} {cy-r*.55}V{cy+r*.55}" stroke="#41474a" stroke-width="{max(2, r*.22):.1f}" stroke-linecap="round"/>')
            continue
        pid = f'{slug}-p{n}'
        kind, tone, d = p['kind'], p['tone'], p['d']
        if d:
            if kind == 'stroke':
                o.append(f'<defs><path id="{pid}" d="{d}" fill="none" stroke-width="{p["w"]}" stroke-linecap="round" stroke-linejoin="round"/>'
                         f'<mask id="{pid}-m"><use href="#{pid}" stroke="#fff"/></mask></defs>')
            else:
                o.append(f'<defs><path id="{pid}" d="{d}" fill-rule="evenodd"/>'
                         f'<mask id="{pid}-m"><use href="#{pid}" fill="#fff"/></mask></defs>')
            attr = 'stroke' if kind == 'stroke' else 'fill'
            if tone == 'groove':
                o.append(f'<use href="#{pid}" {attr}="{s_back}" opacity=".95"/>')
                o.append(f'<use href="#{pid}" {attr}="{rim}" opacity=".35" transform="translate(1.2 1.6)" mask="url(#{pid}-m)"/>')
            else:
                own = tone if tone and tone.startswith('#') else None
                sb = shade(own, .45) if own else s_back
                sf = shade(own, .78) if own else s_front
                ft = shade(own, 1.04) if own else 'url(#face)'
                rm = shade(own, 1.25) if own else rim
                depth = p['depth']
                for i in range(depth, 0, -1):
                    col = mix(sf, sb, (i / depth) ** .8)
                    o.append(f'<use href="#{pid}" {attr}="{col}" transform="translate({i*DX:.2f} {i*DY:.2f})"/>')
                o.append(f'<use href="#{pid}" {attr}="{ft}"/>')
                if not own or own != '#ece6da':
                    o.append(f'<rect width="{W}" height="{H}" filter="url(#{texture})" mask="url(#{pid}-m)"/>')
                o.append(f'<rect width="{W}" height="{H}" fill="url(#spec)" mask="url(#{pid}-m)"/>')
                # Fase: heller Saum oben links, dunkler Saum unten rechts
                sw = 5 if kind == 'fill' else max(4, p['w'] * .16)
                if kind == 'fill':
                    o.append(f'<g mask="url(#{pid}-m)"><use href="#{pid}" fill="none" stroke="{rm}" stroke-width="{sw}" opacity=".55" transform="translate(2.4 2.4)"/>'
                             f'<use href="#{pid}" fill="none" stroke="#000" stroke-width="{sw}" opacity=".35" transform="translate(-2.4 -2.4)"/></g>')
                else:
                    o.append(f'<g mask="url(#{pid}-m)"><use href="#{pid}" stroke="{rm}" opacity=".22" transform="translate(-{p["w"]*.32:.1f} -{p["w"]*.32:.1f})"/>'
                             f'<use href="#{pid}" stroke="#000" opacity=".25" transform="translate({p["w"]*.36:.1f} {p["w"]*.36:.1f})"/></g>')
        if p['logo']:
            x, y, size, *rot = p['logo']
            r = f' transform="rotate({rot[0]} {x} {y})"' if rot else ''
            o.append(f'<g{r}><text x="{x+0.8}" y="{y+0.8}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="{size}" letter-spacing="{size*.38:.1f}" fill="{rim}" opacity=".35">ROAMETRIC</text>'
                     f'<text x="{x}" y="{y}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="{size}" letter-spacing="{size*.38:.1f}" fill="#0b0c0c" opacity=".75">ROAMETRIC</text></g>')
    o.append('</g></svg>')
    return '\n'.join(o)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, (material, parts) in PRODUCTS.items():
        (OUT / f'{slug}.svg').write_text(render(slug, material, parts), encoding='utf-8')
        print('✓', slug)


if __name__ == '__main__':
    main()

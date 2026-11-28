"""Software-Renderer für tessellierte Bauteile: Painter-Algorithmus mit Supersampling, Studio-Licht, Bodenschatten."""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

BG_TOP = np.array([243, 238, 229]); BG_MID = np.array([231, 224, 212]); BG_BOT = np.array([211, 201, 186])


def background(W, H):
    y = np.linspace(0, 1, H)[:, None]
    c = np.where(y < .62, BG_TOP + (BG_MID - BG_TOP) * (y / .62), BG_MID + (BG_BOT - BG_MID) * ((y - .62) / .38))
    img = np.repeat(c[:, None, :], W, axis=1).reshape(H, W, 3)
    yy, xx = np.mgrid[0:H, 0:W]
    d = np.hypot((xx - W * .45) / (W * .6), (yy - H * .3) / (H * .6))
    glow = np.clip(1 - d, 0, 1)[..., None] ** 1.5
    img = img + (np.array([255, 250, 242]) - img) * glow * .8
    return img


def look_rot(azim, elev):
    """Rotation: Weltkoordinaten -> Kamera (x rechts, y oben, z zum Betrachter)."""
    a, e = math.radians(azim), math.radians(elev)
    Rz = np.array([[math.cos(a), -math.sin(a), 0], [math.sin(a), math.cos(a), 0], [0, 0, 1]])
    Rx = np.array([[1, 0, 0], [0, math.cos(e), -math.sin(e)], [0, math.sin(e), math.cos(e)]])
    # Welt z = oben -> Kamera y
    base = np.array([[1, 0, 0], [0, 0, 1], [0, -1, 0]])
    return Rx @ base @ Rz


def render(bodies, out, size=1200, ss=3, azim=-35, elev=28, up=np.eye(3), colors=None, fill=0.72, spin=0.0):
    W = H = size * ss
    tris = []; nrms = []; cols = []
    for i, b in enumerate(bodies):
        t = b['tris'] @ up.T; n = b['nrms'] @ up.T
        c = colors[i] if colors and i < len(colors) else (b['color'] or (0.22, 0.23, 0.22))
        tris.append(t); nrms.append(n); cols.append(np.repeat([c], len(t), 0))
    T = np.concatenate(tris); N = np.concatenate(nrms); C = np.concatenate(cols)
    # Auf Boden stellen (z min = 0), zentrieren
    allp = T.reshape(-1, 3)
    mn, mx = allp.min(0), allp.max(0)
    ctr = (mn + mx) / 2
    T = T - [ctr[0], ctr[1], mn[2]]
    R = look_rot(azim, elev)
    P = T @ R.T
    Nc = N @ R.T
    # Bodenschatten: Projektion entlang Lichtrichtung auf z=0 (Welt)
    Lw = np.array([0.35, -0.25, 1.0]); Lw /= np.linalg.norm(Lw)
    Tf = T.reshape(-1, 3)
    S = Tf - Lw[None] * (Tf[:, 2:3] / Lw[2])
    S[:, 2] = 0
    Ps = (S @ R.T).reshape(-1, 3, 3)
    # Einpassen
    pts2 = np.concatenate([P.reshape(-1, 3)[:, :2], Ps.reshape(-1, 3)[:, :2]])
    lo, hi = pts2.min(0), pts2.max(0)
    span = (hi - lo).max()
    sc = W * fill / span
    off = np.array([W / 2, H * 0.52]) - (lo + hi) / 2 * [sc, -sc]

    def to_px(Q):
        x = Q[..., 0] * sc + off[0]
        y = -Q[..., 1] * sc + off[1]
        return np.stack([x, y], -1)

    img = Image.fromarray(background(W, H).astype(np.uint8))
    # Schatten
    sh = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(sh)
    for tri in to_px(Ps):
        d.polygon([tuple(p) for p in tri], fill=255)
    sh_soft = sh.filter(ImageFilter.GaussianBlur(radius=W * 0.012))
    sh_tight = sh.filter(ImageFilter.GaussianBlur(radius=W * 0.003))
    base = np.asarray(img, float)
    m = np.asarray(sh_soft, float)[..., None] / 255 * 0.28 + np.asarray(sh_tight, float)[..., None] / 255 * 0.12
    base = base * (1 - m) + np.array([58, 50, 40]) * m
    img = Image.fromarray(base.clip(0, 255).astype(np.uint8))
    # Schattierung
    nrm = Nc.mean(1)
    nl = np.linalg.norm(nrm, axis=1, keepdims=True); nl[nl == 0] = 1; nrm /= nl
    facing = nrm[:, 2] < 0
    nrm[facing] *= -1
    view = np.array([0, 0, 1.0])
    key = np.array([-0.45, 0.6, 0.65]); key /= np.linalg.norm(key)
    fillL = np.array([0.7, 0.1, 0.5]); fillL /= np.linalg.norm(fillL)
    rim = np.array([0.2, 0.5, -0.8]); rim /= np.linalg.norm(rim)
    dk = np.clip(nrm @ key, 0, 1); df = np.clip(nrm @ fillL, 0, 1)
    hvec = key + view; hvec /= np.linalg.norm(hvec)
    spec = np.clip(nrm @ hvec, 0, 1) ** 28
    fres = (1 - np.clip(nrm @ view, 0, 1)) ** 3
    sky = 0.5 + 0.5 * nrm[:, 1]
    lum = 0.30 + 0.62 * dk + 0.18 * df + 0.10 * sky
    colr = C * lum[:, None] + spec[:, None] * 0.22 + fres[:, None] * 0.10
    colr = np.clip(colr, 0, 1)
    # Painter: nach Tiefe sortieren (weit weg zuerst)
    depth = P[:, :, 2].mean(1)
    order = np.argsort(depth)
    px = to_px(P)
    d = ImageDraw.Draw(img)
    cc = (colr * 255).astype(np.uint8)
    for i in order:
        tri = px[i]
        c = tuple(int(v) for v in cc[i])
        d.polygon([tuple(p) for p in tri], fill=c, outline=c)
    img = img.resize((size, size), Image.LANCZOS)
    img.save(out, quality=88)
    return img

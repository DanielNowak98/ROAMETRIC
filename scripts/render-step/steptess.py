"""Minimaler STEP (AP203/AP214) B-Rep-Leser mit Tessellierung.

Unterstützt: PLANE, CYLINDRICAL/CONICAL/SPHERICAL/TOROIDAL_SURFACE, B_SPLINE_SURFACE (auch rational),
Kanten LINE, CIRCLE, ELLIPSE, B_SPLINE_CURVE (auch rational), SURFACE_CURVE/SEAM_CURVE, TRIMMED_CURVE (teilweise),
Baugruppen über REPRESENTATION_RELATIONSHIP_WITH_TRANSFORMATION und MAPPED_ITEM.
Ergebnis: Liste von (Dreiecke Nx3x3, Normalen Nx3x3, Farbe) je Körper.
"""
import re, math, sys
import numpy as np
from scipy.interpolate import BSpline
from scipy.spatial import Delaunay, cKDTree
from matplotlib.path import Path

TAU = 2 * math.pi

# ------------------------------------------------------------------ Parser
def parse_args(s, i=0):
    """Parst eine Argumentliste ab s[i]=='(' und gibt (liste, neues_i) zurück."""
    assert s[i] == '('
    i += 1
    out = []
    n = len(s)
    while i < n:
        c = s[i]
        if c in ' \n\r\t,':
            i += 1
        elif c == ')':
            return out, i + 1
        elif c == '(':
            sub, i = parse_args(s, i)
            out.append(sub)
        elif c == "'":
            j = i + 1
            buf = []
            while True:
                if s[j] == "'":
                    if j + 1 < n and s[j + 1] == "'":
                        buf.append("'"); j += 2; continue
                    break
                buf.append(s[j]); j += 1
            out.append(('str', ''.join(buf)))
            i = j + 1
        elif c == '#':
            j = i + 1
            while s[j].isdigit():
                j += 1
            out.append(('ref', int(s[i + 1:j])))
            i = j
        elif c == '.':
            j = s.index('.', i + 1)
            out.append(('enum', s[i + 1:j]))
            i = j + 1
        elif c in '$*':
            out.append(None)
            i += 1
        elif c.isalpha():
            j = i
            while s[j].isalnum() or s[j] == '_':
                j += 1
            name = s[i:j]
            while s[j] in ' \n\r\t':
                j += 1
            sub, i = parse_args(s, j)
            out.append(('typed', name, sub))
        else:
            j = i
            while s[j] not in ',)':
                j += 1
            tok = s[i:j].strip()
            try:
                out.append(float(tok))
            except ValueError:
                out.append(tok)
            i = j
    raise ValueError('unterminated')


class Step:
    def __init__(self, path):
        txt = open(path, encoding='latin-1').read()
        data = txt[txt.index('DATA;') + 5: txt.rindex('ENDSEC')]
        # Kommentare entfernen
        data = re.sub(r'/\*.*?\*/', '', data, flags=re.S)
        self.ent = {}
        for m in re.finditer(r"#(\d+)\s*=\s*", data):
            pass
        # Anweisungen sauber trennen (Semikolon außerhalb von Strings)
        stmts = []
        buf_start = 0
        in_str = False
        i = 0
        n = len(data)
        while i < n:
            c = data[i]
            if c == "'":
                in_str = not in_str
            elif c == ';' and not in_str:
                stmts.append(data[buf_start:i])
                buf_start = i + 1
            i += 1
        for st in stmts:
            st = st.strip()
            if not st.startswith('#'):
                continue
            eq = st.index('=')
            eid = int(st[1:eq])
            rhs = st[eq + 1:].strip()
            if rhs.startswith('('):
                # komplexe Entität: (A(..) B(..) ...)
                parts = {}
                inner = rhs[1:-1].strip()
                j = 0
                while j < len(inner):
                    if inner[j].isspace():
                        j += 1; continue
                    k = j
                    while inner[k].isalnum() or inner[k] == '_':
                        k += 1
                    name = inner[j:k]
                    while inner[k].isspace():
                        k += 1
                    args, k = parse_args(inner, k)
                    parts[name] = args
                    j = k
                self.ent[eid] = ('complex', parts)
            else:
                p = rhs.index('(')
                name = rhs[:p].strip()
                args, _ = parse_args(rhs, p)
                self.ent[eid] = (name, args)
        self.cache = {}

    def get(self, ref):
        if isinstance(ref, tuple) and ref[0] == 'ref':
            ref = ref[1]
        return self.ent[ref]

    def by_type(self, t):
        return [k for k, v in self.ent.items() if v[0] == t]

    # --------------------------------------------- Grundobjekte
    def point(self, ref):
        t, a = self.get(ref)
        if t == 'CARTESIAN_POINT':
            c = a[1]
            return np.array(list(c) + [0.0] * (3 - len(c)), float)
        if t == 'VERTEX_POINT':
            return self.point(a[1])
        raise ValueError(t)

    def direction(self, ref):
        t, a = self.get(ref)
        v = np.array(a[1], float)
        if len(v) < 3:
            v = np.concatenate([v, [0] * (3 - len(v))])
        return v / np.linalg.norm(v)

    def placement(self, ref):
        """4x4-Matrix eines AXIS2_PLACEMENT_3D."""
        key = ('pl', ref[1] if isinstance(ref, tuple) else ref)
        if key in self.cache:
            return self.cache[key]
        t, a = self.get(ref)
        o = self.point(a[1])
        z = self.direction(a[2]) if len(a) > 2 and a[2] is not None else np.array([0, 0, 1.0])
        x = self.direction(a[3]) if len(a) > 3 and a[3] is not None else None
        if x is None:
            x = np.array([1.0, 0, 0]) if abs(z[0]) < 0.9 else np.array([0, 1.0, 0])
        x = x - z * np.dot(x, z)
        x /= np.linalg.norm(x)
        y = np.cross(z, x)
        M = np.eye(4)
        M[:3, 0], M[:3, 1], M[:3, 2], M[:3, 3] = x, y, z, o
        self.cache[key] = M
        return M


# ------------------------------------------------------------------ B-Splines
def expand_knots(mults, knots):
    out = []
    for m, k in zip(mults, knots):
        out += [k] * int(m)
    return np.array(out, float)


def bspline_basis(knots, deg, ts):
    ts = np.clip(ts, knots[deg], knots[-deg - 1] - 1e-12 * (knots[-1] - knots[0] + 1))
    return BSpline.design_matrix(ts, knots, deg).toarray()


class Curve:
    """Parametrische 3D-Kurve: eval(t) -> Nx3, domain (t0, t1), periodic."""


def make_curve(S, ref):
    t, a = S.get(ref)
    if t == 'complex':
        parts = a
        if 'B_SPLINE_CURVE' in parts:
            bc = parts['B_SPLINE_CURVE']
            deg = int(bc[0]); pts = np.array([S.point(p) for p in bc[1]])
            kn = parts['B_SPLINE_CURVE_WITH_KNOTS']
            knots = expand_knots(kn[0], kn[1])
            w = np.array(parts['RATIONAL_B_SPLINE_CURVE'][0], float) if 'RATIONAL_B_SPLINE_CURVE' in parts else None
            return ('bspline', deg, pts, knots, w)
        raise ValueError('complex curve ' + str(list(parts)))
    if t == 'LINE':
        p = S.point(a[1]); vt, va = S.get(a[2]); d = S.direction(va[1])
        return ('line', p, d)
    if t == 'CIRCLE':
        return ('ellipse', S.placement(a[1]), float(a[2]), float(a[2]))
    if t == 'ELLIPSE':
        return ('ellipse', S.placement(a[1]), float(a[2]), float(a[3]))
    if t == 'B_SPLINE_CURVE_WITH_KNOTS':
        deg = int(a[1]); pts = np.array([S.point(p) for p in a[2]])
        knots = expand_knots(a[6], a[7])
        return ('bspline', deg, pts, knots, None)
    if t in ('SURFACE_CURVE', 'SEAM_CURVE'):
        return make_curve(S, a[1])
    if t == 'TRIMMED_CURVE':
        return make_curve(S, a[1])
    if t == 'POLYLINE':
        return ('poly', np.array([S.point(p) for p in a[1]]))
    raise ValueError('curve ' + t)


def eval_curve(c, ts):
    k = c[0]
    if k == 'line':
        return c[1][None] + ts[:, None] * c[2][None]
    if k == 'ellipse':
        M, r1, r2 = c[1], c[2], c[3]
        loc = np.stack([r1 * np.cos(ts), r2 * np.sin(ts), np.zeros_like(ts), np.ones_like(ts)], 1)
        return (loc @ M.T)[:, :3]
    if k == 'bspline':
        _, deg, pts, knots, w = c
        N = bspline_basis(knots, deg, ts)
        if w is None:
            return N @ pts
        Nw = N * w[None]
        return (Nw @ pts) / Nw.sum(1, keepdims=True)
    raise ValueError(k)


def curve_param(c, p):
    """Parameter des Punkts p auf Kurve c (Projektion)."""
    k = c[0]
    if k == 'line':
        return float(np.dot(p - c[1], c[2]))
    if k == 'ellipse':
        M, r1, r2 = c[1], c[2], c[3]
        q = np.linalg.inv(M) @ np.append(p, 1)
        return math.atan2(q[1] / r2, q[0] / r1)
    if k == 'bspline':
        knots, deg = c[3], c[1]
        t0, t1 = knots[deg], knots[-deg - 1]
        ts = np.linspace(t0, t1, 400)
        pts = eval_curve(c, ts)
        i = int(np.argmin(((pts - p) ** 2).sum(1)))
        lo, hi = ts[max(i - 1, 0)], ts[min(i + 1, len(ts) - 1)]
        for _ in range(3):
            ts2 = np.linspace(lo, hi, 40)
            pts2 = eval_curve(c, ts2)
            j = int(np.argmin(((pts2 - p) ** 2).sum(1)))
            lo, hi = ts2[max(j - 1, 0)], ts2[min(j + 1, 39)]
        return float((lo + hi) / 2)
    raise ValueError(k)


def sample_edge(S, edge_ref, seg_len):
    """Polyline einer EDGE_CURVE von v1 nach v2."""
    t, a = S.get(edge_ref)
    assert t == 'EDGE_CURVE', t
    p1 = S.point(a[1]); p2 = S.point(a[2])
    c = make_curve(S, a[3])
    same = a[4][1] == 'T'
    if c[0] == 'line':
        n = 2
        return np.stack([p1, p2])
    if c[0] == 'poly':
        return c[1]
    a1, b1 = (p1, p2) if same else (p2, p1)
    closed = np.linalg.norm(p1 - p2) < 1e-6
    if c[0] == 'ellipse':
        t0 = curve_param(c, a1); t1 = curve_param(c, b1)
        if closed:
            t1 = t0 + TAU
        else:
            while t1 <= t0 + 1e-9:
                t1 += TAU
        r = max(c[2], c[3])
        n = max(4, int(abs(t1 - t0) / math.radians(5)) + 1, int(abs(t1 - t0) * r / seg_len) + 1)
        ts = np.linspace(t0, t1, n)
    else:
        knots, deg = c[3], c[1]
        if closed:
            t0, t1 = knots[deg], knots[-deg - 1]
        else:
            t0 = curve_param(c, a1); t1 = curve_param(c, b1)
        ts0 = np.linspace(t0, t1, 60)
        L = np.linalg.norm(np.diff(eval_curve(c, ts0), axis=0), axis=1).sum()
        n = max(8, min(400, int(L / seg_len) + 1))
        ts = np.linspace(t0, t1, n)
    pts = eval_curve(c, ts)
    pts[0], pts[-1] = a1, b1
    if not same:
        pts = pts[::-1]
    return pts


# ------------------------------------------------------------------ Flächen
class Surface:
    def __init__(self, S, ref):
        t, a = S.get(ref)
        self.kind = None
        if t == 'complex':
            parts = a
            bs = parts['B_SPLINE_SURFACE']
            self._bspline(S, int(bs[0]), int(bs[1]), bs[2], parts['B_SPLINE_SURFACE_WITH_KNOTS'], parts.get('RATIONAL_B_SPLINE_SURFACE'))
            return
        if t == 'PLANE':
            self.kind = 'plane'; self.M = S.placement(a[1])
        elif t == 'CYLINDRICAL_SURFACE':
            self.kind = 'cyl'; self.M = S.placement(a[1]); self.r = float(a[2])
        elif t == 'CONICAL_SURFACE':
            self.kind = 'cone'; self.M = S.placement(a[1]); self.r = float(a[2]); self.ang = float(a[3])
        elif t == 'SPHERICAL_SURFACE':
            self.kind = 'sphere'; self.M = S.placement(a[1]); self.r = float(a[2])
        elif t == 'TOROIDAL_SURFACE':
            self.kind = 'torus'; self.M = S.placement(a[1]); self.R = float(a[2]); self.r = float(a[3])
        elif t == 'B_SPLINE_SURFACE_WITH_KNOTS':
            self._bspline(S, int(a[1]), int(a[2]), a[3], [a[8], a[9], a[10], a[11]], None)
        else:
            raise ValueError('surface ' + t)
        if hasattr(self, 'M'):
            self.Minv = np.linalg.inv(self.M)

    def _bspline(self, S, du, dv, grid, kn, rat):
        self.kind = 'bspline'
        self.du, self.dv = du, dv
        self.P = np.array([[S.point(p) for p in row] for row in grid])
        self.uk = expand_knots(kn[0], kn[2]); self.vk = expand_knots(kn[1], kn[3])
        self.W = np.array(rat[0], float) if rat else None
        self.u0, self.u1 = self.uk[du], self.uk[-du - 1]
        self.v0, self.v1 = self.vk[dv], self.vk[-dv - 1]
        # Grobes Raster für die Inversion
        us = np.linspace(self.u0, self.u1, 60); vs = np.linspace(self.v0, self.v1, 60)
        U, V = np.meshgrid(us, vs, indexing='ij')
        self.grid_uv = np.stack([U.ravel(), V.ravel()], 1)
        self.grid_pts = self.eval(self.grid_uv)
        self.tree = cKDTree(self.grid_pts)

    @property
    def periodic_u(self):
        return self.kind in ('cyl', 'cone', 'sphere', 'torus')

    def eval(self, uv):
        u, v = uv[:, 0], uv[:, 1]
        k = self.kind
        if k == 'bspline':
            Nu = bspline_basis(self.uk, self.du, u); Nv = bspline_basis(self.vk, self.dv, v)
            if self.W is None:
                return np.einsum('ni,ijc,nj->nc', Nu, self.P, Nv)
            num = np.einsum('ni,ijc,ij,nj->nc', Nu, self.P, self.W, Nv)
            den = np.einsum('ni,ij,nj->n', Nu, self.W, Nv)
            return num / den[:, None]
        if k == 'plane':
            loc = np.stack([u, v, 0 * u], 1)
        elif k == 'cyl':
            loc = np.stack([self.r * np.cos(u), self.r * np.sin(u), v], 1)
        elif k == 'cone':
            rr = self.r + v * math.tan(self.ang)
            loc = np.stack([rr * np.cos(u), rr * np.sin(u), v], 1)
        elif k == 'sphere':
            loc = np.stack([self.r * np.cos(v) * np.cos(u), self.r * np.cos(v) * np.sin(u), self.r * np.sin(v)], 1)
        elif k == 'torus':
            rr = self.R + self.r * np.cos(v)
            loc = np.stack([rr * np.cos(u), rr * np.sin(u), self.r * np.sin(v)], 1)
        return loc @ self.M[:3, :3].T + self.M[:3, 3]

    def normal(self, uv):
        e = 1e-5
        if self.kind == 'bspline':
            eu = (self.u1 - self.u0) * 1e-5; ev = (self.v1 - self.v0) * 1e-5
        else:
            eu = ev = e
        du = self.eval(uv + [eu, 0]) - self.eval(uv - [eu, 0])
        dv = self.eval(uv + [0, ev]) - self.eval(uv - [0, ev])
        n = np.cross(du, dv)
        l = np.linalg.norm(n, axis=1, keepdims=True)
        l[l < 1e-20] = 1
        return n / l

    def invert(self, pts):
        """3D-Punkte -> (u,v). Für periodische Flächen u in (-pi, pi]."""
        k = self.kind
        if k == 'bspline':
            _, idx = self.tree.query(pts)
            uv = self.grid_uv[idx].copy()
            su, sv = (self.u1 - self.u0) / 59, (self.v1 - self.v0) / 59
            for it in range(12):
                f = self.eval(uv)
                eu, ev = su * 1e-3, sv * 1e-3
                Su = (self.eval(uv + [eu, 0]) - f) / eu
                Sv = (self.eval(uv + [0, ev]) - f) / ev
                r = pts - f
                a11 = (Su * Su).sum(1); a12 = (Su * Sv).sum(1); a22 = (Sv * Sv).sum(1)
                b1 = (Su * r).sum(1); b2 = (Sv * r).sum(1)
                det = a11 * a22 - a12 * a12
                det[np.abs(det) < 1e-18] = 1e-18
                dU = (a22 * b1 - a12 * b2) / det; dV = (a11 * b2 - a12 * b1) / det
                dU = np.clip(dU, -su * 2, su * 2); dV = np.clip(dV, -sv * 2, sv * 2)
                uv[:, 0] = np.clip(uv[:, 0] + dU, self.u0, self.u1)
                uv[:, 1] = np.clip(uv[:, 1] + dV, self.v0, self.v1)
            return uv
        loc = np.c_[pts, np.ones(len(pts))] @ self.Minv.T
        x, y, z = loc[:, 0], loc[:, 1], loc[:, 2]
        if k == 'plane':
            return np.stack([x, y], 1)
        u = np.arctan2(y, x)
        if k in ('cyl', 'cone'):
            return np.stack([u, z], 1)
        if k == 'sphere':
            return np.stack([u, np.arctan2(z, np.hypot(x, y))], 1)
        if k == 'torus':
            rho = np.hypot(x, y) - self.R
            return np.stack([u, np.arctan2(z, rho)], 1)

    def metric(self):
        """Skalierung (su, sv), damit uv-Abstände ungefähr Millimetern entsprechen."""
        k = self.kind
        if k == 'plane':
            return 1.0, 1.0
        if k == 'cyl':
            return self.r, 1.0
        if k == 'cone':
            return max(self.r, 1.0), 1.0
        if k == 'sphere':
            return self.r, self.r
        if k == 'torus':
            return self.R + self.r, self.r
        uvs = self.grid_uv.reshape(60, 60, 2); p = self.grid_pts.reshape(60, 60, 3)
        lu = np.linalg.norm(np.diff(p, axis=0), axis=2).sum(0).mean() / max(self.u1 - self.u0, 1e-12)
        lv = np.linalg.norm(np.diff(p, axis=1), axis=2).sum(1).mean() / max(self.v1 - self.v0, 1e-12)
        return max(lu, 1e-9), max(lv, 1e-9)


def unwrap(a):
    return np.unwrap(a)


def resample_poly(P, h):
    """Polygon (geschlossen) auf maximale Segmentlänge h verfeinern."""
    out = []
    n = len(P)
    for i in range(n):
        a = P[i]; b = P[(i + 1) % n]
        L = np.linalg.norm(b - a)
        k = max(1, int(math.ceil(L / h)))
        for j in range(k):
            out.append(a + (b - a) * j / k)
    return np.array(out)


def poly_area(P):
    x, y = P[:, 0], P[:, 1]
    return 0.5 * (np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1)))


def tessellate_face(S, face_ref, h):
    t, a = S.get(face_ref)
    bounds, surf_ref = a[1], a[2]
    same_sense = a[3][1] == 'T'
    surf = Surface(S, surf_ref)
    loops3d = []
    for b in bounds:
        bt, ba = S.get(b)
        lt, la = S.get(ba[1])
        orient = ba[2][1] == 'T'
        if lt == 'VERTEX_LOOP':
            continue
        if lt == 'POLY_LOOP':
            pts = np.array([S.point(p) for p in la[1]])
        else:
            segs = []
            for oe in la[1]:
                ot, oa = S.get(oe)
                pts = sample_edge(S, oa[3], h)
                if oa[4][1] != 'T':
                    pts = pts[::-1]
                segs.append(pts[:-1])
            pts = np.concatenate(segs) if segs else np.zeros((0, 3))
        if not orient:
            pts = pts[::-1]
        if len(pts) >= 2:
            loops3d.append(pts)
    if not loops3d:
        return None
    su, sv = surf.metric()
    uvloops = []
    for L in loops3d:
        uv = surf.invert(L)
        if surf.periodic_u:
            uv[:, 0] = np.unwrap(uv[:, 0])
        if surf.kind == 'torus':
            uv[:, 1] = np.unwrap(uv[:, 1])
        uvloops.append(uv)

    flip = 1.0 if same_sense else -1.0
    # Wickelnde Schleifen (laufen einmal um die Achse)
    wrap, normal_loops = [], []
    for uv in uvloops:
        close = (uv[0, 0] - uv[-1, 0] + math.pi) % TAU - math.pi
        du = uv[-1, 0] - uv[0, 0] + close
        if surf.periodic_u and abs(abs(du) - TAU) < 0.5:
            wrap.append((uv, np.sign(du)))
        else:
            normal_loops.append(uv)

    scale = np.array([su, sv])
    hu = h  # Zielkantenlänge in mm

    if wrap:
        # Region zwischen wickelnden Schleifen (bzw. Schleife und Pol)
        ugrid = np.linspace(0, TAU, max(24, int(TAU * su / hu) + 1))
        curves = []
        for uv, sgn in wrap:
            u = np.mod(uv[:, 0], TAU); v = uv[:, 1]
            o = np.argsort(u)
            uu = np.r_[u[o] - TAU, u[o], u[o] + TAU]; vv = np.r_[v[o], v[o], v[o]]
            vg = np.interp(ugrid, uu, vv)
            # Material links der Laufrichtung (bzgl. Flächennormale): +u-Lauf -> Region bei größerem v
            side = sgn * flip
            curves.append((vg, side))
        if len(curves) >= 2:
            curves.sort(key=lambda c: c[0].mean())
            lo, hi = curves[0][0], curves[-1][0]
        else:
            vg, side = curves[0]
            if surf.kind == 'cone':
                apex = -surf.r / math.tan(surf.ang) if abs(math.tan(surf.ang)) > 1e-9 else vg.mean()
                other = np.full_like(vg, apex)
            elif surf.kind == 'sphere':
                other = np.full_like(vg, math.pi / 2 if side > 0 else -math.pi / 2)
            elif surf.kind == 'torus':
                other = vg + (TAU if side > 0 else -TAU)
            else:
                return None
            lo, hi = (vg, other) if other.mean() > vg.mean() else (other, vg)
        outer = np.r_[np.c_[ugrid, lo], np.c_[ugrid[::-1], hi[::-1]]]
        holes = []
        for uv in normal_loops:
            sh = np.floor(uv[:, 0].mean() / TAU) * TAU
            holes.append(uv - [sh, 0])
    else:
        areas = [abs(poly_area(uv * scale)) for uv in normal_loops]
        oi = int(np.argmax(areas))
        outer = normal_loops[oi]
        holes = [l for i, l in enumerate(normal_loops) if i != oi]

    # In metrischen uv-Raum skalieren, Rand verfeinern
    outer_s = resample_poly(outer * scale, hu)
    holes_s = [resample_poly(hl * scale, hu) for hl in holes]
    pts = [outer_s] + holes_s
    # Innere Rasterpunkte (nur für gekrümmte Flächen nötig)
    if surf.kind != 'plane':
        mn, mx = outer_s.min(0), outer_s.max(0)
        gx = np.arange(mn[0] + hu / 2, mx[0], hu); gy = np.arange(mn[1] + hu / 2, mx[1], hu)
        if len(gx) * len(gy) < 200000 and len(gx) and len(gy):
            G = np.stack(np.meshgrid(gx, gy), -1).reshape(-1, 2)
            pts.append(G)
    allp = np.concatenate(pts)
    allp = np.unique(np.round(allp, 6), axis=0)
    if len(allp) < 3:
        return None
    try:
        tri = Delaunay(allp)
    except Exception:
        return None
    simp = tri.simplices
    cen = allp[simp].mean(1)
    inside = Path(outer_s).contains_points(cen, radius=1e-9)
    for hl in holes_s:
        inside &= ~Path(hl).contains_points(cen)
    # Innere Rasterpunkte zu nah am Rand entfernen sich selbst über Delaunay; Dreiecke filtern
    simp = simp[inside]
    if not len(simp):
        return None
    uv = allp / scale
    P3 = surf.eval(uv)
    N3 = surf.normal(uv) * flip
    return P3[simp], N3[simp]


# ------------------------------------------------------------------ Struktur / Baugruppen
def solids_with_transforms(S):
    """Liefert [(face_refs, 4x4, farbe)] je Körper, mit Baugruppen-Transformation."""
    E = S.ent
    # Farben je Körper/Fläche
    colour = {}
    for k, (t, a) in E.items():
        if t in ('STYLED_ITEM', 'OVER_RIDING_STYLED_ITEM'):
            target = a[2][1] if isinstance(a[2], tuple) else None
            rgb = find_rgb(S, a[1])
            if target is not None and rgb is not None:
                colour[target] = rgb
    # Repräsentationen -> Items
    rep_items = {}
    for k, (t, a) in E.items():
        if t in ('ADVANCED_BREP_SHAPE_REPRESENTATION', 'SHAPE_REPRESENTATION', 'MANIFOLD_SURFACE_SHAPE_REPRESENTATION', 'FACETED_BREP_SHAPE_REPRESENTATION'):
            rep_items[k] = [x[1] for x in a[1] if isinstance(x, tuple) and x[0] == 'ref']
    # Kanten: child_rep -> (parent_rep, T)
    parents = {}
    for k, (t, a) in E.items():
        if t == 'SHAPE_REPRESENTATION_RELATIONSHIP':
            r1, r2 = a[2][1], a[3][1]
            # gleiche Geometrie, keine Transformation (verknüpft Brep-Rep mit Shape-Rep)
            parents.setdefault(r2, []).append((r1, np.eye(4)))
            parents.setdefault(r1, []).append((r2, np.eye(4)))
        if t == 'complex' and 'REPRESENTATION_RELATIONSHIP_WITH_TRANSFORMATION' in a:
            rr = a['REPRESENTATION_RELATIONSHIP']
            r1, r2 = rr[2][1], rr[3][1]
            top = a['REPRESENTATION_RELATIONSHIP_WITH_TRANSFORMATION'][0]
            tt, ta = S.get(top)
            if tt == 'ITEM_DEFINED_TRANSFORMATION':
                A = S.placement(ta[2]); B = S.placement(ta[3])
                T = B @ np.linalg.inv(A)
            else:
                T = np.eye(4)
            parents.setdefault(r1, []).append((r2, T, 'child'))
    # Wurzel-Repräsentationen: die nicht Kind sind
    child_of = {}
    for r1, lst in parents.items():
        for e in lst:
            if len(e) == 3:
                child_of.setdefault(r1, []).append((e[0], e[1]))
    # Gleichwertige Reps (SRR) gruppieren
    def world_transforms(rep, seen=None):
        seen = seen or set()
        if rep in seen:
            return [np.eye(4)]
        seen = seen | {rep}
        group = [rep] + [e[0] for e in parents.get(rep, []) if len(e) == 2]
        res = []
        for g in group:
            for par, T in child_of.get(g, []):
                for W in world_transforms(par, seen | set(group)):
                    res.append(W @ T)
        return res or [np.eye(4)]

    out = []
    for k, (t, a) in E.items():
        if t not in ('MANIFOLD_SOLID_BREP', 'SHELL_BASED_SURFACE_MODEL', 'BREP_WITH_VOIDS', 'FACETED_BREP'):
            continue
        faces = []
        shells = [a[1]] if t != 'SHELL_BASED_SURFACE_MODEL' else a[1]
        for sh in shells:
            st, sa = S.get(sh)
            faces += [f[1] for f in sa[1]]
        rep = next((r for r, items in rep_items.items() if k in items), None)
        Ts = world_transforms(rep) if rep is not None else [np.eye(4)]
        col = colour.get(k)
        for T in Ts:
            out.append((faces, T, col, k))
    # MAPPED_ITEM (z. B. eingebettete Unterbaugruppen): bereits über Relationship abgedeckt
    return out


def find_rgb(S, assigns):
    stack = list(assigns) if isinstance(assigns, list) else [assigns]
    seen = 0
    while stack and seen < 50:
        seen += 1
        x = stack.pop()
        if isinstance(x, list):
            stack += x; continue
        if not (isinstance(x, tuple) and x[0] == 'ref'):
            continue
        t, a = S.get(x)
        if t == 'COLOUR_RGB':
            return (float(a[1]), float(a[2]), float(a[3]))
        for y in a if isinstance(a, list) else []:
            stack.append(y)
    return None


def load(path, h=0.6, log=True):
    S = Step(path)
    bodies = []
    fails = 0
    total = 0
    for faces, T, col, sid in solids_with_transforms(S):
        tris, nrms = [], []
        for f in faces:
            total += 1
            try:
                r = tessellate_face(S, ('ref', f), h)
            except Exception as e:
                r = None
            if r is None:
                fails += 1
                continue
            tris.append(r[0]); nrms.append(r[1])
        if not tris:
            continue
        P = np.concatenate(tris); N = np.concatenate(nrms)
        P = (np.c_[P.reshape(-1, 3), np.ones(P.size // 3)] @ T.T)[:, :3].reshape(-1, 3, 3)
        N = (N.reshape(-1, 3) @ T[:3, :3].T).reshape(-1, 3, 3)
        bodies.append({'tris': P, 'nrms': N, 'color': col, 'id': sid})
    if log:
        print(f'{path.split("/")[-1]}: Körper {len(bodies)}, Flächen {total}, fehlgeschlagen {fails}, Dreiecke {sum(len(b["tris"]) for b in bodies)}', file=sys.stderr)
    return bodies


if __name__ == '__main__':
    load(sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 0.6)

"""Rendert Produktbilder aus STEP-Dateien.

Aufruf: python3 scripts/render-step/final.py <STEP-Ordner> public/assets/products/teile [slug ...]
Die STEP-Dateien müssen so heißen wie in der Tabelle P (ohne .step).
"""
import sys, os, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from render import render
import steptess
ups = {'z': np.eye(3), 'y': np.array([[1,0,0],[0,0,-1],[0,1,0]]), 'x': np.array([[0,0,-1],[0,1,0],[1,0,0]])}
DARK = (0.24, 0.25, 0.245); WHITE = (0.90, 0.90, 0.88)
# slug: (datei, [(up, azim, elev), ...], farbe oder None = aus Datei)
P = {
 'garmin-edge-1050-halter':        ('Garmin_1050', [('z', -35, 28), ('y', 145, 22)], DARK),
 'garmin-edge-1050-halter-minimal':('Garmin_1050_minimal', [('z', -35, 28), ('y', 145, 22)], DARK),
 'garmin-stirnlampen-lock-mount':  ('Garmin_x_Headlamp_lock_mount', [('y', -35, 28), ('z', -35, 28)], DARK),
 'ruecklichthalter':               ('Rücklichthalter_V2', [('y', -35, 28), ('z', -35, 28)], DARK),
 'canyon-bike-toolbox':            ('Canyon_Bike_Toolbox_V2', [('x', -35, 28), ('x', 145, 28)], DARK),
 'garmin-rugged-case':             ('Garmin_Case_-_rugged_Box', [('z', -35, 32), ('z', 145, 32)], DARK),
 'garmin-hrm-box':                 ('Garmin_HRM_Box_Base_V1', [('z', -35, 28), ('y', 145, 22)], None),
 'motorboot-sonnensegelhalter':    ('Baugruppe_Motorboot_Sonnensegelhalter', [('y', -35, 28), ('z', -35, 28)], WHITE),
 'einschraubeinsatz-sonnensegel':  ('Einschraubeinsatz_für_Sonnensegel', [('x', -35, 28), ('z', -35, 28)], WHITE),
 'persenning-versteifungshalter':  ('Halter_für_Persenning_Versteifung', [('z', -35, 28), ('y', -35, 28)], WHITE),
 'rucksack-spender':               ('Rucksack-Spender-v2', [('z', -35, 28), ('y', -35, 28)], DARK),
}
step_dir, out = sys.argv[1], sys.argv[2]
only = sys.argv[3:] or list(P)
for slug in only:
    f, views, col = P[slug]
    b = steptess.load(os.path.join(step_dir, f + '.step'), 0.6)
    cols = [col] * len(b) if col else None
    for i, (up, az, el) in enumerate(views):
        render(b, f'{out}/{slug}{"" if i == 0 else "-2"}.webp', size=1200, ss=3, azim=az, elev=el, up=ups[up], colors=cols, fill=0.7)
    print('✓', slug, file=sys.stderr)

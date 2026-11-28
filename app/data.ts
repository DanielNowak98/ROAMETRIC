export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Richtpreis in Euro. Ohne Angabe: „Preis auf Anfrage“. */
  price?: number;
  material: string;
  desc: string;
  color: string;
  image?: string;
  imagePosition?: string;
  imageSize?: string;
  badge?: string;
  /** Weitere Ansichten für die Galerie. */
  images?: string[];
  /** Messwerte wie Abmessungen oder Gewicht. Nur echte, gemessene Werte eintragen. */
  specs?: { label: string; value: string }[];
};

export type MaterialInfo = { code: string; name: string; process: string; traits: string[] };

/** Allgemeine Werkstoffeigenschaften. Produktspezifische Prüfwerte gehören in `specs`. */
export const materials: Record<string, MaterialInfo> = {
  PA11: { code: 'PA11', name: 'Polyamid 11', process: 'Pulverbettverfahren (MJF / SLS)', traits: ['Biobasiert aus Rizinusöl', 'Sehr zäh und bruchdehnbar', 'Schlagfest auch bei Kälte'] },
  PA12: { code: 'PA12', name: 'Polyamid 12', process: 'Pulverbettverfahren (SLS / MJF)', traits: ['Zäh und schlagfest', 'Geringe Feuchtigkeitsaufnahme', 'Gute Chemikalienbeständigkeit', 'Isotrope, dichte Bauteile'] },
  'PETG-CF': { code: 'PETG-CF', name: 'PETG carbonfaserverstärkt', process: 'Extrusion (FFF)', traits: ['Hohe Steifigkeit', 'Formstabil', 'Matte Oberfläche', 'Witterungsbeständig'] },
  ASA: { code: 'ASA', name: 'Acrylnitril-Styrol-Acrylat', process: 'Extrusion (FFF)', traits: ['UV-beständig', 'Für den Außeneinsatz', 'Temperaturstabil'] },
  TPU: { code: 'TPU', name: 'Thermoplastisches Polyurethan', process: 'Extrusion (FFF)', traits: ['Elastisch', 'Dämpfend', 'Abriebfest'] },
};

export const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

export type Category = { slug: string; name: string; kicker: string; icon: string; intro: string };

export const categories: Category[] = [
  { slug: 'bjj', name: 'BJJ & Budo', kicker: 'Ordnung auf und neben der Matte.', icon: 'J', intro: 'Durchdachte Helfer für Training, Dojo und Gear — für BJJ, Jiu-Jitsu, Judo, Karate und alle Budo-Künste.' },
  { slug: 'fahrrad', name: 'Fahrrad', kicker: 'Cleverer. Leichter. Weiter.', icon: 'F', intro: 'Passgenaue Halter und Boxen, die klapperfrei am Rad sitzen.' },
  { slug: 'van', name: 'Van', kicker: 'Ordnung. Ausbau. Freiheit.', icon: 'V', intro: 'Modulare Lösungen für Ausbau und Organisation im Camper.' },
  { slug: 'boot', name: 'Boot', kicker: 'Gemacht für Wind & Wasser.', icon: 'B', intro: 'Robuste Teile für Sonnensegel, Persenning und Ausrüstung an Bord.' },
];

export function categoryBySlug(slug: string | null | undefined) {
  return categories.find((category) => category.slug === slug?.toLowerCase());
}

export function categorySlug(name: string) {
  return categories.find((category) => category.name === name)?.slug ?? name.toLowerCase();
}

export const products: Product[] = [
  // ROAMETRIC-Teile aus den eigenen CAD-Daten. Bilder: gerendert aus den STEP-Dateien (scripts/render-step/).
  // Preise noch offen: ohne `price` zeigt die Seite „Preis auf Anfrage“.
  {
    slug: 'garmin-edge-1050-halter',
    name: 'Out-Front-Halter Edge 1050',
    category: 'Fahrrad',
    material: 'PA12',
    desc: 'Vorbauhalter für den Garmin Edge 1050 mit leichter Fachwerk-Struktur — der Computer sitzt mittig vor dem Lenker.',
    color: '#252725',
    image: '/assets/products/teile/garmin-edge-1050-halter.webp',
    images: ['/assets/products/teile/garmin-edge-1050-halter-2.webp'],
    badge: 'Neu',
  },
  {
    slug: 'garmin-edge-1050-halter-minimal',
    name: 'Out-Front-Halter Edge 1050 Minimal',
    category: 'Fahrrad',
    material: 'PA12',
    desc: 'Die reduzierte Variante des Edge-1050-Halters: offener Steg statt Fachwerk, schlank und unauffällig.',
    color: '#252725',
    image: '/assets/products/teile/garmin-edge-1050-halter-minimal.webp',
    images: ['/assets/products/teile/garmin-edge-1050-halter-minimal-2.webp'],
  },
  {
    slug: 'garmin-stirnlampen-lock-mount',
    name: 'Lock-Mount für Garmin & Stirnlampe',
    category: 'Fahrrad',
    material: 'PA11',
    desc: 'Kompakter Adapter, der eine Stirnlampe sicher mit einer Garmin-kompatiblen Halterung verbindet — verriegelt statt nur gesteckt.',
    color: '#252725',
    image: '/assets/products/teile/garmin-stirnlampen-lock-mount.webp',
    images: ['/assets/products/teile/garmin-stirnlampen-lock-mount-2.webp'],
  },
  {
    slug: 'ruecklichthalter',
    name: 'Rücklichthalter V2',
    category: 'Fahrrad',
    material: 'PA11',
    desc: 'Halter mit Klemmprofil und Ausleger, der das Rücklicht dort positioniert, wo es gesehen wird.',
    color: '#252725',
    image: '/assets/products/teile/ruecklichthalter.webp',
    images: ['/assets/products/teile/ruecklichthalter-2.webp'],
  },
  {
    slug: 'canyon-bike-toolbox',
    name: 'Toolbox für Canyon-Rahmen',
    category: 'Fahrrad',
    material: 'PA12',
    desc: 'Formschlüssige Werkzeugbox mit Deckel für den Rahmen — Platz für Schlauch, Heber und Multitool.',
    color: '#252725',
    image: '/assets/products/teile/canyon-bike-toolbox.webp',
    images: ['/assets/products/teile/canyon-bike-toolbox-2.webp'],
  },
  {
    slug: 'garmin-rugged-case',
    name: 'Rugged Case für Garmin',
    category: 'Fahrrad',
    material: 'PA12',
    desc: 'Robuste Schutzbox mit verschraubtem Deckel und passgenauer Aufnahme für ein Garmin-Gerät.',
    color: '#252725',
    image: '/assets/products/teile/garmin-rugged-case.webp',
    images: ['/assets/products/teile/garmin-rugged-case-2.webp'],
  },
  {
    slug: 'garmin-hrm-box',
    name: 'Aufbewahrungsbox für Garmin HRM',
    category: 'Fahrrad',
    material: 'PA12',
    desc: 'Box mit Deckel für den Herzfrequenz-Brustgurt — Gurt und Sensor bleiben geschützt und an einem Ort.',
    color: '#252725',
    image: '/assets/products/teile/garmin-hrm-box.webp',
    images: ['/assets/products/teile/garmin-hrm-box-2.webp'],
  },
  {
    slug: 'rucksack-spender',
    name: 'Rucksack-Spender',
    category: 'BJJ & Budo',
    material: 'PA12',
    desc: 'Runder Spender mit Montageplatte zur Befestigung an Rucksack oder Gym Bag — Kleinkram griffbereit statt im Taschenboden.',
    color: '#252725',
    image: '/assets/products/teile/rucksack-spender.webp',
    images: ['/assets/products/teile/rucksack-spender-2.webp'],
    badge: 'Neu',
  },
  {
    slug: 'motorboot-sonnensegelhalter',
    name: 'Sonnensegelhalter für Motorboote',
    category: 'Boot',
    material: 'PA12',
    desc: 'Zweiteilige Baugruppe aus Rohrschelle und Aufnahmeblock, mit der sich ein Sonnensegel am Rohrgestell anschlagen lässt.',
    color: '#252725',
    image: '/assets/products/teile/motorboot-sonnensegelhalter.webp',
    images: ['/assets/products/teile/motorboot-sonnensegelhalter-2.webp'],
    badge: 'Neu',
  },
  {
    slug: 'einschraubeinsatz-sonnensegel',
    name: 'Einschraubeinsatz für Sonnensegel',
    category: 'Boot',
    material: 'PA12',
    desc: 'Rohraufnahme mit seitlichem Gewindezapfen — die Verbindung zwischen Gestell und Sonnensegel-Befestigung.',
    color: '#252725',
    image: '/assets/products/teile/einschraubeinsatz-sonnensegel.webp',
    images: ['/assets/products/teile/einschraubeinsatz-sonnensegel-2.webp'],
  },
  {
    slug: 'persenning-versteifungshalter',
    name: 'Halter für Persenning-Versteifung',
    category: 'Boot',
    material: 'PA12',
    desc: 'Kompakter Halteblock mit Durchgangsbohrung, der eine Versteifungsstange der Persenning sicher aufnimmt.',
    color: '#252725',
    image: '/assets/products/teile/persenning-versteifungshalter.webp',
    images: ['/assets/products/teile/persenning-versteifungshalter-2.webp'],
  },
];

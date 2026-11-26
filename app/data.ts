export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  material: string;
  desc: string;
  color: string;
  image?: string;
  imagePosition?: string;
  imageSize?: string;
  badge?: string;
  /** Messwerte wie Abmessungen oder Gewicht. Nur echte, gemessene Werte eintragen. */
  specs?: { label: string; value: string }[];
};

export type MaterialInfo = { code: string; name: string; process: string; traits: string[] };

/** Allgemeine Werkstoffeigenschaften. Produktspezifische Prüfwerte gehören in `specs`. */
export const materials: Record<string, MaterialInfo> = {
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
  // BEISPIELPRODUKTE: Namen, Preise, Material und Texte sind Platzhalter – bitte durch echte Produkte ersetzen.
  // Bilder: Renderings aus scripts/generate-product-images.py. Für echte Fotos `image` auf z. B. '/assets/products/<datei>.webp' ändern.
  {
    slug: 'gi-guertel-wandhalter',
    name: 'Gi & Gürtel Wandhalter',
    category: 'BJJ & Budo',
    price: 24.9,
    material: 'PA12',
    desc: 'Wandhalter für Gi und Gürtel, damit dein Gear nach dem Training ordentlich hängt und schnell trocknet.',
    color: '#252725',
    image: '/assets/products/gi-guertel-wandhalter.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'mundschutz-case',
    name: 'Mundschutz Case',
    category: 'BJJ & Budo',
    price: 14.9,
    material: 'PA12',
    desc: 'Belüftetes, kompaktes Case für den Mundschutz – passt in jede Gym Bag.',
    color: '#252725',
    image: '/assets/products/mundschutz-case.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'tape-spender-gymbag',
    name: 'Tape-Spender für die Gym Bag',
    category: 'BJJ & Budo',
    price: 17.9,
    material: 'PETG-CF',
    desc: 'Robuster Spender für Finger- und Sporttape mit integrierter Abreißkante, griffbereit am Bag.',
    color: '#252725',
    image: '/assets/products/tape-spender-gymbag.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'obi-display',
    name: 'Obi-Display für Gürtelgrade',
    category: 'BJJ & Budo',
    price: 34.9,
    material: 'PA12',
    desc: 'Wandleiste mit sechs Aufnahmen, die deinen Weg vom ersten bis zum aktuellen Gürtel zeigt.',
    color: '#252725',
    image: '/assets/products/obi-display.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'bokken-wandhalter',
    name: 'Bokken & Jo Wandhalter',
    category: 'BJJ & Budo',
    price: 29.9,
    material: 'PETG-CF',
    desc: 'Halterpaar für Bokken, Jo und Hanbo — sichere, gepolsterte Auflage an der Wand von Dojo oder Zuhause.',
    color: '#252725',
    image: '/assets/products/bokken-wandhalter.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'schuetzer-trockenstaender',
    name: 'Schützer-Trockenständer',
    category: 'BJJ & Budo',
    price: 22.9,
    material: 'PA12',
    desc: 'Belüfteter Ständer, auf dem Hand-, Fuß- und Schienbeinschützer nach dem Training schnell trocknen.',
    color: '#252725',
    image: '/assets/products/schuetzer-trockenstaender.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'lenker-smartphone-halter',
    name: 'Lenker Smartphone-Halter',
    category: 'Fahrrad',
    price: 29.9,
    material: 'PA12',
    desc: 'Vibrationsarme Smartphone-Aufnahme für gängige Lenkerdurchmesser, werkzeuglos montiert.',
    color: '#252725',
    image: '/assets/products/lenker-smartphone-halter.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'flaschenhalter-adapter',
    name: 'Flaschenhalter-Adapter',
    category: 'Fahrrad',
    price: 19.9,
    material: 'PETG-CF',
    desc: 'Adapter für zusätzliche Flaschen- oder Werkzeughalter an Rahmen ohne Gewindebohrungen.',
    color: '#252725',
    image: '/assets/products/flaschenhalter-adapter.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'unterrohr-werkzeugbox',
    name: 'Unterrohr Werkzeugbox',
    category: 'Fahrrad',
    price: 39.9,
    material: 'PA12',
    desc: 'Klapperfreie Box für Schlauch, Pumpe und Multitool direkt am Unterrohr.',
    color: '#252725',
    image: '/assets/products/unterrohr-werkzeugbox.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'molle-panel-halterung',
    name: 'MOLLE-Panel Halterung',
    category: 'Van',
    price: 29.9,
    material: 'PA12',
    desc: 'Modulare Halterung für MOLLE-Panels an Wand, Tür oder Heckklappe im Camper.',
    color: '#252725',
    image: '/assets/products/molle-panel-halterung.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'schubladen-sicherung',
    name: 'Schubladen-Sicherung',
    category: 'Van',
    price: 14.9,
    material: 'TPU',
    desc: 'Flexible Sicherung, die Schubladen und Klappen während der Fahrt zuverlässig geschlossen hält.',
    color: '#252725',
    image: '/assets/products/schubladen-sicherung.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'gewuerzregal-modul',
    name: 'Gewürzregal Modul',
    category: 'Van',
    price: 34.9,
    material: 'ASA',
    desc: 'Erweiterbares Regalmodul für Gewürze und Kleinteile in der Camperküche.',
    color: '#252725',
    image: '/assets/products/gewuerzregal-modul.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'sonnensegel-halter',
    name: 'Sonnensegel-Halter',
    category: 'Boot',
    price: 39.9,
    material: 'ASA',
    desc: 'UV-beständige Aufnahme für Sonnensegel an Reling oder Bimini-Gestell.',
    color: '#252725',
    image: '/assets/products/sonnensegel-halter.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'fender-halter-reling',
    name: 'Fender-Halter für die Reling',
    category: 'Boot',
    price: 24.9,
    material: 'ASA',
    desc: 'Schneller Klemmhalter, der Fender an der Reling verstaut und griffbereit hält.',
    color: '#252725',
    image: '/assets/products/fender-halter-reling.svg',
    badge: 'Beispiel',
  },
  {
    slug: 'persenning-clip-set',
    name: 'Persenning-Clip Set',
    category: 'Boot',
    price: 19.9,
    material: 'PA12',
    desc: 'Set aus formstabilen Clips zur sicheren Befestigung von Persenning und Abdeckungen.',
    color: '#252725',
    image: '/assets/products/persenning-clip-set.svg',
    badge: 'Beispiel',
  },
];

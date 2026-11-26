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
  { slug: 'bjj', name: 'BJJ', kicker: 'Ordnung auf und neben der Matte.', icon: 'J', intro: 'Durchdachte Helfer für Training, Gym und Gear rund um Brazilian Jiu Jitsu.' },
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
  // Für ein Produktfoto `image: '/assets/products/<datei>.webp'` ergänzen; ohne Bild erscheint ein Platzhalter.
  {
    slug: 'gi-guertel-wandhalter',
    name: 'Gi & Gürtel Wandhalter',
    category: 'BJJ',
    price: 24.9,
    material: 'PA12',
    desc: 'Wandhalter für Gi und Gürtel, damit dein Gear nach dem Training ordentlich hängt und schnell trocknet.',
    color: '#252725',
    badge: 'Beispiel',
  },
  {
    slug: 'mundschutz-case',
    name: 'Mundschutz Case',
    category: 'BJJ',
    price: 14.9,
    material: 'PA12',
    desc: 'Belüftetes, kompaktes Case für den Mundschutz – passt in jede Gym Bag.',
    color: '#252725',
    badge: 'Beispiel',
  },
  {
    slug: 'tape-spender-gymbag',
    name: 'Tape-Spender für die Gym Bag',
    category: 'BJJ',
    price: 17.9,
    material: 'PETG-CF',
    desc: 'Robuster Spender für Finger- und Sporttape mit integrierter Abreißkante, griffbereit am Bag.',
    color: '#252725',
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
    badge: 'Beispiel',
  },
];

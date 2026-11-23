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
};

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
  {
    slug: 'canyon-bike-toolbox-v2',
    name: 'Canyon Bike Toolbox V2',
    category: 'Fahrrad',
    price: 49.9,
    material: 'PA12',
    desc: 'Passgenaue Werkzeugbox für den geschützten und klapperfreien Transport am Canyon Bike.',
    color: '#252725',
    image: '/assets/products/canyon-bike-toolbox-v2.webp',
    badge: 'Neu',
  },
  {
    slug: 'ruecklichthalter-v2',
    name: 'Rücklichthalter V2',
    category: 'Fahrrad',
    price: 24.9,
    material: 'PA12',
    desc: 'Kompakter Rücklichthalter mit formschlüssiger Aufnahme und hoher Vibrationsfestigkeit.',
    color: '#252725',
    image: '/assets/products/ruecklichthalter-v2.webp',
    badge: 'Neu',
  },
  {
    slug: 'motorboot-sonnensegelhalter',
    name: 'Motorboot Sonnensegelhalter',
    category: 'Boot',
    price: 39.9,
    material: 'PA12',
    desc: 'Robuste Aufnahme für Sonnensegel-Systeme auf dem Motorboot, ausgelegt für den mobilen Einsatz.',
    color: '#252725',
    image: '/assets/products/motorboot-sonnensegelhalter.webp',
    badge: 'Bestseller',
  },
  {
    slug: 'einschraubeinsatz-sonnensegel',
    name: 'Einschraubeinsatz für Sonnensegel',
    category: 'Boot',
    price: 19.9,
    material: 'PA12',
    desc: 'Präziser Einschraubeinsatz für eine sichere und wiederholgenaue Sonnensegel-Montage.',
    color: '#252725',
    image: '/assets/products/einschraubeinsatz-sonnensegel.webp',
  },
  {
    slug: 'halter-persenning-versteifung',
    name: 'Halter für Persenning-Versteifung',
    category: 'Boot',
    price: 29.9,
    material: 'PA12',
    desc: 'Formstabiler Halter zur zuverlässigen Positionierung einer Persenning-Versteifung.',
    color: '#252725',
    image: '/assets/products/halter-persenning-versteifung.webp',
  },
  {
    slug: 'railhook-modular',
    name: 'Molle Panel Halterung',
    category: 'Van',
    price: 29.9,
    material: 'PA12',
    desc: 'Robuste, modulare Halterung für MOLLE-Panels und mobile Ausbaukonzepte.',
    color: '#252725',
    image: '/assets/roametric-products-new-style.png',
    imagePosition: '0% 0%',
    imageSize: '200% 200%',
  },
  // ENTWURF: BJJ-Beispielprodukte – Namen, Preise, Material und Texte bitte prüfen.
  // Sobald Fotos vorliegen, `image: '/assets/products/<datei>.webp'` ergänzen.
  {
    slug: 'gi-guertel-wandhalter',
    name: 'Gi & Gürtel Wandhalter',
    category: 'BJJ',
    price: 24.9,
    material: 'PA12',
    desc: 'Wandhalter für Gi und Gürtel, damit dein Gear nach dem Training ordentlich hängt und schnell trocknet.',
    color: '#252725',
    badge: 'Bald verfügbar',
  },
  {
    slug: 'mundschutz-case',
    name: 'Mundschutz Case',
    category: 'BJJ',
    price: 14.9,
    material: 'PA12',
    desc: 'Belüftetes, kompaktes Case für den Mundschutz – passt in jede Gym Bag.',
    color: '#252725',
    badge: 'Bald verfügbar',
  },
  {
    slug: 'tape-spender-gymbag',
    name: 'Tape-Spender für die Gym Bag',
    category: 'BJJ',
    price: 17.9,
    material: 'PETG-CF',
    desc: 'Robuster Spender für Finger- und Sporttape mit integrierter Abreißkante, griffbereit am Bag.',
    color: '#252725',
    badge: 'Bald verfügbar',
  },
];

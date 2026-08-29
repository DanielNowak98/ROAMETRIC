export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  material: string;
  desc: string;
  color: string;
  image: string;
  imagePosition?: string;
  imageSize?: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: 'canyon-bike-toolbox-v2',
    name: 'Canyon Bike Toolbox V2',
    category: 'Bike',
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
    category: 'Bike',
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
    category: 'Marine',
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
    category: 'Marine',
    price: 19.9,
    material: 'PA12',
    desc: 'Präziser Einschraubeinsatz für eine sichere und wiederholgenaue Sonnensegel-Montage.',
    color: '#252725',
    image: '/assets/products/einschraubeinsatz-sonnensegel.webp',
  },
  {
    slug: 'halter-persenning-versteifung',
    name: 'Halter für Persenning-Versteifung',
    category: 'Marine',
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
  {
    slug: 'trailmount-360',
    name: 'SandTrax Bergungshilfe',
    category: 'Outdoor',
    price: 89.9,
    material: 'PETG-CF',
    desc: 'Topologieoptimierte, robuste Montagebasis für Bergungs- und Outdoor-Setups.',
    color: '#252725',
    image: '/assets/roametric-products-new-style.png',
    imagePosition: '100% 100%',
    imageSize: '200% 200%',
  },
];

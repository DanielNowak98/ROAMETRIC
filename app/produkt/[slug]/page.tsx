import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { runtimeValue } from '../../../lib/runtime';
import { products } from '../../data';
import ProductClient from './product-client';

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) return { title: 'Produkt nicht gefunden', openGraph: { images: [] }, twitter: { images: [] } };
  const title = product.name;
  const description = `${product.desc} Gefertigt aus ${product.material} für ${product.category}.`;
  const origin = runtimeValue('SITE_URL');
  const imagePath = `/assets/roametric-products-new-style${product.imageSheet === 2 ? '-2' : ''}.png`;
  const image = origin ? new URL(imagePath, origin).toString() : undefined;
  return { title, description, openGraph: { title, description, images: image ? [{ url: image, alt: product.name }] : [] }, twitter: { card: 'summary_large_image', title, description, images: image ? [image] : [] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return <ProductClient product={product}/>;
}

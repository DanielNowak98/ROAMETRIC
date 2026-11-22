import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './logo.css';
import './shop-system.css';
import './new-style.css';
const sans = Geist({ variable: '--font-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export function generateMetadata(): Metadata {
  const title = 'ROAMETRIC — Precision for the Journey';
  const description = 'Durchdachte, präzise gefertigte Produkte für Van, Marine, Bike und Outdoor.';
  const configuredOrigin = process.env.SITE_URL;
  const image = configuredOrigin ? new URL('/og.png', configuredOrigin).toString() : undefined;
  return { title: { default: title, template: '%s | ROAMETRIC' }, description, icons: { icon: '/favicon.svg' }, openGraph: { title, description, type: 'website', images: image ? [{ url: image, width: 1680, height: 945, alt: 'ROAMETRIC — Precision for the Journey' }] : undefined }, twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined } };
}
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {return <html lang="de"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}

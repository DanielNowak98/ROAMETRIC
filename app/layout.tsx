import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import './logo.css';
import './shop-system.css';
import './new-style.css';
import './v3.css';
export function generateMetadata(): Metadata {
  const title = 'ROAMETRIC — Precision for the Journey';
  const description = 'Durchdachte, präzise gefertigte Produkte für BJJ, Fahrrad, Van und Boot.';
  const configuredOrigin = process.env.SITE_URL;
  const image = configuredOrigin ? new URL('/og.png', configuredOrigin).toString() : undefined;
  return { title: { default: title, template: '%s | ROAMETRIC' }, description, icons: { icon: '/favicon.svg' }, openGraph: { title, description, type: 'website', images: image ? [{ url: image, width: 1680, height: 945, alt: 'ROAMETRIC — Precision for the Journey' }] : undefined }, twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined } };
}
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {return <html lang="de"><body>{children}</body></html>}

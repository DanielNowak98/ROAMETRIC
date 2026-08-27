import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const sans = Geist({ variable: '--font-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
export const metadata: Metadata = { title: { default: 'ROAMETRIC — Precision for the Journey', template: '%s | ROAMETRIC' }, description: 'Funktionale, präzise entwickelte Bauteile für Van, Marine, Bike und Outdoor.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {return <html lang="de"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}

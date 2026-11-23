import type { Metadata } from 'next';
import { Footer, Header } from '../ui';
import InquiryClient from './inquiry-client';

export const metadata: Metadata = { title: 'Anfrage', description: 'Produkte auswählen, Kontaktdaten angeben und unverbindlich bei ROAMETRIC anfragen.' };

export default function InquiryPage() {
  return <><Header/><main className="inquiry-page">
    <section className="shop-hero"><div className="shell"><p className="eyebrow light">UNVERBINDLICH ANFRAGEN</p><h1>ANFRAGE</h1><p>Produkte auswählen · Kontaktdaten angeben · Angebot erhalten</p></div></section>
    <InquiryClient/>
  </main><Footer/></>;
}

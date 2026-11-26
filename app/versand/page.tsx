import type { Metadata } from 'next';
import { LegalPage } from '../legal-page';
import { DEFAULT_LEAD_TIME } from '../data';

export const metadata: Metadata = { title: 'Versand & Zahlung' };

// Werte entsprechen der serverseitigen Preisberechnung in lib/stripe.ts.
export default function Versand() {
  return <LegalPage path="/versand" eyebrow="SERVICE" title="Versand & Zahlung">
    <div className="ship-cards">
      <article><small>STANDARD</small><b>4,90 €</b><p>Kostenlos ab 75 € Bestellwert</p></article>
      <article><small>EXPRESS</small><b>9,90 €</b><p>Schnellerer Versand nach Fertigung</p></article>
      <article><small>FERTIGUNG</small><b>{DEFAULT_LEAD_TIME}</b><p>Jedes Teil wird für dich gefertigt und geprüft</p></article>
    </div>
    <h2>Lieferländer</h2>
    <p>Wir liefern nach Deutschland, Österreich und in die Schweiz. Bei Lieferungen in die Schweiz können zusätzlich Zölle und Einfuhrabgaben anfallen.</p>
    <h2>Zahlungsarten</h2>
    <p>Die Zahlung erfolgt sicher über Stripe. Je nach Gerät und Land stehen PayPal, Kredit- und Debitkarten sowie Apple Pay und Google Pay zur Verfügung. ROAMETRIC sieht oder speichert keine Zahlungsdaten.</p>
    <h2>Ablauf</h2>
    <ol className="legal-toc"><li><b>01</b>Bestellung und Zahlung über Stripe</li><li><b>02</b>Bestellbestätigung per E-Mail</li><li><b>03</b>Fertigung und Qualitätsprüfung</li><li><b>04</b>Versand mit Sendungsverfolgung</li></ol>
  </LegalPage>;
}

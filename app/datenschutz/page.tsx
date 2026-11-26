import type { Metadata } from 'next';
import { LegalPage, Placeholder } from '../legal-page';

export const metadata: Metadata = { title: 'Datenschutz' };

export default function Datenschutz() {
  return <LegalPage path="/datenschutz" eyebrow="RECHTLICHES" title="Datenschutz­erklärung">
    <Placeholder>Datenschutzerklärung mit einem Generator (z. B. eRecht24 oder IT-Recht Kanzlei) erstellen und hier einfügen. Die folgende Liste zeigt, welche Dienste und Datenverarbeitungen der Shop technisch nutzt und die deshalb darin vorkommen müssen.</Placeholder>
    <h2>Im Shop eingesetzte Dienste</h2>
    <dl className="spec-table">
      <div><dt>Hosting</dt><dd>[Eigener Server bzw. Hosting-Anbieter, ggf. Cloudflare Tunnel]</dd></div>
      <div><dt>Zahlungsabwicklung</dt><dd>Stripe Payments Europe Ltd. — Zahlungs-, Rechnungs- und Lieferadresse, gewählte Zahlungsart (inkl. PayPal, Karten, Wallets)</dd></div>
      <div><dt>E-Mail-Versand</dt><dd>Resend — Bestell- und Versandbestätigungen an die angegebene E-Mail-Adresse</dd></div>
      <div><dt>Bestelldaten</dt><dd>Speicherung von Bestellung, Kontakt- und Versanddaten zur Vertragsabwicklung</dd></div>
      <div><dt>Lokaler Speicher</dt><dd>Der Warenkorb wird im Browser (localStorage) gespeichert, nicht auf dem Server</dd></div>
      <div><dt>Cookies</dt><dd>Nur ein technisch notwendiges Sitzungs-Cookie für den internen Admin-Bereich; keine Tracking- oder Marketing-Cookies</dd></div>
      <div><dt>Schriften</dt><dd>Geist über next/font — [prüfen: lokal vom eigenen Server ausgeliefert, keine Verbindung zu Google]</dd></div>
    </dl>
    <h2>Verantwortlicher</h2>
    <p>[Name, Anschrift, E-Mail — wie im Impressum]</p>
  </LegalPage>;
}

import type { Metadata } from 'next';
import { LegalPage, Placeholder } from '../legal-page';

export const metadata: Metadata = { title: 'Impressum' };

export default function Impressum() {
  return <LegalPage path="/impressum" eyebrow="RECHTLICHES" title="Impressum">
    <Placeholder>Alle Angaben in eckigen Klammern durch die echten Daten ersetzen und vor dem Livegang rechtlich prüfen lassen.</Placeholder>
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>ROAMETRIC<br/>[Vor- und Nachname bzw. Firmenname mit Rechtsform]<br/>[Straße Hausnummer]<br/>[PLZ Ort]<br/>Deutschland</p>
    <h2>Kontakt</h2>
    <p>E-Mail: <a href="mailto:hello@roametric.de">hello@roametric.de</a><br/>Telefon: [Telefonnummer]</p>
    <h2>Umsatzsteuer</h2>
    <p>[Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG — oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG]</p>
    <h2>Verantwortlich für den Inhalt</h2>
    <p>[Name, Anschrift]</p>
    <h2>Verbraucherstreitbeilegung</h2>
    <p>[Hinweis, ob Bereitschaft oder Verpflichtung zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle besteht.]</p>
  </LegalPage>;
}

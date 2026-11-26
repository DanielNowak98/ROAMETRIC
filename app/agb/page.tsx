import type { Metadata } from 'next';
import { LegalPage, Placeholder } from '../legal-page';

export const metadata: Metadata = { title: 'AGB' };

const sections = ['Geltungsbereich', 'Vertragspartner und Vertragsschluss', 'Preise und Versandkosten', 'Zahlung', 'Lieferung und Fertigungszeit', 'Eigentumsvorbehalt', 'Widerrufsrecht', 'Gewährleistung', 'Haftung', 'Streitbeilegung und Schlussbestimmungen'];

export default function Agb() {
  return <LegalPage path="/agb" eyebrow="RECHTLICHES" title="Allgemeine Geschäfts­bedingungen">
    <Placeholder>AGB für einen Online-Shop mit Verbrauchern in DE, AT und CH erstellen lassen und hier einfügen. Typische Gliederung:</Placeholder>
    <ol className="legal-toc">{sections.map((s, i) => <li key={s}><b>§ {i + 1}</b>{s}</li>)}</ol>
  </LegalPage>;
}

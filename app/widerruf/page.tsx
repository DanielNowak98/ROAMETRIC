import type { Metadata } from 'next';
import { LegalPage, Placeholder } from '../legal-page';

export const metadata: Metadata = { title: 'Widerrufsbelehrung' };

export default function Widerruf() {
  return <LegalPage path="/widerruf" eyebrow="RECHTLICHES" title="Widerrufs­belehrung">
    <div className="legal-highlight"><b>14 TAGE</b><p>Als Verbraucher kannst du deinen Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen.</p></div>
    <Placeholder>Hier die gesetzliche Muster-Widerrufsbelehrung (Anlage 1 zu Art. 246a § 1 Abs. 2 EGBGB) mit Name, Anschrift und E-Mail einfügen, dazu das Muster-Widerrufsformular (Anlage 2). Bei Teilen, die nach individuellen Kundenmaßen gefertigt werden, auf die Ausnahme nach § 312g Abs. 2 Nr. 1 BGB hinweisen — für Serienteile gilt sie nicht.</Placeholder>
    <h2>Widerruf erklären</h2>
    <p>Der Widerruf kann formlos per E-Mail an <a href="mailto:hello@roametric.de">hello@roametric.de</a> erklärt werden.</p>
  </LegalPage>;
}

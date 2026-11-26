import type { Metadata } from 'next';
import { LegalPage, Placeholder } from '../legal-page';

export const metadata: Metadata = { title: 'Datenschutz' };

export default function Datenschutz() {
  return <LegalPage path="/datenschutz" eyebrow="RECHTLICHES" title="Datenschutz­erklärung">
    <Placeholder>Datenschutzerklärung mit einem Generator (z. B. eRecht24 oder IT-Recht Kanzlei) erstellen und hier einfügen. Die Liste unten zeigt, welche Datenverarbeitungen die Website technisch nutzt und die deshalb darin vorkommen müssen.</Placeholder>
    <h2>Was die Website technisch tut</h2>
    <dl className="spec-table">
      <div><dt>Hosting</dt><dd>[Eigener Server bzw. Hosting-Anbieter, ggf. Tunnel- oder CDN-Dienst] — Server-Logfiles mit IP-Adresse</dd></div>
      <div><dt>Anfrageliste</dt><dd>Ausgewählte Produkte werden nur im Browser gespeichert (localStorage), nicht auf dem Server</dd></div>
      <div><dt>Anfrage</dt><dd>Die Anfrage wird als vorbereitete E-Mail über dein eigenes E-Mail-Programm an hello@roametric.de geschickt</dd></div>
      <div><dt>Cookies &amp; Tracking</dt><dd>Keine Cookies, keine Analyse- oder Marketing-Dienste</dd></div>
      <div><dt>Schriften</dt><dd>Lokal vom eigenen Server ausgeliefert, keine Verbindung zu Google Fonts</dd></div>
    </dl>
    <h2>Verantwortlicher</h2>
    <p>[Name, Anschrift, E-Mail — wie im Impressum]</p>
  </LegalPage>;
}

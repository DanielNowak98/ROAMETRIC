import type { Metadata } from 'next';
import Link from '../link';
import { Footer, Header } from '../ui';
import { Reveal } from '../reveal';

export const metadata: Metadata = {
  title: 'Ersatzteile auf Abruf',
  description: 'Nicht mehr lieferbare Kunststoffteile für Van, Wohnmobil, Boot, Fahrrad und Zuhause — nach Vorlage konstruiert und additiv gefertigt.',
};

const ANFRAGE = '/anfrage?thema=ersatzteil';

const examples = ['Möbel- und Klappenclips im Wohnmobil', 'Endkappen für Rollos und Fliegengitter', 'Drehknöpfe und Abdeckkappen', 'Scharnier- und Riegelteile an Staufächern', 'Kabel- und Schlauchhalter', 'Halteklammern an Deck und im Cockpit'];

const steps = [
  { n: '01', title: 'Fotos und Maße schicken', text: 'Ein paar Fotos mit Lineal oder Münze daneben, dazu die wichtigsten Maße und ein Bild der Einbausituation.' },
  { n: '02', title: 'Machbarkeit und Festpreis', text: 'Wir prüfen, ob sich das Teil sinnvoll fertigen lässt, und nennen dir Konstruktions- und Stückpreis.' },
  { n: '03', title: 'Rekonstruktion im CAD', text: 'Wir vermessen die Vorlage und konstruieren das Teil neu — wo sinnvoll gleich etwas robuster als das Original.' },
  { n: '04', title: 'Prototyp zur Passprobe', text: 'Du bekommst ein erstes Teil und prüfst es am Einbauort. Eine Anpassung ist im Preis enthalten.' },
  { n: '05', title: 'Fertigung und Versand', text: 'Passt es, fertigen wir die gewünschte Stückzahl. Die Datei bleibt archiviert — Nachbestellungen ohne erneute Konstruktion.' },
];

const needs = [
  { icon: '◎', title: 'Fotos von allen Seiten', text: 'Mit Lineal, Messschieber oder Münze als Maßstab.' },
  { icon: '⟷', title: 'Die wichtigsten Maße', text: 'Außenmaße, Bohrungen, Wandstärken — so genau wie möglich.' },
  { icon: '⌂', title: 'Die Einbausituation', text: 'Ein Foto, wo und wie das Teil sitzt und was es halten muss.' },
  { icon: '✉', title: 'Optional: das Originalteil', text: 'Auch Bruchstücke helfen. Nach Absprache per Post.' },
];

const materialRows = [
  { use: 'Innenraum, Möbel, Mechanik', material: 'PA12 oder PETG', why: 'Zäh, maßhaltig, gut für Clips und Rastungen' },
  { use: 'Außen, Sonne, Salzwasser', material: 'ASA', why: 'UV-beständig, vergilbt und versprödet nicht' },
  { use: 'Steif und leicht', material: 'PETG-CF', why: 'Hohe Steifigkeit für Halter und Träger ohne Sicherheitsfunktion' },
  { use: 'Dichtend, dämpfend, flexibel', material: 'TPU', why: 'Gummiartig für Puffer, Tüllen und Kappen' },
];

const tiers = [
  { name: 'Einfaches Teil', example: 'Clip, Kappe, Abstandshalter', design: '39 €', piece: 'ab 6 €', points: ['Maße direkt abnehmbar', 'Eine Funktionsfläche', '1 Anpassung inklusive'] },
  { name: 'Funktionsteil', example: 'Scharnier, Rastung, Halter', design: '89 €', piece: 'ab 12 €', points: ['Passungen und bewegte Teile', 'Mehrere Bauteile möglich', '1 Anpassung inklusive'], featured: true },
  { name: 'Komplexes Teil', example: 'Freiform, Gehäuse, Baugruppe', design: 'ab 149 €', piece: 'auf Anfrage', points: ['Aufwendige Geometrie', 'Rekonstruktion aus Bruchstücken', 'Individuelles Angebot'] },
];

const limits = ['Teile mit Sicherheitsfunktion: Bremsen, Lenkung, Gas, Sicherungs- oder Lastaufnahmepunkte, Kindersitze', 'Teile nahe Motor, Heizung oder Abgas über ca. 90 °C', 'Kopien geschützter Marken, Logos oder Designs', 'Teile größer als ca. 250 mm am Stück — größere werden geteilt oder einzeln geprüft'];

export default function Ersatzteile() {
  return <><Header/><main className="spare-page">
    <section className="spare-hero"><div className="shell spare-hero-grid">
      <div><p className="eyebrow light">ERSATZTEILE AUF ABRUF</p><h1>Das Teil gibt es<br/><span>nicht mehr?</span></h1><p>Gebrochene Clips, verlorene Kappen, Halter, die der Hersteller nicht mehr liefert: Wir vermessen die Vorlage, konstruieren das Teil neu und fertigen es additiv — schon ab einem Stück.</p><div className="spare-actions"><Link className="button amber" href={ANFRAGE}>Ersatzteil anfragen <b>→</b></Link><Link className="button ghost light" href="#ablauf">So funktioniert&apos;s</Link></div></div>
      <div className="spare-compare" aria-hidden="true"><div className="spare-card broken"><small>VORHER</small><b>Original</b><span>gebrochen · nicht lieferbar</span></div><i>→</i><div className="spare-card fixed"><small>NACHHER</small><b>Nachbau</b><span>vermessen · konstruiert · gefertigt</span></div></div>
    </div></section>

    <section className="section shell"><Reveal className="section-head"><div><p className="eyebrow">TYPISCHE FÄLLE</p><h2>Kleine Teile,<br/>großer Ärger.</h2></div><p>Oft ist es ein Plastikteil für ein paar Cent, das ein ganzes Möbel, eine Klappe oder ein Rollo lahmlegt. Genau dafür ist additive Fertigung gemacht.</p></Reveal>
      <Reveal className="example-chips">{examples.map((e) => <span key={e}>{e}</span>)}</Reveal>
    </section>

    <section id="ablauf" className="section spare-process"><div className="shell"><Reveal className="section-head"><div><p className="eyebrow">ABLAUF</p><h2>In fünf Schritten<br/>zum passenden Teil.</h2></div></Reveal>
      <ol className="spare-steps">{steps.map((s, i) => <Reveal as="article" key={s.n} delay={i * 80}><b>{s.n}</b><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}</ol>
    </div></section>

    <section className="section shell"><Reveal className="section-head"><div><p className="eyebrow">DAS BRAUCHEN WIR</p><h2>Je besser die Vorlage,<br/>desto genauer das Teil.</h2></div></Reveal>
      <div className="need-grid">{needs.map((n, i) => <Reveal as="article" key={n.title} delay={i * 70}><span aria-hidden="true">{n.icon}</span><h3>{n.title}</h3><p>{n.text}</p></Reveal>)}</div>
    </section>

    <section className="section shell"><Reveal className="section-head"><div><p className="eyebrow">WERKSTOFF</p><h2>Das Material folgt<br/>dem Einsatz.</h2></div><p>Wir wählen den Werkstoff nach Umgebung und Belastung — nicht danach, woraus das Original war.</p></Reveal>
      <Reveal><dl className="spec-table spare-materials">{materialRows.map((r) => <div key={r.use}><dt>{r.use}</dt><dd><b>{r.material}</b> — {r.why}</dd></div>)}</dl></Reveal>
    </section>

    <section className="section spare-pricing"><div className="shell"><Reveal className="section-head"><div><p className="eyebrow">PREISE</p><h2>Einmal konstruieren,<br/>beliebig nachbestellen.</h2></div><p>Du zahlst die Konstruktion einmal und danach nur noch den Stückpreis. Alle Preise inkl. MwSt. — den Festpreis bekommst du vor dem Start.</p></Reveal>
      <div className="tier-grid">{tiers.map((t, i) => <Reveal as="article" key={t.name} delay={i * 90} className={t.featured ? 'featured' : ''}>{t.featured && <span className="tier-flag">HÄUFIGSTER FALL</span>}<h3>{t.name}</h3><small>{t.example}</small><div className="tier-prices"><div><span>Konstruktion</span><b>{t.design}</b></div><div><span>Stückpreis</span><b>{t.piece}</b></div></div><ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul></Reveal>)}</div>
    </div></section>

    <section className="section shell"><Reveal className="spare-limits"><div><p className="eyebrow">GRENZEN</p><h2>Was wir bewusst nicht nachbauen.</h2><p>Additiv gefertigte Kunststoffteile sind stark — aber nicht für jede Aufgabe die richtige Wahl. Diese Teile lehnen wir ab:</p></div><ul>{limits.map((l) => <li key={l}>{l}</li>)}</ul></Reveal></section>

    <section className="cta-band"><Reveal className="shell cta-band-inner"><div><p className="eyebrow light">ERSATZTEIL GESUCHT?</p><h2>Schick uns ein Foto.</h2><p>Wir melden uns mit Machbarkeit und Festpreis.</p></div><div className="cta-band-actions"><Link className="button amber" href={ANFRAGE}>Ersatzteil anfragen</Link></div></Reveal></section>
  </main><Footer/></>;
}

import type { Metadata } from 'next';
import Link from '../link';
import { Footer, Header } from '../ui';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Die Idee, Haltung und Arbeitsweise hinter ROAMETRIC — technische Präzision für das Leben in Bewegung.',
};

const principles = [
  { number: '01', title: 'Praxis vor Theorie', text: 'Wir beginnen bei der konkreten Aufgabe: Was muss unterwegs besser, sicherer oder einfacher funktionieren?' },
  { number: '02', title: 'Präzision mit Zweck', text: 'Jedes Maß, jedes Material und jedes Detail folgt einer klaren Funktion — nicht dem Selbstzweck.' },
  { number: '03', title: 'Reduktion auf das Wesentliche', text: 'Gute Lösungen erklären sich im Gebrauch. Deshalb entwickeln wir verständlich, wartbar und ohne unnötige Komplexität.' },
  { number: '04', title: 'Verantwortung im Prozess', text: 'Wir betrachten Konstruktion, Materialeinsatz, Fertigung und Lebensdauer als zusammenhängende Entscheidung.' },
];

export default function AboutPage() {
  return <><Header/><main className="about-page">
    <section className="about-hero"><div className="shell about-hero-inner"><p className="eyebrow light">ÜBER ROAMETRIC</p><h1>WIR BAUEN FÜR<br/><span>DAS LEBEN IN BEWEGUNG.</span></h1><p>Zwischen Aufbruch und Alltag entscheiden oft die kleinen Dinge. ROAMETRIC entwickelt funktionale Bauteile, die genau dort zuverlässig arbeiten.</p><div className="about-hero-mark" aria-hidden="true">R</div></div></section>
    <section className="about-origin section shell"><div><p className="eyebrow">DIE IDEE HINTER DEM NAMEN</p><h2>Freiheit trifft<br/>Präzision.</h2></div><div className="about-origin-copy"><p>ROAMETRIC verbindet zwei Gedanken, die unsere Arbeit bestimmen: die Freiheit, unterwegs zu sein, und die Genauigkeit, mit der aus einer Idee eine verlässliche Lösung wird.</p><div className="name-parts"><div><b>ROAM</b><span>reisen · bewegen · entdecken</span></div><i>+</i><div><b>METRIC</b><span>messen · verstehen · präzisieren</span></div></div><blockquote>Precision for the Journey bedeutet für uns: Technik, die nicht im Weg steht, sondern Möglichkeiten schafft.</blockquote></div></section>
    <section className="about-mission"><div className="shell about-mission-grid"><div className="about-mission-mark">R</div><div><p className="eyebrow light">UNSER ANSPRUCH</p><h2>Durchdacht.<br/>Belastbar.<br/><span>Unterwegs zuhause.</span></h2><p>Unsere Produkte entstehen an der Schnittstelle von Engineering, digitaler Fertigung und realer Nutzung. So werden aus kleinen Details Lösungen, auf die man sich verlassen kann — auf der Matte, auf dem Rad, im Van und an Bord.</p></div></div></section>
    <section className="about-values section shell"><div className="section-head"><div><p className="eyebrow">WORAN WIR GLAUBEN</p><h2>Unsere Haltung<br/>in vier Prinzipien.</h2></div><p>Ein klarer Entwicklungsprozess schafft Produkte, die verständlich bleiben und dauerhaft ihren Zweck erfüllen.</p></div><div className="about-values-grid">{principles.map(item=><article key={item.number}><b>{item.number}</b><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-fields"><div className="shell"><div className="section-head"><div><p className="eyebrow light">EIN GEDANKE. VIER WELTEN.</p><h2>Entwickelt für<br/>bewegte Lebensräume.</h2></div><p>Unterschiedliche Umgebungen, derselbe Anspruch: funktionale Lösungen mit einem präzisen Blick fürs Detail.</p></div><div className="about-field-grid"><div><b>BJJ & BUDO</b><span>Training, Dojo & Gear</span></div><div><b>FAHRRAD</b><span>Leichtigkeit & Kontrolle</span></div><div><b>VAN</b><span>Organisation & Ausbau</span></div><div><b>BOOT</b><span>Wind & Wasser</span></div></div></div></section>
    <section className="about-cta section shell"><div><p className="eyebrow">GEMEINSAM WEITERDENKEN</p><h2>Du hast ein Problem,<br/>das ein gutes Bauteil lösen kann?</h2></div><div><p>Erzähl uns von deinem Einsatz, deiner Idee oder deinem bestehenden Bauteil. Wir prüfen, wie daraus eine präzise und fertigungsgerechte Lösung werden kann.</p><a className="button amber" href="mailto:engineering@roametric.de">Projekt besprechen →</a><Link className="text-link" href="/shop">Produkte entdecken →</Link></div></section>
  </main><Footer/></>;
}

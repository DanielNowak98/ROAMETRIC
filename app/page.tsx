import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, ProductCard } from './ui';
import { products } from './data';

const categories = [
  { name: 'Van', kicker: 'Ordnung. Ausbau. Freiheit.', icon: 'V', href: '/shop?category=van' },
  { name: 'Marine', kicker: 'Gemacht für Wind & Wasser.', icon: 'M', href: '/shop?category=marine' },
  { name: 'Bike', kicker: 'Cleverer. Leichter. Weiter.', icon: 'B', href: '/shop?category=bike' },
  { name: 'Outdoor', kicker: 'Bereit fürs Draußen.', icon: 'O', href: '/shop?category=outdoor' },
];

export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-media" /><div className="hero-shade" />
        <div className="hero-content shell"><div className="hero-brand"><Image src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={430} height={278} priority unoptimized/><p>PRECISION FOR THE JOURNEY</p></div></div>
        <div className="category-rail shell">{categories.map((category) => <Link href={category.href} key={category.name}><span className="category-line-icon">{category.icon}</span><h2>{category.name}</h2><p>{category.kicker}</p><b>ENTDECKEN</b></Link>)}</div>
      </section>
      <section id="engineering" className="engineering section shell"><div className="engineering-visual" aria-label="Auswahl präzise gefertigter ROAMETRIC Bauteile"/><div className="engineering-copy"><p className="eyebrow">ENGINEERING. MANUFACTURING. SOLUTIONS.</p><h2>Wir entwickeln.<br/>Wir fertigen.<br/>Wir bewegen.</h2><p>ROAMETRIC steht für technische Präzision, hochwertige Materialien und durchdachte Lösungen. Von der Idee bis zum fertigen Produkt — alles aus einer Hand.</p><div className="process"><span><b>01</b>Analyse & Konzept</span><span><b>02</b>CAD & Prototyp</span><span><b>03</b>Fertigung & Finish</span></div><a className="button dark" href="mailto:engineering@roametric.de">Mehr erfahren →</a></div></section>
      <section className="featured section"><div className="shell"><div className="section-head"><div><p className="eyebrow">AUSGEWÄHLTE PRODUKTE</p><h2>Entwickelt für<br/>echte Abenteuer.</h2></div><Link href="/shop" className="text-link">Alle Produkte ansehen →</Link></div><div className="product-grid">{products.slice(0,4).map(p => <ProductCard product={p} key={p.slug}/>)}</div></div></section>
      <section id="about" className="about-intro section"><div className="shell about-intro-grid"><div><p className="eyebrow">ÜBER ROAMETRIC</p><h2>Freiheit braucht<br/>funktionierende Details.</h2></div><div className="about-intro-copy"><p>ROAMETRIC verbindet die Freiheit des Unterwegsseins mit technischer Präzision. Wir denken Produkte von der realen Anwendung aus: klar in der Funktion, robust im Einsatz und bewusst auf das Wesentliche reduziert.</p><p>Der Name vereint <b>ROAM</b> — unterwegs sein — mit <b>METRIC</b> — messen, verstehen und präzise entwickeln.</p><Link className="button dark" href="/ueber-uns">Mehr über uns →</Link></div></div><div className="shell about-principles"><article><b>01</b><h3>Praxis zuerst.</h3><p>Jede Lösung beginnt bei einer echten Aufgabe unterwegs.</p></article><article><b>02</b><h3>Präzision mit Zweck.</h3><p>Technik ist für uns dann gut, wenn sie das Leben einfacher macht.</p></article><article><b>03</b><h3>Für lange Wege.</h3><p>Material, Konstruktion und Fertigung denken wir gemeinsam.</p></article></div></section>
      <section className="usp"><div className="shell usp-grid"><div><b>01</b><h3>Engineered in Germany</h3><p>Entwicklung mit technischem Anspruch.</p></div><div><b>02</b><h3>Built for the Journey</h3><p>Getestet für Bewegung und Belastung.</p></div><div><b>03</b><h3>Materials that Matter</h3><p>PA12 · PETG · ASA · TPU</p></div><div><b>04</b><h3>Small Series. Big Ideas.</h3><p>Vom Einzelteil zur Kleinserie.</p></div></div></section>
    </main><Footer />
  </>
}

import Link from 'next/link';
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
        <div className="hero-content shell"><p className="eyebrow light">ENGINEERED FOR MOVING LIFE</p><h1>PRECISION<br/><span>FOR THE JOURNEY.</span></h1><p className="hero-copy">Funktionale Bauteile für Van, Marine, Bike und Outdoor. Entwickelt mit Ingenieurverstand. Gefertigt für unterwegs.</p><div className="hero-actions"><Link className="button amber" href="/shop">Produkte entdecken <b>→</b></Link><a className="button ghost" href="#engineering">Custom Part anfragen</a></div></div>
        <div className="hero-index"><span>01</span><i/><span>04</span></div>
      </section>
      <section className="categories shell section"><div className="section-head"><div><p className="eyebrow">ANWENDUNGSBEREICHE</p><h2>Teile, die mit dir<br/>unterwegs sind.</h2></div><p>Entwickelt für echte Anforderungen: robust, passgenau und bereit für den nächsten Kilometer.</p></div><div className="category-grid">{categories.map((c, i) => <Link href={c.href} className={`category-card cat-${i}`} key={c.name}><span className="cat-number">0{i+1}</span><div className="cat-symbol">{c.icon}</div><div><h3>{c.name}</h3><p>{c.kicker}</p></div><b>↗</b></Link>)}</div></section>
      <section className="featured section"><div className="shell"><div className="section-head"><div><p className="eyebrow">AUSGEWÄHLTE PRODUKTE</p><h2>Bereit fürs echte Leben.</h2></div><Link href="/shop" className="text-link">Alle Produkte ansehen →</Link></div><div className="product-grid">{products.slice(0,3).map(p => <ProductCard product={p} key={p.slug}/>)}</div></div></section>
      <section id="engineering" className="engineering section shell"><div className="engineering-visual"><div className="part-ring"><span>R</span></div><div className="spec-tag one">PA12<br/><small>SLS / INDUSTRIAL</small></div><div className="spec-tag two">± 0.2 MM<br/><small>PRECISION</small></div></div><div className="engineering-copy"><p className="eyebrow">ENGINEERING & MANUFACTURING</p><h2>Von der Idee<br/>zum Bauteil.</h2><p>Wir entwickeln funktionale Lösungen, die exakt zu deinem Einsatz passen — vom ersten Entwurf über CAD und Prototyping bis zum einbaufertigen Serienteil.</p><div className="process"><span><b>01</b>Analyse & Konzept</span><span><b>02</b>CAD & Prototyp</span><span><b>03</b>Fertigung & Finish</span></div><a className="button dark" href="mailto:engineering@roametric.de">Projekt anfragen →</a></div></section>
      <section id="about" className="about-intro section"><div className="shell about-intro-grid"><div><p className="eyebrow">ÜBER ROAMETRIC</p><h2>Freiheit braucht<br/>funktionierende Details.</h2></div><div className="about-intro-copy"><p>ROAMETRIC verbindet die Freiheit des Unterwegsseins mit technischer Präzision. Wir denken Produkte von der realen Anwendung aus: klar in der Funktion, robust im Einsatz und bewusst auf das Wesentliche reduziert.</p><p>Der Name vereint <b>ROAM</b> — unterwegs sein — mit <b>METRIC</b> — messen, verstehen und präzise entwickeln.</p><Link className="button dark" href="/ueber-uns">Mehr über uns →</Link></div></div><div className="shell about-principles"><article><b>01</b><h3>Praxis zuerst.</h3><p>Jede Lösung beginnt bei einer echten Aufgabe unterwegs.</p></article><article><b>02</b><h3>Präzision mit Zweck.</h3><p>Technik ist für uns dann gut, wenn sie das Leben einfacher macht.</p></article><article><b>03</b><h3>Für lange Wege.</h3><p>Material, Konstruktion und Fertigung denken wir gemeinsam.</p></article></div></section>
      <section className="usp"><div className="shell usp-grid"><div><b>01</b><h3>Engineered in Germany</h3><p>Entwicklung mit technischem Anspruch.</p></div><div><b>02</b><h3>Built for the Journey</h3><p>Getestet für Bewegung und Belastung.</p></div><div><b>03</b><h3>Materials that Matter</h3><p>PA12 · PETG · ASA · TPU</p></div><div><b>04</b><h3>Small Series. Big Ideas.</h3><p>Vom Einzelteil zur Kleinserie.</p></div></div></section>
    </main><Footer />
  </>
}

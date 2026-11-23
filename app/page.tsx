import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, ProductCard } from './ui';
import { categories, products } from './data';


export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-media" /><div className="hero-shade" />
        <div className="hero-content shell"><div className="hero-brand"><Image src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={430} height={278} priority unoptimized/><p>PRECISION FOR THE JOURNEY</p></div></div>
        <div className="category-rail shell">{categories.map((category) => <Link href={`/shop?category=${category.slug}`} key={category.slug}><span className="category-line-icon">{category.icon}</span><h2>{category.name}</h2><p>{category.kicker}</p><b>ENTDECKEN</b></Link>)}</div>
      </section>
      {categories.map((category) => { const items = products.filter(p => p.category === category.name); return <section id={category.slug} className="featured section category-section" key={category.slug}><div className="shell"><div className="section-head"><div><p className="eyebrow">{category.name.toUpperCase()}</p><h2>{category.kicker}</h2><p className="category-intro">{category.intro}</p></div><Link href={`/shop?category=${category.slug}`} className="text-link">Alle {category.name}-Produkte →</Link></div><div className="product-grid">{items.slice(0,4).map(p => <ProductCard product={p} key={p.slug}/>)}</div></div></section>; })}
      <section id="engineering" className="engineering section shell"><div className="engineering-visual" aria-label="Auswahl präzise gefertigter ROAMETRIC Bauteile"/><div className="engineering-copy"><p className="eyebrow">ENGINEERING. MANUFACTURING. SOLUTIONS.</p><h2>Wir entwickeln.<br/>Wir fertigen.<br/>Wir bewegen.</h2><p>ROAMETRIC steht für technische Präzision, hochwertige Materialien und durchdachte Lösungen. Von der Idee bis zum fertigen Produkt — alles aus einer Hand.</p><div className="process"><span><b>01</b>Analyse & Konzept</span><span><b>02</b>CAD & Prototyp</span><span><b>03</b>Fertigung & Finish</span></div><a className="button dark" href="mailto:engineering@roametric.de">Mehr erfahren →</a></div></section>
      <section className="usp"><div className="shell usp-grid"><div><b>01</b><h3>Engineered in Germany</h3><p>Entwicklung mit technischem Anspruch.</p></div><div><b>02</b><h3>Built for the Journey</h3><p>Getestet für Bewegung und Belastung.</p></div><div><b>03</b><h3>Materials that Matter</h3><p>PA12 · PETG · ASA · TPU</p></div><div><b>04</b><h3>Small Series. Big Ideas.</h3><p>Vom Einzelteil zur Kleinserie.</p></div></div></section>
    </main><Footer />
  </>
}

import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, ProductCard } from './ui';
import { categories, products } from './data';


export default function Home() {
  return <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-media hero-collage" aria-hidden="true">{categories.map((category) => <div key={category.slug} className={`hero-tile hero-tile-${category.slug}`}/>)}</div><div className="hero-shade" />
        <div className="hero-content shell"><div className="hero-brand"><Image src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={430} height={278} priority unoptimized/><p>PRECISION FOR THE JOURNEY</p><div className="hero-cta"><Link className="button amber" href="/shop">Produkte entdecken</Link><Link className="button ghost light" href="#ablauf">So funktioniert&apos;s</Link></div></div></div>
        <div className="category-rail shell">{categories.map((category) => <Link href={`/shop?category=${category.slug}`} key={category.slug}><span className="category-line-icon">{category.icon}</span><h2>{category.name}</h2><p>{category.kicker}</p><b>ENTDECKEN</b></Link>)}</div>
      </section>
      {categories.map((category) => { const items = products.filter(p => p.category === category.name); return <section id={category.slug} className="featured section category-section" key={category.slug}><div className="shell"><div className="section-head"><div><p className="eyebrow">{category.name.toUpperCase()}</p><h2>{category.kicker}</h2><p className="category-intro">{category.intro}</p></div><Link href={`/shop?category=${category.slug}`} className="text-link">Alle {category.name}-Produkte →</Link></div><div className="product-grid">{items.slice(0,4).map(p => <ProductCard product={p} key={p.slug}/>)}</div></div></section>; })}
      <section id="ablauf" className="flow section"><div className="shell"><div className="section-head"><div><p className="eyebrow">SO FUNKTIONIERT&apos;S</p><h2>In drei Schritten<br/>zu deinem Teil.</h2></div><Link href="/anfrage" className="text-link">Zur Anfrage →</Link></div><ol className="flow-steps"><li><b>01</b><h3>Auswählen</h3><p>Produkte in BJJ, Fahrrad, Van oder Boot finden und mit „+ Anfrage“ merken.</p></li><li><b>02</b><h3>Anfragen</h3><p>Menge prüfen, Einsatzbereich angeben und die vorbereitete E-Mail absenden.</p></li><li><b>03</b><h3>Angebot erhalten</h3><p>Wir melden uns mit Preis, Lieferzeit und ggf. Anpassungsvorschlägen.</p></li></ol></div></section>
      <section id="engineering" className="engineering section shell"><div className="engineering-visual" aria-label="Auswahl präzise gefertigter ROAMETRIC Bauteile"/><div className="engineering-copy"><p className="eyebrow">ENGINEERING. MANUFACTURING. SOLUTIONS.</p><h2>Wir entwickeln.<br/>Wir fertigen.<br/>Wir bewegen.</h2><p>ROAMETRIC steht für technische Präzision, hochwertige Materialien und durchdachte Lösungen. Von der Idee bis zum fertigen Produkt — alles aus einer Hand.</p><div className="process"><span><b>01</b>Analyse & Konzept</span><span><b>02</b>CAD & Prototyp</span><span><b>03</b>Fertigung & Finish</span></div><Link className="button dark" href="/anfrage">Custom Part anfragen →</Link></div></section>
      <section className="cta-band"><div className="shell cta-band-inner"><div><p className="eyebrow light">NICHT DAS RICHTIGE DABEI?</p><h2>Wir entwickeln dein Teil.</h2><p>Beschreib uns kurz dein Setup – wir prüfen Machbarkeit, Material und Preis.</p></div><div className="cta-band-actions"><Link className="button amber" href="/anfrage">Individuell anfragen</Link><Link className="button ghost light" href="/shop">Alle Produkte</Link></div></div></section>
      <section className="usp"><div className="shell usp-grid"><div><b>01</b><h3>Engineered in Germany</h3><p>Entwicklung mit technischem Anspruch.</p></div><div><b>02</b><h3>Built for the Journey</h3><p>Getestet für Bewegung und Belastung.</p></div><div><b>03</b><h3>Materials that Matter</h3><p>PA12 · PETG · ASA · TPU</p></div><div><b>04</b><h3>Small Series. Big Ideas.</h3><p>Vom Einzelteil zur Kleinserie.</p></div></div></section>
    </main><Footer />
  </>
}

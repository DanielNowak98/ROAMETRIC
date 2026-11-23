'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories, categorySlug, products, type Product } from '../../data';
import { InquiryButton, useInquiry } from '../../inquiry';
import { Footer, formatPrice, Header, ProductCard, ProductVisual } from '../../ui';

export default function ProductClient({ product: p }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { items } = useInquiry();
  const inList = items.find((item) => item.slug === p.slug);
  const slug = categorySlug(p.category);
  const category = categories.find((c) => c.slug === slug);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const others = related.length ? related : products.filter((x) => x.slug !== p.slug).slice(0, 4);

  return <>
    <Header/>
    <main className="detail shell">
      <div className="breadcrumbs"><Link href="/">Start</Link> / <Link href="/shop">Produkte</Link> / <Link href={`/shop?category=${slug}`}>{p.category}</Link> / {p.name}</div>
      <div className="detail-grid">
        <div className="gallery">
          <div className="gallery-layout">
            <div className="thumbs">
              <ProductVisual p={p}/>
              <ProductVisual p={p}/>
              <div className="detail-drawing">{p.material}<br/><b>± 0.2 mm</b></div>
            </div>
            <ProductVisual p={p} large/>
          </div>
        </div>
        <div className="buy-panel">
          <p className="eyebrow">{p.category.toUpperCase()} · {p.material}</p>
          <h1>{p.name}</h1>
          <p className="price">{formatPrice(p.price)}</p>
          <p className="tax">Richtpreis inkl. MwSt. · finales Angebot nach Anfrage</p>
          <p className="lead">{p.desc} Präzise konstruiert, vibrationsfest und für eine einfache Montage optimiert.</p>
          <ul className="product-benefits"><li>Passgenau für den mobilen Einsatz</li><li>Hochfester Kunststoff ({p.material})</li><li>Einfache Montage</li><li>Made in Germany</li></ul>
          <div className="qty-control" role="group" aria-label="Menge">
            <b>MENGE</b>
            <button type="button" aria-label="Menge verringern" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
            <span aria-live="polite">{quantity}</span>
            <button type="button" aria-label="Menge erhöhen" onClick={() => setQuantity((q) => Math.min(99, q + 1))}>+</button>
          </div>
          <InquiryButton slug={p.slug} quantity={quantity} className="add"/>
          {inList
            ? <Link className="inquiry-next" href="/anfrage">{inList.quantity} × in deiner Anfrage · Anfrage abschließen →</Link>
            : <Link className="inquiry-next" href="/anfrage">Frage zum Produkt oder individuelle Variante? Zur Anfrage →</Link>}
          <ol className="flow-steps compact" aria-label="So läuft deine Anfrage">
            <li><b>1</b>Produkte zur Anfrage hinzufügen</li>
            <li><b>2</b>Kontaktdaten angeben &amp; senden</li>
            <li><b>3</b>Angebot mit Lieferzeit erhalten</li>
          </ol>
        </div>
      </div>
      <div className="product-tabs"><b>Beschreibung</b></div>
      <div className="product-description"><p>Die ROAMETRIC {p.name} ermöglicht eine stabile und flexible Lösung in deinem Setup. Ideal für Ordnung, Stauraum und individuelle Aufbauten.</p><dl><div><dt>Material</dt><dd>{p.material}</dd></div><div><dt>Fertigung</dt><dd>Additive Manufacturing</dd></div><div><dt>Herkunft</dt><dd>Deutschland</dd></div></dl></div>
      <section className="related">
        <div className="section-head"><div><p className="eyebrow">{related.length ? `MEHR AUS ${p.category.toUpperCase()}` : 'WEITERE PRODUKTE'}</p><h2>{related.length ? category?.kicker : 'Das könnte dich auch interessieren.'}</h2></div><Link href={`/shop?category=${slug}`} className="text-link">Alle {p.category}-Produkte →</Link></div>
        <div className="product-grid">{others.map((x) => <ProductCard key={x.slug} product={x}/>)}</div>
      </section>
    </main>
    <div className="mobile-cta"><div><b>{p.name}</b><span>{formatPrice(p.price)}</span></div><InquiryButton slug={p.slug} quantity={quantity} label="Anfragen"/></div>
    <Footer/>
  </>;
}

'use client';

import Link from 'next/link';
import { categorySlug, type Product } from '../../data';
import { Footer, Header, ProductVisual } from '../../ui';

export default function ProductClient({ product: p }: { product: Product }) {
  return <>
    <Header/>
    <main className="detail shell">
      <div className="breadcrumbs"><Link href="/shop">Produkte</Link> / <Link href={`/shop?category=${categorySlug(p.category)}`}>{p.category}</Link> / {p.name}</div>
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
          <p className="price">{p.price.toFixed(2).replace('.',',')} €</p>
          <p className="tax">inkl. MwSt.</p>
          <p className="lead">{p.desc} Präzise konstruiert, vibrationsfest und für eine einfache Montage optimiert.</p>
          <ul className="product-benefits"><li>Passgenau für den mobilen Einsatz</li><li>Hochfester Kunststoff ({p.material})</li><li>Einfache Montage</li><li>Made in Germany</li></ul>
          <a className="add" href={`mailto:hello@roametric.de?subject=${encodeURIComponent(`Anfrage: ${p.name}`)}`}>Jetzt anfragen <span>→</span></a>
          <p className="stock"><i/> Bestellung aktuell auf Anfrage per E-Mail</p>
        </div>
      </div>
      <div className="product-tabs"><b>Beschreibung</b></div>
      <div className="product-description"><p>Die ROAMETRIC {p.name} ermöglicht eine stabile und flexible Lösung in deinem Setup. Ideal für Ordnung, Stauraum und individuelle Aufbauten.</p><dl><div><dt>Material</dt><dd>{p.material}</dd></div><div><dt>Fertigung</dt><dd>Additive Manufacturing</dd></div><div><dt>Herkunft</dt><dd>Deutschland</dd></div></dl></div>
    </main>
    <Footer/>
  </>;
}

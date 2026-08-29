'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '../../data';
import { addToCart, Footer, Header, ProductVisual } from '../../ui';

export default function ProductClient({ product: p }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return <>
    <Header/>
    <main className="detail shell">
      <div className="breadcrumbs"><Link href="/shop">Shop</Link> / <Link href={`/shop?category=${p.category.toLowerCase()}`}>{p.category}</Link> / {p.name}</div>
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
          <p className="tax">inkl. MwSt. · zzgl. Versand</p>
          <p className="lead">{p.desc} Präzise konstruiert, vibrationsfest und für eine einfache Montage optimiert.</p>
          <ul className="product-benefits"><li>Passgenau für den mobilen Einsatz</li><li>Hochfester Kunststoff ({p.material})</li><li>Einfache Montage</li><li>Made in Germany</li></ul>
          <div className="choice"><b>MENGE</b><button type="button" aria-label="Menge verringern" onClick={()=>setQuantity((current)=>Math.max(1,current-1))}>−</button><span>{quantity}</span><button type="button" aria-label="Menge erhöhen" onClick={()=>setQuantity((current)=>Math.min(10,current+1))}>+</button></div>
          <button className="add" onClick={()=>addToCart(p.slug,quantity)}>In den Warenkorb <span>→</span></button>
          <p className="stock"><i/> Auf Lager — versandfertig in 2–4 Werktagen</p>
        </div>
      </div>
      <div className="product-tabs"><b>Beschreibung</b><span>Zusätzliche Informationen</span><span>Bewertungen (4)</span></div>
      <div className="product-description"><p>Die ROAMETRIC {p.name} ermöglicht eine stabile und flexible Lösung in deinem Setup. Ideal für Ordnung, Stauraum und individuelle Aufbauten.</p><dl><div><dt>Material</dt><dd>{p.material}</dd></div><div><dt>Fertigung</dt><dd>Additive Manufacturing</dd></div><div><dt>Herkunft</dt><dd>Deutschland</dd></div></dl></div>
    </main>
    <Footer/>
  </>;
}

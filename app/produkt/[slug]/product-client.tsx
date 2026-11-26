'use client';

import { useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { products, materials, DEFAULT_LEAD_TIME, type Product } from '../../data';
import { addToCart, formatPrice, Footer, Header, ProductCard } from '../../ui';

type View = 'full' | 'detail' | 'drawing';
type Tab = 'beschreibung' | 'daten' | 'lieferung';

function Photo({ p, zoom = 1 }: { p: Product; zoom?: number }) {
  return <div className="product-photo" style={{ backgroundImage: `url('${p.image}')`, backgroundPosition: p.imagePosition || 'center', backgroundSize: p.imageSize || 'cover', transform: zoom !== 1 ? `scale(${zoom})` : undefined }}/>;
}

function Blueprint({ p }: { p: Product }) {
  const m = materials[p.material];
  return <div className="blueprint" aria-label={`Technisches Datenblatt ${p.name}`}>
    <div className="blueprint-grid" aria-hidden="true"/>
    <span className="bp-corner tl"/><span className="bp-corner tr"/><span className="bp-corner bl"/><span className="bp-corner br"/>
    <div className="bp-body"><small>WERKSTOFF</small><b>{p.material}</b>{m && <span>{m.name}</span>}{m && <em>{m.process}</em>}</div>
    <div className="bp-title"><span>ROAMETRIC</span><span>{p.slug.toUpperCase()}</span></div>
  </div>;
}

export default function ProductClient({ product: p }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<View>('full');
  const [tab, setTab] = useState<Tab>('beschreibung');
  const [origin, setOrigin] = useState('50% 50%');
  const [zooming, setZooming] = useState(false);
  const [added, setAdded] = useState(false);

  const material = materials[p.material];
  const leadTime = p.leadTime || DEFAULT_LEAD_TIME;
  const related = [...products.filter((x) => x.slug !== p.slug && x.category === p.category), ...products.filter((x) => x.slug !== p.slug && x.category !== p.category)].slice(0, 4);

  const add = () => { addToCart(p.slug, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800); };
  const track = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin(`${((event.clientX - rect.left) / rect.width) * 100}% ${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const specRows: { label: string; value: string }[] = [
    { label: 'Werkstoff', value: material ? `${p.material} · ${material.name}` : p.material },
    { label: 'Verfahren', value: material?.process || 'Additive Fertigung' },
    ...(p.specs || []),
    { label: 'Einsatzbereich', value: p.category },
    { label: 'Herkunft', value: 'Deutschland' },
  ];

  return <>
    <Header/>
    <main className="detail shell detail-v3">
      <div className="breadcrumbs" role="navigation" aria-label="Brotkrumen"><Link href="/shop">Shop</Link><i>/</i><Link href={`/shop?category=${p.category.toLowerCase()}`}>{p.category}</Link><i>/</i><span>{p.name}</span></div>
      <div className="detail-grid">
        <div className="gallery-v3">
          <div className="gallery-thumbs" role="tablist" aria-label="Ansichten">
            <button type="button" role="tab" aria-selected={view === 'full'} className={view === 'full' ? 'active' : ''} onClick={() => setView('full')}><div className="product-visual"><Photo p={p}/></div><span>Gesamt</span></button>
            <button type="button" role="tab" aria-selected={view === 'detail'} className={view === 'detail' ? 'active' : ''} onClick={() => setView('detail')}><div className="product-visual"><Photo p={p} zoom={1.9}/></div><span>Detail</span></button>
            <button type="button" role="tab" aria-selected={view === 'drawing'} className={view === 'drawing' ? 'active' : ''} onClick={() => setView('drawing')}><div className="thumb-bp">{p.material}</div><span>Daten</span></button>
          </div>
          <div className={`gallery-stage ${zooming ? 'zooming' : ''}`} onMouseMove={view === 'drawing' ? undefined : track} onMouseEnter={() => setZooming(view !== 'drawing')} onMouseLeave={() => setZooming(false)}>
            {view === 'drawing' ? <Blueprint p={p}/> : <div className="product-visual large"><div className="stage-zoom" style={{ transformOrigin: origin, transform: `scale(${(view === 'detail' ? 1.9 : 1) * (zooming ? 1.6 : 1)})` }}><Photo p={p}/></div></div>}
            {p.badge && <span className="badge">{p.badge}</span>}
            {view !== 'drawing' && <span className="stage-hint" aria-hidden="true">⤢ Zum Zoomen darüberfahren</span>}
          </div>
        </div>

        <div className="buy-panel buy-v3">
          <p className="eyebrow">{p.category.toUpperCase()} · {p.material}</p>
          <h1>{p.name}</h1>
          <div className="price-row"><p className="price">{formatPrice(p.price)}</p><p className="tax">inkl. MwSt. · zzgl. <Link href="/versand">Versand</Link></p></div>
          <p className="lead">{p.desc}</p>
          {material && <ul className="product-benefits">{material.traits.slice(0, 3).map((trait) => <li key={trait}>{trait}</li>)}<li>Konstruiert &amp; gefertigt in Deutschland</li></ul>}
          {p.compatibility?.length ? <div className="compat"><b>KOMPATIBEL MIT</b><div>{p.compatibility.map((c) => <span key={c}>{c}</span>)}</div></div> : null}
          <div className="buy-row">
            <div className="qty-v3" aria-label="Menge"><button type="button" aria-label="Menge verringern" onClick={() => setQuantity((c) => Math.max(1, c - 1))}>−</button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Menge erhöhen" onClick={() => setQuantity((c) => Math.min(10, c + 1))}>+</button></div>
            <button className={`add ${added ? 'is-added' : ''}`} onClick={add}>{added ? '✓ Im Warenkorb' : 'In den Warenkorb'} <span>→</span></button>
          </div>
          <ul className="assurance">
            <li><b>◷</b><span>Wird für dich gefertigt · Versand in {leadTime}</span></li>
            <li><b>⇄</b><span>14 Tage Widerrufsrecht · <Link href="/widerruf">Details</Link></span></li>
            <li><b>⬡</b><span>Sichere Zahlung über Stripe — PayPal, Karte, Wallets</span></li>
          </ul>
        </div>
      </div>

      <section className="tabs-v3">
        <div className="product-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'beschreibung'} className={tab === 'beschreibung' ? 'active' : ''} onClick={() => setTab('beschreibung')}>Beschreibung</button>
          <button type="button" role="tab" aria-selected={tab === 'daten'} className={tab === 'daten' ? 'active' : ''} onClick={() => setTab('daten')}>Technische Daten</button>
          <button type="button" role="tab" aria-selected={tab === 'lieferung'} className={tab === 'lieferung' ? 'active' : ''} onClick={() => setTab('lieferung')}>Lieferung &amp; Montage</button>
        </div>
        <div className="tab-panel" role="tabpanel">
          {tab === 'beschreibung' && <div className="tab-cols"><div><h2>Funktion vor Form.</h2><p>{p.desc} Jedes ROAMETRIC Bauteil wird vom realen Einsatz aus konstruiert — mit Blick auf Kraftfluss, Montage und Lebensdauer.</p></div>{material && <div className="material-note"><span className="material-code">{material.code}</span><h3>{material.name}</h3><ul>{material.traits.map((t) => <li key={t}>{t}</li>)}</ul></div>}</div>}
          {tab === 'daten' && <div><dl className="spec-table">{specRows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>{!p.specs?.length && <p className="spec-note">Abmessungen und Gewicht werden gerade final vermessen und hier ergänzt.</p>}</div>}
          {tab === 'lieferung' && <div className="tab-cols"><div><h2>Lieferumfang</h2>{p.inBox?.length ? <ul className="check-list">{p.inBox.map((x) => <li key={x}>{x}</li>)}</ul> : <p>1 × {p.name}</p>}</div><div><h2>Versand</h2><p>Jedes Teil wird für dich gefertigt und geprüft. Versand innerhalb von {leadTime} nach Zahlungseingang nach Deutschland, Österreich und in die Schweiz. Ab 75 € versandkostenfrei.</p><Link className="text-link" href="/versand">Versand &amp; Zahlung →</Link></div></div>}
        </div>
      </section>

      {related.length > 0 && <section className="related-v3"><div className="section-head"><div><p className="eyebrow">DAS KÖNNTE AUCH PASSEN</p><h2>Weitere Parts.</h2></div><Link className="text-link" href="/shop">Alle Produkte →</Link></div><div className="product-grid">{related.map((x, i) => <ProductCard key={x.slug} product={x} index={i}/>)}</div></section>}
    </main>

    <div className="sticky-buy"><div><b>{p.name}</b><span>{formatPrice(p.price)}</span></div><button className="add" onClick={add}>{added ? '✓' : 'In den Warenkorb'}</button></div>
    <Footer/>
  </>;
}

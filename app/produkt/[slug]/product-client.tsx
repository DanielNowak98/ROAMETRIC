'use client';

import Link from '../../link';
import { useState, type MouseEvent } from 'react';
import { categories, categorySlug, materials, products, type Product } from '../../data';
import { InquiryButton, useInquiry } from '../../inquiry';
import { Footer, formatPrice, Header, ProductCard } from '../../ui';

type View = 'full' | 'detail' | 'drawing';
type Tab = 'beschreibung' | 'daten' | 'anfrage';

function Photo({ p, zoom = 1 }: { p: Product; zoom?: number }) {
  if (!p.image) return <div className="product-photo product-photo-placeholder" aria-label="Produktbild folgt"><span>{p.category}</span><small>Bild folgt</small></div>;
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
  const { items } = useInquiry();
  const inList = items.find((item) => item.slug === p.slug);
  const slug = categorySlug(p.category);
  const category = categories.find((c) => c.slug === slug);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const others = related.length ? related : products.filter((x) => x.slug !== p.slug).slice(0, 4);
  const [view, setView] = useState<View>('full');
  const [tab, setTab] = useState<Tab>('beschreibung');
  const [origin, setOrigin] = useState('50% 50%');
  const [zooming, setZooming] = useState(false);
  const material = materials[p.material];
  const canZoom = Boolean(p.image) && view !== 'drawing';
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
    <main className="detail shell">
      <div className="breadcrumbs"><Link href="/">Start</Link> / <Link href="/shop">Produkte</Link> / <Link href={`/shop?category=${slug}`}>{p.category}</Link> / {p.name}</div>
      <div className="detail-grid">
        <div className="gallery-v3">
          <div className="gallery-thumbs" role="tablist" aria-label="Ansichten">
            <button type="button" role="tab" aria-selected={view === 'full'} className={view === 'full' ? 'active' : ''} onClick={() => setView('full')}><div className="product-visual"><Photo p={p}/></div><span>Gesamt</span></button>
            {p.image && <button type="button" role="tab" aria-selected={view === 'detail'} className={view === 'detail' ? 'active' : ''} onClick={() => setView('detail')}><div className="product-visual"><Photo p={p} zoom={1.9}/></div><span>Detail</span></button>}
            <button type="button" role="tab" aria-selected={view === 'drawing'} className={view === 'drawing' ? 'active' : ''} onClick={() => setView('drawing')}><div className="thumb-bp">{p.material}</div><span>Daten</span></button>
          </div>
          <div className={`gallery-stage ${zooming ? 'zooming' : ''} ${canZoom ? '' : 'no-zoom'}`} onMouseMove={canZoom ? track : undefined} onMouseEnter={() => setZooming(canZoom)} onMouseLeave={() => setZooming(false)}>
            {view === 'drawing' ? <Blueprint p={p}/> : <div className="product-visual large"><div className="stage-zoom" style={{ transformOrigin: origin, transform: `scale(${(view === 'detail' ? 1.9 : 1) * (zooming ? 1.6 : 1)})` }}><Photo p={p}/></div></div>}
            {p.badge && <span className="badge">{p.badge}</span>}
            {canZoom && <span className="stage-hint" aria-hidden="true">⤢ Zum Zoomen darüberfahren</span>}
          </div>
        </div>
        <div className="buy-panel">
          <p className="eyebrow">{p.category.toUpperCase()} · {p.material}</p>
          <h1>{p.name}</h1>
          <p className="price">{formatPrice(p.price)}</p>
          <p className="tax">Richtpreis inkl. MwSt. · finales Angebot nach Anfrage</p>
          <p className="lead">{p.desc}</p>
          <ul className="product-benefits">{(material?.traits ?? ['Passgenau konstruiert']).slice(0, 3).map((trait) => <li key={trait}>{trait}</li>)}<li>Konstruiert &amp; gefertigt in Deutschland</li></ul>
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
      <section className="tabs-v3">
        <div className="product-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'beschreibung'} className={tab === 'beschreibung' ? 'active' : ''} onClick={() => setTab('beschreibung')}>Beschreibung</button>
          <button type="button" role="tab" aria-selected={tab === 'daten'} className={tab === 'daten' ? 'active' : ''} onClick={() => setTab('daten')}>Technische Daten</button>
          <button type="button" role="tab" aria-selected={tab === 'anfrage'} className={tab === 'anfrage' ? 'active' : ''} onClick={() => setTab('anfrage')}>Anfrage &amp; Lieferung</button>
        </div>
        <div className="tab-panel" role="tabpanel" key={tab}>
          {tab === 'beschreibung' && <div className="tab-cols"><div><h2>Funktion vor Form.</h2><p>{p.desc} Jedes ROAMETRIC Bauteil wird vom realen Einsatz aus konstruiert — mit Blick auf Kraftfluss, Montage und Lebensdauer.</p></div>{material && <div className="material-note"><span className="material-code">{material.code}</span><h3>{material.name}</h3><ul>{material.traits.map((t) => <li key={t}>{t}</li>)}</ul></div>}</div>}
          {tab === 'daten' && <div><dl className="spec-table">{specRows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>{!p.specs?.length && <p className="spec-note">Abmessungen und Gewicht werden gerade final vermessen und hier ergänzt.</p>}</div>}
          {tab === 'anfrage' && <div className="tab-cols"><div><h2>So läuft deine Anfrage.</h2><p>Leg das Teil mit der gewünschten Menge in deine Anfrage und schick sie ab. Wir melden uns mit finalem Preis, Lieferzeit und — falls nötig — Anpassungsvorschlägen für dein Setup.</p><Link className="text-link" href="/anfrage">Zur Anfrage →</Link></div><div className="material-note"><span className="material-code">{formatPrice(p.price)}</span><h3>Richtpreis inkl. MwSt.</h3><ul><li>Finales Angebot nach Anfrage</li><li>Individuelle Varianten möglich</li><li>Fertigung in Deutschland</li></ul></div></div>}
        </div>
      </section>
      <section className="related">
        <div className="section-head"><div><p className="eyebrow">{related.length ? `MEHR AUS ${p.category.toUpperCase()}` : 'WEITERE PRODUKTE'}</p><h2>{related.length ? category?.kicker : 'Das könnte dich auch interessieren.'}</h2></div><Link href={`/shop?category=${slug}`} className="text-link">Alle {p.category}-Produkte →</Link></div>
        <div className="product-grid">{others.map((x, i) => <ProductCard key={x.slug} product={x} index={i}/>)}</div>
      </section>
    </main>
    <div className="mobile-cta"><div><b>{p.name}</b><span>{formatPrice(p.price)}</span></div><InquiryButton slug={p.slug} quantity={quantity} label="Anfragen"/></div>
    <Footer/>
  </>;
}

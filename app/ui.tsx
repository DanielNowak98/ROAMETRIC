'use client';
import Link from './link';
import Image from 'next/image';
import { useState } from 'react';
import { categories, legalLinks, type Product } from './data';
import { InquiryButton, InquiryToast, useInquiry } from './inquiry';
import { detailFor } from './product-details';

export function formatPrice(value?: number) { return value == null ? 'Preis auf Anfrage' : value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); }

export function Header() {
  const [menu,setMenu] = useState(false); const { count } = useInquiry();
  return <><header className="site-header"><div className="shell nav"><Link href="/" className="brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-header" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={170} height={62} priority unoptimized/></Link><nav className={menu?'open':''} onClick={()=>setMenu(false)}><Link href="/shop">Alle Produkte</Link>{categories.map(c=><Link key={c.slug} href={`/shop?category=${c.slug}`}>{c.name}</Link>)}<Link href="/ersatzteile">Ersatzteile</Link><Link href="/ueber-uns">Über uns</Link><Link href="/anfrage">Kontakt</Link></nav><div className="nav-actions"><Link className="inquiry-link" href="/anfrage" aria-label={`Anfrage öffnen, ${count} Artikel ausgewählt`}>ANFRAGE<span className={count?'has-items':''}>{count}</span></Link><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Menü" aria-expanded={menu}>{menu?'×':'☰'}</button></div></div></header><InquiryToast/></>
}
export function Footer(){
  return <footer className="site-footer">
    <div className="shell footer-cta">
      <div><p className="eyebrow">CUSTOM PARTS</p><h2>Dein Bauteil<br/><span>fehlt noch?</span></h2></div>
      <div><p>Du hast ein Problem, das ein präzises Bauteil lösen kann? Beschreib uns dein Setup — wir prüfen Machbarkeit, Material und Preis.</p><Link className="button amber" href="/anfrage">Individuell anfragen <b>→</b></Link></div>
    </div>
    <div className="shell footer-grid"><div><Link href="/" className="brand footer-brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-footer" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={178} height={115} unoptimized/></Link><p>Engineered parts for moving life.</p></div><div><b>PRODUKTE</b><Link href="/shop">Alle Produkte</Link>{categories.map(c=><Link key={c.slug} href={`/shop?category=${c.slug}`}>{c.name}</Link>)}</div><div><b>ROAMETRIC</b><Link href="/ueber-uns">Über uns</Link><Link href="/#engineering">Engineering</Link><Link href="/#materialien">Materialien</Link><Link href="/ersatzteile">Ersatzteile auf Abruf</Link><Link href="/anfrage">Custom Parts anfragen</Link></div><div><b>KONTAKT</b><Link href="/anfrage">Anfrage stellen</Link><a href="mailto:hello@roametric.de">hello@roametric.de</a><span>Deutschland</span></div></div>
    <div className="footer-wordmark" aria-hidden="true">ROAMETRIC</div>
    <div className="shell footer-bottom"><span>© 2026 ROAMETRIC · Precision for the Journey</span><div className="footer-legal" role="navigation" aria-label="Rechtliches">{legalLinks.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</div></div>
  </footer>
}
export function ProductVisual({p,large=false}:{p:Product;large?:boolean}){return <div className={`product-visual ${large?'large':''}`}>{p.image?<div className="product-photo" style={{backgroundImage:`url('${p.image}')`,backgroundPosition:p.imagePosition||'center',backgroundSize:p.imageSize||'cover'}}/>:<div className="product-photo product-photo-placeholder" aria-label="Produktbild folgt"><span>{p.category}</span><small>Bild folgt</small></div>}{p.images?.[0]&&<div className="product-photo alt" aria-hidden="true" style={{backgroundImage:`url('${p.images[0]}')`,backgroundSize:'cover',backgroundPosition:'center'}}/>}<em>{p.material}</em></div>}
export function ProductCard({product:p,index}:{product:Product;index?:number}){return <article className="product-card pc3"><Link href={`/produkt/${p.slug}`} className="pc3-media"><ProductVisual p={p}/><span className="pc3-corner" aria-hidden="true"/>{typeof index==='number'&&<span className="pc3-index">{String(index+1).padStart(2,'0')}</span>}<span className="pc3-view">Details ansehen →</span></Link><div className="product-info"><p>{p.category.toUpperCase()} <i>·</i> {p.material}</p><Link href={`/produkt/${p.slug}`}><h3>{p.name}</h3></Link><strong>{formatPrice(p.price)}</strong>{detailFor(p.slug)&&<p className="pc3-tag">{detailFor(p.slug)?.tagline}</p>}<div className="card-actions"><Link className="card-more" href={`/produkt/${p.slug}`}>Details →</Link><InquiryButton slug={p.slug} className="card-inquiry" label="+ Anfrage"/></div></div>{p.badge&&<span className="badge">{p.badge}</span>}</article>}

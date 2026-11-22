'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Product } from './data';

export function formatPrice(value: number) { return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); }

export function Header() {
  const [menu,setMenu] = useState(false);
  return <header className="site-header"><div className="shell nav"><Link href="/" className="brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-header" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={170} height={62} priority unoptimized/></Link><nav className={menu?'open':''}><Link href="/shop">Produkte</Link><Link href="/#engineering">Engineering</Link><Link href="/ueber-uns">Über uns</Link><a href="mailto:hello@roametric.de">Kontakt</a></nav><div className="nav-actions"><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Menü">{menu?'×':'☰'}</button></div></div></header>
}
export function Footer(){return <footer><div className="shell footer-grid"><div><Link href="/" className="brand footer-brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-footer" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={178} height={115} unoptimized/></Link><p>Engineered parts for moving life.</p></div><div><b>PRODUKTE</b><Link href="/shop">Alle Produkte</Link><Link href="/shop?category=van">Van</Link><Link href="/shop?category=marine">Marine</Link></div><div><b>ROAMETRIC</b><Link href="/ueber-uns">Über uns</Link><Link href="/#engineering">Engineering</Link><a href="mailto:engineering@roametric.de">Custom Parts</a></div><div><b>KONTAKT</b><a href="mailto:hello@roametric.de">hello@roametric.de</a><span>Deutschland</span></div></div><div className="shell footer-bottom"><span>© 2026 ROAMETRIC</span><span>Impressum · Datenschutz</span></div></footer>}
export function ProductVisual({p,large=false}:{p:Product;large?:boolean}){return <div className={`product-visual ${large?'large':''}`}><div className="product-photo" style={{backgroundImage:`url('${p.image}')`,backgroundPosition:p.imagePosition||'center',backgroundSize:p.imageSize||'cover'}}/><em>{p.material}</em></div>}
export function ProductCard({product:p}:{product:Product}){return <article className="product-card"><Link href={`/produkt/${p.slug}`}><ProductVisual p={p}/></Link><div className="product-info"><p>{p.category.toUpperCase()}</p><Link href={`/produkt/${p.slug}`}><h3>{p.name}</h3></Link><strong>{formatPrice(p.price)}</strong><Link className="card-more" href={`/produkt/${p.slug}`}>Details ansehen →</Link></div>{p.badge&&<span className="badge">{p.badge}</span>}</article>}

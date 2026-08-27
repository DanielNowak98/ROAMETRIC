'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { products, type Product } from './data';

export type CartItem = { slug: string; quantity: number };
const CART_KEY = 'roametric-cart-v2';

export function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
}
function storeCart(items: CartItem[], open = false) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cartchange', { detail: { open } }));
}
export function addToCart(slug: string, quantity = 1) {
  const items = readCart(); const existing = items.find(item => item.slug === slug);
  if (existing) existing.quantity += quantity; else items.push({ slug, quantity });
  storeCart(items, true);
}
export function updateCartQuantity(slug: string, quantity: number) {
  storeCart(readCart().map(item => item.slug === slug ? { ...item, quantity } : item).filter(item => item.quantity > 0));
}
export function removeFromCart(slug: string) { storeCart(readCart().filter(item => item.slug !== slug)); }
export function clearCart() { storeCart([]); }
export function cartTotal(items: CartItem[]) { return items.reduce((sum, item) => sum + (products.find(p => p.slug === item.slug)?.price || 0) * item.quantity, 0); }
export function formatPrice(value: number) { return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); }

function CartRows({ items, compact = false, onChange }: { items: CartItem[]; compact?: boolean; onChange: () => void }) {
  return <div className="cart-lines">{items.map(item => { const p = products.find(product => product.slug === item.slug); if (!p) return null; return <article className="cart-line" key={item.slug}><ProductVisual p={p}/><div className="cart-line-copy"><p>{p.category.toUpperCase()} · {p.material}</p><Link href={`/produkt/${p.slug}`}>{p.name}</Link><strong>{formatPrice(p.price)}</strong>{!compact && <div className="qty"><button aria-label="Menge verringern" onClick={() => { updateCartQuantity(p.slug, item.quantity - 1); onChange(); }}>−</button><span>{item.quantity}</span><button aria-label="Menge erhöhen" onClick={() => { updateCartQuantity(p.slug, item.quantity + 1); onChange(); }}>+</button><button className="remove" onClick={() => { removeFromCart(p.slug); onChange(); }}>Entfernen</button></div>}</div><b>{formatPrice(p.price * item.quantity)}</b></article>})}</div>
}

function CartDrawer({ open, close, items, sync }: { open: boolean; close: () => void; items: CartItem[]; sync: () => void }) {
  const subtotal = cartTotal(items); const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 4.9;
  return <><button className={`drawer-backdrop ${open ? 'open' : ''}`} aria-label="Warenkorb schließen" onClick={close}/><aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Warenkorb" aria-hidden={!open}><div className="drawer-head"><div><p className="eyebrow">DEIN WARENKORB</p><h2>{items.length ? `${items.reduce((s,i)=>s+i.quantity,0)} Artikel` : 'Noch leer'}</h2></div><button onClick={close} aria-label="Warenkorb schließen">×</button></div>{items.length ? <><CartRows items={items} onChange={sync}/><div className="drawer-summary"><div><span>Zwischensumme</span><b>{formatPrice(subtotal)}</b></div><div><span>Versand</span><b>{shipping ? formatPrice(shipping) : 'Kostenlos'}</b></div><div className="drawer-total"><span>Gesamt</span><b>{formatPrice(subtotal + shipping)}</b></div><Link href="/checkout" className="add" onClick={close}>Zur Kasse <span>→</span></Link><Link href="/warenkorb" className="drawer-cart-link" onClick={close}>Warenkorb ansehen</Link></div></> : <div className="empty-cart"><span>R</span><h3>Bereit für dein nächstes Projekt?</h3><p>Entdecke funktionale Parts für unterwegs.</p><Link className="button amber" href="/shop" onClick={close}>Zum Shop →</Link></div>}</aside></>
}

export function Header() {
  const [items,setItems] = useState<CartItem[]>([]); const [menu,setMenu] = useState(false); const [drawer,setDrawer] = useState(false);
  const sync = () => setItems(readCart());
  useEffect(() => { const handler = (event: Event) => { sync(); if ((event as CustomEvent).detail?.open) setDrawer(true); }; const timer=window.setTimeout(sync,0); window.addEventListener('cartchange', handler); return () => {window.clearTimeout(timer);window.removeEventListener('cartchange', handler);}; }, []);
  const count = items.reduce((sum,item)=>sum+item.quantity,0);
  return <><header className="site-header"><div className="shell nav"><Link href="/" className="brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-header" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={112} height={68} priority unoptimized/></Link><nav className={menu?'open':''}><Link href="/shop">Shop</Link><Link href="/#engineering">Engineering</Link><Link href="/#engineering">Manufacturing</Link><Link href="/#about">Über uns</Link></nav><div className="nav-actions"><button aria-label="Suche">⌕</button><Link className="cart" href="/warenkorb" onClick={(event)=>{event.preventDefault();sync();setDrawer(true)}} aria-label={`${count} Artikel im Warenkorb öffnen`}>BAG <span>{count}</span></Link><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Menü">{menu?'×':'☰'}</button></div></div></header><CartDrawer open={drawer} close={()=>setDrawer(false)} items={items} sync={sync}/></>
}
export function Footer(){return <footer><div className="shell footer-grid"><div><Link href="/" className="brand footer-brand" aria-label="ROAMETRIC Startseite"><Image className="brand-logo brand-logo-footer" src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={178} height={115} unoptimized/></Link><p>Engineered parts for moving life.</p></div><div><b>SHOP</b><Link href="/shop">Alle Produkte</Link><Link href="/shop?category=van">Van</Link><Link href="/shop?category=marine">Marine</Link></div><div><b>SERVICE</b><a href="#engineering">Custom Parts</a><a href="#engineering">Engineering</a><a href="#engineering">Materialien</a></div><div><b>KONTAKT</b><a href="mailto:hello@roametric.de">hello@roametric.de</a><span>Deutschland</span></div></div><div className="shell footer-bottom"><span>© 2026 ROAMETRIC</span><span>Impressum · Datenschutz · AGB</span></div></footer>}
export function ProductVisual({p,large=false}:{p:Product;large?:boolean}){return <div className={`product-visual ${large?'large':''}`} style={{'--accent':p.color} as React.CSSProperties}><div className="shape"><i/><i/><span>R</span></div><em>{p.material}</em></div>}
export function ProductCard({product:p}:{product:Product}){return <article className="product-card"><Link href={`/produkt/${p.slug}`}><ProductVisual p={p}/></Link><div className="product-info"><p>{p.category.toUpperCase()} · {p.material}</p><Link href={`/produkt/${p.slug}`}><h3>{p.name}</h3></Link><div><strong>{formatPrice(p.price)}</strong><button onClick={()=>addToCart(p.slug)} aria-label={`${p.name} in den Warenkorb`}>+</button></div></div>{p.badge&&<span className="badge">{p.badge}</span>}</article>}
export { CartRows };

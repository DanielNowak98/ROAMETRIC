'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartRows, Footer, Header, cartTotal, formatPrice, readCart, type CartItem } from '../ui';

export default function CartPage(){
  const [items,setItems]=useState<CartItem[]>([]); const sync=()=>setItems(readCart()); useEffect(sync,[]);
  const subtotal=cartTotal(items); const shipping=subtotal>=75||subtotal===0?0:4.9; const missing=Math.max(0,75-subtotal);
  return <><Header/><main className="cart-page shell"><div className="page-title"><p className="eyebrow">ROAMETRIC SHOP</p><h1>DEIN WARENKORB.</h1></div>{items.length?<div className="cart-layout"><section><div className="shipping-progress"><div><span>{missing?`Noch ${formatPrice(missing)} bis zum kostenlosen Versand.`:'Dein Versand ist kostenlos.'}</span><b>{Math.min(100,subtotal/75*100).toFixed(0)}%</b></div><i><span style={{width:`${Math.min(100,subtotal/75*100)}%`}}/></i></div><CartRows items={items} onChange={sync}/><Link href="/shop" className="text-link">← Weiter einkaufen</Link></section><aside className="order-box"><p className="eyebrow">ZUSAMMENFASSUNG</p><div><span>Zwischensumme</span><b>{formatPrice(subtotal)}</b></div><div><span>Versand</span><b>{shipping?formatPrice(shipping):'Kostenlos'}</b></div><div className="order-total"><span>Gesamt</span><b>{formatPrice(subtotal+shipping)}</b></div><small>inkl. MwSt.</small><Link className="add" href="/checkout">Sicher zur Kasse <span>→</span></Link><p className="trust-line">✓ Sichere Zahlung &nbsp; ✓ 14 Tage Rückgabe</p></aside></div>:<div className="empty-page"><span>R</span><h2>Dein Warenkorb ist leer.</h2><p>Finde das passende Part für dein nächstes Abenteuer.</p><Link href="/shop" className="button amber">Produkte entdecken →</Link></div>}</main><Footer/></>
}

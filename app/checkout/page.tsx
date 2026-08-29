'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Footer, Header, cartTotal, formatPrice, readCart, type CartItem } from '../ui';
import { products } from '../data';

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readCart());
      setCancelled(new URLSearchParams(window.location.search).get('abgebrochen') === '1');
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const subtotal = cartTotal(items);
  const shippingCost = shipping === 'express' ? 9.9 : (subtotal >= 75 ? 0 : 4.9);
  const total = subtotal + shippingCost;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping }),
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || 'Die Zahlungsseite konnte nicht geöffnet werden.');
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Die Zahlungsseite konnte nicht geöffnet werden.');
      setLoading(false);
    }
  }

  if (!items.length) return <><Header/><main className="empty-page checkout-empty shell"><h1>Dein Warenkorb ist leer.</h1><p>Lege zuerst ein Produkt in den Warenkorb.</p><Link href="/shop" className="button amber">Zum Shop →</Link></main><Footer/></>;

  return <><Header/><main className="checkout shell">
    <div className="checkout-head"><p className="eyebrow">SICHERER CHECKOUT</p><h1>FAST AM ZIEL.</h1><div className="checkout-steps"><b>01 Warenkorb</b><b className="active">02 Zahlung</b><b>03 Fertig</b></div></div>
    {cancelled && <div className="checkout-message">Die Zahlung wurde abgebrochen. Dein Warenkorb ist vollständig erhalten geblieben.</div>}
    <form onSubmit={submit} className="checkout-grid">
      <div className="checkout-form">
        <fieldset><legend>Lieferung & Kontakt</legend><div className="secure-checkout-note"><b>Geschützt über Stripe Checkout</b><p>E-Mail-Adresse, Rechnungs- und Lieferadresse gibst du gleich auf der verschlüsselten Zahlungsseite ein. ROAMETRIC erhält keine Karten- oder PayPal-Zugangsdaten.</p></div></fieldset>
        <fieldset><legend>Versand</legend>
          <label className={`shipping-option ${shipping === 'standard' ? 'active' : ''}`}><input type="radio" name="shipping" value="standard" checked={shipping === 'standard'} onChange={() => setShipping('standard')}/><span><b>Standardversand</b><small>2–4 Werktage</small></span><strong>{subtotal >= 75 ? 'Kostenlos' : formatPrice(4.9)}</strong></label>
          <label className={`shipping-option ${shipping === 'express' ? 'active' : ''}`}><input type="radio" name="shipping" value="express" checked={shipping === 'express'} onChange={() => setShipping('express')}/><span><b>Express</b><small>1–2 Werktage</small></span><strong>{formatPrice(9.9)}</strong></label>
        </fieldset>
        <fieldset><legend>Zahlungsarten</legend><div className="payment-option active"><span className="payment-dot">✓</span><span><b>PayPal, Karte oder Wallet</b><small>Die verfügbaren Methoden zeigt Stripe passend zu deinem Gerät und Standort an.</small></span><strong>STRIPE</strong></div><div className="payment-badges"><span>PayPal</span><span>VISA</span><span>Mastercard</span><span>Apple Pay</span><span>Google Pay</span></div></fieldset>
      </div>
      <aside className="checkout-summary"><p className="eyebrow">DEINE BESTELLUNG</p>{items.map(item => { const product = products.find(entry => entry.slug === item.slug); return product ? <div className="checkout-item" key={item.slug}><span className="checkout-thumb" aria-hidden="true" style={{ backgroundImage: `url('${product.image}')`, backgroundPosition: product.imagePosition || 'center', backgroundSize: product.imageSize || 'cover' }}><i>{item.quantity}</i></span><span><b>{product.name}</b><small>{product.material}</small></span><strong>{formatPrice(product.price * item.quantity)}</strong></div> : null; })}<div className="summary-lines"><div><span>Zwischensumme</span><b>{formatPrice(subtotal)}</b></div><div><span>Versand</span><b>{shippingCost ? formatPrice(shippingCost) : 'Kostenlos'}</b></div><div className="order-total"><span>Gesamt</span><b>{formatPrice(total)}</b></div></div><small>inkl. MwSt.</small><label className="terms"><input required type="checkbox"/><span>Ich akzeptiere die AGB und habe die Datenschutzhinweise sowie die Widerrufsbelehrung gelesen.</span></label>{error && <p className="checkout-error" role="alert">{error}</p>}<button className="add" type="submit" disabled={loading}>{loading ? 'Zahlungsseite wird geöffnet …' : 'Zahlungspflichtig bestellen'} <span>→</span></button><p className="trust-line">🔒 Verschlüsselte Zahlung über Stripe</p></aside>
    </form>
  </main><Footer/></>;
}

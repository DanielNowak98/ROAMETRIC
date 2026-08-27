'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FulfillmentStatus, StoredOrder } from '../../../lib/orders';

type OrderItem = { slug: string; name: string; quantity: number; unitAmount: number };
type Address = { name?: string; address?: { line1?: string; line2?: string; postal_code?: string; city?: string; state?: string; country?: string } };

const fulfillmentLabels: Record<FulfillmentStatus, string> = { open: 'Offen', processing: 'In Bearbeitung', shipped: 'Versendet', cancelled: 'Storniert' };
const paymentLabels: Record<string, string> = { pending: 'Zahlung offen', processing: 'Zahlung läuft', paid: 'Bezahlt', failed: 'Fehlgeschlagen', expired: 'Abgelaufen' };

function parseItems(order: StoredOrder) { try { return JSON.parse(order.items_json) as OrderItem[]; } catch { return []; } }
function parseAddress(order: StoredOrder) { try { return JSON.parse(order.shipping_details_json || '{}') as Address; } catch { return {}; } }
function money(cents: number, currency: string) { return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100); }
function date(value: number) { return new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }

function EmailState({ value, label }: { value: string; label: string }) {
  return <span className={`email-state ${value}`}><i/>{label}: {value === 'sent' ? 'gesendet' : value === 'failed' ? 'Fehler' : value === 'sending' ? 'wird gesendet' : 'ausstehend'}</span>;
}

export default function OrdersClient({ initialOrders }: { initialOrders: StoredOrder[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function save(event: React.FormEvent<HTMLFormElement>, order: StoredOrder) {
    event.preventDefault();
    setSaving(order.id);
    setMessage('');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/admin/orders/${encodeURIComponent(order.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json() as { order?: StoredOrder; email?: { sent: boolean; reason?: string }; error?: string };
      if (response.status === 401) { router.push('/admin'); router.refresh(); return; }
      if (!response.ok || !result.order) throw new Error(result.error || 'Änderung fehlgeschlagen.');
      setOrders((current) => current.map((entry) => entry.id === order.id ? result.order! : entry));
      setMessage(result.email?.sent ? `${order.id} gespeichert – Versand-E-Mail wurde gesendet.` : result.email?.reason === 'not-configured' ? `${order.id} gespeichert – E-Mail-Versand ist noch nicht konfiguriert.` : `${order.id} wurde gespeichert.`);
    } catch (saveError) {
      setMessage(saveError instanceof Error ? saveError.message : 'Änderung fehlgeschlagen.');
    } finally { setSaving(''); }
  }

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.push('/admin');
    router.refresh();
  }

  return <>
    <header className="admin-topbar"><Link href="/" className="admin-wordmark">ROAMETRIC</Link><div><span>BESTELLVERWALTUNG</span><button type="button" onClick={logout}>Abmelden</button></div></header>
    <main className="admin-orders-page">
      <section className="admin-orders-head"><div><p className="eyebrow">FULFILLMENT CENTER</p><h1>BESTELLUNGEN.</h1><p>Hier werden ausschließlich serverseitig bestätigte Stripe-Bestellungen angezeigt.</p></div><div className="admin-stat"><b>{orders.length}</b><span>Bestellungen</span></div><div className="admin-stat amber"><b>{orders.filter((order) => order.status === 'paid' && order.fulfillment_status !== 'shipped' && order.fulfillment_status !== 'cancelled').length}</b><span>zu bearbeiten</span></div></section>
      {message && <p className="admin-flash" role="status">{message}</p>}
      {!orders.length ? <section className="admin-empty"><span>R</span><h2>Noch keine Bestellungen.</h2><p>Nach der ersten Stripe-Testzahlung erscheint der Auftrag automatisch hier.</p></section> : <section className="admin-order-list">
        {orders.map((order) => { const address = parseAddress(order); const items = parseItems(order); return <article className="admin-order" key={order.id}>
          <div className="admin-order-summary"><div><p>{date(order.created_at)}</p><h2>{order.id}</h2><span>{order.customer_email || 'E-Mail noch nicht von Stripe übermittelt'}</span></div><div className="admin-order-badges"><span className={`payment ${order.status}`}>{paymentLabels[order.status] || order.status}</span><span className={`fulfillment ${order.fulfillment_status}`}>{fulfillmentLabels[order.fulfillment_status as FulfillmentStatus] || order.fulfillment_status}</span></div><strong>{money(order.amount_total, order.currency)}</strong></div>
          <details open={order.status === 'paid' && order.fulfillment_status !== 'shipped'}><summary>Bestellung bearbeiten <span>↓</span></summary><div className="admin-order-detail">
            <div className="admin-order-info"><section><h3>ARTIKEL</h3>{items.map((item) => <div className="admin-item" key={item.slug}><span>{item.quantity} × {item.name}</span><b>{money(item.quantity * item.unitAmount, order.currency)}</b></div>)}</section><section><h3>LIEFERADRESSE</h3>{address.name && <b>{address.name}</b>}<p>{address.address?.line1}<br/>{address.address?.line2}<br/>{address.address?.postal_code} {address.address?.city}<br/>{address.address?.country}</p><small>{order.shipping_method === 'express' ? 'Expressversand' : 'Standardversand'}</small></section><section><h3>BENACHRICHTIGUNGEN</h3><EmailState value={order.confirmation_email_status} label="Bestätigung"/><EmailState value={order.shipping_email_status} label="Versand"/></section></div>
            <form className="admin-fulfillment-form" onSubmit={(event) => save(event, order)}><label><span>Bearbeitungsstatus</span><select name="fulfillmentStatus" defaultValue={order.fulfillment_status}>{Object.entries(fulfillmentLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span>Versanddienstleister</span><input name="carrier" defaultValue={order.carrier || ''} placeholder="z. B. DHL" maxLength={80}/></label><label><span>Sendungsnummer</span><input name="trackingNumber" defaultValue={order.tracking_number || ''} placeholder="Sendungsnummer" maxLength={120}/></label><label className="wide"><span>Tracking-Link</span><input name="trackingUrl" type="url" defaultValue={order.tracking_url || ''} placeholder="https://…" maxLength={500}/></label><button type="submit" disabled={saving === order.id || order.status !== 'paid'}>{order.status !== 'paid' ? 'Erst nach Zahlung bearbeitbar' : saving === order.id ? 'Wird gespeichert …' : 'Änderungen speichern →'}</button><p>Beim erstmaligen Speichern als „Versendet“ wird automatisch eine Versandbestätigung verschickt.</p></form>
          </div></details>
        </article>; })}
      </section>}
    </main>
  </>;
}

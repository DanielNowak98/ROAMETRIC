import { claimOrderEmail, finishOrderEmail, type OrderEmailKind, type StoredOrder } from './orders';
import { runtimeValue } from './runtime';

type OrderItem = { name: string; quantity: number; unitAmount: number };

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character);
}

function items(order: StoredOrder) {
  try { return JSON.parse(order.items_json) as OrderItem[]; } catch { return []; }
}

function money(cents: number, currency = 'eur') {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100);
}

function emailCopy(order: StoredOrder, kind: OrderEmailKind) {
  const lines = items(order).map((item) => `<tr><td style="padding:8px 0">${escapeHtml(item.name)} × ${item.quantity}</td><td style="padding:8px 0;text-align:right">${money(item.unitAmount * item.quantity, order.currency)}</td></tr>`).join('');
  const tracking = order.tracking_number
    ? `<p><strong>Sendungsnummer:</strong> ${escapeHtml(order.tracking_number)}</p>${order.tracking_url ? `<p><a href="${escapeHtml(order.tracking_url)}">Sendung verfolgen</a></p>` : ''}`
    : '<p>Die Sendungsnummer reichen wir nach, sobald sie verfügbar ist.</p>';
  const shipping = kind === 'shipping';
  return {
    subject: shipping ? `Deine ROAMETRIC Bestellung ${order.id} ist unterwegs` : `Bestellbestätigung ${order.id}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1d1e1b"><p style="letter-spacing:.14em;font-size:12px">ROAMETRIC</p><h1>${shipping ? 'Deine Bestellung ist unterwegs.' : 'Danke für deine Bestellung.'}</h1><p>Bestellnummer: <strong>${escapeHtml(order.id)}</strong></p>${shipping ? tracking : `<table style="width:100%;border-collapse:collapse">${lines}</table><p style="border-top:1px solid #ccc;padding-top:16px"><strong>Gesamt: ${money(order.amount_total, order.currency)}</strong></p><p>Wir informieren dich erneut, sobald deine Bestellung versendet wurde.</p>`}<p style="margin-top:32px;color:#666">Präzision für unterwegs.<br/>Dein ROAMETRIC Team</p></div>`,
  };
}

async function send(order: StoredOrder, kind: OrderEmailKind) {
  const apiKey = runtimeValue('RESEND_API_KEY');
  const from = runtimeValue('ORDER_FROM_EMAIL');
  if (!apiKey || !from || !order.customer_email) return 'pending' as const;
  const copy = emailCopy(order, kind);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [order.customer_email], reply_to: runtimeValue('ORDER_REPLY_TO') || undefined, subject: copy.subject, html: copy.html }),
  });
  if (!response.ok) throw new Error(`E-Mail-Dienst antwortet mit Status ${response.status}.`);
  return 'sent' as const;
}

export async function deliverOrderEmail(order: StoredOrder, kind: OrderEmailKind) {
  if (!await claimOrderEmail(order.id, kind)) return { sent: false, reason: 'already-claimed' };
  try {
    const status = await send(order, kind);
    await finishOrderEmail(order.id, kind, status);
    return { sent: status === 'sent', reason: status === 'pending' ? 'not-configured' : undefined };
  } catch (error) {
    await finishOrderEmail(order.id, kind, 'failed');
    throw error;
  }
}

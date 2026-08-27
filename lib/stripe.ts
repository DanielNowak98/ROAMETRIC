import { products } from '../app/data';
import { runtimeValue } from './runtime';

export type CheckoutCartItem = { slug: string; quantity: number };
export type CheckoutPayload = { items: CheckoutCartItem[]; shipping: 'standard' | 'express' };

export type VerifiedCart = {
  items: Array<CheckoutCartItem & { name: string; description: string; unitAmount: number }>;
  shipping: 'standard' | 'express';
  subtotal: number;
  shippingCost: number;
  total: number;
};

export type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  payment_status?: string;
  status?: string;
  amount_total?: number | null;
  currency?: string | null;
  metadata?: Record<string, string> | null;
  customer_details?: { email?: string | null; address?: unknown } | null;
  collected_information?: { shipping_details?: unknown } | null;
  shipping_details?: unknown;
};

function stripeSecret() {
  const key = runtimeValue('STRIPE_SECRET_KEY');
  if (!key || !key.startsWith('sk_')) throw new Error('Stripe ist noch nicht konfiguriert.');
  return key;
}

export function verifyCart(payload: unknown): VerifiedCart {
  if (!payload || typeof payload !== 'object') throw new Error('Ungültige Checkout-Daten.');
  const candidate = payload as Partial<CheckoutPayload>;
  if (!Array.isArray(candidate.items) || !candidate.items.length || candidate.items.length > 20) {
    throw new Error('Der Warenkorb ist leer oder zu groß.');
  }
  if (candidate.shipping !== 'standard' && candidate.shipping !== 'express') {
    throw new Error('Ungültige Versandart.');
  }

  const quantities = new Map<string, number>();
  for (const item of candidate.items) {
    if (!item || typeof item.slug !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      throw new Error('Ungültige Produktmenge.');
    }
    quantities.set(item.slug, (quantities.get(item.slug) || 0) + item.quantity);
  }

  const items = [...quantities.entries()].map(([slug, quantity]) => {
    if (quantity > 10) throw new Error('Maximal 10 Stück je Produkt.');
    const product = products.find((entry) => entry.slug === slug);
    if (!product) throw new Error('Ein Produkt ist nicht mehr verfügbar.');
    return {
      slug,
      quantity,
      name: product.name,
      description: `${product.category} · ${product.material}`,
      unitAmount: Math.round(product.price * 100),
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0);
  const shippingCost = candidate.shipping === 'express' ? 990 : (subtotal >= 7500 ? 0 : 490);
  return { items, shipping: candidate.shipping, subtotal, shippingCost, total: subtotal + shippingCost };
}

function trustedOrigin(request: Request) {
  const configured = runtimeValue('SITE_URL')?.replace(/\/$/, '');
  const origin = configured || new URL(request.url).origin;
  const parsed = new URL(origin);
  if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1') {
    throw new Error('SITE_URL muss eine sichere HTTPS-Adresse sein.');
  }
  return parsed.origin;
}

async function stripeFetch(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.stripe.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${stripeSecret()}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    const stripeError = data.error as { message?: string } | undefined;
    throw new Error(stripeError?.message || 'Stripe konnte den Checkout nicht erstellen.');
  }
  return data;
}

export async function createStripeCheckout(request: Request, cart: VerifiedCart, orderId: string) {
  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('locale', 'de');
  body.set('submit_type', 'pay');
  body.set('customer_creation', 'always');
  body.set('billing_address_collection', 'required');
  body.set('automatic_payment_methods[enabled]', 'true');
  body.set('shipping_address_collection[allowed_countries][0]', 'DE');
  body.set('shipping_address_collection[allowed_countries][1]', 'AT');
  body.set('shipping_address_collection[allowed_countries][2]', 'CH');
  body.set('success_url', `${trustedOrigin(request)}/checkout/erfolg?session_id={CHECKOUT_SESSION_ID}`);
  body.set('cancel_url', `${trustedOrigin(request)}/checkout?abgebrochen=1`);
  body.set('client_reference_id', orderId);
  body.set('metadata[order_id]', orderId);
  body.set('payment_intent_data[metadata][order_id]', orderId);

  cart.items.forEach((item, index) => {
    body.set(`line_items[${index}][price_data][currency]`, 'eur');
    body.set(`line_items[${index}][price_data][unit_amount]`, String(item.unitAmount));
    body.set(`line_items[${index}][price_data][product_data][name]`, item.name);
    body.set(`line_items[${index}][price_data][product_data][description]`, item.description);
    body.set(`line_items[${index}][quantity]`, String(item.quantity));
  });

  if (cart.shippingCost) {
    const index = cart.items.length;
    body.set(`line_items[${index}][price_data][currency]`, 'eur');
    body.set(`line_items[${index}][price_data][unit_amount]`, String(cart.shippingCost));
    body.set(`line_items[${index}][price_data][product_data][name]`, cart.shipping === 'express' ? 'Expressversand' : 'Standardversand');
    body.set(`line_items[${index}][quantity]`, '1');
  }

  return stripeFetch('/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Idempotency-Key': orderId,
    },
    body,
  }) as Promise<StripeCheckoutSession>;
}

export async function retrieveStripeCheckout(sessionId: string) {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) throw new Error('Ungültige Checkout-ID.');
  return stripeFetch(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}`) as Promise<StripeCheckoutSession>;
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

export async function verifyStripeWebhook(rawBody: string, signatureHeader: string | null) {
  const secret = runtimeValue('STRIPE_WEBHOOK_SECRET');
  if (!secret || !signatureHeader) throw new Error('Webhook-Signatur fehlt.');
  const parts = signatureHeader.split(',').map((part) => part.split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!timestamp || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    throw new Error('Webhook-Signatur ist abgelaufen oder ungültig.');
  }
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  if (!signatures.some((signature) => constantTimeEqual(signature, expected))) throw new Error('Webhook-Signatur ist ungültig.');
  return JSON.parse(rawBody) as { type: string; data: { object: StripeCheckoutSession } };
}

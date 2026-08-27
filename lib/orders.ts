import { runtimeEnv } from './runtime';

export type StoredOrder = {
  id: string;
  stripe_session_id: string;
  status: string;
  amount_total: number;
  currency: string;
  customer_email: string | null;
  items_json: string;
  shipping_method: string;
  shipping_details_json: string | null;
  created_at: number;
  paid_at: number | null;
};

function database() {
  const db = runtimeEnv().DB;
  if (!db) throw new Error('Die Bestelldatenbank ist noch nicht konfiguriert.');
  return db;
}

export async function prepareOrdersDatabase() {
  const db = database();
  await db.prepare(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY NOT NULL,
    stripe_session_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    amount_total INTEGER NOT NULL,
    currency TEXT DEFAULT 'eur' NOT NULL,
    customer_email TEXT,
    items_json TEXT NOT NULL,
    shipping_method TEXT NOT NULL,
    shipping_details_json TEXT,
    created_at INTEGER NOT NULL,
    paid_at INTEGER
  )`).run();
  await db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders (stripe_session_id)').run();
  return db;
}

export async function createPendingOrder(input: {
  id: string;
  stripeSessionId: string;
  amountTotal: number;
  items: unknown;
  shippingMethod: string;
}) {
  const db = await prepareOrdersDatabase();
  await db.prepare(`INSERT INTO orders (
    id, stripe_session_id, status, amount_total, currency, items_json, shipping_method, created_at
  ) VALUES (?, ?, 'pending', ?, 'eur', ?, ?, ?)
  ON CONFLICT(stripe_session_id) DO NOTHING`).bind(
    input.id,
    input.stripeSessionId,
    input.amountTotal,
    JSON.stringify(input.items),
    input.shippingMethod,
    Date.now(),
  ).run();
}

export async function getOrderBySession(stripeSessionId: string) {
  const db = await prepareOrdersDatabase();
  return db.prepare('SELECT * FROM orders WHERE stripe_session_id = ? LIMIT 1')
    .bind(stripeSessionId)
    .first<StoredOrder>();
}

export async function updateOrderFromStripe(input: {
  stripeSessionId: string;
  status: 'paid' | 'processing' | 'failed' | 'expired';
  amountTotal?: number | null;
  currency?: string | null;
  customerEmail?: string | null;
  shippingDetails?: unknown;
}) {
  const db = await prepareOrdersDatabase();
  const paidAt = input.status === 'paid' ? Date.now() : null;
  await db.prepare(`UPDATE orders SET
    status = ?,
    amount_total = COALESCE(?, amount_total),
    currency = COALESCE(?, currency),
    customer_email = COALESCE(?, customer_email),
    shipping_details_json = COALESCE(?, shipping_details_json),
    paid_at = COALESCE(?, paid_at)
    WHERE stripe_session_id = ?`).bind(
      input.status,
      input.amountTotal ?? null,
      input.currency ?? null,
      input.customerEmail ?? null,
      input.shippingDetails ? JSON.stringify(input.shippingDetails) : null,
      paidAt,
      input.stripeSessionId,
    ).run();
}

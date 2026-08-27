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
  fulfillment_status: string;
  carrier: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  confirmation_email_status: string;
  shipping_email_status: string;
  created_at: number;
  updated_at: number;
  paid_at: number | null;
};

export type FulfillmentStatus = 'open' | 'processing' | 'shipped' | 'cancelled';
export type OrderEmailKind = 'confirmation' | 'shipping';

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
    fulfillment_status TEXT DEFAULT 'open' NOT NULL,
    carrier TEXT,
    tracking_number TEXT,
    tracking_url TEXT,
    confirmation_email_status TEXT DEFAULT 'pending' NOT NULL,
    shipping_email_status TEXT DEFAULT 'pending' NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER DEFAULT 0 NOT NULL,
    paid_at INTEGER
  )`).run();

  const columns = await db.prepare('PRAGMA table_info(orders)').all<{ name: string }>();
  const existing = new Set((columns.results || []).map((column) => column.name));
  const additions: Array<[string, string]> = [
    ['fulfillment_status', "TEXT DEFAULT 'open' NOT NULL"],
    ['carrier', 'TEXT'],
    ['tracking_number', 'TEXT'],
    ['tracking_url', 'TEXT'],
    ['confirmation_email_status', "TEXT DEFAULT 'pending' NOT NULL"],
    ['shipping_email_status', "TEXT DEFAULT 'pending' NOT NULL"],
    ['updated_at', 'INTEGER DEFAULT 0 NOT NULL'],
  ];
  for (const [name, definition] of additions) {
    if (!existing.has(name)) await db.prepare(`ALTER TABLE orders ADD COLUMN ${name} ${definition}`).run();
  }
  await db.batch([
    db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders (stripe_session_id)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC)'),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_orders_fulfillment_status ON orders (fulfillment_status) WHERE fulfillment_status != 'shipped'"),
  ]);
  await db.prepare('PRAGMA optimize').run();
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
  const now = Date.now();
  await db.prepare(`INSERT INTO orders (
    id, stripe_session_id, status, amount_total, currency, items_json, shipping_method, created_at, updated_at
  ) VALUES (?, ?, 'pending', ?, 'eur', ?, ?, ?, ?)
  ON CONFLICT(stripe_session_id) DO NOTHING`).bind(
    input.id,
    input.stripeSessionId,
    input.amountTotal,
    JSON.stringify(input.items),
    input.shippingMethod,
    now,
    now,
  ).run();
}

export async function getOrderBySession(stripeSessionId: string) {
  const db = await prepareOrdersDatabase();
  return db.prepare('SELECT * FROM orders WHERE stripe_session_id = ? LIMIT 1')
    .bind(stripeSessionId)
    .first<StoredOrder>();
}

export async function getOrderById(id: string) {
  const db = await prepareOrdersDatabase();
  return db.prepare('SELECT * FROM orders WHERE id = ? LIMIT 1').bind(id).first<StoredOrder>();
}

export async function listOrders(limit = 100) {
  const db = await prepareOrdersDatabase();
  const safeLimit = Math.min(250, Math.max(1, Math.trunc(limit)));
  const result = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT ?').bind(safeLimit).all<StoredOrder>();
  return result.results || [];
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
    paid_at = COALESCE(?, paid_at),
    updated_at = ?
    WHERE stripe_session_id = ?`).bind(
      input.status,
      input.amountTotal ?? null,
      input.currency ?? null,
      input.customerEmail ?? null,
    input.shippingDetails ? JSON.stringify(input.shippingDetails) : null,
    paidAt,
    Date.now(),
    input.stripeSessionId,
  ).run();
  return getOrderBySession(input.stripeSessionId);
}

export async function updateOrderFulfillment(input: {
  id: string;
  fulfillmentStatus: FulfillmentStatus;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}) {
  const db = await prepareOrdersDatabase();
  await db.prepare(`UPDATE orders SET
    fulfillment_status = ?, carrier = ?, tracking_number = ?, tracking_url = ?, updated_at = ?
    WHERE id = ?`).bind(
    input.fulfillmentStatus,
    input.carrier?.trim() || null,
    input.trackingNumber?.trim() || null,
    input.trackingUrl?.trim() || null,
    Date.now(),
    input.id,
  ).run();
  return getOrderById(input.id);
}

export async function claimOrderEmail(id: string, kind: OrderEmailKind) {
  const db = await prepareOrdersDatabase();
  const column = kind === 'confirmation' ? 'confirmation_email_status' : 'shipping_email_status';
  const result = await db.prepare(`UPDATE orders SET ${column} = 'sending', updated_at = ? WHERE id = ? AND ${column} IN ('pending', 'failed')`)
    .bind(Date.now(), id).run();
  return Boolean(result.meta.changes);
}

export async function finishOrderEmail(id: string, kind: OrderEmailKind, status: 'sent' | 'pending' | 'failed') {
  const db = await prepareOrdersDatabase();
  const column = kind === 'confirmation' ? 'confirmation_email_status' : 'shipping_email_status';
  await db.prepare(`UPDATE orders SET ${column} = ?, updated_at = ? WHERE id = ?`).bind(status, Date.now(), id).run();
}

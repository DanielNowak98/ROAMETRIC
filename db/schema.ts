import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  stripeSessionId: text('stripe_session_id').notNull(),
  status: text('status').notNull().default('pending'),
  amountTotal: integer('amount_total').notNull(),
  currency: text('currency').notNull().default('eur'),
  customerEmail: text('customer_email'),
  itemsJson: text('items_json').notNull(),
  shippingMethod: text('shipping_method').notNull(),
  shippingDetailsJson: text('shipping_details_json'),
  fulfillmentStatus: text('fulfillment_status').notNull().default('open'),
  carrier: text('carrier'),
  trackingNumber: text('tracking_number'),
  trackingUrl: text('tracking_url'),
  confirmationEmailStatus: text('confirmation_email_status').notNull().default('pending'),
  shippingEmailStatus: text('shipping_email_status').notNull().default('pending'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull().default(0),
  paidAt: integer('paid_at'),
}, (table) => [
  uniqueIndex('idx_orders_stripe_session_id').on(table.stripeSessionId),
]);

export const adminLoginAttempts = sqliteTable('admin_login_attempts', {
  key: text('key').primaryKey(),
  attempts: integer('attempts').notNull().default(0),
  windowStartedAt: integer('window_started_at').notNull(),
  blockedUntil: integer('blocked_until'),
});

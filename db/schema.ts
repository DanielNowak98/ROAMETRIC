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
  createdAt: integer('created_at').notNull(),
  paidAt: integer('paid_at'),
}, (table) => [
  uniqueIndex('idx_orders_stripe_session_id').on(table.stripeSessionId),
]);

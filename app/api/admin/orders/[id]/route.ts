import { NextResponse } from 'next/server';
import { requestHasTrustedOrigin, requestIsAdmin } from '../../../../../lib/admin-auth';
import { deliverOrderEmail } from '../../../../../lib/email';
import { updateOrderFulfillment, type FulfillmentStatus } from '../../../../../lib/orders';

export const runtime = 'edge';
const statuses: FulfillmentStatus[] = ['open', 'processing', 'shipped', 'cancelled'];

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!requestHasTrustedOrigin(request)) return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  if (!await requestIsAdmin(request)) return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  try {
    const { id } = await context.params;
    if (!/^RM-\d{4}-[A-Z0-9-]{4,32}$/.test(id)) throw new Error('Ungültige Bestellnummer.');
    const body = await request.json() as Record<string, unknown>;
    if (!statuses.includes(body.fulfillmentStatus as FulfillmentStatus)) throw new Error('Ungültiger Bearbeitungsstatus.');
    const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
    const trackingUrl = clean(body.trackingUrl, 500);
    if (trackingUrl && !/^https:\/\//i.test(trackingUrl)) throw new Error('Der Tracking-Link muss mit https:// beginnen.');
    const order = await updateOrderFulfillment({
      id,
      fulfillmentStatus: body.fulfillmentStatus as FulfillmentStatus,
      carrier: clean(body.carrier, 80),
      trackingNumber: clean(body.trackingNumber, 120),
      trackingUrl,
    });
    if (!order) return NextResponse.json({ error: 'Bestellung nicht gefunden.' }, { status: 404 });
    let email = { sent: false, reason: undefined as string | undefined };
    if (order.fulfillment_status === 'shipped' && order.status === 'paid') email = await deliverOrderEmail(order, 'shipping');
    return NextResponse.json({ order, email });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Die Bestellung konnte nicht aktualisiert werden.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

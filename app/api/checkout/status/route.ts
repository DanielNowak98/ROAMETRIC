import { NextResponse } from 'next/server';
import { getOrderBySession, updateOrderFromStripe } from '../../../../lib/orders';
import { retrieveStripeCheckout } from '../../../../lib/stripe';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get('session_id') || '';
    const order = await getOrderBySession(sessionId);
    if (!order) return NextResponse.json({ error: 'Bestellung wurde nicht gefunden.' }, { status: 404 });
    const session = await retrieveStripeCheckout(sessionId);
    const paid = session.payment_status === 'paid';
    const status = paid ? 'paid' : (session.status === 'expired' ? 'expired' : 'processing');
    await updateOrderFromStripe({
      stripeSessionId: sessionId,
      status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      shippingDetails: session.collected_information?.shipping_details || session.shipping_details,
    });
    return NextResponse.json({ orderId: order.id, status, paid });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Zahlungsstatus konnte nicht geprüft werden.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

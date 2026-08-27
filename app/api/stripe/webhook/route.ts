import { NextResponse } from 'next/server';
import { updateOrderFromStripe } from '../../../../lib/orders';
import { type StripeCheckoutSession, verifyStripeWebhook } from '../../../../lib/stripe';

export const runtime = 'edge';

function statusForEvent(type: string, session: StripeCheckoutSession) {
  if (type === 'checkout.session.expired') return 'expired' as const;
  if (type === 'checkout.session.async_payment_failed') return 'failed' as const;
  if (type === 'checkout.session.async_payment_succeeded' || session.payment_status === 'paid') return 'paid' as const;
  return 'processing' as const;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const event = await verifyStripeWebhook(rawBody, request.headers.get('stripe-signature'));
    const accepted = [
      'checkout.session.completed',
      'checkout.session.async_payment_succeeded',
      'checkout.session.async_payment_failed',
      'checkout.session.expired',
    ];
    if (accepted.includes(event.type)) {
      const session = event.data.object;
      await updateOrderFromStripe({
        stripeSessionId: session.id,
        status: statusForEvent(event.type, session),
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
        shippingDetails: session.collected_information?.shipping_details || session.shipping_details,
      });
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook konnte nicht verarbeitet werden.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

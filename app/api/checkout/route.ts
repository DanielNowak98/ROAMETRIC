import { NextResponse } from 'next/server';
import { createPendingOrder, prepareOrdersDatabase } from '../../../lib/orders';
import { createStripeCheckout, verifyCart } from '../../../lib/stripe';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const cart = verifyCart(await request.json());
    await prepareOrdersDatabase();
    const orderId = `RM-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const session = await createStripeCheckout(request, cart, orderId);
    if (!session.id || !session.url) throw new Error('Stripe hat keine Zahlungsseite zurückgegeben.');
    await createPendingOrder({
      id: orderId,
      stripeSessionId: session.id,
      amountTotal: cart.total,
      items: cart.items.map(({ slug, quantity, name, unitAmount }) => ({ slug, quantity, name, unitAmount })),
      shippingMethod: cart.shipping,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout konnte nicht gestartet werden.';
    return NextResponse.json({ error: message }, { status: message.includes('konfiguriert') ? 503 : 400 });
  }
}

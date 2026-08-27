import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cookieFromHeader, verifyAdminSession } from '../../../lib/admin-auth';
import { listOrders } from '../../../lib/orders';
import OrdersClient from './orders-client';

export const metadata: Metadata = { title: 'Bestellungen', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const requestHeaders = await headers();
  if (!await verifyAdminSession(cookieFromHeader(requestHeaders.get('cookie')))) redirect('/admin');
  return <OrdersClient initialOrders={await listOrders()}/>;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminIsConfigured, cookieFromHeader, verifyAdminSession } from '../../lib/admin-auth';
import AdminLoginForm from './login-form';

export const metadata: Metadata = { title: 'Bestellverwaltung', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const requestHeaders = await headers();
  if (await verifyAdminSession(cookieFromHeader(requestHeaders.get('cookie')))) redirect('/admin/bestellungen');
  const configured = adminIsConfigured();
  return <main className="admin-login-page">
    <section className="admin-login-card">
      <Link href="/" className="admin-wordmark">ROAMETRIC</Link>
      <p className="eyebrow">INTERNER BEREICH</p>
      <h1>BESTELLUNGEN<br/>IM BLICK.</h1>
      <p className="admin-login-copy">Zahlungen prüfen, Aufträge bearbeiten und Versandinformationen sicher an deine Kunden übermitteln.</p>
      {configured ? <AdminLoginForm/> : <div className="admin-config-note"><b>Adminzugang noch nicht eingerichtet</b><p>Hinterlege zuerst <code>ADMIN_PASSWORD</code> und <code>ADMIN_SESSION_SECRET</code> in der lokalen beziehungsweise veröffentlichten Umgebung.</p></div>}
      <Link href="/" className="admin-back">← Zur Website</Link>
    </section>
  </main>;
}

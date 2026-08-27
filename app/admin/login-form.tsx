'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: data.get('password') }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Anmeldung fehlgeschlagen.');
      router.push('/admin/bestellungen');
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Anmeldung fehlgeschlagen.');
      setLoading(false);
    }
  }

  return <form className="admin-login-form" onSubmit={submit}>
    <label><span>Admin-Kennwort</span><input name="password" type="password" autoComplete="current-password" required autoFocus/></label>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <button type="submit" disabled={loading}>{loading ? 'Wird geprüft …' : 'Bestellungen öffnen →'}</button>
  </form>;
}

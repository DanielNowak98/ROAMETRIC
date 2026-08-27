'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearCart, Footer, Header } from '../../ui';

type CheckoutState = 'checking' | 'paid' | 'processing' | 'error';

export default function CheckoutSuccessPage() {
  const [state, setState] = useState<CheckoutState>('checking');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('Deine Zahlung wird sicher bestätigt.');

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) {
      const timer = window.setTimeout(() => { setState('error'); setMessage('Die Zahlungsreferenz fehlt.'); }, 0);
      return () => window.clearTimeout(timer);
    }
    let attempts = 0;
    const check = async () => {
      attempts += 1;
      try {
        const response = await fetch(`/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
        const result = await response.json() as { orderId?: string; paid?: boolean; status?: string; error?: string };
        if (!response.ok) throw new Error(result.error || 'Zahlung konnte nicht geprüft werden.');
        if (result.orderId) setOrderId(result.orderId);
        if (result.paid) { clearCart(); setState('paid'); return; }
        if (attempts < 6 && result.status === 'processing') { setTimeout(check, 1500); return; }
        setState('processing');
        setMessage('Die Zahlung wird noch verarbeitet. Du erhältst die Bestätigung nach erfolgreichem Abschluss.');
      } catch (error) {
        setState('error');
        setMessage(error instanceof Error ? error.message : 'Zahlung konnte nicht geprüft werden.');
      }
    };
    const timer = window.setTimeout(() => { void check(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <><Header/><main className={`confirmation shell ${state}`}><span className="confirm-mark">{state === 'paid' ? '✓' : state === 'error' ? '!' : '…'}</span><p className="eyebrow">{state === 'paid' ? 'ZAHLUNG BESTÄTIGT' : 'BESTELLSTATUS'}</p><h1>{state === 'paid' ? <>DANKE FÜR<br/>DEINE BESTELLUNG.</> : <>WIR PRÜFEN<br/>DEINE ZAHLUNG.</>}</h1><p>{message}</p>{orderId && <div className="demo-note"><b>Bestellnummer</b><span>{orderId}</span></div>}<Link href={state === 'paid' ? '/shop' : '/warenkorb'} className="button amber">{state === 'paid' ? 'Weiter einkaufen' : 'Zum Warenkorb'} →</Link></main><Footer/></>;
}

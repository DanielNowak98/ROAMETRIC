'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from './data';

// Anfrageliste: lokal im Browser gespeichert, kein Server nötig.
export type InquiryItem = { slug: string; quantity: number };
const KEY = 'roametric-inquiry-v1';
const EVENT = 'inquirychange';

export function readInquiry(): InquiryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '[]') as InquiryItem[];
    if (!Array.isArray(stored)) return [];
    return stored.filter((item) => products.some((p) => p.slug === item.slug) && Number.isInteger(item.quantity) && item.quantity > 0);
  } catch { return []; }
}

function store(items: InquiryItem[], toast?: string) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* privater Modus: nur für diese Sitzung */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { items, toast } }));
}

export function addToInquiry(slug: string, quantity = 1) {
  const items = readInquiry();
  const existing = items.find((item) => item.slug === slug);
  if (existing) existing.quantity = Math.min(99, existing.quantity + quantity); else items.push({ slug, quantity });
  const name = products.find((p) => p.slug === slug)?.name ?? 'Produkt';
  store(items, `${name} zur Anfrage hinzugefügt`);
}
export function setInquiryQuantity(slug: string, quantity: number) {
  store(readInquiry().map((item) => item.slug === slug ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item));
}
export function removeFromInquiry(slug: string) { store(readInquiry().filter((item) => item.slug !== slug)); }
export function clearInquiry() { store([]); }

export function useInquiry() {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => { setItems(readInquiry()); setReady(true); };
    const timer = window.setTimeout(sync, 0);
    const onChange = () => sync();
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => { window.clearTimeout(timer); window.removeEventListener(EVENT, onChange); window.removeEventListener('storage', onChange); };
  }, []);
  return { items, ready, count: items.reduce((sum, item) => sum + item.quantity, 0) };
}

export function InquiryToast() {
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    let timer = 0;
    const onChange = (event: Event) => {
      const toast = (event as CustomEvent<{ toast?: string }>).detail?.toast;
      if (!toast) return;
      setMessage(toast);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 4000);
    };
    window.addEventListener(EVENT, onChange);
    return () => { window.clearTimeout(timer); window.removeEventListener(EVENT, onChange); };
  }, []);
  return <div className={`inquiry-toast ${message ? 'show' : ''}`} role="status" aria-live="polite">
    {message && <><span>✓ {message}</span><Link href="/anfrage" onClick={() => setMessage(null)}>Anfrage ansehen →</Link></>}
  </div>;
}

export function InquiryButton({ slug, quantity = 1, className = '', label = 'Zur Anfrage hinzufügen' }: { slug: string; quantity?: number; className?: string; label?: string }) {
  const { items } = useInquiry();
  const inList = items.some((item) => item.slug === slug);
  return <button type="button" className={`inquiry-button ${inList ? 'in-list' : ''} ${className}`} onClick={() => addToInquiry(slug, quantity)} aria-label={`${label}${inList ? ' (bereits in der Anfrage)' : ''}`}>
    {inList ? `✓ In der Anfrage · +${quantity}` : label}
  </button>;
}

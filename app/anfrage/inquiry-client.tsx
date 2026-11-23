'use client';
import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import { categories, products } from '../data';
import { clearInquiry, removeFromInquiry, setInquiryQuantity, useInquiry } from '../inquiry';
import { formatPrice, ProductVisual } from '../ui';

const INBOX = 'hello@roametric.de';
type Form = { name: string; email: string; phone: string; usage: string; message: string; custom: boolean };
const emptyForm: Form = { name: '', email: '', phone: '', usage: '', message: '', custom: false };

export default function InquiryClient() {
  const { items, ready } = useInquiry();
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sentText, setSentText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => items.flatMap((item) => {
    const product = products.find((p) => p.slug === item.slug);
    return product ? [{ ...item, product }] : [];
  }), [items]);
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const update = <K extends keyof Form>(key: K, value: Form[K]) => { setForm((f) => ({ ...f, [key]: value })); setErrors((e) => ({ ...e, [key]: undefined })); };

  function buildText() {
    const productLines = lines.length
      ? lines.map((l) => `- ${l.quantity} × ${l.product.name} (${l.product.category}, ${l.product.material}) – Richtpreis ${formatPrice(l.product.price)} / Stk.`).join('\n')
      : '- (noch keine Produkte ausgewählt)';
    return [
      'Hallo ROAMETRIC-Team,', '',
      'ich interessiere mich für folgende Produkte:', productLines,
      lines.length ? `Richtpreis gesamt: ${formatPrice(total)} (unverbindlich)` : '', '',
      form.usage ? `Einsatzbereich / Fahrzeug / Setup: ${form.usage}` : '',
      form.custom ? 'Ich wünsche eine individuelle Anpassung.' : '',
      form.message ? `\nNachricht:\n${form.message}` : '', '',
      'Kontakt:', `Name: ${form.name}`, `E-Mail: ${form.email}`, form.phone ? `Telefon: ${form.phone}` : '',
    ].filter((line, i, all) => line !== '' || all[i - 1] !== '').join('\n');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Bitte gib deinen Namen an.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Bitte gib eine gültige E-Mail-Adresse an.';
    if (!lines.length && !form.message.trim()) next.message = 'Wähle ein Produkt aus oder beschreibe kurz, was du suchst.';
    setErrors(next);
    if (Object.keys(next).length) { window.setTimeout(() => (document.querySelector('.inquiry-form [aria-invalid=true]') as HTMLElement | null)?.focus(), 0); return; }
    const text = buildText();
    const subject = lines.length ? `Produktanfrage: ${lines.map((l) => l.product.name).join(', ')}`.slice(0, 120) : 'Anfrage an ROAMETRIC';
    setSentText(text);
    window.location.assign(`mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`);
  }

  async function copy() {
    if (!sentText) return;
    try { await navigator.clipboard.writeText(`An: ${INBOX}\n\n${sentText}`); setCopied(true); } catch { setCopied(false); }
  }

  if (sentText) return <section className="inquiry-done shell">
    <p className="eyebrow">SCHRITT 3 VON 3</p>
    <h2>Fast geschafft.</h2>
    <p>Dein E-Mail-Programm sollte sich mit der vorbereiteten Anfrage geöffnet haben. Prüfe sie kurz und klicke dort auf <b>Senden</b>. Wir melden uns in der Regel innerhalb von 1–2 Werktagen mit Angebot und Lieferzeit.</p>
    <p className="muted">Kein E-Mail-Programm geöffnet? Kopiere den Text und schicke ihn an <a href={`mailto:${INBOX}`}>{INBOX}</a>.</p>
    <pre className="inquiry-preview">{sentText}</pre>
    <div className="inquiry-actions">
      <button type="button" className="button dark" onClick={copy}>{copied ? '✓ Kopiert' : 'Text kopieren'}</button>
      <button type="button" className="button ghost" onClick={() => { clearInquiry(); setSentText(null); setForm(emptyForm); }}>Anfrage abschließen &amp; Liste leeren</button>
      <button type="button" className="text-link" onClick={() => setSentText(null)}>← Zurück zur Bearbeitung</button>
    </div>
  </section>;

  return <section className="inquiry-layout shell">
    <div className="inquiry-list">
      <div className="inquiry-step"><b>1</b><div><h2>Deine Auswahl</h2><p>Menge anpassen oder Produkte entfernen. Preise sind unverbindliche Richtpreise.</p></div></div>
      {!ready ? <p className="muted">Lade Auswahl …</p> : lines.length ? <>
        <div className="inquiry-lines">{lines.map((line) => <article className="inquiry-line" key={line.slug}>
          <Link href={`/produkt/${line.slug}`} className="inquiry-thumb" aria-label={line.product.name}><ProductVisual p={line.product}/></Link>
          <div className="inquiry-line-copy">
            <p>{line.product.category.toUpperCase()} · {line.product.material}</p>
            <Link href={`/produkt/${line.slug}`}>{line.product.name}</Link>
            <div className="qty-control" role="group" aria-label={`Menge ${line.product.name}`}>
              <button type="button" aria-label="Menge verringern" disabled={line.quantity <= 1} onClick={() => setInquiryQuantity(line.slug, line.quantity - 1)}>−</button>
              <span aria-live="polite">{line.quantity}</span>
              <button type="button" aria-label="Menge erhöhen" onClick={() => setInquiryQuantity(line.slug, line.quantity + 1)}>+</button>
              <button type="button" className="remove" onClick={() => removeFromInquiry(line.slug)}>Entfernen</button>
            </div>
          </div>
          <b>{formatPrice(line.product.price * line.quantity)}</b>
        </article>)}</div>
        <div className="inquiry-total"><span>Richtpreis gesamt</span><b>{formatPrice(total)}</b></div>
        <Link href="/shop" className="text-link">+ Weitere Produkte hinzufügen</Link>
      </> : <div className="inquiry-empty">
        <h3>Noch keine Produkte ausgewählt.</h3>
        <p>Stöbere durch die Kategorien und füge Produkte mit „Zur Anfrage hinzufügen“ hinzu – oder beschreibe rechts einfach, was du suchst.</p>
        <div className="inquiry-empty-links">{categories.map((c) => <Link key={c.slug} href={`/shop?category=${c.slug}`}>{c.name} →</Link>)}</div>
      </div>}
    </div>

    <form className="inquiry-form" onSubmit={submit} noValidate>
      <div className="inquiry-step"><b>2</b><div><h2>Deine Kontaktdaten</h2><p>Damit wir dir ein passendes Angebot schicken können.</p></div></div>
      <label>Name *<input value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name}/>{errors.name && <small className="error">{errors.name}</small>}</label>
      <label>E-Mail *<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email}/>{errors.email && <small className="error">{errors.email}</small>}</label>
      <label>Telefon <span className="optional">(optional)</span><input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel"/></label>
      <label>Einsatzbereich <span className="optional">(optional)</span><input value={form.usage} onChange={(e) => update('usage', e.target.value)} placeholder="z. B. VW Crafter, Canyon Grizl, Motorboot 6 m"/></label>
      <label>Nachricht<textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Fragen, Wunschmaße, Farbe, Stückzahl …" aria-invalid={!!errors.message}/>{errors.message && <small className="error">{errors.message}</small>}</label>
      <label className="check"><input type="checkbox" checked={form.custom} onChange={(e) => update('custom', e.target.checked)}/> Ich wünsche eine individuelle Anpassung</label>
      <button type="submit" className="add">Anfrage vorbereiten <span>→</span></button>
      <p className="muted small">Deine Anfrage wird als E-Mail in deinem E-Mail-Programm vorbereitet – es werden keine Daten auf dieser Website gespeichert oder übertragen.</p>
    </form>
  </section>;
}

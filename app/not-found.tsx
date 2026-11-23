import Link from 'next/link';
import { categories } from './data';
import { Footer, Header } from './ui';

export default function NotFound() {
  return <><Header/><main className="not-found shell">
    <p className="eyebrow">FEHLER 404</p>
    <h1>Diese Seite gibt es nicht (mehr).</h1>
    <p>Vielleicht wurde das Produkt umbenannt oder aus dem Sortiment genommen. Hier geht es weiter:</p>
    <div className="not-found-links">
      <Link className="button dark" href="/shop">Alle Produkte</Link>
      {categories.map((c) => <Link className="button ghost" key={c.slug} href={`/shop?category=${c.slug}`}>{c.name}</Link>)}
    </div>
    <p className="muted">Du suchst etwas Bestimmtes? <Link href="/anfrage">Schreib uns eine Anfrage →</Link></p>
  </main><Footer/></>;
}

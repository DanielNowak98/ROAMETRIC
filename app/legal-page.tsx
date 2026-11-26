import Link from './link';
import type { ReactNode } from 'react';
import { Footer, Header } from './ui';
import { legalLinks } from './data';

/** Gemeinsames Layout für alle Rechtsseiten. */
export function LegalPage({ path, eyebrow, title, updated, children }: { path: string; eyebrow: string; title: string; updated?: string; children: ReactNode }) {
  return <><Header/><main className="legal-page">
    <section className="legal-hero"><div className="shell"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1>{updated && <p className="legal-updated">Stand: {updated}</p>}</div></section>
    <div className="shell legal-layout">
      <aside className="legal-nav" aria-label="Rechtliches"><b>RECHTLICHES</b>{legalLinks.map((link) => <Link key={link.href} href={link.href} className={link.href === path ? 'active' : ''} aria-current={link.href === path ? 'page' : undefined}>{link.label}</Link>)}<a href="mailto:hello@roametric.de">Kontakt</a></aside>
      <article className="legal-body">{children}</article>
    </div>
  </main><Footer/></>;
}

/** Deutlich sichtbarer Platzhalter für Texte, die noch rechtlich geprüft eingefügt werden müssen. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <div className="legal-placeholder" role="note"><b>PLATZHALTER</b><div>{children}</div></div>;
}

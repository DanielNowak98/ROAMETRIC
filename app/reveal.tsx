'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Blendet Inhalte beim Scrollen weich ein. Respektiert "prefers-reduced-motion" über CSS. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'article' }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Erst mit laufendem JavaScript verstecken, damit ohne JS nie Inhalte unsichtbar bleiben.
    document.documentElement.classList.add('js-reveal');
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <Tag ref={ref as never} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

/** Endlos laufendes Band mit technischen Stichworten. */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return <div className="ticker" aria-hidden="true"><div className="ticker-track">{row.map((item, index) => <span key={index}>{item}<i>◆</i></span>)}</div></div>;
}

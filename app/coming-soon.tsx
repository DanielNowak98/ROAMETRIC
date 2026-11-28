import Link from './link';

/** Platzhalter für Kategorien, in denen noch keine Teile verfügbar sind. */
export function ComingSoon({ name }: { name: string }) {
  return <div className="coming-soon">
    <span className="coming-soon-tag">COMING SOON</span>
    <h3>Die ersten {name}-Teile sind in Entwicklung.</h3>
    <p>Du hast eine Idee oder brauchst ein bestimmtes Teil? Schreib uns — vielleicht wird es das erste dieser Kategorie.</p>
    <Link className="button dark" href="/anfrage">Teil vorschlagen →</Link>
  </div>;
}

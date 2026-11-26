import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, ProductCard } from './ui';
import { products, materials } from './data';
import { Reveal, Ticker } from './reveal';

const categories = [
  { name: 'Van', kicker: 'Ordnung. Ausbau. Freiheit.', icon: 'V', href: '/shop?category=van' },
  { name: 'Marine', kicker: 'Gemacht für Wind & Wasser.', icon: 'M', href: '/shop?category=marine' },
  { name: 'Bike', kicker: 'Cleverer. Leichter. Weiter.', icon: 'B', href: '/shop?category=bike' },
  { name: 'Outdoor', kicker: 'Bereit fürs Draußen.', icon: 'O', href: '/shop?category=outdoor' },
];

const steps = [
  { n: '01', title: 'Analyse', text: 'Wir starten beim echten Einsatz: Lastfall, Umgebung, Bauraum und Montage.' },
  { n: '02', title: 'CAD & Simulation', text: 'Konstruktion mit Blick auf Kraftfluss, Wandstärken und fertigungsgerechte Geometrie.' },
  { n: '03', title: 'Prototyp & Test', text: 'Passform, Vibration und Belastung werden am realen Objekt geprüft.' },
  { n: '04', title: 'Additive Fertigung', text: 'Serienfertigung ohne Werkzeugkosten — vom Einzelteil bis zur Kleinserie.' },
];

function DrawingSvg() {
  return <svg className="drawing-svg" viewBox="0 0 520 360" role="img" aria-label="Technische Zeichnung eines Halters mit Bemaßung">
    <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".08"/></pattern></defs>
    <rect width="520" height="360" fill="url(#grid)"/>
    <g className="draw" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M110 250 L110 140 Q110 100 150 100 L330 100 Q370 100 370 140 L370 250 Z"/>
      <circle cx="240" cy="175" r="44"/>
      <circle cx="240" cy="175" r="20"/>
      <circle cx="145" cy="225" r="9"/><circle cx="335" cy="225" r="9"/>
      <path d="M110 250 L370 250" strokeDasharray="6 6" strokeOpacity=".5"/>
    </g>
    <g className="dim" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity=".7">
      <path d="M110 290 L370 290 M110 280 L110 300 M370 280 L370 300"/>
      <path d="M410 100 L410 250 M400 100 L420 100 M400 250 L420 250"/>
      <path d="M240 175 L300 120"/>
    </g>
    <g className="dim-label" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">
      <text x="240" y="312" textAnchor="middle">B</text>
      <text x="428" y="179">H</text>
      <text x="306" y="116">Ø</text>
      <text x="18" y="340" fillOpacity=".55">ROAMETRIC · DWG-001 · MASSSTAB 1:1 · ALLGEMEINTOLERANZ ISO 2768-m</text>
    </g>
    <circle className="pulse-dot" cx="240" cy="175" r="4" fill="var(--sand, #d5b58b)"/>
  </svg>;
}

export default function Home() {
  const materialList = Object.values(materials);
  return <>
    <Header />
    <main className="home-v3">
      <section className="hero">
        <div className="hero-media" /><div className="hero-shade" /><div className="hero-grid-overlay" aria-hidden="true"/>
        <div className="hero-content shell"><div className="hero-brand"><Image src="/assets/roametric-logo.svg" alt="ROAMETRIC" width={430} height={278} priority unoptimized/><p>PRECISION FOR THE JOURNEY</p><div className="hero-cta"><Link className="button amber" href="/shop">Zum Shop <b>→</b></Link><Link className="button ghost" href="#engineering">Engineering</Link></div></div></div>
        <div className="hero-coords" aria-hidden="true"><span>SERIES 01</span><span>ADDITIVE MANUFACTURING</span><span>ENGINEERED IN GERMANY</span></div>
        <div className="category-rail shell">{categories.map((category) => <Link href={category.href} key={category.name}><span className="category-line-icon">{category.icon}</span><h2>{category.name}</h2><p>{category.kicker}</p><b>ENTDECKEN</b></Link>)}</div>
      </section>

      <Ticker items={['Additive Manufacturing', 'PA12 · PETG-CF · ASA · TPU', 'Van', 'Marine', 'Bike', 'Outdoor', 'Kleinserie ohne Werkzeugkosten', 'Engineered in Germany']}/>

      <section className="featured section"><div className="shell">
        <Reveal className="section-head"><div><p className="eyebrow">AUSGEWÄHLTE PRODUKTE</p><h2>Entwickelt für<br/>echte Abenteuer.</h2></div><Link href="/shop" className="text-link">Alle Produkte ansehen →</Link></Reveal>
        <div className="product-grid">{products.slice(0,4).map((p, index) => <Reveal key={p.slug} delay={index*90}><ProductCard product={p} index={index}/></Reveal>)}</div>
      </div></section>

      <section id="engineering" className="process-v3">
        <div className="shell process-v3-grid">
          <Reveal className="process-v3-copy"><p className="eyebrow light">ENGINEERING. MANUFACTURING. SOLUTIONS.</p><h2>Von der Idee<br/><span>zum Bauteil.</span></h2><p>ROAMETRIC steht für technische Präzision, hochwertige Materialien und durchdachte Lösungen. Jedes Teil durchläuft denselben Prozess — damit es am Ende einfach funktioniert.</p>
            <ol className="steps-v3">{steps.map(step => <li key={step.n}><b>{step.n}</b><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
            <a className="button amber" href="mailto:engineering@roametric.de">Projekt besprechen <b>→</b></a>
          </Reveal>
          <Reveal className="drawing-frame" delay={150}><div className="drawing-head"><span>DWG-001</span><span>REV. C</span></div><DrawingSvg/><div className="drawing-foot"><span>WERKSTOFF: PA12</span><span>VERFAHREN: AM</span></div></Reveal>
        </div>
      </section>

      <section id="materialien" className="materials-v3 section"><div className="shell">
        <Reveal className="section-head"><div><p className="eyebrow">MATERIALS THAT MATTER</p><h2>Der richtige Werkstoff<br/>für jeden Einsatz.</h2></div><p>Wir wählen das Material nach Lastfall und Umgebung — nicht nach Gewohnheit. Salzwasser, UV, Vibration oder Kälte: jede Anwendung hat ihren Werkstoff.</p></Reveal>
        <div className="material-grid">{materialList.map((m, index) => <Reveal as="article" key={m.code} delay={index*80} className="material-card"><span className="material-code">{m.code}</span><h3>{m.name}</h3><small>{m.process}</small><ul>{m.traits.map(t => <li key={t}>{t}</li>)}</ul><span className="material-index">{String(index+1).padStart(2,'0')}/{String(materialList.length).padStart(2,'0')}</span></Reveal>)}</div>
      </div></section>

      <section id="about" className="about-intro section"><div className="shell about-intro-grid"><Reveal><p className="eyebrow">ÜBER ROAMETRIC</p><h2>Freiheit braucht<br/>funktionierende Details.</h2></Reveal><Reveal className="about-intro-copy" delay={120}><p>ROAMETRIC verbindet die Freiheit des Unterwegsseins mit technischer Präzision. Wir denken Produkte von der realen Anwendung aus: klar in der Funktion, robust im Einsatz und bewusst auf das Wesentliche reduziert.</p><p>Der Name vereint <b>ROAM</b> — unterwegs sein — mit <b>METRIC</b> — messen, verstehen und präzise entwickeln.</p><Link className="button dark" href="/ueber-uns">Mehr über uns →</Link></Reveal></div><div className="shell about-principles"><article><b>01</b><h3>Praxis zuerst.</h3><p>Jede Lösung beginnt bei einer echten Aufgabe unterwegs.</p></article><article><b>02</b><h3>Präzision mit Zweck.</h3><p>Technik ist für uns dann gut, wenn sie das Leben einfacher macht.</p></article><article><b>03</b><h3>Für lange Wege.</h3><p>Material, Konstruktion und Fertigung denken wir gemeinsam.</p></article></div></section>

      <section className="usp"><div className="shell usp-grid"><div><b>01</b><h3>Engineered in Germany</h3><p>Entwicklung mit technischem Anspruch.</p></div><div><b>02</b><h3>Built for the Journey</h3><p>Getestet für Bewegung und Belastung.</p></div><div><b>03</b><h3>Materials that Matter</h3><p>PA12 · PETG · ASA · TPU</p></div><div><b>04</b><h3>Small Series. Big Ideas.</h3><p>Vom Einzelteil zur Kleinserie.</p></div></div></section>
    </main><Footer />
  </>
}

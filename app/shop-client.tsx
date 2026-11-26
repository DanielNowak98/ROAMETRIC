'use client';
import { useEffect, useMemo, useState } from 'react';
import { products, categories } from './data';
import { ProductCard } from './ui';

const ALL = 'Alle';

export default function ShopCatalog() {
  const [category, setCategory] = useState(ALL);
  const [material, setMaterial] = useState(ALL);
  const [sort, setSort] = useState('recommended');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const value = new URLSearchParams(window.location.search).get('category');
      const match = categories.find((entry) => entry.toLowerCase() === value?.toLowerCase());
      if (match) setCategory(match);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const chooseCategory = (value: string) => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === ALL) url.searchParams.delete('category'); else url.searchParams.set('category', value.toLowerCase());
    window.history.replaceState(null, '', url);
  };

  const materialOptions = useMemo(() => [...new Set(products.map((p) => p.material))], []);
  const countFor = (value: string) => value === ALL ? products.length : products.filter((p) => p.category === value).length;

  const filtered = useMemo(() => {
    let list = products.filter((p) => (category === ALL || p.category === category) && (material === ALL || p.material === material));
    if (sort === 'price-up') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-down') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'new') list = [...list].sort((a, b) => (b.badge === 'Neu' ? 1 : 0) - (a.badge === 'Neu' ? 1 : 0));
    return list;
  }, [category, material, sort]);

  const reset = () => { chooseCategory(ALL); setMaterial(ALL); };

  return <section className="shop-content shell shop-v3">
    <div className="shop-filterbar">
      <div className="chip-row" role="group" aria-label="Kategorie">
        {[ALL, ...categories].map((value) => { const count = countFor(value); return <button key={value} type="button" className={`chip ${category === value ? 'active' : ''}`} aria-pressed={category === value} disabled={!count} onClick={() => chooseCategory(value)}>{value}<sup>{count}</sup></button>; })}
      </div>
      <div className="filter-side">
        <div className="chip-row small" role="group" aria-label="Material">
          {[ALL, ...materialOptions].map((value) => <button key={value} type="button" className={`chip ghost ${material === value ? 'active' : ''}`} aria-pressed={material === value} onClick={() => setMaterial(value)}>{value === ALL ? 'Alle Materialien' : value}</button>)}
        </div>
        <label className="sort-select"><span>Sortieren</span><select aria-label="Sortierung" value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Empfohlen</option><option value="price-up">Preis aufsteigend</option><option value="price-down">Preis absteigend</option><option value="new">Neuheiten</option></select></label>
      </div>
    </div>
    <div className="result-line"><span><b>{String(filtered.length).padStart(2, '0')}</b> {filtered.length === 1 ? 'Produkt' : 'Produkte'}{category !== ALL && <> in <em>{category}</em></>}{material !== ALL && <> aus <em>{material}</em></>}</span>{(category !== ALL || material !== ALL) && <button type="button" onClick={reset}>Filter zurücksetzen ×</button>}</div>
    <div className="catalog">{filtered.length
      ? <div className="product-grid">{filtered.map((p, index) => <ProductCard key={`${p.slug}-${category}-${material}`} product={p} index={index}/>)}</div>
      : <div className="no-results"><span aria-hidden="true">∅</span><h2>Keine passenden Produkte.</h2><p>Ändere deine Auswahl oder entdecke alle ROAMETRIC Parts.</p><button type="button" className="button dark" onClick={reset}>Filter zurücksetzen</button></div>}
    </div>
  </section>;
}

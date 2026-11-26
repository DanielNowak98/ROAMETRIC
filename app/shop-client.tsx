'use client';
import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories, categoryBySlug, products } from './data';
import { ProductCard } from './ui';

const ALL = 'alle';

export default function ShopCatalog() {
  const params = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  const category = categoryBySlug(params.get('category'));
  const [material,setMaterial] = useState('Alle Materialien'); const [query,setQuery] = useState(''); const [sort,setSort] = useState('recommended');
  const materials = useMemo(()=>['Alle Materialien', ...Array.from(new Set(products.map(p=>p.material)))],[]);
  const setCategory = (slug: string) => router.replace(slug === ALL ? pathname : `${pathname}?category=${slug}`, { scroll: false });
  const filtered = useMemo(()=>{ const q = query.trim().toLowerCase(); let list = products.filter(p=>(!category||p.category===category.name)&&(material==='Alle Materialien'||p.material===material)&&(!q||`${p.name} ${p.desc} ${p.category} ${p.material}`.toLowerCase().includes(q))); if(sort==='price-up') list=[...list].sort((a,b)=>a.price-b.price); if(sort==='price-down') list=[...list].sort((a,b)=>b.price-a.price); if(sort==='new') list=[...list].sort((a,b)=>(b.badge==='Neu'?1:0)-(a.badge==='Neu'?1:0)); return list; },[category,material,sort,query]);
  return <section className="shop-content shell shop-v3">
    <div className="category-tabs" role="tablist" aria-label="Kategorien">
      <button role="tab" aria-selected={!category} className={!category?'active':''} onClick={()=>setCategory(ALL)}>Alle</button>
      {categories.map(c=><button role="tab" key={c.slug} aria-selected={category?.slug===c.slug} className={category?.slug===c.slug?'active':''} onClick={()=>setCategory(c.slug)}>{c.name}</button>)}
    </div>
    {category && <p className="category-intro">{category.intro}</p>}
    <div className="shop-toolbar"><div><label className="search-field">Suche<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="z. B. Halter, Box, Clip"/></label><label>Material<select value={material} onChange={event=>setMaterial(event.target.value)}>{materials.map(value=><option key={value}>{value}</option>)}</select></label></div><span>{filtered.length} Produkte</span><label>Sortieren nach<select aria-label="Sortierung" value={sort} onChange={event=>setSort(event.target.value)}><option value="recommended">Empfohlen</option><option value="price-up">Preis aufsteigend</option><option value="price-down">Preis absteigend</option><option value="new">Neuheiten</option></select></label></div>
    <div className="catalog">{filtered.length?<div className="product-grid" key={`${category?.slug ?? ALL}-${material}-${sort}`}>{filtered.map((p,index)=><ProductCard key={p.slug} product={p} index={index}/>)}</div>:<div className="no-results"><h2>Keine passenden Produkte.</h2><p>Ändere deine Auswahl oder entdecke alle ROAMETRIC Parts.</p><button onClick={()=>{setCategory(ALL);setMaterial('Alle Materialien');setQuery('')}}>Filter zurücksetzen</button><p><a href="/anfrage">Oder frag dein Wunschteil direkt an →</a></p></div>}</div>
  </section>
}

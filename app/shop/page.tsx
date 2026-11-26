import type { Metadata } from 'next';
import { Footer, Header } from '../ui';
import ShopCatalog from '../shop-client';
import { products, categories } from '../data';

export const metadata: Metadata = { title: 'Shop', description: 'Funktionale, additiv gefertigte Bauteile für Van, Marine, Bike und Outdoor.' };

export default function Shop() {
  const materialCount = new Set(products.map((p) => p.material)).size;
  return <><Header/><main className="shop-page">
    <section className="shop-hero shop-hero-v3"><div className="shell shop-hero-inner">
      <div><p className="eyebrow light">ROAMETRIC SHOP</p><h1>PARTS FOR<br/><span>THE JOURNEY.</span></h1><p>Durchdachte, additiv gefertigte Bauteile für deine Abenteuer — konstruiert für den echten Einsatz.</p></div>
      <dl className="shop-stats"><div><dt>Produkte</dt><dd>{String(products.length).padStart(2, '0')}</dd></div><div><dt>Kategorien</dt><dd>{String(categories.length).padStart(2, '0')}</dd></div><div><dt>Werkstoffe</dt><dd>{String(materialCount).padStart(2, '0')}</dd></div></dl>
    </div></section>
    <ShopCatalog/>
  </main><Footer/></>;
}

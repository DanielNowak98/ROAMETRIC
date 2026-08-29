import type { Metadata } from 'next';
import { Footer, Header } from '../ui';
import ShopCatalog from '../shop-client';
export const metadata: Metadata = {title:'Shop'};
export default function Shop(){return <><Header/><main className="shop-page"><section className="shop-hero"><div className="shell"><p className="eyebrow light">ROAMETRIC SHOP</p><h1>SHOP</h1><p>Durchdachte Produkte für deine Abenteuer.</p></div></section><ShopCatalog/></main><Footer/></>}

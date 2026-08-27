import type { Metadata } from 'next';
import { Footer, Header } from '../ui';
import ShopCatalog from '../shop-client';
export const metadata: Metadata = {title:'Shop'};
export default function Shop(){return <><Header/><main className="shop-page"><section className="shop-hero shell"><p className="eyebrow">ROAMETRIC SHOP</p><h1>ENGINEERED PARTS.<br/><span>READY TO ROAM.</span></h1><p>Funktionale Produkte für deinen Ausbau, dein Setup und dein nächstes Abenteuer.</p></section><ShopCatalog/></main><Footer/></>}

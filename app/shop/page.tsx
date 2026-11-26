import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Footer, Header } from '../ui';
import ShopCatalog from '../shop-client';
export const metadata: Metadata = {title:'Produkte'};
export default function Shop(){return <><Header/><main className="shop-page"><section className="shop-hero"><div className="shell"><p className="eyebrow light">ROAMETRIC PRODUKTE</p><h1>PRODUKTE</h1><p>BJJ & Budo · Fahrrad · Van · Boot — präzise gefertigt, auf Anfrage erhältlich.</p></div></section><Suspense fallback={null}><ShopCatalog/></Suspense></main><Footer/></>}

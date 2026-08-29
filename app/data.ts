export type Product = {slug:string;name:string;category:string;price:number;material:string;desc:string;color:string;badge?:string;imageSheet:1|2;imagePosition:string};
export const products: Product[] = [
 {slug:'railhook-modular',name:'Molle Panel Halterung',category:'Van',price:29.9,material:'PA12',desc:'Robuste, modulare Halterung für MOLLE-Panels und mobile Ausbaukonzepte.',color:'#252725',badge:'Bestseller',imageSheet:1,imagePosition:'0% 0%'},
 {slug:'deckclip-pro',name:'Getränkehalterung für Boote',category:'Marine',price:24.9,material:'ASA',desc:'UV- und salzwasserbeständige Getränkehalterung mit sicherer Klemmaufnahme.',color:'#252725',badge:'Neu',imageSheet:1,imagePosition:'100% 0%'},
 {slug:'framevault-mini',name:'Garmin Halterung Fidlock Ready',category:'Bike',price:34.9,material:'PA12',desc:'Leichte, klapperfreie Computerhalterung für anspruchsvolle Touren.',color:'#252725',imageSheet:1,imagePosition:'0% 100%'},
 {slug:'trailmount-360',name:'SandTrax Bergungshilfe',category:'Outdoor',price:89.9,material:'PETG-CF',desc:'Topologieoptimierte, robuste Montagebasis für Bergungs- und Outdoor-Setups.',color:'#252725',imageSheet:1,imagePosition:'100% 100%'},
 {slug:'cableport-seal',name:'CablePort Seal',category:'Van',price:18.9,material:'TPU',desc:'Flexible, dichte Durchführung für mobile Elektroinstallationen.',color:'#252725',imageSheet:2,imagePosition:'0% 0%'},
 {slug:'cleatguard-pair',name:'CleatGuard Pair',category:'Marine',price:32.9,material:'TPU',desc:'Robuster Schutz für Klampen, Tauwerk und Hände.',color:'#252725',imageSheet:2,imagePosition:'100% 0%'},
];

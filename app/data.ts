export type Product = {slug:string;name:string;category:string;price:number;material:string;desc:string;color:string;badge?:string};
export const products: Product[] = [
 {slug:'railhook-modular',name:'RailHook Modular',category:'Van',price:34.9,material:'PA12',desc:'Modularer, hochfester Haken für Airline- und Kederschienen.',color:'#c37d3e',badge:'Bestseller'},
 {slug:'deckclip-pro',name:'DeckClip Pro',category:'Marine',price:27.9,material:'ASA',desc:'UV- und salzwasserbeständige Universalhalterung fürs Deck.',color:'#607b7c',badge:'Neu'},
 {slug:'framevault-mini',name:'FrameVault Mini',category:'Bike',price:39.9,material:'PA12',desc:'Kompakte, klapperfreie Tool-Box für den Fahrradrahmen.',color:'#7d7562'},
 {slug:'trailmount-360',name:'TrailMount 360',category:'Outdoor',price:24.9,material:'PETG-CF',desc:'Drehbare Halterung für Licht, GPS und Actioncam.',color:'#6c7357'},
 {slug:'cableport-seal',name:'CablePort Seal',category:'Van',price:18.9,material:'TPU',desc:'Flexible, dichte Durchführung für mobile Elektroinstallationen.',color:'#ad6b41'},
 {slug:'cleatguard-pair',name:'CleatGuard Pair',category:'Marine',price:32.9,material:'TPU',desc:'Robuster Schutz für Klampen, Tauwerk und Hände.',color:'#63777f'},
];

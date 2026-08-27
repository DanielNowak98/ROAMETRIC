# ROAMETRIC Website + Shop-Demo

Responsive lokale Website für ROAMETRIC mit Startseite, filterbarem Produktkatalog, Produktdetailseiten, dauerhaftem Warenkorb und lokalem Demo-Checkout.

## Schnellstart

Voraussetzung ist die aktuelle LTS-Version von [Node.js](https://nodejs.org/).

- **Windows:** `START_WINDOWS.bat` doppelklicken.
- **macOS:** `START_MAC_LINUX.command` doppelklicken. Falls macOS das Starten verhindert, einmal im Terminal `chmod +x START_MAC_LINUX.command` ausführen.
- **Linux:** im Terminal `chmod +x start-linux.sh` und danach `./start-linux.sh` ausführen.

Die Seite öffnet sich unter **http://localhost:3000**. Zum Beenden im Terminal `Ctrl + C` drücken.

## Seiten

- `/` — Startseite mit Hero, Kategorien, Produkten, Engineering und USPs
- `/shop` — Shop-Übersicht mit Filtern und Produktkarten
- `/produkt/railhook-modular` — Beispiel einer Produktdetailseite
- `/warenkorb` — Warenkorb mit Mengensteuerung, Versandgrenze und Bestellsumme
- `/checkout` — Lieferadresse, Versandart, Zusammenfassung und lokale Bestellbestätigung

## Hinweis zum Shop

Dies ist ein vollständiges Shop-Frontend. Filter, Sortierung, Warenkorb, Mengen, Versandkosten, Checkout-Formular und Bestellbestätigung funktionieren lokal. Der Warenkorb bleibt im Browser gespeichert. Der Checkout überträgt bewusst keine persönlichen Daten und löst keine echte Zahlung aus. Für den Live-Betrieb muss anschließend ein Zahlungs- und Bestell-Backend wie Stripe, PayPal oder Shopify angebunden werden.

## Manuell starten

```text
npm install
npm run dev
```

## Produktionsprüfung

```text
npm run build
```

Das zentrale Hero-Motiv liegt unter `public/assets/roametric-hero.png`. Die offiziellen ROAMETRIC-Logos befinden sich als SVG, PNG, weiße PNG-Variante und JPG ebenfalls unter `public/assets/`. Layout und Farbwelt befinden sich in `app/globals.css` und `app/logo.css`; Inhalte und Produktdaten in `app/page.tsx`, `app/data.ts` und `app/ui.tsx`.

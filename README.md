# ROAMETRIC Website + Shop-Demo

Responsive lokale Website für ROAMETRIC mit Startseite, Shop-Übersicht, Produktdetailseiten und lokal gespeichertem Demo-Warenkorb.

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

## Hinweis zum Shop

Dies ist eine vollständige Frontend-Demo. Warenkorb-Buttons und Zähler funktionieren lokal. Bezahlung, Versandberechnung, Benutzerkonten und echte Bestellungen benötigen später ein Shopsystem bzw. eine Backend-Anbindung.

## Manuell starten

```text
npm install
npm run dev
```

## Produktionsprüfung

```text
npm run build
```

Das zentrale Hero-Motiv liegt unter `public/assets/roametric-hero.png`. Layout und Farbwelt befinden sich in `app/globals.css`; Inhalte und Produktdaten in `app/page.tsx`, `app/data.ts` und `app/ui.tsx`.

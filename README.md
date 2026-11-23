# ROAMETRIC Website

Responsive Produkt- und Katalog-Website für ROAMETRIC mit Startseite, filterbarem Produktkatalog und Produktdetailseiten. Bestellungen laufen vorerst per Anfrage an hello@roametric.de.

Die aktuelle Produkt- und Freigabeplanung steht in [`PRODUKT-TODOS.md`](PRODUKT-TODOS.md). Neue Produkte können über die GitHub-Issue-Vorlage **Produkt entwickeln** mit einer vollständigen Checkliste angelegt werden.

## Schnellstart

Voraussetzung ist die aktuelle LTS-Version von [Node.js](https://nodejs.org/).

- **Windows:** `START_WINDOWS.bat` doppelklicken.
- **macOS:** `START_MAC_LINUX.command` doppelklicken. Falls macOS das Starten verhindert, einmal im Terminal `chmod +x START_MAC_LINUX.command` ausführen.
- **Linux:** im Terminal `chmod +x start-linux.sh` und danach `./start-linux.sh` ausführen.

Die Seite öffnet sich unter **http://localhost:3000**. Zum Beenden im Terminal `Ctrl + C` drücken.

## Seiten

- `/` — Startseite mit Hero, Kategorien, Produkten, Engineering und USPs
- `/shop` — Produktübersicht mit Filtern und Produktkarten
- `/produkt/canyon-bike-toolbox-v2` — Beispiel einer Produktdetailseite mit Anfrage-Button
- `/ueber-uns` — Über ROAMETRIC

Vor dem Livegang müssen Impressum und Datenschutz rechtlich geprüft und mit echten Inhalten hinterlegt werden.

## Manuell starten

```text
npm install
npm run dev
```

## Produktion (Self-Hosting)

```text
npm ci
npm run build
npm run start   # Node-Server auf Port 3000
```

Optional in `.env.local`: `SITE_URL` (öffentliche Adresse, z. B. für Open-Graph-Bilder).

Das zentrale Hero-Motiv liegt unter `public/assets/roametric-hero.png`. Die offiziellen ROAMETRIC-Logos befinden sich als SVG, PNG, weiße PNG-Variante und JPG ebenfalls unter `public/assets/`. Die realen PA12-Produktdarstellungen liegen WebP-optimiert unter `public/assets/products/`. Layout und Farbwelt befinden sich in `app/globals.css`, `app/logo.css` und `app/new-style.css`; Inhalte und Produktdaten in `app/page.tsx`, `app/data.ts` und `app/ui.tsx`.

## Bildnachweis

- `public/assets/hero-bjj.webp`: Foto von Pavel Bekker (@pmbekker) auf Unsplash, ID `03ctT4yu-ro`, Unsplash-Lizenz.

# ROAMETRIC Website + Stripe-Shop

Responsive Website für ROAMETRIC mit Startseite, filterbarem Produktkatalog, Produktdetailseiten, dauerhaftem Warenkorb und sicherem Stripe Checkout für PayPal, Karten und Wallets.

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
- `/checkout` — Versandart, Bestellübersicht und Weiterleitung zur sicheren Zahlung
- `/checkout/erfolg` — serverseitig geprüfte Zahlungs- und Bestellbestätigung

## Stripe im Testmodus einrichten

1. Bei [Stripe](https://dashboard.stripe.com/register) ein Konto anlegen und den **Testmodus** aktivieren.
2. Unter **Einstellungen → Zahlungsmethoden** PayPal und die gewünschten Karten/Wallets aktivieren. Welche Methode Stripe tatsächlich anzeigt, hängt von Konto, Standort, Währung und Gerät ab.
3. `.env.example` als `.env.local` kopieren und dort den Stripe-Testschlüssel eintragen. Geheimschlüssel niemals in GitHub hochladen.
4. Für lokale Webhooks die Stripe CLI verwenden und Ereignisse an `http://localhost:3000/api/stripe/webhook` weiterleiten. Das dabei ausgegebene `whsec_...` kommt in `STRIPE_WEBHOOK_SECRET`.
5. Für den Live-Betrieb denselben Endpunkt unter der echten HTTPS-Domain im Stripe Dashboard als Webhook anlegen.

Benötigte Webhook-Ereignisse:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`

Die Website berechnet alle Preise serverseitig neu, erstellt die Stripe-Zahlungsseite und speichert Bestellungen in der angebundenen D1-Datenbank. Zahlungsdaten und PayPal-Zugangsdaten werden nicht von ROAMETRIC verarbeitet. Der Warenkorb wird erst nach bestätigter Zahlung geleert.

Vor dem Livegang müssen Impressum, Datenschutz, AGB, Widerrufsbelehrung, Versandbedingungen und Steuerangaben rechtlich geprüft und mit echten Inhalten hinterlegt werden.

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

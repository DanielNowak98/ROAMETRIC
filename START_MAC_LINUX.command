#!/usr/bin/env sh
set -e
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js wurde nicht gefunden. Bitte zuerst die LTS-Version von https://nodejs.org installieren."
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Die Website wird einmalig vorbereitet..."
  npm install
fi
(sleep 5; if command -v open >/dev/null 2>&1; then open http://localhost:3000; elif command -v xdg-open >/dev/null 2>&1; then xdg-open http://localhost:3000; fi) &
echo "ROAMETRIC startet unter http://localhost:3000"
echo "Zum Beenden Ctrl+C drücken."
npm run dev

@echo off
title ROAMETRIC Website
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js wurde nicht gefunden.
  echo Bitte zuerst die LTS-Version von https://nodejs.org installieren.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Die Website wird einmalig vorbereitet...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 5; Start-Process 'http://localhost:3000'"
echo ROAMETRIC startet unter http://localhost:3000
echo Zum Beenden Strg+C druecken.
call npm run dev
pause

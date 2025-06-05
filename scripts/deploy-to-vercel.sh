#!/bin/bash

echo "🚀 HB Montageservice App wird auf Vercel bereitgestellt..."

# Vercel CLI Installation (falls nicht vorhanden)
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI wird installiert..."
    npm install -g vercel
fi

# Zum Projektverzeichnis wechseln
echo "📁 Wechsle zum Projektverzeichnis..."

# Bei Vercel anmelden
echo "🔐 Bitte bei Vercel anmelden..."
vercel login

# Bereitstellung starten
echo "🚀 Bereitstellung wird gestartet..."
vercel --prod

echo "✅ Bereitstellung abgeschlossen!"
echo "🔗 Ihre Anwendung ist jetzt live!"
echo "📱 Verwenden Sie die bereitgestellte URL zum Herunterladen auf das Telefon"

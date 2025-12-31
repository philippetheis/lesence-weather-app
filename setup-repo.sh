#!/bin/bash

# Script zum Erstellen eines GitHub Repositories für Lesence Weather App

echo "🌦️  Lesence Weather App - Repository Setup"
echo ""

# Prüfe ob gh CLI installiert ist
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) ist nicht installiert."
    echo "   Installiere es mit: brew install gh"
    exit 1
fi

# Prüfe ob bereits authentifiziert
if ! gh auth status &> /dev/null; then
    echo "⚠️  GitHub CLI ist nicht authentifiziert."
    echo "   Bitte führe aus: gh auth login"
    exit 1
fi

# Repository Name
REPO_NAME="lesence-weather-app"

echo "📦 Erstelle GitHub Repository: $REPO_NAME"
echo ""

# Erstelle Repository und pushe Code
gh repo create $REPO_NAME \
    --public \
    --description "Lesence Weather Dashboard - Modern responsive weather app with live data" \
    --source=. \
    --remote=origin \
    --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Repository erfolgreich erstellt!"
    echo ""
    echo "🔗 Repository URL:"
    gh repo view --web
    echo ""
    echo "📋 Nächste Schritte:"
    echo "   - Repository ist jetzt auf GitHub verfügbar"
    echo "   - Du kannst es mit 'git push' aktualisieren"
    echo "   - Für Deployment: Nutze die GitHub URL in deiner CI/CD Pipeline"
else
    echo ""
    echo "❌ Fehler beim Erstellen des Repositories"
    echo "   Prüfe deine GitHub CLI Authentifizierung"
    exit 1
fi




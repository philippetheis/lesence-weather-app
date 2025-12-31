#!/bin/bash

# Script zum lokalen Starten der Lesence Weather App

echo "🌦️  Lesence Weather App - Lokaler Start"
echo ""

# Prüfe ob Docker läuft
if docker info > /dev/null 2>&1; then
    echo "✅ Docker läuft"
    echo ""
    echo "🚀 Starte Docker Container..."
    docker-compose -f docker-compose.simple.yml up -d --build
    
    echo ""
    echo "⏳ Warte auf Container..."
    sleep 3
    
    # Prüfe Container Status
    if docker-compose -f docker-compose.simple.yml ps | grep -q "Up"; then
        echo ""
        echo "✅ Container läuft!"
        echo ""
        echo "🌐 App ist erreichbar unter: http://localhost:3000"
        echo ""
        echo "📋 Nützliche Befehle:"
        echo "   Logs ansehen:    docker-compose -f docker-compose.simple.yml logs -f"
        echo "   Container stoppen: docker-compose -f docker-compose.simple.yml down"
        echo ""
    else
        echo ""
        echo "❌ Container konnte nicht gestartet werden"
        echo "   Prüfe Logs: docker-compose -f docker-compose.simple.yml logs"
        exit 1
    fi
else
    echo "❌ Docker läuft nicht!"
    echo ""
    echo "Bitte starte Docker Desktop und versuche es erneut."
    echo ""
    echo "Oder nutze den Development Server:"
    echo "   npm install"
    echo "   npm run dev"
    exit 1
fi




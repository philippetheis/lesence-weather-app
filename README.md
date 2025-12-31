# Lesence Weather Dashboard

Eine moderne, responsive Wetter-Dashboard Web-Applikation mit Live-Daten von der Lesence Wetterstation.

## Features

- 🌡️ **Live Wetterdaten**: Temperatur, Luftfeuchtigkeit, Wind (Geschwindigkeit, Böen, Richtung), Regen
- 📡 **Wetter-Radar**: Integration eines Wetter-Radars für den Standort Lesence
- ⚡ **Power-Daten**: Anzeige von Spannung, Strom und Leistung der Remote Station
- 💡 **Light Sensor**: Umgebungslicht, UV-Index, UVA und UVB Werte
- 🌓 **Dark/Light Mode**: Automatische System-Präferenz + manueller Toggle
- 📱 **Fully Responsive**: Optimiert für Desktop und Mobile
- 🔄 **Auto-Refresh**: Automatische Aktualisierung alle 60 Sekunden

## Technologie-Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für Styling
- **Axios** für API-Calls
- **React Icons** für Icons
- **Docker** für Containerisierung
- **Nginx** als Production Web Server

## Entwicklung

### Voraussetzungen

- Node.js 20 oder höher
- npm oder yarn

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Production
npm run build

# Production Build lokal testen
npm run preview
```

Die App läuft dann auf `http://localhost:3000` (oder dem Port, den Vite zuweist).

## Docker Deployment

### Schnellstart (Ohne Traefik)

Die einfachste Methode für lokales Deployment oder Server ohne Traefik:

```bash
# Mit der einfachen docker-compose Datei
docker-compose -f docker-compose.simple.yml up -d

# App ist dann auf http://localhost:3000 erreichbar
```

### Mit Docker Compose (Traefik)

Für Production mit Traefik Reverse Proxy:

1. **Traefik-Netzwerk erstellen:**
   ```bash
   docker network create traefik-network
   ```

2. **docker-compose.yml anpassen:**
   - Hostname in `traefik.http.routers.weather-app.rule` anpassen
   - Entrypoints an deine Traefik-Konfiguration anpassen
   - Cert Resolver anpassen (z.B. `letsencrypt`)

3. **Docker Image bauen:**
   ```bash
   docker-compose build
   ```

4. **Container starten:**
   ```bash
   docker-compose up -d
   ```

5. **Container stoppen:**
   ```bash
   docker-compose down
   ```

### Docker Build manuell

```bash
# Image bauen
docker build -t lesence-weather-app .

# Container starten
docker run -d -p 3000:80 --name weather-app lesence-weather-app
```

## 🚀 Weitere Deployment-Optionen

Für detaillierte Anleitungen zu verschiedenen Deployment-Methoden (Vercel, Netlify, Railway, VPS, etc.) siehe **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## API Konfiguration

Die API-URL ist aktuell hardcoded in `src/services/api.ts`. Falls du sie ändern möchtest:

```typescript
const API_URL = 'https://lesence-live.stackforge.cc/latest?token=YOUR_TOKEN';
```

Für eine flexiblere Konfiguration könntest du Environment Variables verwenden (siehe nächster Abschnitt).

## Environment Variables (Optional)

Falls du die API-URL über Environment Variables konfigurieren möchtest:

1. Erstelle eine `.env` Datei:
   ```
   VITE_API_URL=https://lesence-live.stackforge.cc/latest?token=YOUR_TOKEN
   ```

2. Passe `src/services/api.ts` an:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'https://lesence-live.stackforge.cc/latest?token=lesence_live_7d9f6g1c9a3e5f0a2c8e7d1b6a5f9c2';
   ```

## Projektstruktur

```
lesence-weather-app/
├── src/
│   ├── components/       # React Komponenten
│   │   ├── Header.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── WeatherRadar.tsx
│   │   ├── PowerCard.tsx
│   │   ├── LightCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/            # Custom React Hooks
│   │   ├── useWeatherData.ts
│   │   └── useTheme.ts
│   ├── services/         # API Services
│   │   └── api.ts
│   ├── types/            # TypeScript Types
│   │   └── api.ts
│   ├── utils/            # Utility Functions
│   │   └── format.ts
│   ├── App.tsx           # Hauptkomponente
│   ├── main.tsx          # Entry Point
│   └── index.css         # Global Styles
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── tsconfig.json
└── README.md
```

## Features im Detail

### Auto-Refresh

Die App aktualisiert die Daten automatisch alle 60 Sekunden. Der Zeitpunkt der letzten Aktualisierung wird im Header angezeigt.

### Dark/Light Mode

- **System-Präferenz**: Die App erkennt automatisch die System-Präferenz (Dark/Light Mode)
- **Manueller Toggle**: Über den Button im Header kann der Modus manuell umgeschaltet werden
- **Persistenz**: Die manuelle Auswahl wird im LocalStorage gespeichert

### Wetter-Radar

Das Wetter-Radar wird über RainViewer eingebunden und zeigt die Wetterlage für den Standort Lesence (46.855298, 17.347733).

### Responsive Design

Die App ist vollständig responsive und passt sich an verschiedene Bildschirmgrößen an:
- **Desktop**: Mehrspaltige Layouts
- **Tablet**: Angepasste Grid-Layouts
- **Mobile**: Einspaltige Darstellung

## Performance

- **Code Splitting**: Automatisch durch Vite
- **Gzip Compression**: Aktiviert im Nginx
- **Static Asset Caching**: 1 Jahr Cache für statische Assets
- **Optimized Build**: Production Build ist optimiert und minified

## Troubleshooting

### API-Fehler

Falls die API nicht erreichbar ist:
- Prüfe die Internetverbindung
- Überprüfe den API-Token
- Schaue in die Browser-Konsole für detaillierte Fehlermeldungen

### Docker-Probleme

- Stelle sicher, dass Docker und Docker Compose installiert sind
- Prüfe die Logs: `docker-compose logs weather-app`
- Stelle sicher, dass Port 80 (oder dein gewählter Port) nicht bereits belegt ist

### Traefik-Probleme

- Überprüfe, ob das `traefik-network` existiert
- Prüfe die Traefik Labels in `docker-compose.yml`
- Schaue in die Traefik Logs für Routing-Probleme

## Lizenz

Dieses Projekt ist für den internen Gebrauch der Lesence Wetterstation bestimmt.

## Support

Bei Fragen oder Problemen, erstelle bitte ein Issue oder kontaktiere den Entwickler.


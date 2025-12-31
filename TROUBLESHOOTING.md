# Troubleshooting Guide

## ERR_CONNECTION_REFUSED

### Problem
Du erhältst `ERR_CONNECTION_REFUSED` im Browser.

### Lösungen

#### 1. Docker läuft nicht

**Symptom:** `Cannot connect to the Docker daemon`

**Lösung:**
```bash
# Starte Docker Desktop auf deinem Mac
# Warte bis Docker läuft (Icon in der Menüleiste)

# Dann prüfe:
docker info

# Starte Container neu:
docker-compose -f docker-compose.simple.yml up -d
```

#### 2. Container läuft nicht

**Prüfe Container Status:**
```bash
docker-compose -f docker-compose.simple.yml ps
```

**Falls Container nicht läuft:**
```bash
# Logs ansehen
docker-compose -f docker-compose.simple.yml logs

# Container neu starten
docker-compose -f docker-compose.simple.yml restart

# Oder neu bauen und starten
docker-compose -f docker-compose.simple.yml up -d --build
```

#### 3. Port bereits belegt

**Prüfe ob Port 3000 frei ist:**
```bash
lsof -i :3000
```

**Falls Port belegt:**
- Ändere Port in `docker-compose.simple.yml`:
  ```yaml
  ports:
    - "8080:80"  # Statt 3000:80
  ```
- Dann: `http://localhost:8080` aufrufen

#### 4. Falsche URL

**Stelle sicher, dass du die richtige URL aufrufst:**
- Docker: `http://localhost:3000`
- Dev-Server: `http://localhost:5173` (oder der Port den Vite anzeigt)

#### 5. Alternative: Development Server nutzen

Falls Docker Probleme macht, nutze den Dev-Server:

```bash
# Dependencies installieren (falls noch nicht geschehen)
npm install

# Dev-Server starten
npm run dev
```

Dann die URL aus dem Terminal aufrufen (meist `http://localhost:5173`)

---

## Container startet nicht

### Build-Fehler

```bash
# Container mit --no-cache neu bauen
docker-compose -f docker-compose.simple.yml build --no-cache

# Dann starten
docker-compose -f docker-compose.simple.yml up -d
```

### Image-Problem

```bash
# Alte Container/Images entfernen
docker-compose -f docker-compose.simple.yml down
docker system prune -f

# Neu bauen
docker-compose -f docker-compose.simple.yml build
docker-compose -f docker-compose.simple.yml up -d
```

---

## API-Fehler / Keine Daten

### CORS-Fehler

Falls du CORS-Fehler siehst:
- Die API sollte CORS erlauben
- Prüfe Browser Console für Details

### API nicht erreichbar

```bash
# Teste API direkt
curl "https://lesence-live.stackforge.cc/latest?token=lesence_live_7d9f6g1c9a3e5f0a2c8e7d1b6a5f9c2"
```

### Network-Problem im Container

```bash
# Prüfe Container Logs
docker-compose -f docker-compose.simple.yml logs weather-app

# Teste Network im Container
docker-compose -f docker-compose.simple.yml exec weather-app wget -O- https://lesence-live.stackforge.cc/latest?token=...
```

---

## Häufige Befehle

```bash
# Container Status
docker-compose -f docker-compose.simple.yml ps

# Logs ansehen
docker-compose -f docker-compose.simple.yml logs -f

# Container stoppen
docker-compose -f docker-compose.simple.yml stop

# Container entfernen
docker-compose -f docker-compose.simple.yml down

# Container neu starten
docker-compose -f docker-compose.simple.yml restart

# Alles neu bauen
docker-compose -f docker-compose.simple.yml up -d --build
```

---

## Hilfe bekommen

Falls nichts hilft:
1. Prüfe alle Logs: `docker-compose -f docker-compose.simple.yml logs`
2. Prüfe Container Status: `docker-compose -f docker-compose.simple.yml ps`
3. Prüfe Docker Status: `docker info`
4. Nutze Dev-Server als Alternative: `npm run dev`



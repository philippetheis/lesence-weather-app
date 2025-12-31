# Deployment Guide - Lesence Weather App

## 🚀 Deployment-Optionen

### Option 1: Docker Deployment (Lokal oder Server)

#### Voraussetzungen
- Docker & Docker Compose installiert
- (Optional) Traefik für Reverse Proxy

#### Schnellstart

```bash
# 1. Repository klonen (falls noch nicht lokal)
git clone <deine-repo-url>
cd Lesence_WeatherApp

# 2. Docker Image bauen
docker-compose build

# 3. Container starten
docker-compose up -d

# 4. Logs ansehen
docker-compose logs -f weather-app
```

Die App läuft dann auf `http://localhost:3000` (wenn Port-Mapping aktiviert ist).

#### Mit Traefik (Production)

1. **Traefik-Netzwerk erstellen:**
   ```bash
   docker network create traefik-network
   ```

2. **docker-compose.yml anpassen:**
   - Hostname in `traefik.http.routers.weather-app.rule` anpassen
   - Entrypoints an deine Traefik-Konfiguration anpassen
   - Cert Resolver anpassen (z.B. `letsencrypt`)

3. **Container starten:**
   ```bash
   docker-compose up -d
   ```

4. **Status prüfen:**
   ```bash
   docker-compose ps
   docker-compose logs weather-app
   ```

---

### Option 2: Vercel (Einfachste Cloud-Option)

#### Voraussetzungen
- Vercel Account (kostenlos)
- GitHub Repository

#### Deployment

1. **Gehe zu:** https://vercel.com
2. **Import Project** → Wähle dein GitHub Repository
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`
7. **Deploy!**

Die App wird automatisch bei jedem Git Push deployed.

#### Environment Variables (falls nötig)
Falls du die API-URL später über Env-Vars konfigurieren willst:
- Settings → Environment Variables
- `VITE_API_URL` hinzufügen

---

### Option 3: Netlify

#### Deployment

1. **Gehe zu:** https://app.netlify.com
2. **Add new site** → **Import an existing project**
3. **Connect to Git** → Wähle dein Repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy site**

#### Netlify.toml (Optional)

Erstelle `netlify.toml` im Root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 4: Railway

#### Deployment

1. **Gehe zu:** https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Wähle dein Repository**
4. **Settings:**
   - Build Command: `npm run build`
   - Start Command: `npx serve -s dist -p $PORT`
5. **Deploy!**

---

### Option 5: Eigenen Server (VPS/Cloud)

#### Mit Docker auf Server

```bash
# 1. Auf Server einloggen
ssh user@dein-server.de

# 2. Repository klonen
git clone <deine-repo-url>
cd Lesence_WeatherApp

# 3. Docker Compose starten
docker-compose up -d

# 4. (Optional) Nginx Reverse Proxy konfigurieren
# Falls du keinen Traefik verwendest
```

#### Nginx Reverse Proxy (ohne Traefik)

Erstelle `/etc/nginx/sites-available/weather-app`:

```nginx
server {
    listen 80;
    server_name weather.deine-domain.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktiviere die Site:
```bash
sudo ln -s /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### SSL mit Let's Encrypt

```bash
sudo certbot --nginx -d weather.deine-domain.de
```

---

### Option 6: Docker Hub + Server Pull

#### 1. Image zu Docker Hub pushen

```bash
# Login zu Docker Hub
docker login

# Image taggen
docker build -t dein-username/lesence-weather-app:latest .

# Image pushen
docker push dein-username/lesence-weather-app:latest
```

#### 2. Auf Server deployen

```bash
# docker-compose.yml anpassen:
# Statt 'build:' verwende:
# image: dein-username/lesence-weather-app:latest

# Auf Server:
docker-compose pull
docker-compose up -d
```

---

## 🔧 Wartung & Updates

### Code aktualisieren

```bash
# Lokal
git pull origin main

# Docker neu bauen
docker-compose build
docker-compose up -d

# Oder mit Docker Hub:
docker-compose pull
docker-compose up -d
```

### Logs ansehen

```bash
docker-compose logs -f weather-app
```

### Container stoppen/starten

```bash
docker-compose stop
docker-compose start
docker-compose restart
```

### Container entfernen

```bash
docker-compose down
# Mit Volumes:
docker-compose down -v
```

---

## 🐛 Troubleshooting

### Port bereits belegt

```bash
# Prüfe welcher Prozess Port 3000 nutzt
lsof -i :3000

# Oder ändere Port in docker-compose.yml
ports:
  - "8080:80"  # Statt 3000:80
```

### Container startet nicht

```bash
# Prüfe Logs
docker-compose logs weather-app

# Prüfe Container Status
docker-compose ps

# Container neu bauen
docker-compose build --no-cache
docker-compose up -d
```

### Traefik Routing funktioniert nicht

- Prüfe ob `traefik-network` existiert: `docker network ls`
- Prüfe Traefik Labels in `docker-compose.yml`
- Prüfe Traefik Logs: `docker logs traefik`

### API-Fehler

- Prüfe ob API erreichbar ist: `curl https://lesence-live.stackforge.cc/latest?token=...`
- Prüfe Browser Console für CORS-Fehler
- Prüfe Network Tab im Browser DevTools

---

## 📊 Monitoring (Optional)

### Health Check Endpoint

Falls du einen Health Check brauchst, kannst du einen einfachen Endpoint hinzufügen.

### Log Rotation

Für Production sollte Log Rotation konfiguriert werden:

```yaml
# docker-compose.yml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 🔒 Security Best Practices

1. **API Token nicht committen** - Nutze Environment Variables
2. **HTTPS verwenden** - Immer SSL/TLS in Production
3. **Firewall konfigurieren** - Nur notwendige Ports öffnen
4. **Regelmäßige Updates** - Docker Images und Dependencies aktualisieren
5. **Backups** - Regelmäßige Backups der Konfiguration

---

## 📝 Checkliste für Production Deployment

- [ ] Repository auf GitHub/GitLab erstellt
- [ ] Docker Image getestet lokal
- [ ] Environment Variables konfiguriert (falls nötig)
- [ ] Domain/Subdomain konfiguriert
- [ ] SSL/TLS Zertifikat eingerichtet
- [ ] Reverse Proxy konfiguriert (Traefik/Nginx)
- [ ] Firewall Regeln gesetzt
- [ ] Monitoring/Logging eingerichtet
- [ ] Backup-Strategie definiert
- [ ] Dokumentation aktualisiert




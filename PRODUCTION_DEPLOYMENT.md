# Production Deployment Guide - Lesence Weather App

## 🚀 Produktives Deployment

Diese Anleitung beschreibt den vollständigen Deployment-Prozess für die Lesence Weather App in einer produktiven Umgebung.

---

## Voraussetzungen

### Server-Anforderungen
- **OS**: Linux (Ubuntu 20.04+ / Debian 11+ empfohlen)
- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+
- **RAM**: Mindestens 512MB (1GB empfohlen)
- **Disk Space**: Mindestens 2GB frei
- **Netzwerk**: Port 80/443 verfügbar

### Domain & SSL
- Domain oder Subdomain (z.B. `weather.lesence.local` oder `weather.example.com`)
- SSL-Zertifikat (Let's Encrypt empfohlen)

---

## Schritt 1: Server vorbereiten

### Docker installieren

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Docker Compose installieren
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Neu einloggen oder:
newgrp docker
```

### Firewall konfigurieren

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Oder firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

## Schritt 2: Repository klonen

```bash
# In das gewünschte Verzeichnis wechseln
cd /opt  # oder /var/www, /home/user, etc.

# Repository klonen
git clone <deine-repo-url> lesence-weather-app
cd lesence-weather-app
```

---

## Schritt 3: Traefik Setup (Empfohlen)

### Traefik-Netzwerk erstellen

```bash
docker network create traefik-network
```

### Traefik docker-compose.yml (Beispiel)

Erstelle `/opt/traefik/docker-compose.yml`:

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./acme.json:/acme.json
    command:
      - --api.insecure=true
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
      - --certificatesresolvers.letsencrypt.acme.email=your-email@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=./acme.json
    networks:
      - traefik-network

networks:
  traefik-network:
    external: true
```

### Traefik starten

```bash
cd /opt/traefik
docker-compose up -d
```

---

## Schritt 4: Weather App konfigurieren

### docker-compose.yml anpassen

Bearbeite `docker-compose.yml` in der Weather App:

```yaml
version: '3.8'

services:
  weather-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: lesence-weather-app
    restart: unless-stopped
    labels:
      # Traefik labels - ANPASSEN!
      - "traefik.enable=true"
      - "traefik.http.routers.weather-app.rule=Host(`weather.lesence.local`)"  # ← Deine Domain
      - "traefik.http.routers.weather-app.entrypoints=web"
      - "traefik.http.routers.weather-app.entrypoints=websecure"
      - "traefik.http.routers.weather-app.tls.certresolver=letsencrypt"
      - "traefik.http.services.weather-app.loadbalancer.server.port=80"
      # HTTP to HTTPS Redirect
      - "traefik.http.routers.weather-app-http.rule=Host(`weather.lesence.local`)"  # ← Deine Domain
      - "traefik.http.routers.weather-app-http.entrypoints=web"
      - "traefik.http.routers.weather-app-http.middlewares=redirect-to-https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.permanent=true"
    networks:
      - traefik-network

networks:
  traefik-network:
    external: true
```

**Wichtig**: Ersetze `weather.lesence.local` mit deiner tatsächlichen Domain!

---

## Schritt 5: Deployment ausführen

### Build und Start

```bash
cd /opt/lesence-weather-app

# Image bauen
docker-compose build

# Container starten
docker-compose up -d

# Logs prüfen
docker-compose logs -f weather-app
```

### Status prüfen

```bash
# Container Status
docker-compose ps

# Logs
docker-compose logs weather-app

# Container Logs in Echtzeit
docker-compose logs -f weather-app
```

---

## Schritt 6: DNS konfigurieren

### DNS-Eintrag erstellen

Erstelle einen A-Record für deine Domain:

```
Type: A
Name: weather (oder @ für Root-Domain)
Value: <IP-Adresse deines Servers>
TTL: 3600
```

### DNS prüfen

```bash
# Prüfe ob DNS propagiert ist
dig weather.lesence.local
# oder
nslookup weather.lesence.local
```

---

## Schritt 7: SSL-Zertifikat (Automatisch mit Traefik)

Traefik erstellt automatisch SSL-Zertifikate via Let's Encrypt. Nach dem ersten Start sollte das Zertifikat innerhalb weniger Minuten verfügbar sein.

Prüfe die Traefik Logs:

```bash
docker logs traefik
```

---

## Schritt 8: Monitoring & Wartung

### Container neu starten

```bash
cd /opt/lesence-weather-app
docker-compose restart
```

### Updates deployen

```bash
cd /opt/lesence-weather-app

# Neueste Änderungen pullen
git pull origin main

# Container neu bauen
docker-compose build --no-cache

# Container neu starten
docker-compose up -d

# Alte Images aufräumen (optional)
docker image prune -f
```

### Logs rotieren

Erstelle `/etc/logrotate.d/docker-containers`:

```
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=1M
    missingok
    delaycompress
    copytruncate
}
```

---

## Alternative: Deployment ohne Traefik

Falls du keinen Traefik verwendest, nutze `docker-compose.simple.yml`:

```bash
# Port direkt mappen
docker-compose -f docker-compose.simple.yml up -d

# App ist dann auf http://<server-ip>:3000 erreichbar
```

### Nginx Reverse Proxy (ohne Traefik)

Installiere Nginx:

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

Erstelle `/etc/nginx/sites-available/weather-app`:

```nginx
server {
    listen 80;
    server_name weather.lesence.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktiviere Site:

```bash
sudo ln -s /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

SSL mit Let's Encrypt:

```bash
sudo certbot --nginx -d weather.lesence.local
```

---

## Troubleshooting

### Container startet nicht

```bash
# Logs prüfen
docker-compose logs weather-app

# Container Status
docker-compose ps

# Image neu bauen
docker-compose build --no-cache
docker-compose up -d
```

### Traefik Routing funktioniert nicht

```bash
# Prüfe ob Netzwerk existiert
docker network ls | grep traefik-network

# Falls nicht, erstelle es:
docker network create traefik-network

# Prüfe Traefik Logs
docker logs traefik

# Prüfe Container Labels
docker inspect lesence-weather-app | grep -A 20 Labels
```

### SSL-Zertifikat wird nicht erstellt

```bash
# Prüfe Traefik Logs
docker logs traefik | grep -i acme

# Prüfe acme.json Berechtigungen
ls -la /opt/traefik/acme.json
sudo chmod 600 /opt/traefik/acme.json
```

### API-Fehler / Keine Daten

```bash
# Teste API direkt
curl "https://lesence-live.stackforge.cc/latest?token=lesence_live_7d9f6g1c9a3e5f0a2c8e7d1b6a5f9c2"

# Prüfe Container Logs
docker-compose logs weather-app

# Prüfe Nginx Logs (falls verwendet)
sudo tail -f /var/log/nginx/error.log
```

---

## Backup-Strategie

### Container-Konfiguration sichern

```bash
# Erstelle Backup-Verzeichnis
mkdir -p /backup/lesence-weather-app

# Sichere docker-compose.yml
cp docker-compose.yml /backup/lesence-weather-app/

# Sichere Git Repository
cd /opt/lesence-weather-app
git bundle create /backup/lesence-weather-app/repo.bundle --all
```

### Automatisches Backup (Cron)

Erstelle `/etc/cron.daily/lesence-weather-backup`:

```bash
#!/bin/bash
BACKUP_DIR="/backup/lesence-weather-app"
DATE=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR/$DATE
cp /opt/lesence-weather-app/docker-compose.yml $BACKUP_DIR/$DATE/
cd /opt/lesence-weather-app
git bundle create $BACKUP_DIR/$DATE/repo.bundle --all

# Alte Backups löschen (älter als 30 Tage)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} +
```

Ausführbar machen:

```bash
sudo chmod +x /etc/cron.daily/lesence-weather-backup
```

---

## Performance-Optimierung

### Docker Ressourcen-Limits

Füge in `docker-compose.yml` hinzu:

```yaml
services:
  weather-app:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Nginx Caching (falls verwendet)

Füge in Nginx-Config hinzu:

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=weather_cache:10m max_size=100m inactive=60m;

server {
    # ... existing config ...
    location / {
        proxy_cache weather_cache;
        proxy_cache_valid 200 60m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        # ... existing proxy settings ...
    }
}
```

---

## Checkliste für Production

- [ ] Docker & Docker Compose installiert
- [ ] Firewall konfiguriert
- [ ] Repository geklont
- [ ] Traefik eingerichtet (oder Nginx)
- [ ] docker-compose.yml angepasst (Domain, Labels)
- [ ] Container gebaut und gestartet
- [ ] DNS konfiguriert
- [ ] SSL-Zertifikat aktiv
- [ ] Monitoring eingerichtet
- [ ] Backup-Strategie implementiert
- [ ] Logs rotieren konfiguriert
- [ ] Updates getestet

---

## Support & Wartung

### Regelmäßige Wartung

- **Wöchentlich**: Logs prüfen, Container-Status checken
- **Monatlich**: Updates pullen und deployen
- **Quartal**: Backup-Strategie testen

### Nützliche Befehle

```bash
# Container Status
docker-compose ps

# Ressourcen-Verbrauch
docker stats lesence-weather-app

# Container Logs
docker-compose logs --tail=100 -f weather-app

# Alle Container neu starten
docker-compose restart

# System aufräumen
docker system prune -a --volumes
```

---

## Kontakt & Support

Bei Problemen oder Fragen:
1. Prüfe die Logs: `docker-compose logs weather-app`
2. Prüfe Container Status: `docker-compose ps`
3. Siehe Troubleshooting-Sektion oben
4. Prüfe GitHub Issues (falls vorhanden)

---

**Viel Erfolg mit deinem Deployment! 🚀**



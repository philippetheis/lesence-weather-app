# GitHub Repository Setup

## Option 1: Mit GitHub CLI (Empfohlen)

1. **GitHub CLI authentifizieren:**
   ```bash
   gh auth login
   ```
   Folge den Anweisungen im Terminal.

2. **Repository erstellen und pushen:**
   ```bash
   gh repo create lesence-weather-app --public --source=. --remote=origin --push
   ```

## Option 2: Manuell über GitHub Web Interface

1. **Gehe zu GitHub:** https://github.com/new

2. **Repository Details:**
   - Repository name: `lesence-weather-app`
   - Description: `Lesence Weather Dashboard - Modern responsive weather app with live data`
   - Visibility: Public (oder Private)
   - **WICHTIG:** Lass die Checkboxen für README, .gitignore und License **unchecked** (wir haben diese bereits)

3. **Klicke auf "Create repository"**

4. **Füge das Remote hinzu und pushe:**
   ```bash
   git remote add origin https://github.com/DEIN-USERNAME/lesence-weather-app.git
   git branch -M main
   git push -u origin main
   ```

## Option 3: Mit dem bereitgestellten Script

Falls du bereits bei GitHub CLI authentifiziert bist, kannst du einfach ausführen:

```bash
./setup-repo.sh
```



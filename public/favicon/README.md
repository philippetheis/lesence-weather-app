# Favicon Dateien

Dieser Ordner sollte die folgenden Favicon-Dateien enthalten:

## Erforderliche Dateien:

1. **favicon.ico** - Standard Favicon (16x16, 32x32, 48x48)
2. **favicon.svg** - SVG Favicon (skalierbar)
3. **favicon-96x96.png** - PNG Favicon 96x96
4. **favicon-192x192.png** - PNG Favicon 192x192 (für PWA)
5. **favicon-512x512.png** - PNG Favicon 512x512 (für PWA)
6. **apple-touch-icon.png** - Apple Touch Icon 180x180

## Generierung:

Du kannst Favicons mit folgenden Tools generieren:
- https://realfavicongenerator.net/
- https://favicon.io/
- https://www.favicon-generator.org/

## Platzierung:

Alle Dateien sollten direkt im `public/favicon/` Ordner liegen:
```
public/
  favicon/
    favicon.ico
    favicon.svg
    favicon-96x96.png
    favicon-192x192.png
    favicon-512x512.png
    apple-touch-icon.png
    site.webmanifest (bereits vorhanden)
    browserconfig.xml (bereits vorhanden)
```

## Hinweis:

Die HTML-Datei und das Webmanifest sind bereits konfiguriert. Du musst nur noch die Favicon-Bilddateien hinzufügen.



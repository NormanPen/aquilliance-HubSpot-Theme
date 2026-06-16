Füge ein neues globales Theme-Field zum Projekt hinzu: $ARGUMENTS

Format: `<feldname> <typ> <default-wert>`  
Beispiel: `brand_secondary color #6366f1` oder `heading_font font Roboto`

Führe automatisch alle 3 Schritte aus:

---

## Schritt 1: `src/theme/my-theme/fields.json` erweitern

Lies die Datei zuerst und füge einen neuen Eintrag hinzu. Für Farben:
```json
{
  "type": "color",
  "name": "FELDNAME",
  "label": "Deutsches Label",
  "visibility": {
    "hidden_subfields": { "opacity": true }
  },
  "default": {
    "color": "#DEFAULT",
    "opacity": 100
  }
}
```

Für Fonts:
```json
{
  "type": "font",
  "name": "FELDNAME",
  "label": "Deutsches Label",
  "load_external_fonts": "true",
  "default": {
    "font": "FONTNAME",
    "font_set": "GOOGLE",
    "fallback": "sans-serif",
    "google_font_variants": ["400", "600", "700"]
  }
}
```

---

## Schritt 2: Tailwind-Token anlegen

**Farbe** → `src/theme/my-theme/styles/theme/colors.css`:
```css
@theme {
  /* bestehende Tokens behalten, neuen hinzufügen */
  --color-aq-SUFFIX: #DEFAULT;
}
```
Naming-Konvention: `--color-aq-*` für Projektfarben

**Font** → `src/theme/my-theme/styles/theme/typography.css`:
```css
@theme {
  --font-SUFFIX: 'FONTNAME', sans-serif;
}
```

---

## Schritt 3: ThemeProvider erweitern

In `src/theme/my-theme/components/shared/ThemeProvider.tsx` die Überschreibung ergänzen:

Für Farben:
```tsx
const secondary = hublParameters?.FELDNAME?.color;
// im overrides-Array:
secondary && `--color-aq-SUFFIX: ${secondary};`,
```

Für Fonts:
```tsx
const headingFont = hublParameters?.FELDNAME?.font;
const headingFallback = hublParameters?.FELDNAME?.fallback ?? 'sans-serif';
// im overrides-Array:
headingFont && `--font-SUFFIX: '${headingFont}', ${headingFallback};`,
```

---

Nach allen 3 Schritten: Zusammenfassung ausgeben welche Tailwind-Klassen jetzt verfügbar sind.
Beispiel für eine neue Farbe `brand_secondary`: `bg-aq-secondary`, `text-aq-secondary`, `border-aq-secondary`

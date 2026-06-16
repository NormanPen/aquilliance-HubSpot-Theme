# Styling

Dieses Projekt verwendet [Tailwind CSS v4](https://tailwindcss.com/docs) für alle Styles in React-Komponenten.

## ThemeProvider — Pflicht in jedem Modul und Partial

Damit Tailwind-Klassen in der lokalen Modul-Vorschau ([hslocal.net:3000](http://hslocal.net:3000)) sichtbar sind, **muss jede Komponente** ihren Inhalt in `<ThemeProvider>` wrappen.

Module übergeben zusätzlich `hublParameters` — dadurch werden globale Theme-Farben und Fonts zur Laufzeit übernommen (siehe [Globale Theme-Fields](#globale-theme-fields)):

```tsx
import { ThemeProvider } from '../../shared/ThemeProvider.js';

// Modul — mit hublParameters
export function Component({ fieldValues, hublParameters }) {
  return (
    <ThemeProvider hublParameters={hublParameters}>
      <div className="bg-aq-primary text-white p-8">
        Inhalt hier
      </div>
    </ThemeProvider>
  );
}

// Partial (Header, Footer) — ohne hublParameters, nutzt CSS-Defaults
export default function Header() {
  return (
    <ThemeProvider>
      <header>…</header>
    </ThemeProvider>
  );
}
```

**Warum ist das nötig?**  
Der Dev Server rendert Module in Isolation — ohne Template-Kontext. `ThemeProvider` importiert `tailwind.css` direkt, sodass Tailwind-Klassen auch in der isolierten Vorschau verfügbar sind. In der Production-Umgebung injiziert HubSpot das CSS automatisch über `{{ standard_header_includes }}`.

```tsx
// components/shared/ThemeProvider.tsx
import { ReactNode } from 'react';
import '../../styles/tailwind.css';

export function ThemeProvider({ children, hublParameters }) {
  const primary  = hublParameters?.brand_primary?.color;
  const accent   = hublParameters?.brand_accent?.color;
  const font     = hublParameters?.base_font?.font;
  const fallback = hublParameters?.base_font?.fallback ?? 'sans-serif';

  const overrides = [
    primary && `--color-aq-primary: ${primary};`,
    accent  && `--color-aq-accent: ${accent};`,
    font    && `--font-sans: '${font}', ${fallback};`,
  ].filter(Boolean).join(' ');

  return (
    <>
      {overrides && <style>{`:root { ${overrides} }`}</style>}
      {children}
    </>
  );
}
```

Wenn `hublParameters` nicht übergeben wird (z.B. in Partials), greift Tailwind auf die Default-Werte aus `styles/theme/colors.css` zurück.

---

## Globale Theme-Fields

Die Datei `fields.json` im Theme-Root definiert globale Einstellungen, die im HubSpot Page Editor unter **"Theme-Einstellungen"** editierbar sind. Der ThemeProvider liest diese Werte aus `hublParameters` und überschreibt die Tailwind-CSS-Custom-Properties zur Laufzeit — damit funktionieren Klassen wie `bg-aq-primary` weiterhin, aber der Farbwert ist für den Editor änderbar.

### Aktuelle Theme-Fields

| Name | Typ | Default | Tailwind-Variable |
|---|---|---|---|
| `brand_primary` | Farbe | `#ff7a59` | `--color-aq-primary` |
| `brand_accent` | Farbe | `#2d3e50` | `--color-aq-accent` |
| `base_font` | Google Font | Inter | `--font-sans` |

### Neues Theme-Field hinzufügen

1. `fields.json` um ein Feld erweitern:

```json
{
  "type": "color",
  "name": "brand_secondary",
  "label": "Sekundärfarbe",
  "default": { "color": "#6366f1", "opacity": 100 }
}
```

2. Entsprechenden Token in `styles/theme/colors.css` anlegen:

```css
@theme {
  --color-aq-secondary: #6366f1;
}
```

3. Im `ThemeProvider` die Überschreibung ergänzen:

```tsx
const secondary = hublParameters?.brand_secondary?.color;
// …
secondary && `--color-aq-secondary: ${secondary};`,
```

4. Tailwind-Klasse nutzen: `bg-aq-secondary`, `text-aq-secondary`

---

## Tailwind nutzen

Tailwind-Klassen werden direkt im JSX als `className` verwendet:

```tsx
<div className="flex items-center gap-4 bg-aq-primary text-white rounded-lg shadow-md p-6">
  <h1 className="text-3xl font-bold">Überschrift</h1>
</div>
```

Die vollständige Tailwind-Dokumentation findest du unter [tailwindcss.com/docs](https://tailwindcss.com/docs).

---

## Design Tokens — eigene Klassen definieren

Alle projektspezifischen Design Tokens befinden sich in `styles/theme/`. Tokens die dort definiert werden, sind automatisch als Tailwind-Klassen nutzbar.

```
styles/
  tailwind.css          ← Einstiegspunkt, importiert alle Token-Dateien
  global.css            ← Statische Styles (geladen über base.hubl.html)
  theme/
    colors.css          ← Farb-Tokens
    typography.css      ← Schrift-Tokens
    shadows.css         ← Schatten-Tokens
    animations.css      ← Animations-Tokens
```

### Farben (`styles/theme/colors.css`)

```css
@theme {
  --color-aq-primary: #ff7a59;
  --color-aq-accent: #2d3e50;
}
```

Verwendung: `bg-aq-primary`, `text-aq-primary`, `border-aq-primary`

### Typografie (`styles/theme/typography.css`)

```css
@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --text-hero: 3.5rem;
}
```

Verwendung: `font-sans`, `text-hero`

### Animationen (`styles/theme/animations.css`)

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@theme {
  --animate-fade-up: fade-up 0.4s ease-out;
}
```

Verwendung: `animate-fade-up`

### Neuen Token hinzufügen

1. Die passende Datei in `styles/theme/` öffnen
2. Variable im `@theme`-Block hinzufügen — Tailwind generiert die Klassen automatisch
3. Namensmuster: `--color-aq-*` für Farben, `--animate-*` für Animationen etc.

---

## global.css

Die Datei `styles/global.css` ist eine **statische CSS-Datei** (kein Tailwind-Build) und wird über `base.hubl.html` auf allen Seiten geladen. Sie ist für Styles gedacht, die außerhalb von React-Komponenten gelten müssen — z.B. Basis-Typografie in Drag-and-Drop-Bereichen oder HubSpot-gerenderten Rich-Text-Feldern.

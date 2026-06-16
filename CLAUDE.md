# aquilliance HubSpot Theme — Projektkontext für Claude

## Projektübersicht

HubSpot CMS React Theme. Module und Partials sind React-Komponenten (TypeScript), Templates sind HUBL-Dateien. Styling via Tailwind CSS v4. Lokale Entwicklung über `@hubspot/cms-dev-server` (Port 3000 + Storybook Port 3123).

**Theme-Root:** `src/theme/my-theme/`

---

## Verzeichnisstruktur

```
src/theme/my-theme/
  components/
    modules/       ← HubSpot-Module (editierbare Felder im Page Editor)
    partials/      ← Feste Seitenteile ohne Felder (Header, Footer)
    islands/       ← Interaktive Client-Side-Komponenten (useState, useEffect)
    ui/            ← Reine React-Bausteine, werden von Modulen/Partials importiert
    shared/        ← ThemeProvider, Hooks, Utilities
  styles/
    tailwind.css   ← Einstiegspunkt (@import "tailwindcss" + alle theme/*.css)
    global.css     ← Statisches CSS für Nicht-React-Bereiche (via base.hubl.html)
    theme/
      colors.css       ← @theme { --color-aq-* }
      typography.css   ← @theme { --font-*, --text-*, --font-weight-*, --leading-* }
      shadows.css      ← @theme { --shadow-* }
      animations.css   ← @keyframes + @theme { --animate-* }
  templates/
    layouts/base.hubl.html
    home.hubl.html
  fields.json    ← Globale Theme-Settings (editierbar im HubSpot Backend)
  package.json
```

---

## Kritische Regeln — immer einhalten

### 1. Relative Imports brauchen `.js`-Extension
`moduleResolution: "Node16"` + `"type": "module"` erzwingt das.
```tsx
// ✅ Korrekt
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import Header from './index.js';

// ❌ Falsch
import { ThemeProvider } from '../../shared/ThemeProvider';
```

### 2. Jede Komponente muss in `<ThemeProvider>` gewrapped werden
Ohne ThemeProvider sind Tailwind-Klassen in der isolierten Dev-Server-Vorschau nicht sichtbar.
- **Module:** `<ThemeProvider hublParameters={hublParameters}>` (immer hublParameters übergeben)
- **Partials:** `<ThemeProvider>` (ohne hublParameters)

### 3. Export-Pattern
- **Module:** `export function Component` (named export)
- **Partials:** `export default function Name` (default export)
- Beide haben `export const meta = { label: '...' }`
- Module haben zusätzlich `export const fields = (<ModuleFields>...)`

### 4. Defensive Destructuring
Felder können `undefined` sein — immer `?? {}` verwenden:
```tsx
const { headline, image } = fieldValues ?? {};
const { src, alt } = fieldValues?.image ?? {};
const { color } = hublParameters?.brand_primary ?? {};
```

### 5. Keine Unterordner in `components/modules/`
Der Dev Server crasht mit `EISDIR` wenn er Unterordner findet.
```
✅ components/modules/HeroSection/index.tsx
❌ components/modules/sections/HeroSection/index.tsx
```

### 6. Beim Erstellen eines Moduls immer auch `.stories.jsx` erstellen
Ohne separate Nachfrage. Story-Dateien enden auf `.stories.jsx` (nicht `.tsx`).
Storybook-Titel-Konventionen: `'Sections/...'`, `'Elements/...'`, `'Navigation/...'`, `'Partials/...'`, `'UI/...'`

### 7. Tailwind Build-Pakete gehören in `dependencies`
HubSpot's Cloud-Build läuft `npm install --omit=dev`. Diese Pakete müssen in `dependencies`:
- `@tailwindcss/postcss`
- `tailwindcss`
- `postcss`

---

## Modul-Pattern (vollständig)

```tsx
// components/modules/MyModule/index.tsx
import { ModuleFields, TextField, ImageField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, image } = fieldValues ?? {};
  const { src, alt, width, height } = image ?? {};

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <section className="w-full bg-aq-accent py-20 px-8">
        <h1 className="text-white text-5xl font-bold font-sans">{headline}</h1>
        {src && <img src={src} alt={alt || ''} width={width} height={height} />}
      </section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Titel" />
    <ImageField
      name="image"
      label="Bild"
      default={{ src: '', alt: '', width: 0, height: 0 }}
      resizable={true}
    />
  </ModuleFields>
);

export const meta = { label: 'My Module' };
```

---

## Partial-Pattern (vollständig)

```tsx
// components/partials/MyPartial/index.tsx
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export default function MyPartial() {
  return (
    <ThemeProvider>
      <header className="w-full bg-aq-accent px-8 py-4">
        <span className="text-white font-bold text-xl font-sans">aquilliance</span>
      </header>
    </ThemeProvider>
  );
}

export const meta = { label: 'My Partial' };
```

---

## ThemeProvider

```tsx
// components/shared/ThemeProvider.tsx
export function ThemeProvider({ children, hublParameters }: {
  children: ReactNode;
  hublParameters?: Record<string, any>;
})
```

Liest aus `hublParameters`: `brand_primary.color`, `brand_accent.color`, `base_font.font/fallback`  
Schreibt CSS Custom Properties auf `:root` → Tailwind-Klassen wie `bg-aq-primary` werden dynamisch überschrieben.

---

## Design Tokens — Tailwind-Klassen

### Farben
| CSS Variable | Tailwind-Klassen | Wert |
|---|---|---|
| `--color-aq-primary` | `bg-aq-primary`, `text-aq-primary`, `border-aq-primary` | `#ff7a59` (editierbar) |
| `--color-aq-accent` | `bg-aq-accent`, `text-aq-accent` | `#2d3e50` (editierbar) |
| `--color-aq-white` | `bg-aq-white`, `text-aq-white` | `#ffffff` |
| `--color-aq-gray-100` | `bg-aq-gray-100` | `#f5f5f5` |
| `--color-aq-gray-200` | `bg-aq-gray-200` | `#e5e5e5` |
| `--color-aq-gray-400` | `text-aq-gray-400` | `#a3a3a3` |
| `--color-aq-gray-600` | `text-aq-gray-600` | `#525252` |
| `--color-aq-gray-900` | `text-aq-gray-900` | `#171717` |

### Typografie
| CSS Variable | Tailwind-Klasse |
|---|---|
| `--font-sans` | `font-sans` (Inter, editierbar) |
| `--font-serif` | `font-serif` |
| `--font-mono` | `font-mono` |
| `--text-xs` bis `--text-5xl` | `text-xs` … `text-5xl` |

### Animationen
| CSS Variable | Tailwind-Klasse |
|---|---|
| `--animate-fade-in` | `animate-fade-in` |
| `--animate-fade-up` | `animate-fade-up` |
| `--animate-slide-in-left` | `animate-slide-in-left` |

---

## Globale Theme-Fields (`fields.json`)

Diese Felder erscheinen im HubSpot Backend unter „Theme-Einstellungen" und kommen in jedem Modul als `hublParameters` an.

| Feldname | Typ | Default | Zugriff in Komponente |
|---|---|---|---|
| `brand_primary` | color | `#ff7a59` | `hublParameters?.brand_primary?.color` |
| `brand_accent` | color | `#2d3e50` | `hublParameters?.brand_accent?.color` |
| `base_font` | font | Inter | `hublParameters?.base_font?.font` |

---

## HubSpot Field Types — vollständige Referenz

Alle Imports aus `@hubspot/cms-components/fields`.

### TextField
```tsx
<TextField name="headline" label="Überschrift" default="Titel" />
```

### RichTextField
```tsx
<RichTextField name="body" label="Text" default="<p>Inhalt</p>" />
// Im JSX rendern: <RichText fieldPath="body" /> (aus @hubspot/cms-components)
```

### ImageField
```tsx
<ImageField
  name="image"
  label="Bild"
  default={{ src: '', alt: '', width: 0, height: 0 }}
  resizable={true}
/>
// Zugriff: const { src, alt, width, height } = fieldValues?.image ?? {};
```

### URLField
```tsx
<URLField name="cta_url" label="Link" default={{ href: '#', type: 'EXTERNAL' }} />
// Zugriff: fieldValues?.cta_url?.href
```

### NumberField
```tsx
<NumberField name="columns" label="Spalten" default={3} min={1} max={6} />
```

### BooleanField
```tsx
<BooleanField name="show_button" label="Button anzeigen" default={true} display="toggle" />
// Zugriff: fieldValues?.show_button === true
```

### ChoiceField
```tsx
<ChoiceField
  name="layout"
  label="Layout"
  display="radio"
  default="left"
  choices={[['left', 'Links'], ['center', 'Mitte'], ['right', 'Rechts']]}
/>
```

### ColorField
```tsx
<ColorField name="bg_color" label="Hintergrundfarbe" default={{ color: '#ffffff', opacity: 100 }} />
// Zugriff: const { color, opacity } = fieldValues?.bg_color ?? {};
// Inline style: style={{ backgroundColor: color, opacity: opacity / 100 }}
```

### FontField
```tsx
<FontField
  name="heading_font"
  label="Schriftart"
  default={{ font: 'Inter', font_set: 'GOOGLE', fallback: 'sans-serif' }}
/>
```

### GroupField (Felder gruppieren)
```tsx
import { GroupField } from '@hubspot/cms-components/fields';
<GroupField name="cta" label="Button">
  <TextField name="label" label="Text" default="Jetzt starten" />
  <URLField name="url" label="URL" default={{ href: '#', type: 'EXTERNAL' }} />
</GroupField>
// Zugriff: const { label, url } = fieldValues?.cta ?? {};
```

---

## Scripts

Alle aus dem Projekt-Root (`/Users/normanpendzich/Projekte/aquilliance HubSpot Theme/`):

| Befehl | Beschreibung |
|---|---|
| `npm run start` | Dev Server (hslocal.net:3000) + Storybook (localhost:3123) |
| `npm run lint` | ESLint über alle Komponenten |
| `npm run deploy` | Build + Upload zu HubSpot (`hs project upload`) |
| `npm run prettier` | Prettier Format-Check inkl. .hubl.html |

Tests aus dem Theme-Verzeichnis: `cd src/theme/my-theme && npm test`

---

## Storybook-Pattern

```jsx
// MyModule.stories.jsx (nicht .tsx!)
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default { title: 'Sections/MyModule', component: Component };

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Testtitel',          // alle Felder befüllen — kein Auto-Default!
    image: { src: '', alt: '', width: 0, height: 0 },
  },
});

// Optional: Variante mit überschriebenen Theme-Farben
export const CustomColors = moduleStory(Component, fields, {
  fieldValues: { headline: 'Custom' },
  hublParameters: {
    brand_primary: { color: '#22c55e' },
    brand_accent: { color: '#7c3aed' },
  },
});
```

**Wichtig:** `moduleStory` füllt Felder NICHT automatisch. Alle Felder die die Komponente verwendet müssen in `fieldValues` übergeben werden — sonst crasht die Story.

---

## Partials in HUBL-Templates einbinden

```html
{% module "header" path="../components/partials/Header" %}
{% module "hero" path="../components/modules/HeroSection" %}
{% dnd_area "main_content" label="Main Content" %}{% end_dnd_area %}
```

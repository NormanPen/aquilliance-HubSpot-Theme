# aquilliance HubSpot Theme — Projektkontext für Claude

## Projektübersicht

HubSpot CMS React Theme. Module sind React-Komponenten (TypeScript), Templates sind HUBL-Dateien. Styling via Tailwind CSS v4. Lokale Entwicklung über `@hubspot/cms-dev-server` (Port 3000 + Storybook Port 3123).

**Theme-Root:** `src/theme/my-theme/`

---

## Verzeichnisstruktur

```
src/theme/my-theme/
  components/
    modules/       ← ALLE über {% module %} eingebundenen Komponenten (auch Header/Footer!) — `export function Component` + `fields`. NUR dieser Ordner wird beim Deploy als adressierbares Modul gebaut.
    partials/      ← NUR lokale Dev-Vorschau (`/partial/X`). Wird NICHT deployed → live „custom widget definition not found". Nicht für echte Seitenteile verwenden!
    islands/       ← Interaktive Client-Side-Komponenten (useState, useEffect)
    ui/            ← Reine React-Bausteine, werden von Modulen importiert
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
    page.hubl.html          ← Standard-Page-Template
    grid-example.hubl.html  ← BEISPIEL/Referenz: alle DnD-Grid-Layouts (siehe unten)
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
`<ThemeProvider hublParameters={hublParameters}>` — immer hublParameters übergeben.

### 3. Export-Pattern — Header/Footer sind MODULE, keine Partials!
- **Alle deploybaren Komponenten** (inkl. Header/Footer) liegen in `components/modules/` und brauchen: `export function Component` (named) + `export const fields` (bei feldlosen Modulen: `export const fields = <ModuleFields>{null}</ModuleFields>;` — NICHT `<ModuleFields />`, da `children` Pflicht ist) + `export const meta`.
- Ohne `fields` crasht der Dev Server: „Couldn't recognize fields value for module".
- ⚠️ `components/partials/` (mit `export default`) rendert NUR in der lokalen Dev-Vorschau. Beim Deploy wird es NICHT als Modul gebaut → live erscheint „custom widget definition not found (path: null)". Deshalb: Header/Footer gehören in `modules/`, NICHT in `partials/`. (Hart erkämpft — siehe Memory.)

### 3b. {% module %}-Includes gehören ins SEITEN-Template, nicht ins Layout!
Es gibt einen Auflösungs-Konflikt bei `{% module path %}`:
- **HubSpot live** löst `path=` relativ zum gerenderten **Seiten-Template** auf (`templates/home.hubl.html`).
- **Lokaler Dev Server** löst relativ zur **Datei mit dem Tag** auf — bei einem Tag in `templates/layouts/base.hubl.html` also relativ zu `layouts/`.

→ Ein `{% module %}` in base.hubl.html (layouts/) kann NICHT beide befriedigen (live will `../`, lokal will `../../`).
→ **Lösung:** Header/Footer/Hero-Includes direkt ins Seiten-Template (`templates/home.hubl.html`) schreiben, mit `path="../components/modules/X"`. Das löst in BEIDEN Umgebungen identisch auf (bewiesen durch `hero_section`). base.hubl.html enthält nur `{% block body %}`.

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

## Header/Footer & feldlose Module (vollständig)

Seitenteile wie Header/Footer sind **Module** in `components/modules/` — KEINE Partials. (Der `partials/`-Ordner deployt nicht, siehe Regel 3.)

```tsx
// components/modules/Header/index.tsx
import { ModuleFields } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ hublParameters }: { hublParameters: any }) {
  return (
    <ThemeProvider hublParameters={hublParameters}>
      <header className="w-full bg-aq-accent px-8 py-4">
        <span className="text-white font-bold text-xl font-sans">aquilliance</span>
      </header>
    </ThemeProvider>
  );
}

export const fields = <ModuleFields>{null}</ModuleFields>; // feldlos: {null} statt self-closing (children ist Pflicht)

export const meta = { label: 'Header' };
```

Einbindung im **Seiten-Template** `templates/home.hubl.html` (NICHT im Layout — siehe Regel 3b):
```html
{% block body %}
  {% module "header" path="../components/modules/Header" %}
  {# ... Seiteninhalt / dnd_area ... #}
  {% module "footer" path="../components/modules/Footer" %}
{% endblock body %}
```

---

## Interaktive Islands (Client-Side, z.B. Burger-Menü)

HubSpot rendert Module server-seitig statisch — `useState`/`useEffect` brauchen eine **Island** (`components/islands/`). Muster:

```tsx
// components/islands/MobileNav.tsx  — normale React-Komponente mit Hooks, default export
import { useState } from 'react';
export default function MobileNav({ items = [] }: { items?: any[] }) {
  const [open, setOpen] = useState(false);
  // ...
}
```

Einbindung im Modul über `<Island>` + `?island`-Import (Props müssen serialisierbar sein — z.B. JSON-Daten, keine JSX):
```tsx
import { Island } from '@hubspot/cms-components';
import MobileNav from '../../islands/MobileNav?island';   // ?island-Suffix, KEINE .js-Extension

<Island module={MobileNav} items={items} hydrateOn="load" wrapperTag="div" wrapperClassName="md:hidden" />
```
`hydrateOn`: `'load'` | `'visible'` | `'idle'`. Im Unit-Test `@hubspot/cms-components` mocken (Island/useMenu brauchen Render-Context, der in jsdom fehlt).

## HubSpot Menü & Logo im Modul

- **Logo:** `<LogoField name="logo" label="Logo" />` → `fieldValues.logo` = `{ src, alt, width, height }` (erbt aus Brand-Settings, falls leer). Defensive: Fallback rendern wenn kein `src`.
- **Navigation:** `<MenuField name="menu" label="Navigation" />` (Editor wählt ein HubSpot-Menü). Rendern:
  - Fertige Komponente: `<Menu fieldPath="menu" tag="ul" className="..." />` (aus `@hubspot/cms-components`), ODER
  - Volle Tailwind-Kontrolle: `const menu = useMenu(fieldPath('menu'));` → `menu?.pagesTree?.children` = Array von `{ label, url, linkTarget, children }`. Bei keinem Menü → `null` (graceful leeres Array).

---

## ThemeProvider

```tsx
// components/shared/ThemeProvider.tsx
export function ThemeProvider({ children, hublParameters }: {
  children: ReactNode;
  hublParameters?: Record<string, any>;
})
```

**WICHTIG:** `hublParameters` enthält in HubSpot CMS Projects NUR Modul-Metadaten (`module_id`, `field_types`, `path`) — KEINE Theme-Fields. ThemeProvider hat deshalb keinen Effekt auf Farben/Fonts aus `fields.json`. Für Theme-Farben in Modulen → `inheritedValuePropertyValuePaths` verwenden (siehe unten).

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

Theme-Fields erscheinen im HubSpot Backend unter „Theme-Einstellungen". Sie kommen **NICHT** über `hublParameters` in Module — diese Annahme war falsch. Der korrekte Weg: `inheritedValuePropertyValuePaths` im Modul-Field.

**fields.json Struktur** (Felder müssen in Gruppen liegen, kein Root-Level):
```json
[
  { "name": "group_colors", "type": "group", "children": [
    { "name": "brand_primary", "type": "color", ... },
    { "name": "brand_accent",  "type": "color", ... }
  ]},
  { "name": "group_fonts", "type": "group", "children": [
    { "name": "base_font", "type": "font", ... }
  ]}
]
```

**Zugriff in Modul-Fields** via `inheritedValuePropertyValuePaths`:
```tsx
<ColorField
  name="button_color"
  label="Button Farbe"
  inheritedValuePropertyValuePaths={{ color: 'theme.group_colors.brand_primary.color' }}
  default={{ color: '#ff7a59', opacity: 100 }}
/>
```

**Zugriff in Modul-Komponente** — kommt über `fieldValues`, nicht `hublParameters`:
```tsx
const { button_color } = fieldValues ?? {};
const primaryColor = button_color?.color;
// style={{ backgroundColor: primaryColor }}
```

| Pfad | Bedeutung |
|---|---|
| `theme.group_colors.brand_primary.color` | Primärfarbe |
| `theme.group_colors.brand_accent.color` | Akzentfarbe |
| `theme.group_fonts.base_font.font` | Schriftart |

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

⚠️ **Live-Seiten brauchen nach `npm run deploy` Zeit zum Aktualisieren.** Build-Erfolg ≠ Seite sofort live. Nach einem Deploy kann es etwas dauern, bis Änderungen auf der echten HubSpot-URL erscheinen (CDN/Cache). Beim Verifizieren am Live-System: kurz warten und nicht dem ersten Abruf vertrauen — ggf. mit Cache-Buster (`?v=timestamp`) erneut prüfen.

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

## Module in HUBL-Templates einbinden

```html
{% module "header" path="../components/modules/Header" %}
{% module "hero" path="../components/modules/HeroSection" %}
{% dnd_area "main_content" label="Main Content" %}{% end_dnd_area %}
```

## 📐 Beispiel-/Referenz-Template: `templates/grid-example.hubl.html`

**Beim Erstellen neuer Seiten-Templates oder DnD-Grid-Layouts ZUERST hier nachschauen.**
`templates/grid-example.hubl.html` ist die fertige Referenz: Es zeigt ALLE HubSpot "Blank Layouts"
als korrekt aufgebaute `dnd_section` / `dnd_column` (`width`/`offset`) / `dnd_row` / `dnd_module`:
1-spaltig (`span12`), 2-spaltig (`span6`×2), 3-spaltig (`span4`×3), 4-spaltig (`span3`×4),
1/3:2/3 (`span4`+`span8`) und 2/3:1/3 (`span8`+`span4`).
Das passende CSS-Grid (`.row-fluid` / `.span1..12` + Breakpoints) liegt in `styles/global.css`.
→ Für neue Layouts die `dnd_section`-Blöcke von dort kopieren statt neu zu erfinden.

---

## 📚 Referenz: Offizielle HubSpot cms-react Beispiele

Eingecheckter Schnappschuss unter `reference/cms-react/examples/` (Apache 2.0).
**Bei Fragen zu cms-react-Patterns ZUERST hier nachschauen** statt aus dem Gedächtnis
oder per WebFetch — der echte Code ist lokal les-/durchsuchbar (`Read`/`Grep`).

Verfügbare Beispiele: `getting-started`, `module-components`, `islands`,
`styling`, `routing`, `data-fetching`, `graphql-storybook`, `serverless`,
`contact-profile`, `todo-mvc`, `hello-world`.

⚠️ Generisches cms-react ≠ unser Setup (HubSpot Projects + Tailwind v4 +
Node16/`.js`-Imports). Als Vorlage abgleichen, **nicht 1:1 kopieren** — mehrere
unserer Regeln (z.B. Theme-Fields via `inheritedValuePropertyValuePaths` statt
`hublParameters`) weichen bewusst von der naiven cms-react-Annahme ab.
Update-Anleitung: `reference/cms-react/README.md`.

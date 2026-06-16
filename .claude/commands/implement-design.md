Analysiere das Design (Figma-Link oder Bild) und setze es als HubSpot CMS React Modul(e) um.

## Analysephase

1. **Figma-Link:** Nutze den Figma MCP-Server (`get_design_context` oder `get_screenshot`) um das Design zu laden.
2. **Bild:** Analysiere das Bild direkt.

Identifiziere:
- Welche Inhaltsbereiche gibt es? (Überschrift, Text, Bild, Button, Liste, etc.)
- Welche Bereiche soll der HubSpot-Editor ändern können?
- Gibt es klar trennbare Sektionen → mehrere Module? Oder eine zusammenhängende Sektion → ein Modul?

---

## Entscheidungsbaum: Welche HubSpot-Felder?

| Design-Element | HubSpot Field |
|---|---|
| Überschrift/Titel | `TextField` |
| Fließtext/Paragraph | `TextField` oder `RichTextField` |
| HTML-Inhalt mit Formatierung | `RichTextField` + `<RichText fieldPath="..." />` |
| Bild | `ImageField` mit `resizable={true}` |
| Button-Text + URL | `TextField` (Label) + `URLField` (URL) oder `GroupField` |
| Toggle/Feature an/aus | `BooleanField` mit `display="toggle"` |
| Farbe editierbar | `ColorField` |
| Auswahl (Layout, Stil) | `ChoiceField` mit `choices={[['wert', 'Label'], ...]}` |
| Gruppierte Felder (z.B. ein CTA-Block) | `GroupField` |
| Zahl (Spalten, Größe) | `NumberField` |

**Was NICHT als Feld:** Abstände, border-radius, rein visuelle Eigenschaften → diese direkt als Tailwind-Klassen im JSX.

---

## Styling-Entscheidung

| Was | Wie |
|---|---|
| Layout, Abstände, Flex, Grid | Tailwind-Klassen (`flex`, `gap-4`, `px-8`, `py-20`, etc.) |
| Projektfarben (statisch) | Tailwind-Token: `bg-aq-primary`, `text-aq-accent`, `bg-aq-gray-100` |
| Farbe die HubSpot-Editor ändern kann | `style={{ backgroundColor: color }}` mit Wert aus `fieldValues` oder `hublParameters` |
| Schriftart aus globalem Theme | `font-sans` (wird zur Laufzeit durch ThemeProvider überschrieben) |

---

## Verfügbare Design Tokens

**Farben:** `bg-aq-primary` (#ff7a59), `bg-aq-accent` (#2d3e50), `bg-aq-white`, `bg-aq-gray-100/200/400/600/900`  
**Schrift:** `font-sans` (Inter, editierbar), `text-xs` bis `text-5xl`  
**Animationen:** `animate-fade-in`, `animate-fade-up`, `animate-slide-in-left`

---

## Modul-Template

```tsx
import { ModuleFields, TextField, ImageField, URLField, BooleanField, ChoiceField, RichTextField, ColorField, GroupField, NumberField } from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, image, cta } = fieldValues ?? {};
  const { src, alt, width, height } = image ?? {};
  const { label: ctaLabel, url: ctaUrl } = cta ?? {};

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <section className="...tailwind klassen...">
        {/* JSX hier */}
      </section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    {/* Felder hier */}
  </ModuleFields>
);

export const meta = { label: 'Modulname' };
```

---

## Pflichtregeln

- Import-Pfade mit `.js`-Extension: `'../../shared/ThemeProvider.js'`
- Defensive Destructuring: `const { x } = fieldValues ?? {}`
- Immer `<ThemeProvider hublParameters={hublParameters}>` wrappen
- `export function Component` (named, kein default)
- Module in `src/theme/my-theme/components/modules/ModulName/index.tsx` — KEIN Unterordner dazwischen

---

## Automatisch auch erstellen: Story-Datei

`src/theme/my-theme/components/modules/ModulName/ModulName.stories.jsx`:

```jsx
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default { title: 'Sections/ModulName', component: Component };

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    // ALLE Felder befüllen mit realistischen Beispielwerten
  },
});
```

**Wichtig:** Alle Felder die die Komponente nutzt müssen in `fieldValues` stehen — `moduleStory` füllt keine Defaults ein.

---

Setze das Design jetzt direkt um. Frage nicht nach — erstelle die Dateien sofort.

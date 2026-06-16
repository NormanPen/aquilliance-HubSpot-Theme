Erstelle ein neues HubSpot CMS React Modul mit dem Namen: $ARGUMENTS

Erstelle folgende zwei Dateien:

## 1. `src/theme/my-theme/components/modules/$ARGUMENTS/index.tsx`

Verwende dieses exakte Template und passe es an den Modulnamen und den Anwendungsfall an:

```tsx
import { ModuleFields, TextField, ImageField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline } = fieldValues ?? {};

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <section className="w-full bg-aq-accent py-20 px-8 text-center">
        <h1 className="text-white text-5xl font-bold font-sans">{headline}</h1>
      </section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Titel" />
  </ModuleFields>
);

export const meta = { label: '$ARGUMENTS' };
```

**Pflichtregeln für index.tsx:**
- Import-Pfade immer mit `.js`-Extension: `'../../shared/ThemeProvider.js'`
- Immer `<ThemeProvider hublParameters={hublParameters}>` wrappen
- `export function Component` (named, kein default)
- `export const fields` mit `<ModuleFields>`
- `export const meta` mit label
- Defensive Destructuring: `const { x } = fieldValues ?? {}`
- Für verschachtelte Felder: `const { src } = fieldValues?.image ?? {}`
- Tailwind für Layout/Abstände, `style={{}}` nur für dynamische Werte aus fieldValues/hublParameters

**Verfügbare Field-Typen:**
- `TextField` — einfacher Text
- `RichTextField` — HTML-Richtext (im JSX rendern mit `<RichText fieldPath="name" />` aus `@hubspot/cms-components`)
- `ImageField` — Bild mit `resizable={true}`, default: `{ src: '', alt: '', width: 0, height: 0 }`
- `URLField` — Link, default: `{ href: '#', type: 'EXTERNAL' }`, Zugriff: `.href`
- `NumberField` — Zahl mit `min`, `max`
- `BooleanField` — Toggle, `display="toggle"` oder `"checkbox"`
- `ChoiceField` — Auswahl, `choices={[['value', 'Label'], ...]}`, `display="radio"|"select"|"buttons"`
- `ColorField` — Farbe mit Opacity, default: `{ color: '#ffffff', opacity: 100 }`
- `GroupField` — Felder gruppieren: `<GroupField name="cta" label="Button"><TextField .../><URLField .../></GroupField>`

---

## 2. `src/theme/my-theme/components/modules/$ARGUMENTS/$ARGUMENTS.stories.jsx`

```jsx
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/$ARGUMENTS',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Beispiel-Überschrift',
    // alle weiteren Felder hier befüllen — kein Auto-Default!
  },
});

export const CustomColors = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Custom Theme',
  },
  hublParameters: {
    brand_primary: { color: '#22c55e' },
    brand_accent: { color: '#7c3aed' },
  },
});
```

**Pflichtregeln für Stories:**
- Dateiendung `.stories.jsx` (nicht `.tsx`)
- `moduleStory` füllt Felder NICHT automatisch — alle Felder die die Komponente nutzt müssen in `fieldValues` stehen
- Titel-Konvention: `'Sections/...'`, `'Elements/...'`, `'Navigation/...'`, `'Partials/...'`

---

Passe beide Dateien sinnvoll an den Modulnamen und Zweck an. Wenn der Nutzer eine Beschreibung des Moduls mitgegeben hat, wähle passende Felder und Tailwind-Klassen. Frag nicht nach — erstelle direkt beide Dateien.

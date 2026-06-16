# Module & Partials

## Komponententypen

| Typ | Ordner | HubSpot-registriert | Felder editierbar |
|---|---|---|---|
| **Section-Modul** | `components/modules/sections/` | Ja | Ja |
| **Element-Modul** | `components/modules/elements/` | Ja | Ja |
| **Navigation-Modul** | `components/modules/navigation/` | Ja | Ja |
| **Island** | `components/islands/` | Ja | Nein |
| **Partial** | `components/partials/` | Ja | Nein |
| **UI-Komponente** | `components/ui/` | Nein | Nein |

---

## Neues Modul erstellen

Module haben editierbare Felder (HubSpot Page Editor) und bestehen aus drei Exporten.

### Dateistruktur

```
components/modules/sections/Hero/
  index.tsx
  Hero.stories.jsx   (optional, aber empfohlen)
```

### Aufbau `index.tsx`

```tsx
import {
  ModuleFields,
  TextField,
  ImageField,
  RichTextField,
} from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../../shared/ThemeProvider.js';

// 1. Komponente — Pflichtexport
export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { brandColors } = hublParameters ?? {};

  return (
    <ThemeProvider>
      <section
        className="w-full bg-aq-accent py-20 px-8"
        style={{ backgroundColor: brandColors?.color }}
      >
        <h1 className="text-white text-5xl font-bold">{fieldValues.headline}</h1>
      </section>
    </ThemeProvider>
  );
}

// 2. Felder — definiert was im HubSpot Page Editor editierbar ist
export const fields = (
  <ModuleFields>
    <TextField
      name="headline"
      label="Überschrift"
      default="Willkommen"
    />
    <ImageField
      name="image"
      label="Bild"
      default={{ src: '', alt: '', width: 0, height: 0 }}
      resizable={true}
    />
  </ModuleFields>
);

// 3. Metadaten — Name im HubSpot Editor
export const meta = {
  label: 'Hero Section',
};
```

### Wichtige Regeln für Module

- `export function Component` — benannter Export, kein default
- Immer `<ThemeProvider>` wrappen — sonst keine Tailwind-Styles in der Vorschau
- `fieldValues.logo ?? {}` — immer defensive Destructuring, Felder können undefined sein
- `hublParameters ?? {}` — gleiches gilt für Theme-Parameter
- Dateiendung `.js` bei relativen Imports: `import { ThemeProvider } from '../../../shared/ThemeProvider.js'`

---

## Neuen Partial erstellen

Partials sind Komponenten ohne editierbare Felder — typisch für Header und Footer.

### Dateistruktur

```
components/partials/Header/
  index.tsx
  Header.test.tsx   (optional, aber empfohlen)
```

### Aufbau `index.tsx`

```tsx
import { ThemeProvider } from '../../shared/ThemeProvider.js';

// Pflicht: default export (kein "export function Component")
export default function Header() {
  return (
    <ThemeProvider>
      <header className="w-full bg-aq-accent px-8 py-4">
        <nav className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">aquilliance</span>
        </nav>
      </header>
    </ThemeProvider>
  );
}

// Optional
export const meta = {
  label: 'Header',
};
```

### Unterschied Modul vs. Partial

| | Modul | Partial |
|---|---|---|
| Export | `export function Component` | `export default function Name` |
| Felder | Ja (`export const fields`) | Nein |
| Vorschau-URL | `/preview/module/Name` | `/preview/partial/Name` |

---

## Partial in HUBL-Template einbinden

Sowohl Module als auch Partials werden in HUBL-Templates über den `{% module %}` Tag eingebunden:

```html
{% module "header" path="../components/partials/Header" %}

{% dnd_area "main_content" label="Main Content" %}
{% end_dnd_area %}

{% module "footer" path="../components/partials/Footer" %}
```

---

## UI-Komponenten

Reine React-Bausteine ohne HubSpot-Felder — werden von Modulen und Partials wiederverwendet, aber nicht direkt von HubSpot verwaltet.

```
components/ui/
  Button.tsx
  Card.tsx
  Badge.tsx
```

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, href, variant = 'primary' }: ButtonProps) {
  const base = 'px-5 py-2.5 rounded font-medium no-underline';
  const variants = {
    primary: 'bg-aq-primary text-white',
    secondary: 'bg-transparent border border-aq-primary text-aq-primary',
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {label}
    </a>
  );
}
```

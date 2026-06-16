Erstelle eine neue interaktive Island (Client-Side-Komponente) mit dem Namen: $ARGUMENTS

Islands sind für Interaktivität (`useState`, `useEffect`, Event-Handler), die HubSpots
server-seitiges Modul-Rendering allein nicht kann (z.B. Akkordeon, Tabs, Slider, Burger-Menü).

## 1. `src/theme/my-theme/components/islands/$ARGUMENTS.tsx`

Normale React-Komponente mit **default export** und Hooks:

```tsx
import { useState } from 'react';

type Item = { label?: string };

export default function $ARGUMENTS({ items = [] }: { items?: Item[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} className="font-sans">
        {open ? 'Schließen' : 'Öffnen'}
      </button>
      {open && <div className="mt-2">{/* … */}</div>}
    </div>
  );
}
```

**Regeln:**
- `default export` (nicht named) — Islands werden per `?island`-Import geladen.
- Props müssen **serialisierbar** sein (JSON-Daten, kein JSX, keine Funktionen).
- Tailwind-Klassen funktionieren — die `tailwind.css` ist über das umgebende Modul auf der Seite.
- KEINE eigene `.js`-Extension am Island-Import (siehe Modul unten).

## 2. Einbindung in ein Modul

Im Modul (`components/modules/.../index.tsx`) über `<Island>`:

```tsx
import { Island } from '@hubspot/cms-components';
import $ARGUMENTS from '../../islands/$ARGUMENTS?island';   // ?island-Suffix, KEINE .js-Extension

// im JSX, innerhalb von <ThemeProvider>:
<Island module={$ARGUMENTS} items={items} hydrateOn="visible" wrapperTag="div" />
```

`hydrateOn`: `'load'` (sofort) | `'visible'` (beim Scrollen) | `'idle'`.

**Vorlage:** `components/islands/FaqList.tsx` + `components/modules/FaqAccordion/index.tsx` zeigen das Muster end-to-end.

Erstelle die Island-Datei direkt und passe Props/Logik an den genannten Zweck an. Frag nicht nach.

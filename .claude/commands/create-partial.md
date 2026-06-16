Erstelle einen neuen HubSpot CMS React Partial mit dem Namen: $ARGUMENTS

Erstelle folgende zwei Dateien:

## 1. `src/theme/my-theme/components/partials/$ARGUMENTS/index.tsx`

```tsx
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export default function $ARGUMENTS() {
  return (
    <ThemeProvider>
      <div className="w-full bg-aq-accent px-8 py-4">
        {/* Inhalt hier */}
      </div>
    </ThemeProvider>
  );
}

export const meta = { label: '$ARGUMENTS' };
```

**Pflichtregeln für Partials:**
- `export default function Name` (default export — KEIN `export function Component`)
- `export const meta = { label: '...' }` ohne `export const fields`
- Immer `<ThemeProvider>` wrappen — aber OHNE `hublParameters` (Partials haben keine globalen Theme-Felder)
- Import-Pfade mit `.js`-Extension: `'../../shared/ThemeProvider.js'`
- Kein `fieldValues` oder `hublParameters` in der Signatur

---

## 2. `src/theme/my-theme/components/partials/$ARGUMENTS/$ARGUMENTS.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import $ARGUMENTS from './index.js';

describe('$ARGUMENTS', () => {
  it('renders without crashing', () => {
    render(<$ARGUMENTS />);
    expect(document.body).toBeTruthy();
  });

  it('renders the component content', () => {
    render(<$ARGUMENTS />);
    // Hier sinnvollen Inhalt prüfen, z.B.:
    // expect(screen.getByRole('banner')).toBeInTheDocument();
    // expect(screen.getByText('aquilliance')).toBeInTheDocument();
  });
});
```

**Regeln für Tests:**
- Import mit `.js`-Extension: `import $ARGUMENTS from './index.js'`
- `@testing-library/jest-dom` Matcher sind verfügbar (toBeInTheDocument, toHaveTextContent, etc.)
- Teste was tatsächlich gerendert wird — passe die Tests an den echten Inhalt an

---

Einbinden in ein HUBL-Template:
```html
{% module "partial_name" path="../components/partials/$ARGUMENTS" %}
```

Erstelle beide Dateien direkt mit sinnvollem Inhalt. Wenn der Nutzer eine Beschreibung mitgegeben hat, baue den Partial entsprechend aus.

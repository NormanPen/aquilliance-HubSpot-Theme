# Testing

Das Projekt nutzt zwei Testing-Ansätze:

| Tool | Zweck | Befehl |
|---|---|---|
| **Vitest + React Testing Library** | Unit- und Komponenten-Tests | `npm test` |
| **Storybook** | Visuelle Komponenten-Vorschau | läuft via `npm run start` |

---

## Vitest — Unit- und Komponenten-Tests

### Tests ausführen

```bash
# Aus src/theme/my-theme/
cd src/theme/my-theme

npm test              # Watch-Mode (automatisch bei Änderungen)
npm test -- --run     # Einmaliger Durchlauf
```

### Testdatei anlegen

Testdateien liegen direkt neben der Komponente:

```
components/partials/Header/
  index.tsx
  Header.test.tsx    ← Testdatei
```

### Beispiel-Test

```tsx
// Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './index.js';

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the logo text', () => {
    render(<Header />);
    expect(screen.getByText('aquilliance')).toBeInTheDocument();
  });
});
```

### Modul-Test (mit Feldern)

```tsx
// Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Component } from './index.js';

const defaultProps = {
  fieldValues: {
    headline: 'Testtitel',
    image: { src: '', alt: 'Test', width: 0, height: 0 },
  },
  hublParameters: {},
};

describe('Hero', () => {
  it('renders the headline', () => {
    render(<Component {...defaultProps} />);
    expect(screen.getByText('Testtitel')).toBeInTheDocument();
  });
});
```

### Verfügbare Matcher

Da `@testing-library/jest-dom` eingerichtet ist, stehen alle DOM-Matcher zur Verfügung:

```tsx
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveTextContent('Text');
expect(element).toHaveAttribute('href', '/link');
expect(element).toHaveClass('bg-aq-primary');
expect(button).toBeDisabled();
```

---

## Storybook — Visuelle Vorschau

Storybook läuft automatisch mit `npm run start` auf [http://localhost:3123](http://localhost:3123).

Es dient zur visuellen Dokumentation und zum schnellen Überprüfen von Komponenten in verschiedenen Zuständen — ohne eine vollständige HubSpot-Seite aufzubauen.

Für die vollständige Storybook-Dokumentation siehe [Entwicklung → Storybook](development.md#storybook-localhost3123).

---

## Was testen wir womit?

| Szenario | Tool |
|---|---|
| Rendert die Komponente ohne Fehler? | Vitest + RTL |
| Wird ein bestimmter Text angezeigt? | Vitest + RTL |
| Funktioniert ein Klick-Handler? | Vitest + RTL + userEvent |
| Wie sieht die Komponente aus? | Storybook |
| Verschiedene Zustände (leer, mit Bild, ohne Bild)? | Storybook Stories |
| Integration in HubSpot-Felder? | Storybook + moduleStory |

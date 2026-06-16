# Lokale Entwicklung

## Dev Server starten

```bash
# Aus dem Projekt-Root
npm run start
```

Dies startet zwei Server gleichzeitig:

| Server | URL | Verwendung |
|---|---|---|
| HubSpot Dev Server | [http://hslocal.net:3000](http://hslocal.net:3000) | Modul- und Template-Vorschau |
| Storybook | [http://localhost:3123](http://localhost:3123) | Komponenten-Dokumentation |

> **Voraussetzung:** `hslocal.net` muss in der Hosts-Datei eingetragen sein. Siehe [Setup](setup.md#hslocal-net-konfigurieren).

---

## HubSpot Dev Server (localhost:3000)

Der Dev Server zeigt alle verfügbaren Assets des Themes:

- **Modules** — React-Module aus `components/modules/`
- **Partials** — React-Partials aus `components/partials/`
- **Templates** — HUBL-Templates aus `templates/`

Änderungen an Komponenten werden automatisch im Browser aktualisiert (Hot Reload).

### Modul-Vorschau

Klicke auf ein Modul in der Liste → **View local version** → der Browser öffnet eine isolierte Vorschau des Moduls mit seinen Standard-Feldwerten.

---

## Storybook (localhost:3123)

Storybook ist direkt in den HubSpot Dev Server integriert (`--storybook` Flag) und startet automatisch mit `npm run start`.

### Stories erstellen

Jedes Modul oder Partial kann eine Story-Datei bekommen. Die Datei liegt direkt neben der Komponente:

```
components/modules/sections/Hero/
  index.tsx
  Hero.stories.jsx    ← Story-Datei
```

### Story-Pattern

```jsx
// Hero.stories.jsx
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/Hero',   // Sidebar-Struktur: Kategorie/Name
  component: Component,
};

// Pflicht: Alle Felder die der Komponente übergeben werden müssen
export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Willkommen bei aquilliance',
    subline: 'Ihr HubSpot Partner',
    image: { src: 'https://placehold.co/800x400', alt: 'Hero Bild', width: 800, height: 400 },
  },
});

// Mehrere Varianten möglich
export const OhneSubline = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Nur Headline',
    subline: '',
    image: { src: 'https://placehold.co/800x400', alt: 'Hero Bild', width: 800, height: 400 },
  },
});
```

### Wichtig: fieldValues vollständig befüllen

`moduleStory` füllt **nicht automatisch** die Standardwerte aus den Feld-Definitionen. Alle Felder die die Komponente intern verwendet müssen in `fieldValues` übergeben werden — sonst crasht die Story.

### Storybook Titel-Konventionen

```
'Sections/...'    → Module aus components/modules/sections/
'Elements/...'    → Module aus components/modules/elements/
'Navigation/...'  → Module aus components/modules/navigation/
'Partials/...'    → Komponenten aus components/partials/
'UI/...'          → Komponenten aus components/ui/
```

---

## Linting & Formatting

### ESLint — TypeScript/React

Prüft alle `.ts` und `.tsx` Dateien in `components/` auf Typfehler und React-Regeln:

```bash
# Aus dem Projekt-Root
npm run lint
```

Konfiguration liegt in [src/theme/my-theme/eslint.config.js](../src/theme/my-theme/eslint.config.js). Aktive Plugins:

| Plugin | Zweck |
|---|---|
| `@typescript-eslint` | TypeScript-Regeln |
| `eslint-plugin-react` | React-Regeln (JSX, Props) |
| `eslint-plugin-react-hooks` | Regeln für Hooks |

> `@typescript-eslint/no-explicit-any` ist bewusst deaktiviert — HubSpot-Felder werden mit `any` typisiert.

### Prettier — Formatierung

Prüft Formatierung aller Dateien inkl. `.hubl.html` Templates:

```bash
npm run prettier
```

Das Paket `@hubspot/prettier-plugin-hubl` im Root ermöglicht das Formatieren von HubSpot-spezifischer HUBL-Syntax.

### Übersicht aller Scripts

| Befehl | Wo | Was es tut |
|---|---|---|
| `npm run start` | Root | Dev Server + Storybook starten |
| `npm run lint` | Root | ESLint über alle Komponenten |
| `npm run prettier` | Root | Format-Check inkl. HUBL |
| `npm run test` | Root oder Theme | Vitest Unit-Tests ausführen |
| `npm run deploy` | Root | Build + Upload zu HubSpot |

---

## Auf HubSpot deployen

```bash
# Aus dem Projekt-Root
npm run deploy
```

Dies führt `hs project upload` aus, baut das Projekt und lädt es in den verbundenen HubSpot-Account hoch. HubSpot deployed automatisch nach einem erfolgreichen Build.

Nach dem Upload unter HubSpot öffnen:

```bash
npx hs project open
```

Oder in HubSpot: **CRM Development → Projects → aquilliance HubSpot Theme**

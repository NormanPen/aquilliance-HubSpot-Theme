# aquilliance HubSpot Theme

Ein HubSpot CMS React Theme für aquilliance, entwickelt auf Basis von HubSpots offiziellem CMS React Framework.

## Tech Stack

| Technologie | Verwendung |
|---|---|
| [HubSpot CMS React](https://developers.hubspot.com/docs/cms/guides/cms-react-overview) | Framework für Module und Partials |
| [React 18](https://react.dev) | UI-Komponenten |
| [TypeScript](https://www.typescriptlang.org) | Typsicherheit |
| [Tailwind CSS v4](https://tailwindcss.com/docs) | Styling-Utility-Classes |
| [Storybook](https://storybook.js.org) | Komponenten-Dokumentation & visuelle Vorschau |
| [Vitest](https://vitest.dev) | Unit- und Komponenten-Tests |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Komponenten-Testing |

## Schnellstart

```bash
# 1. Repository klonen
git clone https://github.com/NormanPen/aquilliance-HubSpot-Theme.git
cd aquilliance-HubSpot-Theme

# 2. Root-Abhängigkeiten installieren
npm install

# 3. Theme-Abhängigkeiten installieren
cd src/theme/my-theme && npm install && cd ../../..

# 4. Mit HubSpot-Account verbinden (einmalig)
npx hs auth

# 5. Entwicklungsserver starten
npm run start
```

Nach dem Start:
- **Dev Server** → [http://hslocal.net:3000](http://hslocal.net:3000)
- **Storybook** → [http://localhost:3123](http://localhost:3123)

> **Hinweis:** `hslocal.net` muss einmalig in der Hosts-Datei eingetragen werden.  
> Siehe [Setup-Dokumentation](docs/setup.md#hslocal-net-konfigurieren).

## Dokumentation

| Dokument | Inhalt |
|---|---|
| [Setup](docs/setup.md) | Installation, HubSpot CLI, Account verbinden |
| [Entwicklung](docs/development.md) | Dev Server, Storybook, Hot Reload |
| [Styling](docs/styling.md) | Tailwind CSS, ThemeProvider, Design Tokens |
| [Module & Partials](docs/modules.md) | Struktur, neue Komponenten erstellen |
| [Testing](docs/testing.md) | Vitest, React Testing Library, Storybook |

## Wichtige Befehle

```bash
npm run start        # Dev Server + Storybook starten
npm run deploy       # Theme auf HubSpot hochladen
npm test             # Tests ausführen (aus src/theme/my-theme/)
```

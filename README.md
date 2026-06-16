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

## Diese Basis-Vorlage für ein Kundenprojekt nutzen

Dieses Repo ist eine **wiederverwendbare Grundlage**: pro Kunde klonen, brandspezifisch anpassen,
dann mit Claude Code Designs schnell in Module/Templates umsetzen.

**Schritte beim Aufsetzen (oder per `/new-customer` von Claude erledigen lassen):**
1. **Brand-Farben & Schrift** in [`src/theme/my-theme/fields.json`](src/theme/my-theme/fields.json) setzen
   (`brand_primary`, `brand_accent`, `base_font`) — und die Default-Fallbacks in
   [`styles/theme/colors.css`](src/theme/my-theme/styles/theme/colors.css) /
   [`templates/layouts/base.hubl.html`](src/theme/my-theme/templates/layouts/base.hubl.html).
2. **Hero-/Footer-Defaults** (Texte, Firmenname, Copyright) an den Kunden anpassen.
3. **Nicht benötigte Starter-Module** löschen (siehe unten) — sie sind Beispiele, kein Pflichtinventar.
4. Designs umsetzen: `/implement-design <Figma-Link|Bild>` oder `/create-module <Name>`.

## Komponenten-Bibliothek

**UI-Primitives** (`components/ui/`) — wiederverwendbare Bausteine, die Module statt Inline-Klassen nutzen:

| Primitive | Zweck |
|---|---|
| `Section` | Vollbreite Sektion mit Token-Hintergrund (`white`/`gray`/`accent`/`primary`) + vertikalem Padding |
| `Container` | Zentrierter Wrapper mit Maximalbreite (`sm`/`md`/`lg`/`full`) |
| `Heading` | `h1`–`h6` mit responsiver, token-basierter Größe |
| `Text` | Absatz mit Größen + gedämpfter Variante |
| `Button` | Link-Button (CTA) mit Varianten (`primary`/`secondary`/`outline`/`ghost`) |

Import in Modulen: `import { Section, Container, Heading, Text, Button } from '../../ui/index.js';`

**Starter-Module** (`components/modules/`) — fertige Sektionen als Ausgangspunkt:

| Modul | Beschreibung |
|---|---|
| `Header` / `Footer` | Globale Navigation & Fußbereich |
| `HeroSection` | Hero mit Überschrift, Subline, CTA, Ausrichtung |
| `FeatureGrid` | Feature-Raster mit Repeater + Spaltenwahl |
| `CtaBanner` | Aufmerksamkeits-Banner mit Button |
| `Testimonials` | Kundenstimmen-Raster (Repeater) |
| `RichMediaSection` | Text + Bild, Layout links/rechts (Rich-Text) |
| `FaqAccordion` | Aufklappbare FAQ (interaktive Island) |

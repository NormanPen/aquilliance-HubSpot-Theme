# Setup

## Voraussetzungen

- **Node.js 20+** — empfohlen via [nvm](https://github.com/nvm-sh/nvm) oder [Homebrew](https://brew.sh)
- **HubSpot-Account** — empfohlen: ein [CMS Sandbox-Account](https://developers.hubspot.com/docs/cms/developer-reference/developer-test-accounts) für sichere Iteration
- Grundkenntnisse in React und der Kommandozeile

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/NormanPen/aquilliance-HubSpot-Theme.git
cd aquilliance-HubSpot-Theme
```

### 2. Abhängigkeiten installieren

```bash
# Root-Level (ESLint, Prettier, HubSpot CLI)
npm install

# Theme-Level (Tailwind, React, Vitest etc.)
cd src/theme/my-theme
npm install
cd ../../..
```

### 3. HubSpot CLI installieren und authentifizieren

Falls der HubSpot CLI noch nicht global installiert ist:

```bash
npm install -g @hubspot/cli
```

Account verbinden:

```bash
npx hs auth
```

Der CLI fordert deinen **Personal Access Key** an:

1. Gehe in deinem HubSpot-Account zu **Einstellungen → Integrationen → Private Apps / Personal Access Keys**
2. Klicke **Personal Access Key generieren**
3. Stelle sicher, dass alle relevanten Berechtigungen ausgewählt sind
4. Klicke **Generieren**, dann **Anzeigen → Kopieren**
5. Füge den Key in das Terminal ein

Nach erfolgreicher Authentifizierung wird eine Konfigurationsdatei unter `~/.hscli/config.yml` erstellt.

---

## hslocal.net konfigurieren

Der HubSpot Dev Server läuft unter `hslocal.net:3000` statt `localhost:3000`. Damit der Browser diesen Hostnamen auflösen kann, muss einmalig ein Eintrag in der Hosts-Datei gesetzt werden.

**macOS / Linux:**

```bash
sudo sh -c 'echo "127.0.0.1 hslocal.net" >> /etc/hosts'
```

Danach ist [http://hslocal.net:3000](http://hslocal.net:3000) im Browser erreichbar und Assets wie Bilder und SVGs werden korrekt geladen.

---

## Projektstruktur

```
aquilliance-HubSpot-Theme/
├── hsproject.json                  # HubSpot Projektkonfiguration
├── package.json                    # Root-Scripts (start, deploy)
├── docs/                           # Diese Dokumentation
└── src/
    └── theme/
        └── my-theme/
            ├── assets/             # Statische Assets (SVGs, Bilder)
            ├── components/
            │   ├── modules/
            │   │   ├── sections/   # Vollflächige Sektions-Module
            │   │   ├── elements/   # Kleinere wiederverwendbare Module
            │   │   └── navigation/ # Header/Footer-Module
            │   ├── partials/       # React-Partials (Header, Footer)
            │   ├── islands/        # Client-seitige interaktive Komponenten
            │   ├── ui/             # Reine React-Bausteine ohne HubSpot-Felder
            │   └── shared/         # Provider, Hooks, Utilities
            ├── styles/
            │   ├── tailwind.css    # Tailwind Einstiegspunkt
            │   ├── global.css      # Statische globale Styles
            │   └── theme/          # Design Tokens (colors, typography…)
            ├── templates/
            │   ├── layouts/
            │   │   └── base.hubl.html
            │   └── *.hubl.html     # Seitentemplates
            ├── fields.json         # Globale Theme-Felder
            ├── theme.json          # Theme-Metadaten
            └── package.json
```

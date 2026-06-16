# Visuelles Testen mit Playwright & Claude Code

Dieses Repo bringt einen **Headless-Browser** mit, den Claude Code direkt nutzen kann, um
Module **echt im Browser** abzunehmen — Screenshots, Konsolenfehler, Interaktivität (Islands).
Das ergänzt Lint/Vitest, die nur Code, nicht das gerenderte Ergebnis prüfen.

## Was ist eingerichtet?

- **`.mcp.json`** (im Repo, committet) registriert den projekt-scoped **Playwright-MCP-Server**.
  Jeder Klon bekommt die Fähigkeit automatisch — nichts global installieren.
- Open Source (Microsoft), **gratis, kein Konto**, läuft komplett lokal. Schickt nichts an externe Server.
- Screenshots landen in `.playwright-mcp/` — **ge-gitignored** (Wegwerf-Artefakte).

> **Muss ich den MCP-Server manuell starten? Nein.** Claude Code liest beim Start `.mcp.json`
> und startet den Playwright-Server selbst (via `npx @playwright/mcp@latest`). Das ist **unabhängig**
> von `npm run start` (das ist der HubSpot-Dev-Server/Storybook). Du startest also nichts von Hand —
> du bestätigst beim ersten Mal nur das Vertrauen und startest Claude Code einmal neu (siehe unten).

## Einmalige Einrichtung pro Entwickler/Klon

1. Repo klonen, `npm install` (Root) + `cd src/theme/my-theme && npm install`.
2. Claude Code im Projekt öffnen. Beim ersten Start fragt es, ob dem MCP-Server aus `.mcp.json`
   **vertraut** werden soll → **bestätigen**.
3. **Claude Code vollständig neu starten** (Fenster/Prozess schließen, neu öffnen — kein bloßer
   Reconnect). Erst dann kennt Claude die `browser_*`-Tools.
4. Der erste Browser-Lauf lädt **Chromium (~93 MB, einmalig)** herunter.
5. Prüfen mit `/mcp` → `playwright` sollte „connected" sein.

## Nutzung

Dev-Server starten (liefert Storybook auf 3123 + Dev-Server auf 3000):

```bash
npm run start
```

Dann Claude bitten, z.B.:

- **„mach die visuelle Abnahme von HeroSection"** → Claude öffnet die Story/Preview, screenshotet,
  prüft die Konsole und berichtet.
- Slash-Command: **`/visual-check <ModulName>`** (oder „alle").

### Zwei Render-Oberflächen

| Oberfläche | URL | Wofür |
|---|---|---|
| Storybook-Story | `http://localhost:3123/iframe.html?id=sections-<modul-klein>--<variante>&viewMode=story` | Alle Feld-Varianten einer Komponente |
| SSR-Preview | `http://hslocal.net:3000/preview/module/<ModulName>` | Produktionsnah, server-gerendert |

Story-IDs auflisten: `curl -s http://localhost:3123/index.json`.

## Der Workflow: Figma → Modul → Test

1. **`/implement-design <Figma-Link>`** — Claude liest das Design über den **Figma-MCP-Server**
   (`get_design_context` / `get_screenshot`) und erstellt die Module (mit UI-Primitives).
2. **`/visual-check`** läuft als Abschluss automatisch mit: Claude rendert das Modul im Browser
   und gleicht es gegen das Figma-Original ab.
3. Abweichungen (Abstände, Farben, Layout) bessert Claude nach und prüft erneut — bis es passt.

So entsteht ein geschlossener Loop: **Design rein, getestetes HubSpot-Modul raus.**

## Bekannte Grenzen (kein Bug)

- `<RichText fieldPath>` rendert **nicht in Storybook** (Feld bleibt leer) — in der SSR-Preview/live
  aber korrekt. Für Rich-Text-Module die SSR-Preview nutzen.
- Repeater zeigen in der nackten SSR-Preview nur `occurrence.min` Items; die vollständige Liste
  steht in den Storybook-Stories (die explizite Arrays übergeben).
- Story-Imports brauchen **echte Extension** (`.tsx`), nicht `.js` — sonst „Failed to fetch
  dynamically imported module".
- Harmlose Konsolen-Meldungen: `favicon.ico 404`, `Failed to resolve module specifier
  "@hubspot/cms-components/config"`.

## Version pinnen (optional)

`.mcp.json` nutzt `@playwright/mcp@latest`. Für reproduzierbare Stände über Teams/Zeit kann man
auf eine feste Version pinnen, z.B. `"@playwright/mcp@0.0.76"`.

Nimm Module visuell im Browser ab (Playwright MCP). Ziel: $ARGUMENTS
(z.B. ein Modulname wie „HeroSection", mehrere, oder „alle".) Ohne Argument: alle geänderten/neuen Module.

Dieser Skill rendert Module echt im Browser, macht Screenshots, prüft die Konsole und testet
Interaktivität — die Ebene, die Lint/Test/tsc NICHT abdecken.

## Voraussetzung: Playwright MCP
Die `browser_*`-Tools kommen vom projekt-scoped Playwright-MCP-Server (`.mcp.json`).
- Beim ersten Mal pro Klon: Claude Code fragt, ob dem Server vertraut wird → bestätigen, dann
  **Claude Code vollständig neu starten** (nicht nur reconnecten), damit die Tools im Registry sind.
- Tools bei Bedarf laden: `ToolSearch` mit `select:mcp__playwright__browser_navigate,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_console_messages,mcp__playwright__browser_click,mcp__playwright__browser_resize`.

## Ablauf

1. **Dev-Server sicherstellen.**
   - Prüfen: `curl -s -o /dev/null -w '%{http_code}' http://localhost:3123/index.json` (Storybook) und `http://hslocal.net:3000/` (Dev-Server).
   - Wenn nicht 200: `cd src/theme/my-theme && npm run start` im Hintergrund starten und warten, bis `localhost:3123/index.json` 200 liefert (Build dauert ~10–60s). Läuft schon einer (Ports belegt) → den nutzen, keinen zweiten starten.

2. **Story-IDs holen** (exakte Schreibweise): `curl -s http://localhost:3123/index.json` → Keys wie `sections-herosection--default`. Format: `sections-<modulname-klein>--<variante>`.

3. **Viewport setzen**: `browser_resize` 1280×900 (Desktop). Für Responsive-Check zusätzlich 390×844 (Mobile).

4. **Rendern — zwei Oberflächen, je nach Zweck:**
   - **Storybook** (Komponenten-Vorschau, alle Varianten): `http://localhost:3123/iframe.html?id=<story-id>&viewMode=story`
   - **SSR-Preview** (produktionsnah, server-gerendert): `http://hslocal.net:3000/preview/module/<ModulName>`
   - `browser_navigate` → `browser_take_screenshot` (filename z.B. `<modul>.png`) → das PNG mit `Read` ansehen und das Layout bewerten.

5. **Konsole prüfen**: `browser_console_messages` (level error). **Harmlos ignorieren**: `favicon.ico 404` und `Failed to resolve module specifier "@hubspot/cms-components/config"` (Storybook-Eigenheit). Alles andere ist relevant.

6. **Interaktivität testen** (bei Islands, z.B. Akkordeon/Tabs/Menü): `browser_click` auf das Element, dann erneut Screenshot — prüfen ob sich der Zustand ändert (auf-/zuklappen, Overlay etc.).

7. **Berichten**: pro Modul kurz „passt / Problem + Screenshot-Beobachtung". Gefundene Bugs direkt fixen und erneut prüfen.

## Bekannte Grenzen (kein Bug)
- `<RichText fieldPath>` rendert **nicht in Storybook** (Feld leer), in der SSR-Preview/live aber schon → für Rich-Text-Module die SSR-Preview nutzen.
- Repeater zeigen in der nackten SSR-Preview nur `occurrence.min` Items; volle Item-Listen in den Storybook-Stories (die explizite Arrays übergeben).
- Story-Imports brauchen **echte Extension** (`.tsx`), nicht `.js` — sonst „Failed to fetch dynamically imported module".

## Aufräumen
Screenshots landen in `.playwright-mcp/` bzw. im Theme-Ordner — sind ge-gitignored, müssen nicht eingecheckt werden. Nach der Abnahme `browser_close`.

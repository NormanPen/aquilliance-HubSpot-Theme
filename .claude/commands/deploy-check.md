Führe einen Pre-Deploy-Check durch. Prüfe alle häufigen Build-Fehler bevor `npm run deploy` ausgeführt wird.

Prüfe folgende Punkte und berichte das Ergebnis:

---

## 1. Tailwind-Pakete in `dependencies` (nicht `devDependencies`)

Lies `src/theme/my-theme/package.json` und prüfe ob folgende Pakete in `dependencies` stehen:
- `@tailwindcss/postcss`
- `tailwindcss`
- `postcss`

**Warum:** HubSpot's Cloud-Build läuft `npm install --omit=dev` — devDependencies werden nicht installiert. Fehler: `Cannot find module '@tailwindcss/postcss'`

---

## 2. Keine Unterordner in `components/modules/`

Liste den Inhalt von `src/theme/my-theme/components/modules/`. Prüfe ob es Unterordner gibt die selbst KEINE `index.tsx` haben (leere Kategorieordner wie `sections/`, `elements/`).

**Warum:** Der Dev Server versucht Unterordner als Module zu laden → `EISDIR: illegal operation on a directory`

---

## 3. `.js`-Extension bei relativen Imports

Suche in allen `.tsx`-Dateien unter `src/theme/my-theme/components/` nach relativen Imports ohne `.js`:
```bash
grep -r "from '\.\." src/theme/my-theme/components/ | grep -v "\.js'"
```

**Warum:** `moduleResolution: "Node16"` + `"type": "module"` erfordert explizite Dateiendungen.

---

## 4. `fields.json` ist valides JSON

Prüfe ob `src/theme/my-theme/fields.json` valides JSON ist:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/theme/my-theme/fields.json', 'utf8'))"
```

---

## 5. ESLint ohne Fehler

Führe aus: `cd src/theme/my-theme && npx eslint components/`

---

## 6. Alle Modul-Exporte korrekt

Prüfe ob alle Dateien unter `components/modules/*/index.tsx` folgende Exporte haben:
- `export function Component`
- `export const fields`
- `export const meta`

Prüfe ob alle Dateien unter `components/partials/*/index.tsx` einen `export default function` haben.

---

## Zusammenfassung

Gib am Ende eine klare Liste aus:
- ✅ Alles in Ordnung
- ❌ Problem gefunden: [Beschreibung + Datei + Fix-Anleitung]

Wenn Probleme gefunden wurden: frage ob sie direkt behoben werden sollen.

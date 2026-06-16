Richte diese Basis-Vorlage für ein neues Kundenprojekt ein. Kundeninfos (optional): $ARGUMENTS

Frage zuerst nach allem, was für die Anpassung fehlt (Firmenname, Primär-/Akzentfarbe als Hex,
Schriftart, ggf. Logo-URL), falls nicht in $ARGUMENTS enthalten. Dann arbeite diese Checkliste ab:

## 1. Brand-Farben & Schrift
- [ ] `src/theme/my-theme/fields.json` → `group_colors.brand_primary.default.color` und
      `group_colors.brand_accent.default.color` auf die Kundenfarben setzen.
- [ ] `group_fonts.base_font.default` (font, font_set, google_font_variants) auf die Kundenschrift.
- [ ] Fallback-Defaults synchron halten in:
      - `src/theme/my-theme/styles/theme/colors.css` (`--color-aq-primary`, `--color-aq-accent`)
      - `src/theme/my-theme/templates/layouts/base.hubl.html` (die `default(...)`-Werte im `<style>`)
      - `src/theme/my-theme/styles/theme/typography.css` (`--font-sans`)

## 2. Inhalts-Defaults neutralisieren/anpassen
- [ ] `components/modules/HeroSection/index.tsx` — Default-Texte auf den Kunden.
- [ ] `components/modules/Footer/index.tsx` — `company_name`, `tagline`, `copyright`.
- [ ] Logo: im HubSpot-Editor setzen (Header nutzt `LogoField`, erbt aus Brand-Settings).

## 3. Aufräumen
- [ ] Nicht benötigte Starter-Module löschen (Ordner + `.stories.jsx`):
      `FeatureGrid`, `CtaBanner`, `Testimonials`, `RichMediaSection`, `FaqAccordion`.
      Beim Löschen von `FaqAccordion` auch `components/islands/FaqList.tsx` entfernen.
- [ ] `DndTestBlock` entfernen, wenn das Grid nicht mehr getestet wird.
- [ ] `templates/page.hubl.html` → `dnd_area` auf die tatsächlich genutzten Module anpassen.
- [ ] Gelöschte Module aus `templates/*.hubl.html` und `dnd_module`-Includes entfernen.

## 4. Projekt-Metadaten
- [ ] `README.md` (Root) Titel/Beschreibung auf den Kunden.
- [ ] Ggf. `src/theme/my-theme/package.json` `name`/`description`.

## 5. Verifizieren
- [ ] `cd src/theme/my-theme && npm run lint && npm test`
- [ ] `/deploy-check` ausführen.

Zeige am Ende eine Zusammenfassung der Änderungen. Lösche nichts ohne kurze Bestätigung,
wenn unklar ist, welche Starter-Module der Kunde braucht.

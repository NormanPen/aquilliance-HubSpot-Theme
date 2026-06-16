Hilf mir mit Tailwind CSS v4 Design Tokens für dieses Projekt: $ARGUMENTS

## Tailwind v4 — Grundprinzip

Tokens werden als CSS Custom Properties in `@theme {}` Blöcken definiert. Tailwind generiert daraus automatisch Utility-Klassen. Kein `tailwind.config.js` — alles läuft über CSS.

```css
@theme {
  --color-brand: #ff7a59;   /* → bg-brand, text-brand, border-brand */
  --font-display: 'Playfair Display', serif;  /* → font-display */
  --animate-bounce-in: bounce-in 0.3s ease;   /* → animate-bounce-in */
}
```

---

## Welche Datei für welchen Token?

| Token-Typ | Datei | Naming |
|---|---|---|
| Farben | `src/theme/my-theme/styles/theme/colors.css` | `--color-aq-*` |
| Schriftarten, -größen, -gewichte | `src/theme/my-theme/styles/theme/typography.css` | `--font-*`, `--text-*`, `--font-weight-*`, `--leading-*` |
| Schatten | `src/theme/my-theme/styles/theme/shadows.css` | `--shadow-*` |
| Animationen | `src/theme/my-theme/styles/theme/animations.css` | `--animate-*` |

Alle Dateien werden über `src/theme/my-theme/styles/tailwind.css` importiert.

---

## Farben hinzufügen (`colors.css`)

```css
@theme {
  /* Bestehende Tokens behalten */
  --color-aq-primary: #ff7a59;
  --color-aq-accent: #2d3e50;

  /* Neu hinzufügen */
  --color-aq-secondary: #6366f1;
  --color-aq-success: #22c55e;
  --color-aq-warning: #f59e0b;
}
```

Tailwind-Klassen: `bg-aq-secondary`, `text-aq-secondary`, `border-aq-secondary`, `hover:bg-aq-secondary`

---

## Typografie hinzufügen (`typography.css`)

```css
@theme {
  /* Schriftfamilien */
  --font-display: 'Playfair Display', ui-serif, serif;

  /* Schriftgrößen */
  --text-hero: 4rem;        /* → text-hero */
  --text-display: 3rem;     /* → text-display */

  /* Schriftgewichte */
  --font-weight-black: 900; /* → font-black */

  /* Zeilenhöhen */
  --leading-loose: 2;       /* → leading-loose */
}
```

---

## Animationen hinzufügen (`animations.css`)

Immer erst `@keyframes` definieren, dann in `@theme` referenzieren:

```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@theme {
  --animate-scale-in: scale-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.4s ease-out;
}
```

Tailwind-Klassen: `animate-scale-in`, `animate-slide-up`

---

## Schatten hinzufügen (`shadows.css`)

```css
@theme {
  --shadow-card: 0 2px 8px 0 rgb(0 0 0 / 0.08);
  --shadow-elevated: 0 8px 32px 0 rgb(0 0 0 / 0.16);
}
```

Tailwind-Klassen: `shadow-card`, `shadow-elevated`

---

## Wichtig: ThemeProvider-Farben

Farben die durch `hublParameters` (globale Theme-Settings) überschreibbar sein sollen, müssen zusätzlich im ThemeProvider eingetragen werden. Siehe `/add-theme-field` Skill.

Statische Projektfarben (nicht editierbar) brauchen nur den `@theme`-Eintrag in `colors.css`.

---

Führe die gewünschten Änderungen direkt aus. Lies die betroffene Datei zuerst und ergänze den `@theme`-Block.

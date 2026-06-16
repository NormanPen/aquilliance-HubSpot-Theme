# Referenz: HubSpot cms-react Beispiele

Eingecheckter Schnappschuss der offiziellen Beispiele aus
https://github.com/HubSpot/cms-react/tree/main/examples (Lizenz: Apache 2.0, siehe `LICENSE`).

**Zweck:** Referenz-/Lernmaterial für cms-react-Patterns (Module, Islands,
Data-Fetching, Serverless, Styling, Routing). KEIN Build-Bestandteil des Themes —
wird nicht deployed, nicht gelintet, nicht gebaut.

⚠️ Generisches cms-react ≠ unser Setup (HubSpot Projects + Tailwind v4 +
Node16/`.js`-Imports). Als Vorlage abgleichen, nicht 1:1 kopieren.

## Aktualisieren

```bash
rm -rf /tmp/cms-react && git clone --depth 1 https://github.com/HubSpot/cms-react /tmp/cms-react
rm -rf reference/cms-react/examples && cp -R /tmp/cms-react/examples reference/cms-react/examples
cp /tmp/cms-react/LICENSE reference/cms-react/LICENSE
```

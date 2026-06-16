import { ModuleFields, TextField, ColorField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, subline, cta_label, cta_url, button_color } = fieldValues ?? {};
  const primaryColor = button_color?.color;

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <section className="w-full bg-aq-accent py-24 px-8 text-center">
        <h1 className="text-white text-5xl font-bold mb-4 font-sans">{headline}</h1>
        <p className="text-white/80 text-xl mb-10 font-sans">{subline}</p>
        <a
          href={cta_url ?? '#'}
          className="inline-block bg-aq-primary text-white px-8 py-3 rounded font-semibold no-underline font-sans"
          style={primaryColor ? { backgroundColor: primaryColor } : undefined}
        >
          {cta_label}
        </a>
      </section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      name="headline"
      label="Überschrift"
      default="Willkommen bei aquilliance"
    />
    <TextField
      name="subline"
      label="Subline"
      default="Ihr HubSpot Partner für digitales Wachstum"
    />
    <TextField
      name="cta_label"
      label="Button Text"
      default="Jetzt starten"
    />
    <TextField
      name="cta_url"
      label="Button URL"
      default="#"
    />
    <ColorField
      name="button_color"
      label="Button Farbe"
      inheritedValuePropertyValuePaths={{ color: 'theme.group_colors.brand_primary.color' }}
      default={{ color: '#ff7a59', opacity: 100 }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Hero Section',
};

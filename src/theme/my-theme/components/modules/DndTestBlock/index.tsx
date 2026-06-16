import { ModuleFields, ColorField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { bg_color } = fieldValues ?? {};
  const { color = '#e5e5e5', opacity = 100 } = bg_color ?? {};

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <div
        className="w-full "
        style={{
          backgroundColor: color,
          opacity: opacity / 100,
          height: '300px',
        }}
      />
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <ColorField name="bg_color" label="Hintergrundfarbe" default={{ color: '#e5e5e5', opacity: 100 }} />
  </ModuleFields>
);

export const meta = { label: 'DnD Test Block' };

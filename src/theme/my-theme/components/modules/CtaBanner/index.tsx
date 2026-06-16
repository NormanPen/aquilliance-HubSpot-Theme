import { ModuleFields, TextField, UrlField, ColorField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading, Text, Button } from '../../ui/index.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, text, cta_label, cta_url, bg_color } = fieldValues ?? {};
  const bg = bg_color?.color;

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section padding="lg" className="bg-aq-accent text-white" style={bg ? { backgroundColor: bg } : undefined}>
        <Container size="md">
          <div className="flex flex-col items-center text-center">
            <Heading level={2} className="mb-4 text-white">{headline}</Heading>
            {text && <Text size="lg" className="mb-8 max-w-2xl text-white/80">{text}</Text>}
            {cta_label && <Button href={cta_url?.href ?? '#'}>{cta_label}</Button>}
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Bereit loszulegen?" />
    <TextField name="text" label="Text" default="Sprechen Sie uns an — wir freuen uns auf Ihr Projekt." />
    <TextField name="cta_label" label="Button Text" default="Kontakt aufnehmen" />
    <UrlField name="cta_url" label="Button URL" supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'FILE']} default={{ href: '#', type: 'EXTERNAL' }} />
    <ColorField
      name="bg_color"
      label="Hintergrundfarbe"
      inheritedValuePropertyValuePaths={{ color: 'theme.group_colors.brand_accent.color' }}
      default={{ color: '#2d3e50', opacity: 100 }}
    />
  </ModuleFields>
);

export const meta = { label: 'CTA Banner' };

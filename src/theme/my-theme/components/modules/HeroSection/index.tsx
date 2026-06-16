import { ModuleFields, TextField, UrlField, ColorField, ChoiceField } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading, Text, Button } from '../../ui/index.js';

const alignMap: Record<string, string> = {
  center: 'text-center items-center',
  left: 'text-left items-start',
};

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, subline, cta_label, cta_url, button_color, align } = fieldValues ?? {};
  const primaryColor = button_color?.color;
  const alignClasses = alignMap[align] ?? alignMap.center;

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section bg="accent" padding="lg">
        <Container size="md">
          <div className={`flex flex-col ${alignClasses}`}>
            <Heading level={1} className="mb-4 text-white">{headline}</Heading>
            {subline && <Text size="xl" className="mb-10 max-w-2xl text-white/80">{subline}</Text>}
            {cta_label && (
              <Button
                href={cta_url?.href ?? '#'}
                style={primaryColor ? { backgroundColor: primaryColor } : undefined}
              >
                {cta_label}
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Ihre Überschrift hier" />
    <TextField name="subline" label="Subline" default="Ein kurzer, prägnanter Satz, der Ihr Angebot beschreibt." />
    <TextField name="cta_label" label="Button Text" default="Jetzt starten" />
    <UrlField name="cta_url" label="Button URL" supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'FILE']} default={{ href: '#', type: 'EXTERNAL' }} />
    <ChoiceField
      name="align"
      label="Ausrichtung"
      display="radio"
      default="center"
      choices={[['center', 'Mittig'], ['left', 'Linksbündig']]}
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

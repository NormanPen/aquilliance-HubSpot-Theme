import {
  ModuleFields,
  TextField,
  ImageField,
  ChoiceField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading, Text } from '../../ui/index.js';

// Spaltenklassen literal halten, damit Tailwind sie beim Scan findet.
const colClasses: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
};

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, subline, columns, features } = fieldValues ?? {};
  const items = features ?? [];
  const cols = colClasses[columns] ?? colClasses['3'];

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section bg="white" padding="lg">
        <Container>
          {headline && <Heading level={2} className="mb-4 text-center">{headline}</Heading>}
          {subline && <Text size="lg" muted className="mx-auto mb-12 max-w-2xl text-center">{subline}</Text>}
          <div className={`grid grid-cols-1 gap-10 ${cols}`}>
            {items.map((item: any, i: number) => {
              const { src, alt } = item?.icon ?? {};
              return (
                <div key={i} className="flex flex-col items-start">
                  {src && <img src={src} alt={alt || ''} className="mb-4 h-12 w-12 object-contain" />}
                  <Heading level={4} className="mb-2">{item?.title}</Heading>
                  <Text muted>{item?.text}</Text>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Was wir bieten" />
    <TextField name="subline" label="Subline" default="Eine kurze Einleitung zu den folgenden Punkten." />
    <ChoiceField
      name="columns"
      label="Spalten"
      display="radio"
      default="3"
      choices={[['2', '2 Spalten'], ['3', '3 Spalten'], ['4', '4 Spalten']]}
    />
    <RepeatedFieldGroup
      name="features"
      label="Features"
      occurrence={{ min: 1, max: 12 }}
      default={[
        { title: 'Schnell', text: 'In wenigen Minuten startklar.' },
        { title: 'Flexibel', text: 'Beliebig viele Einträge per Repeater.' },
        { title: 'Konsistent', text: 'Nutzt die geteilten UI-Primitives.' },
      ]}
    >
      <ImageField name="icon" label="Icon / Bild" resizable={true} default={{ src: '', alt: '', width: 0, height: 0 }} />
      <TextField name="title" label="Titel" default="Feature-Titel" />
      <TextField name="text" label="Beschreibung" default="Kurze Beschreibung des Features." />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = { label: 'Feature Grid' };

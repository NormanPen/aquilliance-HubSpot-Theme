import {
  ModuleFields,
  TextField,
  ImageField,
  RepeatedFieldGroup,
} from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading, Text } from '../../ui/index.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, testimonials } = fieldValues ?? {};
  const items = testimonials ?? [];

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section bg="gray" padding="lg">
        <Container>
          {headline && <Heading level={2} className="mb-12 text-center">{headline}</Heading>}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, i: number) => {
              const { src, alt } = item?.avatar ?? {};
              return (
                <figure key={i} className="flex h-full flex-col rounded-lg bg-aq-white p-8 shadow-sm">
                  <blockquote className="mb-6 flex-1">
                    <Text className="text-aq-gray-900">&bdquo;{item?.quote}&ldquo;</Text>
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    {src && <img src={src} alt={alt || ''} className="h-12 w-12 rounded-full object-cover" />}
                    <div>
                      <div className="font-sans font-semibold text-aq-gray-900">{item?.author}</div>
                      {item?.role && <Text size="sm" muted>{item.role}</Text>}
                    </div>
                  </figcaption>
                </figure>
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
    <TextField name="headline" label="Überschrift" default="Das sagen unsere Kunden" />
    <RepeatedFieldGroup name="testimonials" label="Stimmen" occurrence={{ min: 1, max: 12, default: 3 }}>
      <TextField name="quote" label="Zitat" default="Ein begeistertes Kundenzitat steht hier." />
      <TextField name="author" label="Name" default="Vorname Nachname" />
      <TextField name="role" label="Rolle / Firma" default="Position, Unternehmen" />
      <ImageField name="avatar" label="Foto" resizable={true} default={{ src: '', alt: '', width: 0, height: 0 }} />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = { label: 'Testimonials' };

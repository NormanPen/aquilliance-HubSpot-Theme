import { ModuleFields, TextField, RepeatedFieldGroup } from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading } from '../../ui/index.js';
import FaqList from '../../islands/FaqList?island';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, items } = fieldValues ?? {};
  // Nur serialisierbare Daten an die Island geben (kein JSX).
  const faqItems = (items ?? []).map((it: any) => ({ question: it?.question, answer: it?.answer }));

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section bg="white" padding="lg">
        <Container>
          {headline && <Heading level={2} className="mb-10 text-center">{headline}</Heading>}
          <Island module={FaqList} items={faqItems} hydrateOn="visible" wrapperTag="div" />
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Häufige Fragen" />
    <RepeatedFieldGroup
      name="items"
      label="Fragen"
      occurrence={{ min: 1, max: 20 }}
      default={[
        { question: 'Wie schnell bin ich startklar?', answer: 'In wenigen Minuten nach dem Klonen.' },
        { question: 'Kann ich eigene Module bauen?', answer: 'Ja — per /create-module oder /implement-design.' },
        { question: 'Ist das responsiv?', answer: 'Ja, alle Module nutzen die geteilten Primitives.' },
      ]}
    >
      <TextField name="question" label="Frage" default="Eine häufig gestellte Frage?" />
      <TextField name="answer" label="Antwort" default="Die passende Antwort darauf." />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = { label: 'FAQ Accordion' };

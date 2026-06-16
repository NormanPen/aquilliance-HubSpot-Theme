import {
  ModuleFields,
  TextField,
  RichTextField,
  ImageField,
  UrlField,
  ChoiceField,
} from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Heading, Button } from '../../ui/index.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { headline, image, layout, cta_label, cta_url } = fieldValues ?? {};
  const { src, alt } = image ?? {};
  const imageRight = layout !== 'image_left';

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section bg="white" padding="lg">
        <Container>
          <div className={`flex flex-col items-center gap-12 ${imageRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="flex-1">
              {headline && <Heading level={2} className="mb-4">{headline}</Heading>}
              <div className="font-sans leading-relaxed text-aq-gray-600">
                <RichText fieldPath="body" />
              </div>
              {cta_label && (
                <Button href={cta_url?.href ?? '#'} className="mt-6">{cta_label}</Button>
              )}
            </div>
            <div className="flex-1">
              {src && <img src={src} alt={alt || ''} className="w-full rounded-lg object-cover" />}
            </div>
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Überschrift" default="Über uns" />
    <RichTextField
      name="body"
      label="Text"
      default="<p>Beschreiben Sie hier Ihr Angebot. Dieser Bereich unterstützt <strong>Rich-Text</strong> mit Listen, Links und Formatierung.</p>"
    />
    <ImageField name="image" label="Bild" resizable={true} default={{ src: '', alt: '', width: 0, height: 0 }} />
    <ChoiceField
      name="layout"
      label="Bildposition"
      display="radio"
      default="image_right"
      choices={[['image_right', 'Bild rechts'], ['image_left', 'Bild links']]}
    />
    <TextField name="cta_label" label="Button Text (optional)" default="" />
    <UrlField name="cta_url" label="Button URL" supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'FILE']} default={{ href: '#', type: 'EXTERNAL' }} />
  </ModuleFields>
);

export const meta = { label: 'Rich Media Section' };

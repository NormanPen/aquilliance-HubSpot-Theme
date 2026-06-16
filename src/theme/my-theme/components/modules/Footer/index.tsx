import { ModuleFields, TextField, UrlField, RepeatedFieldGroup } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import { Section, Container, Text } from '../../ui/index.js';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { company_name, tagline, links, copyright } = fieldValues ?? {};
  const navLinks = links ?? [];

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <Section as="footer" bg="accent" padding="md">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div>
              <div className="font-sans text-xl font-bold text-white">{company_name || 'Unternehmen'}</div>
              {tagline && <Text size="sm" className="mt-1 text-white/70">{tagline}</Text>}
            </div>
            {navLinks.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navLinks.map((item: any, i: number) => (
                  <a
                    key={i}
                    href={item?.url?.href ?? '#'}
                    className="font-sans text-sm text-white/80 no-underline transition-colors hover:text-white"
                  >
                    {item?.link_text}
                  </a>
                ))}
              </nav>
            )}
          </div>
          <div className="mt-8 border-t border-white/15 pt-6 text-center">
            <Text size="sm" className="text-white/60">{copyright}</Text>
          </div>
        </Container>
      </Section>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="company_name" label="Firmenname" default="Unternehmen" />
    <TextField name="tagline" label="Tagline" default="Ein kurzer Claim." />
    <RepeatedFieldGroup
      name="links"
      label="Footer-Links"
      occurrence={{ min: 0, max: 12 }}
      default={[
        { link_text: 'Impressum', url: { href: '#', type: 'EXTERNAL' } },
        { link_text: 'Datenschutz', url: { href: '#', type: 'EXTERNAL' } },
        { link_text: 'Kontakt', url: { href: '#', type: 'EXTERNAL' } },
      ]}
    >
      <TextField name="link_text" label="Text" default="Link" />
      <UrlField name="url" label="URL" supportedTypes={['EXTERNAL', 'CONTENT', 'EMAIL_ADDRESS', 'FILE']} default={{ href: '#', type: 'EXTERNAL' }} />
    </RepeatedFieldGroup>
    <TextField name="copyright" label="Copyright" default="© 2025 Unternehmen. Alle Rechte vorbehalten." />
  </ModuleFields>
);

export const meta = {
  label: 'Footer',
  global: true,
};

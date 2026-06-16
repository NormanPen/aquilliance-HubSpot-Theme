import { ThemeProvider } from '../shared/ThemeProvider.js';
import { Section } from './Section.tsx';
import { Container } from './Container.tsx';
import { Heading } from './Heading.tsx';
import { Text } from './Text.tsx';
import { Button } from './Button.tsx';

// Plain-React-Stories (kein moduleStory — Primitives sind keine Module).
// ThemeProvider-Decorator lädt tailwind.css für die isolierte Vorschau.
export default {
  title: 'UI/Primitives',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Headings = () => (
  <Container>
    {[1, 2, 3, 4, 5, 6].map((l) => (
      <Heading key={l} level={l} className="mb-2">
        Überschrift H{l}
      </Heading>
    ))}
  </Container>
);

export const Texts = () => (
  <Container>
    <Text size="xl" className="mb-2">Text XL</Text>
    <Text size="lg" className="mb-2">Text LG</Text>
    <Text className="mb-2">Text Base</Text>
    <Text size="sm" muted>Text SM, gedämpft</Text>
  </Container>
);

export const Buttons = () => (
  <Container>
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline" className="text-aq-accent">Outline</Button>
      <Button variant="ghost" className="text-aq-accent">Ghost</Button>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  </Container>
);

export const SectionBackgrounds = () => (
  <>
    {['white', 'gray', 'accent', 'primary'].map((bg) => (
      <Section key={bg} bg={bg} padding="md">
        <Container>
          <Heading level={3}>Section bg=&quot;{bg}&quot;</Heading>
        </Container>
      </Section>
    ))}
  </>
);

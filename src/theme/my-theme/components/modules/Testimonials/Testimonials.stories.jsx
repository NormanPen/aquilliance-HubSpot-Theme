import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/Testimonials',
  component: Component,
};

const t = (quote, author, role) => ({
  quote,
  author,
  role,
  avatar: { src: '', alt: '', width: 0, height: 0 },
});

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Das sagen unsere Kunden',
    testimonials: [
      t('Schnelle Umsetzung, top Ergebnis.', 'Anna Becker', 'Marketing, Muster GmbH'),
      t('Genau das, was wir gesucht haben.', 'Tom Richter', 'CEO, Beispiel AG'),
      t('Klare Empfehlung.', 'Lisa Wagner', 'Produkt, Demo KG'),
    ],
  },
});

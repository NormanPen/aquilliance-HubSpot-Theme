import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/FeatureGrid',
  component: Component,
};

const feature = (title, text) => ({
  icon: { src: '', alt: '', width: 0, height: 0 },
  title,
  text,
});

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Was wir bieten',
    subline: 'Eine kurze Einleitung zu den folgenden Punkten.',
    columns: '3',
    features: [
      feature('Schnell', 'In wenigen Minuten startklar.'),
      feature('Flexibel', 'Beliebig viele Einträge per Repeater.'),
      feature('Konsistent', 'Nutzt die geteilten UI-Primitives.'),
    ],
  },
});

export const FourColumns = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Vier Spalten',
    subline: 'Spaltenanzahl über ein ChoiceField steuerbar.',
    columns: '4',
    features: [
      feature('Eins', 'Beschreibung eins.'),
      feature('Zwei', 'Beschreibung zwei.'),
      feature('Drei', 'Beschreibung drei.'),
      feature('Vier', 'Beschreibung vier.'),
    ],
  },
});

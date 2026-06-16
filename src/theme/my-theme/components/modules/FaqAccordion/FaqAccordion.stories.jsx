import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/FaqAccordion',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Häufige Fragen',
    items: [
      { question: 'Wie schnell bin ich startklar?', answer: 'In wenigen Minuten nach dem Klonen.' },
      { question: 'Kann ich eigene Module bauen?', answer: 'Ja — per /create-module oder /implement-design.' },
      { question: 'Ist das responsiv?', answer: 'Ja, alle Module nutzen die geteilten Primitives.' },
    ],
  },
});

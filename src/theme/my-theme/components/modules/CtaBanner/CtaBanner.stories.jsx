import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/CtaBanner',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Bereit loszulegen?',
    text: 'Sprechen Sie uns an — wir freuen uns auf Ihr Projekt.',
    cta_label: 'Kontakt aufnehmen',
    cta_url: { href: '#', type: 'EXTERNAL' },
    bg_color: { color: '#2d3e50', opacity: 100 },
  },
});

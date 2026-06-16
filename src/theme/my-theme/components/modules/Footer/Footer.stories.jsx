import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Navigation/Footer',
  component: Component,
};

const link = (label) => ({ link_text: label, url: { href: '#', type: 'EXTERNAL' } });

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    company_name: 'Unternehmen',
    tagline: 'Ein kurzer Claim.',
    links: [link('Impressum'), link('Datenschutz'), link('Kontakt')],
    copyright: '© 2025 Unternehmen. Alle Rechte vorbehalten.',
  },
});

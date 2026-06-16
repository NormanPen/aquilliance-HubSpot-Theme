import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/HeroSection',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Willkommen bei aquilliance',
    subline: 'Ihr HubSpot Partner für digitales Wachstum',
    cta_label: 'Jetzt starten',
    cta_url: '#',
  },
});

// Globale Styles überschrieben — testet ob hublParameters durchkommt
export const CustomColors = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Custom Theme Colors',
    subline: 'Primärfarbe: Grün — Akzentfarbe: Lila',
    cta_label: 'Button Test',
    cta_url: '#',
  },
  hublParameters: {
    brand_primary: { color: '#22c55e' },
    brand_accent: { color: '#7c3aed' },
  },
});

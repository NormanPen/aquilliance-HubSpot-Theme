import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/HeroSection',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Ihre Überschrift hier',
    subline: 'Ein kurzer, prägnanter Satz, der Ihr Angebot beschreibt.',
    cta_label: 'Jetzt starten',
    cta_url: { href: '#', type: 'EXTERNAL' },
    align: 'center',
    button_color: { color: '#ff7a59', opacity: 100 },
  },
});

export const LeftAligned = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Linksbündige Variante',
    subline: 'Dieselbe Komponente, andere Ausrichtung — gesteuert über ein ChoiceField.',
    cta_label: 'Mehr erfahren',
    cta_url: { href: '#', type: 'EXTERNAL' },
    align: 'left',
    button_color: { color: '#ff7a59', opacity: 100 },
  },
});

// Globale Styles überschrieben — testet ob hublParameters durchkommt
export const CustomColors = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Custom Theme Colors',
    subline: 'Primärfarbe: Grün — Akzentfarbe: Lila',
    cta_label: 'Button Test',
    cta_url: { href: '#', type: 'EXTERNAL' },
    align: 'center',
  },
  hublParameters: {
    brand_primary: { color: '#22c55e' },
    brand_accent: { color: '#7c3aed' },
  },
});

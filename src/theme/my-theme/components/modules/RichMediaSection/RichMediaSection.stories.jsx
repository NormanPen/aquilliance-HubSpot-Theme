import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Sections/RichMediaSection',
  component: Component,
};

const body =
  '<p>Beschreiben Sie hier Ihr Angebot. Dieser Bereich unterstützt <strong>Rich-Text</strong> mit Listen, Links und Formatierung.</p>';

export const ImageRight = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Über uns',
    body,
    image: { src: 'https://placehold.co/600x400', alt: 'Platzhalter', width: 600, height: 400 },
    layout: 'image_right',
    cta_label: 'Mehr erfahren',
    cta_url: { href: '#', type: 'EXTERNAL' },
  },
});

export const ImageLeft = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Bild links',
    body,
    image: { src: 'https://placehold.co/600x400', alt: 'Platzhalter', width: 600, height: 400 },
    layout: 'image_left',
    cta_label: '',
    cta_url: { href: '#', type: 'EXTERNAL' },
  },
});

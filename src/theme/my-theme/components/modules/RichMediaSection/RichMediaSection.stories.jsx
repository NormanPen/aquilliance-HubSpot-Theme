import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

// ⚠️ Hinweis: <RichText fieldPath="rich_text" /> rendert in Storybook NICHT (der Body
// bleibt leer). In der echten Dev-Server-Vorschau (/preview/module/) und live
// rendert er korrekt — bekannte Storybook-Grenze, kein Bug.

export default {
  title: 'Sections/RichMediaSection',
  component: Component,
};

const body =
  '<p>Beschreiben Sie hier Ihr Angebot. Dieser Bereich unterstützt <strong>Rich-Text</strong> mit Listen, Links und Formatierung.</p>';

export const ImageRight = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Über uns',
    rich_text: body,
    image: { src: 'https://placehold.co/600x400', alt: 'Platzhalter', width: 600, height: 400 },
    layout: 'image_right',
    cta_label: 'Mehr erfahren',
    cta_url: { href: '#', type: 'EXTERNAL' },
  },
});

export const ImageLeft = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Bild links',
    rich_text: body,
    image: { src: 'https://placehold.co/600x400', alt: 'Platzhalter', width: 600, height: 400 },
    layout: 'image_left',
    cta_label: '',
    cta_url: { href: '#', type: 'EXTERNAL' },
  },
});

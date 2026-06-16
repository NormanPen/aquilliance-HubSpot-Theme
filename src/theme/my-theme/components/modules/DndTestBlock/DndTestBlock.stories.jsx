import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';

export default {
  title: 'Elements/DndTestBlock',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    bg_color: { color: '#e5e5e5', opacity: 100 },
  },
});

export const Blue = moduleStory(Component, fields, {
  fieldValues: {
    bg_color: { color: '#3b82f6', opacity: 100 },
  },
});

export const SemiTransparent = moduleStory(Component, fields, {
  fieldValues: {
    bg_color: { color: '#ff7a59', opacity: 50 },
  },
});

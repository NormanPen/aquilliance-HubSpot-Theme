import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from './index.tsx';
import logo from '../../../assets/sprocket.svg';

export default {
  title: 'Demo/GettingStarted',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  fieldValues: {
    headline: 'Getting Started with CMS React',
    logo: { src: logo, alt: 'HubSpot logo', width: 100, height: 100 },
  },
});

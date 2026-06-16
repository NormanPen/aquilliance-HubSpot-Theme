import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Component as Header } from './index.js';

// useMenu/Island brauchen HubSpots Render-Context (in jsdom nicht vorhanden) → mocken
vi.mock('@hubspot/cms-components', () => ({
  Island: () => null,
  useMenu: () => null,
  fieldPath: (value: string) => ({ type: 'fieldPath', value }),
}));

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header fieldValues={{}} hublParameters={{}} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('shows the logo fallback when no logo is set', () => {
    render(<Header fieldValues={{}} hublParameters={{}} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});

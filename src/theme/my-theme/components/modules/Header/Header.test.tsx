import { render, screen } from '@testing-library/react';
import { Component as Header } from './index.js';

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header hublParameters={{}} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the header text', () => {
    render(<Header hublParameters={{}} />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

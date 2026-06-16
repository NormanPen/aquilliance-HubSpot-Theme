import { render, screen } from '@testing-library/react';
import Header from './index.js';

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the header text', () => {
    render(<Header />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

import { ReactNode } from 'react';
import '../../styles/tailwind.css';

interface ThemeProviderProps {
  children: ReactNode;
  hublParameters?: Record<string, any>;
}

export function ThemeProvider({ children, hublParameters }: ThemeProviderProps) {
  const primary = hublParameters?.brand_primary?.color;
  const accent = hublParameters?.brand_accent?.color;
  const font = hublParameters?.base_font?.font;
  const fallback = hublParameters?.base_font?.fallback ?? 'sans-serif';

  const overrides = [
    primary && `--color-aq-primary: ${primary};`,
    accent && `--color-aq-accent: ${accent};`,
    font && `--font-sans: '${font}', ${fallback};`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {overrides && <style>{`:root { ${overrides} }`}</style>}
      {children}
    </>
  );
}

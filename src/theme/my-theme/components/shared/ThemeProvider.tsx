import { ReactNode } from 'react';
import '../../styles/tailwind.css';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

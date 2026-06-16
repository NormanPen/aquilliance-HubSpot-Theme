import { ThemeProvider } from '../../shared/ThemeProvider.js';

export default function Header() {
  return (
    <ThemeProvider>
      <header className="w-full bg-[#2d3e50] px-8 py-4">
        <h1 className="text-white text-2xl font-sans m-0">Header</h1>
      </header>
    </ThemeProvider>
  );
}

export const meta = {
  label: 'Header',
};

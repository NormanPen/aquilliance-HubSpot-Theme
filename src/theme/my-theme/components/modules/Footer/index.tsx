import { ModuleFields } from '@hubspot/cms-components/fields';
import { ThemeProvider } from '../../shared/ThemeProvider.js';

export function Component({ hublParameters }: { hublParameters: any }) {
  return (
    <ThemeProvider hublParameters={hublParameters}>
      <footer className="w-full bg-[#2d3e50] px-8 py-4">
        <h1 className="text-white text-2xl font-sans m-0">Footer</h1>
      </footer>
    </ThemeProvider>
  );
}

export const fields = <ModuleFields />;

export const meta = {
  label: 'Footer',
};

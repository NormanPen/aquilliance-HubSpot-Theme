import { ModuleFields, LogoField, MenuField } from '@hubspot/cms-components/fields';
import { Island, useMenu, fieldPath } from '@hubspot/cms-components';
import { ThemeProvider } from '../../shared/ThemeProvider.js';
import MobileNav from '../../islands/MobileNav?island';

export function Component({ fieldValues, hublParameters }: { fieldValues: any; hublParameters: any }) {
  const { logo } = fieldValues ?? {};
  const { src, alt, width, height } = logo ?? {};

  const menu = useMenu(fieldPath('menu'));
  const items = menu?.pagesTree?.children ?? [];

  return (
    <ThemeProvider hublParameters={hublParameters}>
      <header className="w-full bg-aq-accent">
        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center px-6">
          {/* Burger-Menü links (nur Mobile) — KEIN transform am Wrapper,
              sonst wird das fixed-Overlay relativ zu ihm statt zum Viewport positioniert */}
          <Island
            module={MobileNav}
            items={items}
            hydrateOn="load"
            wrapperTag="div"
            wrapperClassName="absolute bottom-0 left-4 top-0 flex items-center md:hidden"
          />

          {/* Logo: mobil mittig, Desktop links */}
          <a
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center md:static md:left-auto md:translate-x-0"
          >
            {src ? (
              <img src={src} alt={alt || 'Logo'} width={width} height={height} className="h-10 w-auto" />
            ) : (
              <span className="text-xl font-bold text-white font-sans">Logo</span>
            )}
          </a>

          {/* Navigation mittig (Desktop) */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {items.map((item: any, i: number) => (
              <a
                key={i}
                href={item.url ?? '#'}
                target={item.linkTarget || undefined}
                className="text-white/90 font-sans transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </ThemeProvider>
  );
}

export const fields = (
  <ModuleFields>
    <LogoField name="logo" label="Logo" />
    <MenuField name="menu" label="Navigation" />
  </ModuleFields>
);
// Header hat Felder als children → kein children-Fehler. Footer (feldlos) braucht {null}.

export const meta = {
  label: 'Header',
  global: true,
};

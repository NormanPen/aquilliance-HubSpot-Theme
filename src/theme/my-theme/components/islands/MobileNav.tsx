import { useState } from 'react';

type MenuItem = {
  label?: string;
  url?: string;
  linkTarget?: string;
  children?: MenuItem[];
};

export default function MobileNav({ items = [] }: { items?: MenuItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 items-center justify-center text-white"
      >
        {open ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-aq-accent">
          {items.length === 0 && (
            <span className="text-xl text-white/60 font-sans">Kein Menü ausgewählt</span>
          )}
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url ?? '#'}
              target={item.linkTarget || undefined}
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold text-white/90 font-sans transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

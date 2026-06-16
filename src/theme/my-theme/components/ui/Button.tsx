import type { CSSProperties, ReactNode } from 'react';

const variants = {
  primary: 'bg-aq-primary text-white hover:opacity-90',
  secondary: 'bg-aq-accent text-white hover:opacity-90',
  outline: 'border border-current hover:bg-current/10',
  ghost: 'underline-offset-4 hover:underline',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  target?: string;
  className?: string;
  /** Nur für dynamische Werte (z.B. editierbare ColorField-Farbe). */
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Link-Button (rendert <a>) für CTAs. HubSpot-Module liefern meist eine URL,
 * daher anchor-basiert. Für echte <button>-Interaktion eine Island nutzen.
 */
export function Button({
  href = '#',
  variant = 'primary',
  size = 'md',
  target,
  className = '',
  style,
  children,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      className={`inline-block rounded-md font-sans font-semibold no-underline transition ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      style={style}
    >
      {children}
    </a>
  );
}

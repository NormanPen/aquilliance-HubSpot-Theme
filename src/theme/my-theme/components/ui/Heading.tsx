import type { ElementType, ReactNode } from 'react';

// Visuelle Größe pro Ebene. Token-basiert (text-*), responsiv.
const levelClasses: Record<number, string> = {
  1: 'text-4xl sm:text-5xl font-bold',
  2: 'text-3xl sm:text-4xl font-bold',
  3: 'text-2xl sm:text-3xl font-semibold',
  4: 'text-xl sm:text-2xl font-semibold',
  5: 'text-lg sm:text-xl font-semibold',
  6: 'text-base sm:text-lg font-semibold',
};

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Semantisches Tag überschreiben (z.B. visuell h2, semantisch h1). */
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

export function Heading({ level = 2, as, className = '', children }: HeadingProps) {
  const Tag = (as ?? (`h${level}` as ElementType)) as ElementType;
  return (
    <Tag className={`font-sans leading-tight ${levelClasses[level]} ${className}`.trim()}>{children}</Tag>
  );
}

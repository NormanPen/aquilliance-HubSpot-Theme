import type { CSSProperties, ElementType, ReactNode } from 'react';

const backgrounds = {
  none: '',
  white: 'bg-aq-white text-aq-gray-900',
  gray: 'bg-aq-gray-100 text-aq-gray-900',
  accent: 'bg-aq-accent text-white',
  primary: 'bg-aq-primary text-white',
};

const paddings = {
  none: '',
  sm: 'py-10 px-8',
  md: 'py-16 px-8',
  lg: 'py-24 px-8',
};

export type SectionProps = {
  as?: ElementType;
  bg?: keyof typeof backgrounds;
  padding?: keyof typeof paddings;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Vollbreite Sektion mit Token-Hintergrund + vertikalem Padding.
 * `style` nur für dynamische Werte (z.B. editierbare ColorField-Hintergründe).
 */
export function Section({
  as: Tag = 'section',
  bg = 'none',
  padding = 'lg',
  className = '',
  style,
  children,
}: SectionProps) {
  return (
    <Tag className={`w-full ${backgrounds[bg]} ${paddings[padding]} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

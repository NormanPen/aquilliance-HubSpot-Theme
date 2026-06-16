import type { ElementType, ReactNode } from 'react';

const sizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export type TextProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  /** Gedämpfte Sekundärfarbe (auf hellem Hintergrund). */
  muted?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Text({ as: Tag = 'p', size = 'base', muted = false, className = '', children }: TextProps) {
  return (
    <Tag className={`font-sans leading-relaxed ${sizes[size]} ${muted ? 'text-aq-gray-600' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

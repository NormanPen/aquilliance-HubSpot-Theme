import type { ElementType, ReactNode } from 'react';

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
};

export type ContainerProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  className?: string;
  children?: ReactNode;
};

/**
 * Zentrierter Inhalts-Wrapper mit Maximalbreite + horizontalem Padding.
 * Verwendung in Modulen: <Section><Container>…</Container></Section>
 */
export function Container({ as: Tag = 'div', size = 'lg', className = '', children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-6 ${sizes[size]} ${className}`.trim()}>{children}</Tag>
  );
}

import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  name: ReactNode;
}

export const Title = ({ name, className, ...attributes }: Props) => (
  <h1 className={className ? `section-title ${className}` : 'section-title'} {...attributes}>
    {name}
  </h1>
);

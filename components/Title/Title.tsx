import { ReactNode } from 'react';

import styles from './Title.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  name: ReactNode;
}

export const Title = ({ name, className, ...attributes }: Props) => (
  <h1
    className={className ? `${styles.sectionTitle} ${className}` : styles.sectionTitle}
    {...attributes}
  >
    {name}
  </h1>
);

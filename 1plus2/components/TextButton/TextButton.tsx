import React, { FC } from 'react';
import styles from './TextButton.module.css';

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const TextButton: FC<TextButtonProps> = ({ children, ...attributes }) => (
  <button className={styles.TextButton} data-testid="TextButton" type="button" {...attributes}>
    {children}
  </button>
);

export default TextButton;

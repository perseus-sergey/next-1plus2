import React, { FC } from 'react';
import styles from './KeyboardButton.module.css';

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({ children }) => (
  <button type="button" className={styles.KeyboardButton} data-testid="KeyboardButton">
    {children}
  </button>
);

export default KeyboardButton;

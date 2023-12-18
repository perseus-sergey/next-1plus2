'use client';

import { useEffect, useState } from 'react';
import styles from './KeyboardButton.module.scss';

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const keyInitStyle = {
  fontColor: styles.keyColorPink,
  bgColor: styles.keyBgColorYellow,
};

const generateRandomColor = (): string[] => {
  const keyColorStyles = [
    { fontColor: styles.keyColorYellow, bgColor: styles.keyBgColorYellow },
    { fontColor: styles.keyColorOrange, bgColor: styles.keyBgColorOrange },
    { fontColor: styles.keyColorBlue, bgColor: styles.keyBgColorBlue },
    { fontColor: styles.keyColorGreen, bgColor: styles.keyBgColorGreen },
    { fontColor: styles.keyColorPink, bgColor: styles.keyBgColorPink },
    { fontColor: styles.keyColorViolet, bgColor: styles.keyBgColorViolet },
  ];
  const arrLength = keyColorStyles.length;

  const colorIndx = Math.floor(Math.random() * arrLength);
  const bgColorIndx = Math.floor(Math.random() * arrLength);

  if (colorIndx === bgColorIndx) {
    return generateRandomColor();
  }
  return [keyColorStyles[colorIndx].fontColor, keyColorStyles[bgColorIndx].bgColor];
};

const KeyboardButton = ({ value }: KeyboardButtonProps) => {
  const [{ fontColor, bgColor }, setKeyStyle] = useState(keyInitStyle);
  useEffect(() => {
    const [fontColor, bgColor] = generateRandomColor();
    setKeyStyle({ fontColor, bgColor });
  }, []);

  return (
    <button
      type="button"
      value={value}
      style={{
        color: fontColor,
        backgroundImage: bgColor,
      }}
      className={styles.KeyboardButton}
      data-testid="KeyboardButton"
    >
      {value}
    </button>
  );
};

export default KeyboardButton;

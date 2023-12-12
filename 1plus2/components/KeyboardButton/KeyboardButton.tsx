import { Lobster } from 'next/font/google';
import React, { FC } from 'react';
import styles from './KeyboardButton.module.scss';

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const lobster = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
});

// const keyColorStyles = [
//   { fontColor: 'key-btn_color_blue', bgColor: 'key-btn_bgcolor_blue' },
//   { fontColor: 'key-btn_color_green', bgColor: 'key-btn_bgcolor_green' },
//   { fontColor: 'key-btn_color_yellow', bgColor: 'key-btn_bgcolor_yellow' },
//   { fontColor: 'key-btn_color_pink', bgColor: 'key-btn_bgcolor_pink' },
//   { fontColor: 'key-btn_color_violet', bgColor: 'key-btn_bgcolor_violet' },
//   { fontColor: 'key-btn_color_orange', bgColor: 'key-btn_bgcolor_orange' },
// ];

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

const KeyboardButton: FC<KeyboardButtonProps> = ({ children }) => {
  const [fontColor, bgColor] = generateRandomColor();

  return (
    <button
      type="button"
      style={{
        color: fontColor,
        backgroundImage: bgColor,
      }}
      className={`${styles.KeyboardButton} ${lobster.className}`}
      data-testid="KeyboardButton"
    >
      {children}
    </button>
  );
};

export default KeyboardButton;

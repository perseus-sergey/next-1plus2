'use client';

import { MouseEvent, Touch, TouchEvent, useEffect, useState } from 'react';
import styles from './KeyboardButton.module.scss';
import { useDragProvider } from '@/libs/context/DragProvider';

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  btnClickHandler?: (value: string) => void;
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

const KeyboardButton = ({ value, btnClickHandler }: KeyboardButtonProps) => {
  const [{ fontColor, bgColor }, setKeyStyle] = useState(keyInitStyle);
  const [movingEl, setMovingEl] = useState<HTMLElement | null>(null);
  const { setDraggedValue } = useDragProvider();

  useEffect(() => {
    const [fontColor, bgColor] = generateRandomColor();
    setKeyStyle({ fontColor, bgColor });
  }, []);

  const setMovingElemPosition = (e: MouseEvent | Touch) => {
    if (!movingEl) return;
    movingEl.style.position = 'fixed';
    movingEl.style.top = `${e.clientY - movingEl.clientHeight / 2}px`;
    movingEl.style.left = `${e.clientX - movingEl.clientWidth / 2}px`;
  };

  const moveStart = (e: MouseEvent | TouchEvent) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    el.style.zIndex = `${100}`;
    setMovingEl(el);
    setDraggedValue({ value });
  };

  const touchMove = (event: TouchEvent) => setMovingElemPosition(event.targetTouches[0]);

  const mouseMove = (event: MouseEvent<HTMLButtonElement>) => setMovingElemPosition(event);

  const moveEnd = () => {
    if (!movingEl) return;
    movingEl.style.left = '';
    movingEl.style.top = '';
    movingEl.style.height = '';
    movingEl.style.width = '';
    movingEl.style.position = '';
    movingEl.style.zIndex = '';

    setMovingEl(null);
  };

  return (
    <button
      type="button"
      value={value}
      onClick={btnClickHandler ? () => btnClickHandler(value) : () => {}}
      style={{
        color: fontColor,
        backgroundImage: bgColor,
      }}
      className={styles.KeyboardButton}
      data-testid="KeyboardButton"
      onMouseDown={(e) => moveStart(e)}
      onTouchStart={(e) => moveStart(e)}
      onMouseMove={(e) => mouseMove(e)}
      onTouchMove={(e) => touchMove(e)}
      onMouseUp={moveEnd}
      onTouchEnd={moveEnd}
      onDragStart={() => false}
    >
      {value}
    </button>
  );
};

export default KeyboardButton;

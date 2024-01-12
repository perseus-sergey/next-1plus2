'use client';

import React, { Touch, TouchEvent, useEffect, useReducer, useState } from 'react';
import styles from './KeyboardButton.module.scss';
import { useDragProvider } from '@/libs/context/DragProvider';
import { isOverDropZoneFn } from '@/libs/exercises/math';
import { addRemoveClassName } from '@/libs/utils';

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  btnClickHandler?: (value: string) => void;
  isDraggable?: boolean;
}

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

const addShakeClassReducer = (classNames: string[], isAddShake: boolean) =>
  addRemoveClassName(classNames, styles.shake, isAddShake);

const KeyboardButton = ({ value, btnClickHandler, isDraggable = false }: KeyboardButtonProps) => {
  const [movingEl, setMovingEl] = useState<HTMLElement | null>(null);
  const [elStyles, setElStyles] = useState({});
  const [classNames, addShakeClass] = useReducer(addShakeClassReducer, [styles.KeyboardButton]);

  const [elHalfLength, setElHalfLength] = useState({ halfWidth: 0, halfHeight: 0 });

  const { setDraggedValue, setIsOverDropZone, isOverDropZone, dropZoneRect, setIsDragging } =
    useDragProvider();

  useEffect(() => {
    const [fontColor, bgColor] = generateRandomColor();
    setElStyles((oldStyles) => ({
      ...oldStyles,
      color: fontColor,
      backgroundImage: bgColor,
    }));
  }, []);

  useEffect(() => {
    addShakeClass(isDraggable ? true : false);
  }, [isDraggable]);

  const setMovingElemPosition = (e: Touch) => {
    if (!movingEl) return;
    setElStyles((oldStyles) => ({
      ...oldStyles,
      position: 'absolute',
      top: `${e.pageY - elHalfLength.halfHeight}px`,
      left: `${e.pageX - elHalfLength.halfWidth}px`,
      opacity: isOverDropZone ? 0.2 : 1,
    }));

    const movingElRect = movingEl.getBoundingClientRect();
    if (!dropZoneRect || !movingElRect) return;
    setIsOverDropZone(isOverDropZoneFn(dropZoneRect, movingElRect));
    setIsDragging(true);
  };

  const moveStart = (e: TouchEvent) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    addShakeClass(false);

    setElHalfLength({ halfWidth: el.offsetWidth / 2, halfHeight: el.offsetHeight / 2 });
    setElStyles((oldStyles) => ({
      ...oldStyles,
      zIndex: `${100}`,
    }));
    setMovingEl(el);
    setDraggedValue(value);
  };

  const touchMove = (event: TouchEvent) => setMovingElemPosition(event.targetTouches[0]);

  const moveEnd = () => {
    if (!movingEl) return;

    addShakeClass(true);
    setElStyles((oldStyles) => ({
      ...oldStyles,
      left: '',
      top: '',
      height: '',
      width: '',
      position: '',
      opacity: '1',
      zIndex: '',
    }));
    setIsOverDropZone(false);
    setMovingEl(null);
    setDraggedValue('');
    setIsDragging(false);
  };

  return (
    <button
      type="button"
      value={value}
      onClick={btnClickHandler ? () => btnClickHandler(value) : () => {}}
      style={elStyles}
      className={classNames.join(' ')}
      data-testid="KeyboardButton"
      onTouchStart={isDraggable ? (e) => moveStart(e) : undefined}
      onTouchMove={isDraggable ? (e) => touchMove(e) : undefined}
      onTouchEnd={isDraggable ? moveEnd : undefined}
      onTouchCancel={isDraggable ? moveEnd : undefined}
      onDragStart={() => false}
    >
      {value}
    </button>
  );
};

export default React.memo(KeyboardButton);

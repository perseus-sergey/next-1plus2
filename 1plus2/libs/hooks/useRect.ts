import { useState, useRef, useEffect } from 'react';

type MutableRefObject<T> = {
  current: T;
};

type EventType = 'resize' | 'scroll';

const useEffectInEvent = (event: EventType, useCapture?: boolean, set?: () => void) => {
  useEffect(() => {
    if (set) {
      set();
      window.addEventListener(event, set, useCapture);

      return () => window.removeEventListener(event, set, useCapture);
    }
  }, []);
};

export const useRect = <T extends HTMLDivElement | null>(
  event: EventType = 'resize'
): [DOMRect | undefined, MutableRefObject<T | null>, number] => {
  const [rect, setRect] = useState<DOMRect>();

  const reference = useRef<T>(null);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const set = (): void => {
    setRect(reference.current?.getBoundingClientRect());
  };

  useEffectInEvent(event, true, set);
  const handleResize = () => {
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener(event, handleResize);
    return () => {
      window.removeEventListener(event, handleResize);
    };
  }, []);

  return [rect, reference, screenHeight];
};

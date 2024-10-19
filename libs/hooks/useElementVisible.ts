import { useState, useEffect, useRef } from 'react';

export const useElementVisible = (threshold = 0.2, delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement & HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Додаємо затримку перед появою елемента
          setTimeout(() => {
            setIsVisible(true);
            observer.disconnect();
          }, delay);
        } else {
          setIsVisible(false); // Якщо елемент зникає з поля зору, робимо його знову невидимим
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay]);

  return { ref, isVisible };
};

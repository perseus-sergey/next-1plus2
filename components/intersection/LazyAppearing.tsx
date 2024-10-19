'use client';

import { ReactNode } from 'react';

import { useElementVisible } from '@/libs/hooks/useElementVisible';

type TTransformDirection = 'bottom' | 'left' | 'right';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  transformDirection?: TTransformDirection;
}

const transformStyle: Record<TTransformDirection, { start: string; end: string }> = {
  bottom: {
    start: 'opacity-0 translate-y-12',
    end: 'opacity-100 translate-y-0',
  },
  right: {
    start: 'opacity-0 translate-x-12',
    end: 'opacity-100 translate-x-0',
  },
  left: {
    start: 'opacity-0 -translate-x-12',
    end: 'opacity-100 translate-x-0',
  },
};

const LazyAppearing = ({
  children,
  threshold = 0.1,
  delay = 0,
  transformDirection = 'bottom',
}: IProps) => {
  const { isVisible, ref } = useElementVisible(threshold, delay);

  return (
    <div
      data-testid="MathCategories"
      ref={ref}
      className={`transform transition duration-500 ${
        isVisible
          ? transformStyle[transformDirection].end
          : transformStyle[transformDirection].start
      }`}
    >
      {children}
    </div>
  );
};

export default LazyAppearing;

import { createArray, shuffleArray } from '@/libs/utils';

// => [n1, n2, res] => (10..90)+-10
export const setArrCompos = (maxN: number, quant = 10): number[][] =>
  shuffleArray(
    createArray(Math.min(quant, maxN)).reduce((acc, _, i) => [...acc, [maxN - i, i, maxN]], [])
  );

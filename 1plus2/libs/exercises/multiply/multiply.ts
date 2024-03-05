import { createNumArray, shuffleArray } from '@/libs/utils';

// => [n1, n2, res]
export const setArrMultiply = (num: number, quant = 10): number[][] =>
  shuffleArray(
    createNumArray(quant).map((i) => {
      // const r = Math.floor(Math.random() * 2); //  1 to 0
      // return r ? [num, i + 1, num * (i + 1)] : [i + 1, num, num * (i + 1)];
      return [num, i + 1, num * (i + 1)];
    })
  );

export const setArrDivision = (num: number, quant = 10): number[][] =>
  shuffleArray(createNumArray(quant).map((i) => [num * (i + 1), num, i + 1]));

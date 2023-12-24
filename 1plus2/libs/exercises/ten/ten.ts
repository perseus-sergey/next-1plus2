import { createArray } from '@/libs/utils';
import { isWrongPushedIntoArray } from '../math';

const makeRandForEqualTen = (maxNum: number): number[] => {
  const randN = (onlyTen = false) => {
    const ten = Math.floor(Math.random() * (maxNum / 10 - 1)) + 1; //  1 to maxNum/10
    const a = onlyTen ? 0 : Math.floor(Math.random() * 9) + 1; //  1 to 10
    return ten * 10 + a;
  };

  const n1 = randN();
  const n2 = randN(true);

  const r = Math.floor(Math.random() * 2); //  1 to 0
  const part = r && n1 - n2 > 0 ? [n1, -n2, n1 - n2] : [n1, n2, n1 + n2];
  if (part[2] > maxNum || part[2] <= 0) return makeRandForEqualTen(maxNum);
  return part;
};

const makeArrUpTo40 = (maxNum: number, quant: number) => {
  const arr = createArray(quant).reduce((acc, _, indx) => {
    const i = indx + 1;
    const r = Math.floor(Math.random() * 2); //  1 to 0
    switch (true) {
      case maxNum < 20:
        return r ? [...acc, [i, 10, i + 10]] : [...acc, [10, i, i + 10]]; // (1..9)+10 or 10+(1..9)
      case maxNum < 30:
        return r ? [...acc, [i + 10, -10, i]] : [...acc, [10, i, i + 10]]; // (11..19)-10 or 10+(1..9)
      case maxNum < 40:
        return r
          ? [...acc, [(i - 1) * 10, 10, (i - 1) * 10 + 10]]
          : [...acc, [i * 10, -10, i * 10 - 10]]; // (0..90)+10 or (10..100)-10
    }
  }, []);
  arr.sort(() => Math.random() - 0.5); // shuffle array
  if (arr.length > 9) arr.length = Math.min(10, quant);
  return arr;
};

// (1..maxNum)*10 +- (1..maxNum)*10+(1..9)
const makeArrOver40 = (maxNum: number, quant: number, arr: number[][] = []): number[][] => {
  const part = makeRandForEqualTen(maxNum);

  if (isWrongPushedIntoArray(quant, maxNum, arr, part)) return makeArrOver40(maxNum, quant, arr);
  const newArr = [...arr, part];
  return newArr.length < quant ? makeArrOver40(maxNum, quant, newArr) : newArr;
};

// => [n1, n2, res]
export const setArrTen = (maxNum: number, quant = 10): number[][] =>
  maxNum < 40 ? makeArrUpTo40(maxNum, quant) : makeArrOver40(maxNum, quant);

import { createArray } from '@/libs/utils';
import setArrEqual from '../equal/equal';
import { isWrongPushedIntoArray } from '../math';

const rightAnswIneq = (sideL: number, sideR: number, equal = sideL - sideR) =>
  equal > 0 ? '>' : !equal ? '=' : '<';

const makeLightArr = (
  maxNum: number,
  existArr: (string | number)[][],
  quant = 10
): (string | number)[][] => {
  const n1 = Math.floor(Math.random() * (maxNum + 1)); // 0,maxNum
  const n2 = Math.floor(Math.random() * (maxNum + 1)); // 0,maxNum
  const part1 = ['', n1, rightAnswIneq(n1, n2), n2];
  const reversePart1 = ['', n2, rightAnswIneq(n2, n1), n1];

  if (n1 === n2) makeLightArr(maxNum, existArr, quant);

  if (!isWrongPushedIntoArray(quant, maxNum, existArr, part1, 0)) {
    return [...existArr, part1];
  } else if (!JSON.stringify(existArr).includes(JSON.stringify(reversePart1))) {
    return [...existArr, reversePart1];
  } else return makeLightArr(maxNum, existArr, quant);
};

const makeHardArr = (maxNum: number, hardArrLength: number): (string | number)[][] =>
  setArrEqual(maxNum, hardArrLength).map((parts) => {
    const answ = +parts[2];
    const min = Math.max(answ - 3, 0);
    const max = Math.min(answ + 3, maxNum);
    const n = Math.floor(Math.random() * (max - min + 1)) + min; // min,max
    parts[2] = rightAnswIneq(answ, n);
    parts[3] = n;
    return parts;
  });

// => [[n1, res, n2],[n1,n2,res,n3]]
export const setArrInequal = (maxNum = 100, quant = 10): (string | number)[][] => {
  const lightArr = createArray(Math.floor(quant * 0.4)).reduce(
    (acc) => makeLightArr(maxNum, acc, quant),
    []
  );
  const hardArr = makeHardArr(maxNum, quant - lightArr.length);
  return [...lightArr, ...hardArr];
};

import { createArray } from '@/libs/utils';
import { NUMBER_OF_EXERCISES, isWrongPushedIntoArray } from '../math';

const makeExsParts = (quant: number, maxNum: number, existingParts: number[][]): number[] => {
  const n = Math.floor(Math.random() * maxNum) + 1; //  1 to maxNum
  const newArrItem = [n - 1, n, n + 1];
  if (isWrongPushedIntoArray(quant, maxNum, existingParts, newArrItem))
    return makeExsParts(quant, maxNum, existingParts);

  return newArrItem;
};

const makeArrUpTo10 = (numOfExs = NUMBER_OF_EXERCISES) => {
  const arr = createArray(9).reduce((acc, _, indx) => [...acc, [indx, indx + 1, indx + 2]], []);
  arr.push(arr[6]);
  arr.sort(() => Math.random() - 0.5); // shuffle array
  if (arr.length > 9) arr.length = Math.min(10, numOfExs);
  return arr;
};

//  => [n1, n2, res]
const setArrSequence = (maxNum = 100, numOfExs = NUMBER_OF_EXERCISES): number[][] =>
  maxNum <= 10
    ? makeArrUpTo10(numOfExs)
    : createArray(numOfExs).reduce((acc) => [...acc, makeExsParts(numOfExs, maxNum, acc)], []);

export default setArrSequence;

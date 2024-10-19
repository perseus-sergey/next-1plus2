import { createArray } from '@/libs/utils';
import { isWrongPushedIntoArray } from '../math';
import { NUMBER_OF_EXERCISES } from '@/models/math/math.model';

const makeExsParts = (quant: number, maxNum: number, existingParts: number[][]): number[] => {
  const n1 = Math.floor((Math.random() * maxNum) / 2) + 1;
  const newArrItem = [n1, n1, n1 * 2];
  if (isWrongPushedIntoArray(quant, maxNum, existingParts, newArrItem))
    return makeExsParts(quant, maxNum, existingParts);

  return newArrItem;
};

const makeArrUpTo20 = (numOfExs = NUMBER_OF_EXERCISES) =>
  createArray(numOfExs)
    .reduce((acc, _, indx) => [...acc, [indx + 1, indx + 1, (indx + 1) * 2]], [])
    .sort(() => Math.random() - 0.5);

//  => [n1, n2, res]
export const setArrPair = (maxNum = 100, numOfExs = NUMBER_OF_EXERCISES): number[][] =>
  maxNum <= 20
    ? makeArrUpTo20(numOfExs)
    : createArray(numOfExs).reduce((acc) => [...acc, makeExsParts(numOfExs, maxNum, acc)], []);

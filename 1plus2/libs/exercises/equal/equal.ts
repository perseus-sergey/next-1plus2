import { createArray } from '@/libs/utils';
import { HARD_LEVELS_IN_ARRAY, NUMBER_OF_EXERCISES, isWrongPushedIntoArray } from '../math';

const makeRandForEqual = (maxN = 100): (string | number)[] => {
  const randN1 = (): number => {
    const a = Math.floor(Math.random() * maxN) + 1; //  1 to maxN   0,maxN => (Math.random() * (maxN+1))
    return a % 10 ? a : randN1();
  };
  const randN2 = (): number => {
    const a = Math.floor(Math.random() * (2 * maxN + 1)) - maxN; // -maxN,maxN
    return a % 10 ? a : randN2();
  };

  const n1 = randN1();
  const n2 = randN2();
  return [n1, n2, n1 + n2];
};

const makeExsParts = (
  quant: number,
  maxN: number,
  existingParts: (string | number)[][]
): (string | number)[] => {
  const exerciseParts = makeRandForEqual(maxN);
  const max_n = Math.max(+exerciseParts[0], +exerciseParts[1]);
  const minTen = max_n - (max_n % 10);
  if (
    +exerciseParts[2] > minTen + 10 ||
    +exerciseParts[2] < minTen ||
    isWrongPushedIntoArray(quant, maxN, existingParts, exerciseParts)
  ) {
    return makeExsParts(quant, maxN, existingParts);
  }
  return exerciseParts;
};

const setArrEqual = (maxNum = 100, numOfExs = NUMBER_OF_EXERCISES): (string | number)[][] => {
  const maxNumOfLevel = Math.floor(maxNum / HARD_LEVELS_IN_ARRAY);
  const quantExsPerLevel = Math.floor(numOfExs / HARD_LEVELS_IN_ARRAY);

  const arrTest = createArray(HARD_LEVELS_IN_ARRAY).reduce((acc: (string | number)[][], _, n) => {
    const quant = quantExsPerLevel > 3 ? Math.floor(quantExsPerLevel * 0.7 * (n + 1)) : 3;
    // console.log('🚀 ~ file: equal.ts:39 ~ arrTest ~ quant:', quant);
    return [
      ...acc,
      ...createArray(quant).reduce(
        (acc) => [...acc, makeExsParts(quant, maxNumOfLevel * (n + 1), acc)],
        []
      ),
    ];
  }, []);
  return arrTest;
};

export default setArrEqual;

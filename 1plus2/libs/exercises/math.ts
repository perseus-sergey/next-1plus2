import { createArray } from '../utils';

export const NUMBER_OF_EXERCISES = 10;
const HARD_LEVELS_IN_ARRAY = 2;

const makeRandForEqual = (maxN = 100): number[] => {
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

function pushIntoArr(arr: number[][], quant: number, maxN: number, arEx: number[]): number[][] {
  // console.log('🚀 ~ file: langMessages.ts:261 ~ pushIntoArr ~ arr:', arr);
  // console.log('🚀 ~ file: langMessages.ts:261 ~ pushIntoArr ~ arEx:', arEx);
  if (arEx[2] > maxN || arEx[2] <= 0) return arr;
  if (!(quant < maxN) || !JSON.stringify(arr).includes(JSON.stringify(arEx))) return [...arr, arEx];
  return arr;
}

// => [[n1, n2, res], [n1, n2, res]]
const setArrEqual = (quant: number, maxN: number): number[][] =>
  createArray(quant).reduce((acc) => {
    const makeExsParts = (): number[] => {
      const exerciseParts = makeRandForEqual(maxN);
      const max_n = Math.max(exerciseParts[0], exerciseParts[1]);
      const minTen = max_n - (max_n % 10);
      if (
        exerciseParts[2] > maxN ||
        exerciseParts[2] <= 0 ||
        exerciseParts[2] > minTen + 10 ||
        exerciseParts[2] < minTen
      ) {
        return makeExsParts();
      }
      return exerciseParts;
    };
    return pushIntoArr(acc, quant, maxN, makeExsParts());
  }, []);

export const makeExerciseArray = (maxNum = 100, numOfExs = NUMBER_OF_EXERCISES): number[][] => {
  const maxNumOfLevel = Math.floor(maxNum / HARD_LEVELS_IN_ARRAY);
  const quantExsPerLevel = Math.floor(numOfExs / HARD_LEVELS_IN_ARRAY);

  const arrTest = createArray(HARD_LEVELS_IN_ARRAY).reduce((acc: number[][], _, n) => {
    return [
      ...acc,
      ...setArrEqual(Math.floor(quantExsPerLevel * 0.7 * (n + 1)), maxNumOfLevel * (n + 1)),
    ];
  }, []);
  console.log('🚀 ~ file: math.ts:60 ~ makeExerciseArray ~ arrTest:', arrTest);
  return arrTest;
};

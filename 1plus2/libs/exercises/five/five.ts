import { createMaxNumArray } from '@/libs/utils';
import { NUMBER_OF_EXERCISES } from '../math';

const getArr = (maxNum: number) =>
  createMaxNumArray({ start: 0, max: maxNum - 5, step: 5 }).reduce((acc: number[][], current) => {
    const r = Math.floor(Math.random() * 2); //  1 or 0
    const parts = r ? [current + 5, -5, current] : [5, current, current + 5]; // (5..50)-5 or 5+(5..55)
    return [...acc, parts];
  }, []);

//  => [n1, n2, res]
const setArrFive = (maxNum: number, numOfExs = NUMBER_OF_EXERCISES): number[][] => {
  let arr = getArr(maxNum);

  while (arr.length < numOfExs) {
    arr = [...arr, ...getArr(maxNum)];
  }

  arr.sort(() => Math.random() - 0.5); // shuffle array
  if (arr.length > 9) arr.length = Math.min(10, numOfExs);
  return arr;
};

export default setArrFive;

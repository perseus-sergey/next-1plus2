import { isWrongPushedIntoArray } from '../math';

function makeRandForEqual(maxN: number) {
  const getRandomPart = (isNegative = false): number => {
    const r = isNegative
      ? Math.floor(Math.random() * (2 * maxN + 1)) - maxN // -maxN,maxN
      : Math.floor(Math.random() * maxN) + 1; //  1 to maxN
    return r % 10 ? r : getRandomPart(isNegative);
  };
  const n1 = getRandomPart();
  const n2 = getRandomPart(true);
  return [n1, n2, n1 + n2];
}

const getArrUpTo20 = (quant = 10) => {
  const arr: number[][] = [];

  for (let n1 = 5; n1++ < 9; ) {
    for (let n2 = n1 + 1; n2-- > 11 - n1; ) {
      const r = Math.floor(Math.random() * 2); //  1 to 0
      const a = r ? [n1, n2, n1 + n2] : [n2, n1, n1 + n2];
      arr.push(a);
    }
  }
  arr.sort(() => Math.random() - 0.5); // shuffle array
  if (arr.length > 19) arr.length = Math.min(20, quant);
  return arr;
};

const getArrOver20 = (maxNum: number, quant: number, arr: number[][] = []): number[][] => {
  const parts = makeRandForEqual(maxNum);
  const maxPart = Math.max(parts[0], parts[1]);
  const closestMinTen = maxPart - (maxPart % 10);

  if (
    parts[2] > maxNum ||
    parts[2] <= 0 ||
    (parts[2] <= closestMinTen + 10 && parts[2] >= closestMinTen) ||
    isWrongPushedIntoArray(quant, maxNum, arr, parts, 2)
  )
    return getArrOver20(maxNum, quant, arr);

  const newArr = [...arr, parts];
  return newArr.length < quant ? getArrOver20(maxNum, quant, newArr) : newArr;
};

export const setArrOverTen = (maxNum: number, quant = 10) =>
  maxNum < 20 ? getArrUpTo20(quant) : getArrOver20(maxNum, quant);

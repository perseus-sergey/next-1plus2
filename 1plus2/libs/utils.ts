export const createArray = (length: number) => [...Array(length)];

export const arrayShift = <T>(array: T[][]): T[][] => {
  const [, ...rest] = array;
  return rest;
};

export const createMaxNumArray = ({ start = 10, max = 100, step = 10 }) =>
  createArray(getExerciseQuantity({ start, max, step })).map((_, i) => i * step + start);

export const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

export const uniqueArray = <T>(array: T[]): T[] => [...new Set(array)];

export const getExerciseQuantity = ({ start = 10, max = 100, step = 10 }) =>
  Math.floor((max + step - start) / step);

export const capitalizedFirstChar = (word: string) =>
  word.replace(/^(.)/, (match) => match.toUpperCase());

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

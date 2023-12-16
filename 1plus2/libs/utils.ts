export const createArray = (length: number) => [...Array(length)];

export const getExerciseQuantity = ({ start = 10, max = 100, step = 10 }) =>
  Math.floor((max + step - start) / step);

export const createMaxNumArray = ({ start = 10, max = 100, step = 10 }) =>
  createArray(getExerciseQuantity({ start, max, step })).map((_, i) => i * step + start);

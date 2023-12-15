export const createArray = (length: number) => [...Array(length)];

export const createMaxNumArray = ({ start = 10, max = 100, step = 10 }) =>
  createArray(Math.floor((max + step - start) / step)).map((_, i) => i * step + start);

import { useCallback, useEffect, useState } from 'react';
import { EExerciseCategories, TMinusPlus } from '../exercises/math.model';

export const useExerciseParams = (
  cat: EExerciseCategories,
  exercises: (string | number)[][]
): [TMinusPlus, number[]] => {
  const [minusPlus, setMinusPlus] = useState<TMinusPlus>('');
  const [askElemNumbers, setAskElemNumbers] = useState<number[]>([2]);

  const getMinusPlus = (part1: number | string | undefined) =>
    part1 === undefined || isNaN(+part1) ? '' : +part1 >= 0 ? '+' : '-';

  const setExerciseParams = useCallback(() => {
    const [part0, part1] = exercises[0];
    switch (cat) {
      case EExerciseCategories['sequence']:
        setMinusPlus('');
        setAskElemNumbers([Math.floor(Math.random() * 3)]);
        break;
      case EExerciseCategories['pairs']:
        setMinusPlus('+');
        setAskElemNumbers(Math.floor(Math.random() * 2) ? [2] : [0, 1]);
        break;
      case EExerciseCategories['link-equality']:
        setMinusPlus(getMinusPlus(part1));
        setAskElemNumbers(Math.floor(Math.random() * 2) ? [1] : [0]);
        break;
      case EExerciseCategories['inequality']:
        setMinusPlus(part0 === '' ? '' : getMinusPlus(part1));
        setAskElemNumbers([2]);
        break;
      case EExerciseCategories['composition']:
        setMinusPlus(getMinusPlus(part1));
        setAskElemNumbers(Math.floor(Math.random() * 2) ? [1] : [0]);
        break;
      default:
        setMinusPlus(getMinusPlus(part1));
        setAskElemNumbers([2]);
        break;
    }
  }, [cat, exercises]);

  useEffect(() => {
    if (!exercises.length) return;
    setExerciseParams();
  }, [setExerciseParams, exercises]);

  return [minusPlus, askElemNumbers];
};

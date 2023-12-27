import { useCallback, useEffect, useState } from 'react';
import { EExerciseCategories, TMinusPlus } from '../exercises/math.model';

const mathHintEmpty = {
  hintN1: '',
  hintMinusPlus: '',
  hintN2: '',
  hintEqual: '',
  hintResponse: '',
};

export type TMathHint = typeof mathHintEmpty;

const makeHintPart = (val: number | string) => {
  const num = Number(val);
  const restN = num % 10;
  const wholeTen = num - restN;
  return num > 10 && restN ? `(${wholeTen} + ${restN})` : '';
};

const getHintDefault = (exercise: (string | number)[]): TMathHint => ({
  ...mathHintEmpty,
  hintN1: makeHintPart(+exercise[0]),
  hintN2: makeHintPart(Math.abs(+exercise[1])),
});

const getHintOverTen = (n1: number, n2: number): TMathHint => {
  let hintN1 = '';
  let hintN2 = '';
  let hintMinusPlus = '';

  const n2mod = Math.abs(n2);
  const tensN2 = n2mod - (n2mod % 10);
  const showWholeN2 = tensN2 ? `${n2 > 0 ? '+' : '-'} ${tensN2}` : '';

  if (n2 > 0) {
    if (n1 < n2 && n1 < 10) {
      hintN1 = `+ ${10 - (n2 % 10)} + ${n1 - 10 + (n2 % 10)}`;
    } else {
      hintN2 =
        (n1 % 10) + (n2 % 10) > 10
          ? `${showWholeN2} + ${10 - (n1 % 10)} + ${n2 - tensN2 - 10 + (n1 % 10)}`
          : `${showWholeN2} + ${n2 % 10}`;
    }
  } else {
    const difference = n1 + n2;
    if (difference < 6 && difference > 1) {
      hintMinusPlus = [...Array(difference).keys()].map((i) => Math.abs(i + -n1)).join(' . ');
    } else {
      hintN2 =
        (n1 % 10) + (n2 % 10) < 0
          ? `${showWholeN2} - ${n1 % 10} - ${n2mod - tensN2 - (n1 % 10)}`
          : `${showWholeN2} - ${n2mod % 10}`;
    }
  }
  return { ...mathHintEmpty, hintN1, hintN2, hintMinusPlus };
};

const getExsLinkParams = (exercise: (number | string)[]): [TMathHint, number] => {
  let hintN1 = '';
  let hintN2 = '';
  const r = Math.floor(Math.random() * 2);

  r
    ? (hintN1 = `${makeHintPart(exercise[0])}`)
    : (hintN2 = `${makeHintPart(Math.abs(+exercise[1]))}`);

  return [{ ...mathHintEmpty, hintN1, hintN2, hintResponse: `${makeHintPart(exercise[2])}` }, r];
};

const getExsSequenceParams = (exercise: (number | string)[]): [TMathHint, number] => {
  let hintN1 = '';
  let hintN2 = '';
  let hintResponse = '';
  const r = Math.floor(Math.random() * 3); //  0 to 2

  if (r === 0) {
    hintN2 = `${makeHintPart(exercise[1])}`;
    hintResponse = `${makeHintPart(exercise[2])}`;
  } else if (r === 1) {
    hintN1 = `${makeHintPart(exercise[0])}`;
    hintResponse = `${makeHintPart(exercise[2])}`;
  } else {
    hintN1 = `${makeHintPart(exercise[0])}`;
    hintN2 = `${makeHintPart(exercise[1])}`;
  }

  return [{ ...mathHintEmpty, hintN1, hintN2, hintResponse }, r];
};

export const useExerciseParams = (
  cat: EExerciseCategories,
  exercises: (string | number)[][]
): [TMinusPlus, number[], TMathHint] => {
  const [minusPlus, setMinusPlus] = useState<TMinusPlus>('');
  const [askElemNumbers, setAskElemNumbers] = useState<number[]>([2]);
  const [hint, setHint] = useState<TMathHint>(mathHintEmpty);

  const getMinusPlus = (part1: number | string | undefined) =>
    part1 === undefined || isNaN(+part1) ? '' : +part1 >= 0 ? '+' : '-';

  const setExerciseParams = useCallback(() => {
    const [part0, part1] = exercises[0];

    if (cat === EExerciseCategories['sequence']) {
      const [OMathHint, r] = getExsSequenceParams(exercises[0]);

      setHint(OMathHint);
      setMinusPlus('');
      setAskElemNumbers([r]);
    } else if (cat === EExerciseCategories['pairs']) {
      setMinusPlus('+');
      setAskElemNumbers(Math.floor(Math.random() * 2) ? [2] : [0, 1]);
      setHint(getHintDefault(exercises[0]));
    } else if (cat === EExerciseCategories['link-equality']) {
      const [OMathHint, r] = getExsLinkParams(exercises[0]);

      setHint(OMathHint);
      setAskElemNumbers([r]);
      setMinusPlus(getMinusPlus(part1));
    } else if (cat === EExerciseCategories['inequality']) {
      setMinusPlus(part0 === '' ? '' : getMinusPlus(part1));
    } else if (cat === EExerciseCategories['composition']) {
      setMinusPlus(getMinusPlus(part1));
      setAskElemNumbers(Math.floor(Math.random() * 2) ? [1] : [0]);
    } else if (cat === EExerciseCategories['equal-over-ten']) {
      setHint(getHintOverTen(+part0, +part1));
      setMinusPlus(getMinusPlus(part1));
    } else {
      setMinusPlus(getMinusPlus(part1));
      setHint(getHintDefault(exercises[0]));
    }
  }, [cat, exercises]);

  useEffect(() => {
    if (!exercises.length) return;
    setExerciseParams();
  }, [setExerciseParams, exercises]);

  return [minusPlus, askElemNumbers, hint];
};

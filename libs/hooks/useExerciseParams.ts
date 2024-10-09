import { EExerciseCategories, EMinusPlus } from '@/models/math/types';
import { useCallback, useEffect, useState } from 'react';

const EMPTY_HINT = {
  hintN1: '',
  hintMinusPlus: '',
  hintN2: '',
  hintEqual: '',
  hintResponse: '',
};

export type TMathHint = typeof EMPTY_HINT;

const makeHintPart = (val: number | string) => {
  const num = Number(val);
  const restN = num % 10;
  const wholeTen = num - restN;
  return num > 10 && restN ? `(${wholeTen} + ${restN})` : '';
};

const getHintDefault = (exercise: (string | number)[]): TMathHint => ({
  ...EMPTY_HINT,
  hintN1: +exercise[0] ? makeHintPart(+exercise[0]) : '',
  hintN2: +exercise[1] ? makeHintPart(Math.abs(+exercise[1])) : '',
  hintResponse: +exercise[2] ? makeHintPart(+exercise[2]) : '',
});

const getHintInequal = (exercise: (string | number)[]): TMathHint => ({
  ...EMPTY_HINT,
  hintN1: +exercise[0] ? makeHintPart(+exercise[0]) : '',
  hintN2: +exercise[1] ? makeHintPart(Math.abs(+exercise[1])) : '',
  hintEqual: +exercise[2] ? makeHintPart(+exercise[2]) : '',
  hintResponse: +exercise[3] ? makeHintPart(+exercise[3]) : '',
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
  return { ...EMPTY_HINT, hintN1, hintN2, hintMinusPlus };
};

const getExsLinkParams = (exercise: (number | string)[]): [TMathHint, number] => {
  let hintN1 = '';
  let hintN2 = '';
  const r = Math.floor(Math.random() * 2);

  r
    ? (hintN1 = `${makeHintPart(exercise[0])}`)
    : (hintN2 = `${makeHintPart(Math.abs(+exercise[1]))}`);

  return [{ ...EMPTY_HINT, hintN1, hintN2, hintResponse: `${makeHintPart(exercise[2])}` }, r];
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

  return [{ ...EMPTY_HINT, hintN1, hintN2, hintResponse }, r];
};

export const useExerciseParams = (
  cat: EExerciseCategories,
  currentExercise: (string | number)[]
): [EMinusPlus, number[], TMathHint] => {
  const [minusPlus, setMinusPlus] = useState<EMinusPlus>(EMinusPlus.EMPTY);
  const [askElemNumbers, setAskElemNumbers] = useState<number[]>([2]);
  const [hint, setHint] = useState<TMathHint>(EMPTY_HINT);

  const getMinusPlus = (part1: number | string | undefined): EMinusPlus =>
    part1 === undefined || isNaN(+part1)
      ? EMinusPlus.EMPTY
      : +part1 >= 0
        ? EMinusPlus.PLUS
        : EMinusPlus.MINUS;

  const setExerciseParams = useCallback(() => {
    const [part0, part1] = currentExercise;

    if (cat === EExerciseCategories['sequence']) {
      const [OMathHint, r] = getExsSequenceParams(currentExercise);

      setHint(OMathHint);
      setMinusPlus(EMinusPlus.EMPTY);
      setAskElemNumbers([r]);
    } else if (cat === EExerciseCategories['pairs']) {
      setMinusPlus(EMinusPlus.PLUS);
      setAskElemNumbers(Math.floor(Math.random() * 2) ? [2] : [0, 1]);
      setHint(getHintDefault(currentExercise));
    } else if (cat === EExerciseCategories['link-equality']) {
      const [OMathHint, r] = getExsLinkParams(currentExercise);

      setHint(OMathHint);
      setAskElemNumbers([r]);
      setMinusPlus(getMinusPlus(part1));
    } else if (cat === EExerciseCategories['inequality']) {
      setAskElemNumbers([2]);
      setMinusPlus(part0 === EMinusPlus.EMPTY ? EMinusPlus.EMPTY : getMinusPlus(part1));
      setHint(getHintInequal(currentExercise));
    } else if (cat === EExerciseCategories['composition']) {
      setHint(EMPTY_HINT);
      setMinusPlus(getMinusPlus(part1));
      setAskElemNumbers(Math.floor(Math.random() * 2) ? [1] : [0]);
    } else if (cat === EExerciseCategories['equal-over-ten']) {
      setAskElemNumbers([2]);
      setHint(getHintOverTen(+part0, +part1));
      setMinusPlus(getMinusPlus(part1));
    } else if (cat === EExerciseCategories['multiply']) {
      setAskElemNumbers([Math.floor(Math.random() * 2) + 1]);
      // setAskElemNumbers([2]);
      setHint(EMPTY_HINT);
      setMinusPlus(EMinusPlus.MULTIPLY);
    } else if (cat === EExerciseCategories['division']) {
      setAskElemNumbers([2]);
      setHint(EMPTY_HINT);
      setMinusPlus(EMinusPlus.DIVISION);
    } else {
      setAskElemNumbers([2]);
      setMinusPlus(getMinusPlus(part1));
      setHint(getHintDefault(currentExercise));
    }
  }, [cat, currentExercise]);

  useEffect(() => {
    if (!currentExercise) return;
    setExerciseParams();
  }, [setExerciseParams, currentExercise]);

  return [minusPlus, askElemNumbers, hint];
};

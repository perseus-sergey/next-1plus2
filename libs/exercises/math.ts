import { TMathHint } from '../hooks/useExerciseParams';
import { ELang, EMessageNames } from '../langMessages';
import { EExerciseCategories, EMinusPlus, TCatObject, categoriesMap } from './math.model';

export const NUMBER_OF_EXERCISES = 10;
export const HARD_LEVELS_IN_ARRAY = 2;

export const getCatFromMap = (
  msg: EExerciseCategories,
  lang: ELang = ELang.en,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

export const isWrongPushedIntoArray = (
  quant: number,
  maxN: number,
  existingParts: (string | number)[][],
  pushedParts: (string | number)[],
  answerPositionInPart = 2,
  uniq = quant < maxN
) => {
  return (
    +pushedParts[answerPositionInPart] > maxN ||
    +pushedParts[answerPositionInPart] <= 0 ||
    (uniq && JSON.stringify(existingParts).includes(JSON.stringify(pushedParts)))
  );
};

export const getCatComplTitles = (exsQuant: number, mistQuant: number) => {
  const mistakeCoeff = mistQuant / exsQuant;
  return {
    catCompleteTitle: !mistakeCoeff
      ? EMessageNames.BRAVO
      : mistakeCoeff <= 0.2
        ? EMessageNames.NO_BAD
        : EMessageNames.BAD,
    btnCatCompleteTitle: !mistakeCoeff ? EMessageNames.CONTINUE : EMessageNames.CORRECTION,
  };
};

export const getLevelsByMaxNum = (maxNum: number) => {
  switch (true) {
    case maxNum <= 10:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['division'] &&
          c !== EExerciseCategories['multiply'] &&
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-five'] &&
          c !== EExerciseCategories['equal-ten']
      );
    case maxNum <= 20:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['division'] &&
          c !== EExerciseCategories['multiply'] &&
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-ten']
      );
    default:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['division'] &&
          c !== EExerciseCategories['multiply'] &&
          c !== EExerciseCategories['composition']
      );
  }
};

export interface IExsPart {
  value: string | number;
  hint: string;
  isQuestionPart: boolean;
}

export const makeExerciseParts = (
  askElemNumbers: number[],
  exercise: (number | string)[],
  minusPlus: EMinusPlus,
  equalMark: string | undefined,
  isInequalCat: boolean,
  { hintN1, hintMinusPlus, hintN2, hintEqual, hintResponse }: TMathHint
): IExsPart[] => [
  {
    value: exercise[0],
    hint: hintN1,
    isQuestionPart: askElemNumbers.includes(0),
  },
  {
    value: minusPlus,
    hint: hintMinusPlus,
    isQuestionPart: false,
  },
  {
    value: Math.abs(+exercise[1]),
    hint: hintN2,
    isQuestionPart: askElemNumbers.includes(1),
  },
  {
    value: equalMark || '',
    hint: hintEqual,
    isQuestionPart: isInequalCat && askElemNumbers.includes(2),
  },
  {
    value: exercise[exercise.length - 1],
    hint: hintResponse,
    isQuestionPart: !isInequalCat && askElemNumbers.includes(2),
  },
];

export const isOverDropZoneFn = (dropZoneRect: DOMRect, draggedRect: DOMRect) =>
  draggedRect.top < dropZoneRect.bottom &&
  draggedRect.right > dropZoneRect.left &&
  draggedRect.bottom > dropZoneRect.top &&
  draggedRect.left < dropZoneRect.right;

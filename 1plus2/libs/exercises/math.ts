import { TMathHint } from '../hooks/useExerciseParams';
import { ELang, EMessageNames } from '../langMessages';
import { setArrCompos } from './composition/composition';
import setArrEqual from './equal/equal';
import setArrFive from './five/five';
import { setArrInequal } from './inequal/inequal';
import { EExerciseCategories, TCatObject, TMinusPlus, categoriesMap } from './math.model';
import { setArrOverTen } from './overTen/overTen';
import setArrPair from './pairs/pairs';
import setArrSequence from './sequence/sequence';
import { setArrTen } from './ten/ten';

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
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-five'] &&
          c !== EExerciseCategories['equal-ten']
      );
    case maxNum <= 20:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-ten']
      );
    default:
      return [...categoriesMap.keys()].filter(
        (c) => c !== EExerciseCategories['level'] && c !== EExerciseCategories['composition']
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
  minusPlus: TMinusPlus,
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

export const makeExerciseArray = (
  category: EExerciseCategories,
  maxNum = 100,
  numOfExs = NUMBER_OF_EXERCISES
): (string | number)[][] => {
  switch (category) {
    case EExerciseCategories['equality']:
      return setArrEqual(maxNum, numOfExs);
    case EExerciseCategories['sequence']:
      return setArrSequence(maxNum, numOfExs);
    case EExerciseCategories['pairs']:
      return setArrPair(maxNum, numOfExs);
    case EExerciseCategories['link-equality']:
      return setArrEqual(maxNum, numOfExs);
    case EExerciseCategories['inequality']:
      return setArrInequal(maxNum, numOfExs);
    case EExerciseCategories['equal-ten']:
      return setArrTen(maxNum, numOfExs);
    case EExerciseCategories['composition']:
      return setArrCompos(maxNum, numOfExs);
    case EExerciseCategories['equal-five']:
      return setArrFive(maxNum, numOfExs);
    case EExerciseCategories['equal-over-ten']:
      return setArrOverTen(maxNum, numOfExs);

    default:
      return setArrEqual(maxNum, numOfExs);
  }
};

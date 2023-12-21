import { ELang } from '../langMessages';
import getEqualArray from './equal/equal';
import setArrFive from './five/five';
import { EExerciseCategories, TCatObject, categoriesMap } from './math.model';
import setArrSequence from './sequence/sequence';

export const NUMBER_OF_EXERCISES = 10;
export const HARD_LEVELS_IN_ARRAY = 2;

export const getCatFromMap = (
  msg: EExerciseCategories,
  lang: ELang = ELang.en,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

export const isWrongPushArray = (
  quant: number,
  maxN: number,
  existingParts: number[],
  pushedParts: number[],
  uniq = quant < maxN
) =>
  pushedParts[2] > maxN ||
  pushedParts[2] <= 0 ||
  (uniq && JSON.stringify(existingParts).includes(JSON.stringify(pushedParts)));

export const makeExerciseArray = (
  category: EExerciseCategories,
  maxNum = 100,
  numOfExs = NUMBER_OF_EXERCISES
): number[][] => {
  switch (category) {
    case EExerciseCategories['equality']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['sequence']:
      return setArrSequence(maxNum, numOfExs);
    case EExerciseCategories['pairs']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['link-equality']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['inequality']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['equal-ten']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['composition']:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories['equal-five']:
      return setArrFive(numOfExs);
    case EExerciseCategories['equal-over-ten']:
      return getEqualArray(maxNum, numOfExs);

    default:
      return getEqualArray(maxNum, numOfExs);
  }
};

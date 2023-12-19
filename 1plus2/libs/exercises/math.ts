import { ELang } from '../langMessages';
import getEqualArray from './equal/equal';
import setArrFive from './five/five';
import { EExerciseCategories, TCatObject, categoriesMap } from './math.model';

export const NUMBER_OF_EXERCISES = 10;
export const HARD_LEVELS_IN_ARRAY = 2;

export const getCatFromMap = (
  msg: EExerciseCategories,
  lang: ELang = ELang.en,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

export const makeExerciseArray = (
  category: EExerciseCategories,
  maxNum = 100,
  numOfExs = NUMBER_OF_EXERCISES
): number[][] => {
  switch (category) {
    case EExerciseCategories.EQUALITY:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.SEQUENCE:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.PAIRS:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.LINK_EQUALITY:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.INEQUALITY:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.EQUAL_TEN:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.COMPOSITION:
      return getEqualArray(maxNum, numOfExs);
    case EExerciseCategories.EQUAL_FIVE:
      return setArrFive(numOfExs);
    case EExerciseCategories.EQUAL_OVER_TEN:
      return getEqualArray(maxNum, numOfExs);

    default:
      return getEqualArray(maxNum, numOfExs);
  }
};

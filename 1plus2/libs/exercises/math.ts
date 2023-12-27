import { ELang } from '../langMessages';
import { setArrCompos } from './composition/composition';
import setArrEqual from './equal/equal';
import setArrFive from './five/five';
import { setArrInequal } from './inequal/inequal';
import { EExerciseCategories, TCatObject, categoriesMap } from './math.model';
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

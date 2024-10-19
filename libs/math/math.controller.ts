import { NUMBER_OF_EXERCISES } from '@/models/math/math.model';
import { EExerciseCategories } from '@/models/math/types';

export const makeExerciseArray = async (
  category: EExerciseCategories,
  maxNum = 100,
  numOfExs = NUMBER_OF_EXERCISES
): Promise<(string | number)[][]> => {
  let setArrEqual;

  switch (category) {
    case EExerciseCategories['equality']:
      ({ setArrEqual } = await import('@/libs/exercises/equal/equal'));
      return setArrEqual(maxNum, numOfExs);

    case EExerciseCategories['sequence']:
      const { setArrSequence } = await import('@/libs/exercises/sequence/sequence');
      return setArrSequence(maxNum, numOfExs);

    case EExerciseCategories['pairs']:
      const { setArrPair } = await import('@/libs/exercises/pairs/pairs');
      return setArrPair(maxNum, numOfExs);

    case EExerciseCategories['link-equality']:
      ({ setArrEqual } = await import('@/libs/exercises/equal/equal'));
      return setArrEqual(maxNum, numOfExs);

    case EExerciseCategories['inequality']:
      const { setArrInequal } = await import('@/libs/exercises/inequal/inequal');
      return setArrInequal(maxNum, numOfExs);

    case EExerciseCategories['equal-ten']:
      const { setArrTen } = await import('@/libs/exercises/ten/ten');
      return setArrTen(maxNum, numOfExs);

    case EExerciseCategories['composition']:
      const { setArrCompos } = await import('@/libs/exercises/composition/composition');
      return setArrCompos(maxNum, numOfExs);

    case EExerciseCategories['equal-five']:
      const { setArrFive } = await import('@/libs/exercises/five/five');
      return setArrFive(maxNum, numOfExs);

    case EExerciseCategories['equal-over-ten']:
      const { setArrOverTen } = await import('@/libs/exercises/overTen/overTen');
      return setArrOverTen(maxNum, numOfExs);

    case EExerciseCategories['multiply']:
      const { setArrMultiply } = await import('@/libs/exercises/multiply/multiply');
      return setArrMultiply(maxNum, numOfExs);

    case EExerciseCategories['division']:
      const { setArrDivision } = await import('@/libs/exercises/multiply/multiply');
      return setArrDivision(maxNum, numOfExs);

    default:
      ({ setArrEqual } = await import('@/libs/exercises/equal/equal'));
      return setArrEqual(maxNum, numOfExs);
  }
};

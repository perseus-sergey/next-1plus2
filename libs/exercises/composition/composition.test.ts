import { deepUniqueArraySize } from '@/libs/utils';
import { EExerciseCategories, categoriesMap, makeExerciseArray } from '../math.model';

describe('setArrCompos', () => {
  const cat = EExerciseCategories['composition'];
  const mapObj = categoriesMap.get(cat);
  if (!mapObj) return;
  const { start, max, step } = mapObj.exercise;

  const attempts = 1;

  for (let maxN = start; maxN < max + 1; maxN += step) {
    const numExercisesInArray = Math.min(maxN, 10);

    it(`array quantity should be equal ${numExercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);
        console.log('🚀 ~ file: composition.test.ts:12 ~ it ~ arr:', arr);
        expect(arr.length).toEqual(numExercisesInArray);
      }
    });

    it(`Max Number in every parts should be <= ${maxN}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);

        arr.forEach((part) => expect(+part[0] <= maxN && +part[1] <= maxN).toBeTruthy());
      }
    });

    const uniq = numExercisesInArray < maxN;

    if (uniq) {
      it(`array parts should be unique.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexercisesInArray: ${numExercisesInArray}`, () => {
        for (let index = 0; index < attempts; index++) {
          const arr = makeExerciseArray(cat, maxN);
          expect(arr.length).toEqual(deepUniqueArraySize(arr));
        }
      });
    }
  }
});

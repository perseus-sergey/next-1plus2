import { deepUniqueArraySize } from '@/libs/utils';
import { EExerciseCategories, categoriesMap, makeExerciseArray } from '../math.model';

const cat = EExerciseCategories['equal-five'];
const attempts = 100;

describe(`🚀 ~ Category: ${cat}`, () => {
  const mapObj = categoriesMap.get(cat);
  if (!mapObj) return;
  const { start, max, step } = mapObj.exercise;

  for (let maxN = start; maxN < max + 1; maxN += step) {
    const numExercisesInArray = Math.min(maxN, 10);

    it(`array quantity should be equal ${numExercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);
        // console.log(`🚀 ~ file: ${cat}.test ~ arr:`, arr);
        expect(arr.length).toEqual(numExercisesInArray);
      }
    });

    it(`Max Number in every parts should be <= ${maxN}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);

        arr.forEach((part) =>
          part.forEach((n) => {
            const num = +n;
            if (!num) return;
            expect(num <= maxN).toBe(true);
          })
        );
      }
    });

    const uniq = numExercisesInArray < maxN;

    if (uniq) {
      it(`array parts SHOULD be unique.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexercisesInArray: ${numExercisesInArray}`, () => {
        for (let index = 0; index < attempts; index++) {
          const arr = makeExerciseArray(cat, maxN);
          expect(arr.length).toEqual(deepUniqueArraySize(arr));
        }
      });
    }
  }
});

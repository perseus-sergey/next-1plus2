import { makeExerciseArray } from '../math';
import { EExerciseCategories } from '../math.model';

describe('setArrFive', () => {
  const cat = EExerciseCategories['equal-five'];
  const attempts = 1;
  const maxNum = 100;
  const numExercisesInArray = 10;

  for (let maxN = 50; maxN < maxNum + 1; maxN += 10) {
    it(`array quantity should be equal ${numExercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);
        console.log(`🚀 ~ file: five.test maxN: ${maxN} ~ arr:`, arr);
        expect(arr.length).toEqual(numExercisesInArray);
      }
    });

    it(`Max Number in every parts should be <= ${maxN}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = makeExerciseArray(cat, maxN);

        arr.forEach((part) => expect(+part[0] <= maxN && +part[1] <= maxN).toBe(true));
      }
    });

    const uniq = numExercisesInArray < maxN;

    if (uniq) {
      it(`array parts should be unique.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexercisesInArray: ${numExercisesInArray}`, () => {
        for (let index = 0; index < attempts; index++) {
          const arr = makeExerciseArray(cat, maxN);
          const uniqArr = Array.from(new Set(arr));
          expect(arr.length).toEqual(uniqArr.length);
        }
      });
    }
  }
});

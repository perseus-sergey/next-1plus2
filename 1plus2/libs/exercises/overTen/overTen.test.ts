import { setArrOverTen } from './overTen';

describe('setArrOverTen', () => {
  const attempts = 1000;
  const maxNum = 100;
  const numExercisesInArray = 10;

  for (let maxN = 10; maxN < maxNum + 1; maxN += 10) {
    it(`array quantity should be equal ${numExercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = setArrOverTen(maxN, numExercisesInArray);
        // console.log('🚀 ~ file: inequal.test.ts:12 ~ it ~ arr:', arr);
        expect(arr.length).toEqual(numExercisesInArray);
      }
    });

    it(`Max Number in every parts should be <= ${maxN}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = setArrOverTen(maxN, numExercisesInArray);

        arr.forEach((part) => expect(part[0] <= maxN && part[1] <= maxN).toBe(true));
      }
    });

    const uniq = numExercisesInArray < maxN;

    if (uniq) {
      it(`array parts should be unique.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexercisesInArray: ${numExercisesInArray}`, () => {
        for (let index = 0; index < attempts; index++) {
          const arr = setArrOverTen(maxN, numExercisesInArray);
          const uniqArr = Array.from(new Set(arr));
          expect(arr.length).toEqual(uniqArr.length);
        }
      });
    }
  }
});

import { setArrInequal } from './inequal';

describe('setArrInequal', () => {
  const attempts = 5;
  const maxNum = 100;
  const exercisesInArray = 10;

  for (let maxN = 10; maxN < maxNum + 1; maxN += 10) {
    it(`array quantity should be equal ${exercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${exercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = setArrInequal(maxN, exercisesInArray);
        // console.log('🚀 ~ file: inequal.test.ts:12 ~ it ~ arr:', arr);
        expect(arr.length).toEqual(exercisesInArray);
      }
    });

    it(`Max Number in every parts should be <= ${maxN}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${exercisesInArray}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = setArrInequal(maxN, exercisesInArray);

        arr.forEach((part) => {
          part.forEach((n) => {
            const num = +n;
            if (!num) return;
            expect(num <= maxN).toBe(true);
          });
        });
      }
    });

    const uniq = exercisesInArray < maxN;

    if (uniq) {
      it(`array parts should be unique.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexercisesInArray: ${exercisesInArray}`, () => {
        for (let index = 0; index < attempts; index++) {
          const arr = setArrInequal(maxN, exercisesInArray);
          const uniqArr = Array.from(new Set(arr));
          expect(arr.length).toEqual(uniqArr.length);
        }
      });
    }
  }
});

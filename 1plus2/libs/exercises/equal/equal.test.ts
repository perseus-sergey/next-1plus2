import setArrEqual from './equal';

describe('makeExerciseArray', () => {
  const attempts = 500;
  const maxNum = 100;
  const exerciseQuant = 10;

  for (let maxN = 10; maxN < maxNum + 1; maxN += 10) {
    it(`array quantity should be equal ${exerciseQuant}.\nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${exerciseQuant}`, () => {
      for (let index = 0; index < attempts; index++) {
        const arr = setArrEqual(maxN, exerciseQuant);
        // console.log('🚀 ~ file: equal.test.ts:12 ~ it ~ arr:', arr);
        expect(arr.length).toEqual(exerciseQuant);
      }
    });
  }
});

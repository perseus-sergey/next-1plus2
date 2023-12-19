import { getEqualArray } from './equal';

describe('makeExerciseArray', () => {
  const testingArrayQuantity = 50;
  it(`array quantity should be equal 10. Testing quantity: ${testingArrayQuantity}`, () => {
    for (let index = 0; index < testingArrayQuantity; index++) {
      const arr = getEqualArray();
      expect(arr.length).toEqual(10);
    }
  });
});

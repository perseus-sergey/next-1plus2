import setArrSequence from './sequence';

describe('setArrSequence', () => {
  const testingArrayQuantity = 5;
  it(`array quantity should be equal 10. Testing quantity: ${testingArrayQuantity}`, () => {
    for (let index = 0; index < testingArrayQuantity; index++) {
      const arr = setArrSequence(20);
      console.log('🚀 ~ file: sequence.test.ts:8 ~ it ~ arr:', JSON.stringify(arr));
      expect(arr.length).toEqual(10);
    }
  });
});

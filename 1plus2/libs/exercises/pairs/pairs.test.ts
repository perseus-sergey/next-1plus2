import setArrPair from './pairs';

describe('setArrPair', () => {
  const testingArrayQuantity = 55;
  const maxNum = 30;

  it(`array quantity should be equal 10. Testing quantity: ${testingArrayQuantity}\nmaxNum: ${maxNum}`, () => {
    for (let index = 0; index < testingArrayQuantity; index++) {
      const arr = setArrPair(maxNum);
      console.log('🚀 ~ file: sequence.test.ts:8 ~ it ~ arr:', JSON.stringify(arr));
      expect(arr.length).toEqual(10);
    }
  });
});

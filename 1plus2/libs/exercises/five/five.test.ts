import setArrFive from './five';

describe('setArrFive', () => {
  const testingArrayQuantity = 5;
  it(`array quantity should be equal 10. Testing quantity: ${testingArrayQuantity}`, () => {
    for (let index = 0; index < testingArrayQuantity; index++) {
      const arr = setArrFive();
      console.log('🚀 ~ file: five.test.ts:8 ~ it ~ arr:', JSON.stringify(arr));
      expect(arr.length).toEqual(10);
    }
  });
});

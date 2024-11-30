// - всього в масиві 10 масивів
// - в кожному масиві перші 2 числа - це рандомні числа, а третє - іх сума
// - перший доданок завжди має бути > 0
// - другий доданок може бути  як > 0 так і <0
// - сума завжди повинна бути > 0  і < 1000
// - в перших 5 масивах один з доданків це двозначне число
// - в останніх 5 масивах всі доданки це тризначні числа
// - всі масиви повинні бути унікальними

// =================================================================

export const setArrOverHundred = (quant = 10): number[][] => {
  const arrays: number[][] = [];

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function isUniqueArray(newArray: number[], existingArrays: number[][]): boolean {
    return !existingArrays.some(
      (arr) => arr[0] === newArray[0] && arr[1] === newArray[1] && arr[2] === newArray[2]
    );
  }

  while (arrays.length < quant) {
    let a: number, b: number, sum: number;

    if (arrays.length < quant / 2) {
      // First 5 arrays: one operand is two-digit
      a = getRandomNumber(10, 99); // Ensure a is two-digit
      b = getRandomNumber(-99, 999); // b can be negative or positive
    } else {
      // Last 5 arrays: both operands are three-digit
      a = getRandomNumber(100, 999); // Ensure a is three-digit
      b = getRandomNumber(-999, 999); // b can be negative or positive
    }

    sum = a + b;

    // Ensure sum is valid
    if (sum > 0 && sum < 1000) {
      const newArray = [a, b, sum];

      // Ensure uniqueness
      if (isUniqueArray(newArray, arrays)) {
        arrays.push(newArray);
      }
    }
  }

  return arrays;
};

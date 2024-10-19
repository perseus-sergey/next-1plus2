import { EExerciseCategories } from '@/models/math/types';
import { categoriesMap } from '../../../models/math/math.model';
import { makeExerciseArray } from '@/libs/math/math.controller';

const cat = EExerciseCategories['multiply'];
const attempts = 10;

describe(`🚀 ~ Category: ${cat}`, () => {
  const mapObj = categoriesMap.get(cat);
  if (!mapObj) return;
  const { start, max, step } = mapObj.exercise;
  const numExercisesInArray = 10;

  for (let maxN = start; maxN < max + 1; maxN += step) {
    it(`array quantity should be equal ${numExercisesInArray}. \nTesting attempts: ${attempts}\nmaxNum: ${maxN}\nexerciseQuant: ${numExercisesInArray}`, async () => {
      for (let index = 0; index < attempts; index++) {
        const arr = await makeExerciseArray(cat, maxN);
        console.log('🚀 ~ it ~ arr:', arr);
        expect(arr.length).toEqual(numExercisesInArray);
      }
    });
  }
});

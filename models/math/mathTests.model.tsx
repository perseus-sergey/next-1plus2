import { EExerciseCategories } from './types';

export const MATH_TESTS = {
  [EExerciseCategories.composition]: () => import('./composition.model'),
  [EExerciseCategories.pairs]: () => import('./pairs.model'),
  [EExerciseCategories.sequence]: () => import('./sequence.model'),
  [EExerciseCategories.equality]: () => import('./equality.model'),
  [EExerciseCategories['link-equality']]: () => import('./link-equality.model'),
  [EExerciseCategories.inequality]: () => import('./inequality.model'),
  [EExerciseCategories['equal-ten']]: () => import('./equal-ten.model'),
  [EExerciseCategories['equal-five']]: () => import('./equal-five.model'),
  [EExerciseCategories['equal-over-ten']]: () => import('./equal-over-ten.model'),
  [EExerciseCategories['equal-over-hundred']]: () => import('./equal-over-hundred.model'),
  [EExerciseCategories.multiply]: () => import('./multiply.model'),
  [EExerciseCategories.division]: () => import('./division.model'),
  [EExerciseCategories.level]: () => import('./level.model'),
};

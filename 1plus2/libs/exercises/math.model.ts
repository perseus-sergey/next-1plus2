import { ELang } from '../langMessages';

const keyboardNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const keyboardInEqualKeys = ['<', '=', '>'];

export type TCatObject = {
  title: string;
  description: string;
};

export interface IExerciseParams {
  [ELang.en]: TCatObject;
  [ELang.ua]: TCatObject;
  exercise: { start: number; max: number; step: number };
  keyboardKeys: string[];
}

type TCatMap = Map<EExerciseCategories, IExerciseParams>;

export enum EExerciseCategories {
  'SEQUENCE' = 'sequence',
  'EQUALITY' = 'equality',
  'PAIRS' = 'pairs',
  'LINK_EQUALITY' = 'link-equality',
  'INEQUALITY' = 'inequality',
  'EQUAL_TEN' = 'equal-ten',
  'COMPOSITION' = 'composition',
  'EQUAL_FIVE' = 'equal-five',
  'EQUAL_OVER_TEN' = 'equal-over-ten',
}

export const categoriesMap: TCatMap = new Map([
  [
    EExerciseCategories.SEQUENCE,
    {
      [ELang.en]: { title: 'title', description: '1 2 ?' },
      [ELang.ua]: { title: 'назва', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.EQUALITY,
    {
      [ELang.en]: { title: 'title', description: '1 + 2' },
      [ELang.ua]: { title: 'назва', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.PAIRS,
    {
      [ELang.en]: { title: 'title', description: '1 + 1' },
      [ELang.ua]: { title: 'назва', description: '1 + 1' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.LINK_EQUALITY,
    {
      [ELang.en]: { title: 'title', description: '1 + ?' },
      [ELang.ua]: { title: 'назва', description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.INEQUALITY,
    {
      [ELang.en]: { title: 'title', description: '< = >' },
      [ELang.ua]: { title: 'назва', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardInEqualKeys,
    },
  ],
  [
    EExerciseCategories.EQUAL_TEN,
    {
      [ELang.en]: { title: 'title', description: '1 + 10' },
      [ELang.ua]: { title: 'назва', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.COMPOSITION,
    {
      [ELang.en]: { title: 'title', description: 'Composition 11..19' },
      [ELang.ua]: { title: 'назва', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.EQUAL_FIVE,
    {
      [ELang.en]: { title: 'title', description: '10 + 5' },
      [ELang.ua]: { title: 'назва', description: '10 + 5' },
      exercise: { start: 50, max: 50, step: 1 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories.EQUAL_OVER_TEN,
    {
      [ELang.en]: { title: 'title', description: '7 + 8' },
      [ELang.ua]: { title: 'назва', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
]);

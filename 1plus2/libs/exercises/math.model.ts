import { ELang } from '../langMessages';

const keyboardNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const keyboardInEqualKeys = ['<', '=', '>'];
export type TUnequalMark = '>' | '<' | '=' | '';
export type TMinusPlus = '-' | '+' | '';

export const QUESTION_MARK = '?';

export type TCatObject = {
  title: string;
  description: string;
};

export interface IExerciseParams {
  [ELang.en]: TCatObject;
  [ELang.ua]: TCatObject;
  exercise: { start: number; max: number; step: number };
  equalMark: '=' | '';
  keyboardKeys: string[];
  isColumn?: boolean;
}

type TCatMap = Map<EExerciseCategories, IExerciseParams>;

export enum EExerciseCategories {
  'sequence' = 'sequence',
  'equality' = 'equality',
  'pairs' = 'pairs',
  'link-equality' = 'link-equality',
  'inequality' = 'inequality',
  'equal-ten' = 'equal-ten',
  'composition' = 'composition',
  'equal-five' = 'equal-five',
  'equal-over-ten' = 'equal-over-ten',
}

export const categoriesMap: TCatMap = new Map([
  [
    EExerciseCategories['sequence'],
    {
      [ELang.en]: { title: 'title', description: '1 2 ?' },
      [ELang.ua]: { title: 'назва', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '',
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories['equality'],
    {
      [ELang.en]: { title: 'title', description: '1 + 2' },
      [ELang.ua]: { title: 'назва', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['pairs'],
    {
      [ELang.en]: { title: 'title', description: '1 + 1' },
      [ELang.ua]: { title: 'назва', description: '1 + 1' },
      exercise: { start: 20, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['link-equality'],
    {
      [ELang.en]: { title: 'title', description: '1 + ?' },
      [ELang.ua]: { title: 'назва', description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['inequality'],
    {
      [ELang.en]: { title: 'title', description: '< = >' },
      [ELang.ua]: { title: 'назва', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '',
      keyboardKeys: keyboardInEqualKeys,
    },
  ],
  [
    EExerciseCategories['equal-ten'],
    {
      [ELang.en]: { title: 'title', description: '1 + 10' },
      [ELang.ua]: { title: 'назва', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['composition'],
    {
      [ELang.en]: { title: 'title', description: 'Composition 11..19' },
      [ELang.ua]: { title: 'назва', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['equal-five'],
    {
      [ELang.en]: { title: 'title', description: '10 + 5' },
      [ELang.ua]: { title: 'назва', description: '10 + 5' },
      exercise: { start: 50, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['equal-over-ten'],
    {
      [ELang.en]: { title: 'title', description: '7 + 8' },
      [ELang.ua]: { title: 'назва', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
]);

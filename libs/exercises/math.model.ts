import { ELang } from '../langMessages';
import { setArrCompos } from './composition/composition';
import setArrEqual from './equal/equal';
import setArrFive from './five/five';
import { setArrInequal } from './inequal/inequal';
import { NUMBER_OF_EXERCISES } from './math';
import { setArrDivision, setArrMultiply } from './multiply/multiply';
import { setArrOverTen } from './overTen/overTen';
import setArrPair from './pairs/pairs';
import setArrSequence from './sequence/sequence';
import { setArrTen } from './ten/ten';

export const keyboardNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const keyboardInequalKeys = ['<', '=', '>'];
export type TUnequalMark = '>' | '<' | '=' | '';
export enum EMinusPlus {
  MULTIPLY = '×',
  DIVISION = '/',
  MINUS = '-',
  PLUS = '+',
  EMPTY = '',
}

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
  'multiply' = 'multiply',
  'division' = 'division',
  'level' = 'level',
}

type TCatMap = Map<EExerciseCategories, IExerciseParams>;

export const categoriesMap: TCatMap = new Map([
  [
    EExerciseCategories['sequence'],
    {
      [ELang.en]: { title: 'Sequence', description: '1 2 ?' },
      [ELang.ua]: { title: 'Послідовність', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '',
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    EExerciseCategories['equality'],
    {
      [ELang.en]: { title: 'Equality', description: '1 + 2' },
      [ELang.ua]: { title: 'Рівність', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['pairs'],
    {
      [ELang.en]: { title: 'Pairs', description: '1 + 1' },
      [ELang.ua]: { title: 'Пари', description: '1 + 1' },
      exercise: { start: 20, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['link-equality'],
    {
      [ELang.en]: { title: 'Links', description: '1 + ?' },
      [ELang.ua]: { title: "Зв'язки", description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['inequality'],
    {
      [ELang.en]: { title: 'Inequality', description: '< = >' },
      [ELang.ua]: { title: 'Нерівність', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '',
      keyboardKeys: keyboardInequalKeys,
    },
  ],
  [
    EExerciseCategories['equal-ten'],
    {
      [ELang.en]: { title: 'Tens', description: '1 + 10' },
      [ELang.ua]: { title: 'Десятки', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['composition'],
    {
      [ELang.en]: { title: 'Composition', description: 'Composition 11..19' },
      [ELang.ua]: { title: 'Склад', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['equal-five'],
    {
      [ELang.en]: { title: 'Fives', description: '10 + 5' },
      [ELang.ua]: { title: "П'ятірки", description: '10 + 5' },
      exercise: { start: 20, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['equal-over-ten'],
    {
      [ELang.en]: { title: 'Over tens', description: '7 + 8' },
      [ELang.ua]: { title: 'Через десятки', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: true,
    },
  ],
  [
    EExerciseCategories['multiply'],
    {
      [ELang.en]: { title: 'Multiply', description: '2 x 3' },
      [ELang.ua]: { title: 'Множення', description: '2 x 3' },
      exercise: { start: 2, max: 10, step: 1 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: false,
    },
  ],
  [
    EExerciseCategories['division'],
    {
      [ELang.en]: { title: 'Division', description: '4 / 2' },
      [ELang.ua]: { title: 'Ділення', description: '4 / 2' },
      exercise: { start: 2, max: 10, step: 1 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: false,
    },
  ],
  [
    EExerciseCategories['level'],
    {
      [ELang.en]: { title: 'Levels', description: 'Levels' },
      [ELang.ua]: { title: 'Рівні', description: 'Levels' },
      exercise: { start: 10, max: 100, step: 10 },
      equalMark: '=',
      keyboardKeys: keyboardNumKeys,
      isColumn: false,
    },
  ],
]);

export const makeExerciseArray = (
  category: EExerciseCategories,
  maxNum = 100,
  numOfExs = NUMBER_OF_EXERCISES
): (string | number)[][] => {
  switch (category) {
    case EExerciseCategories['equality']:
      return setArrEqual(maxNum, numOfExs);
    case EExerciseCategories['sequence']:
      return setArrSequence(maxNum, numOfExs);
    case EExerciseCategories['pairs']:
      return setArrPair(maxNum, numOfExs);
    case EExerciseCategories['link-equality']:
      return setArrEqual(maxNum, numOfExs);
    case EExerciseCategories['inequality']:
      return setArrInequal(maxNum, numOfExs);
    case EExerciseCategories['equal-ten']:
      return setArrTen(maxNum, numOfExs);
    case EExerciseCategories['composition']:
      return setArrCompos(maxNum, numOfExs);
    case EExerciseCategories['equal-five']:
      return setArrFive(maxNum, numOfExs);
    case EExerciseCategories['equal-over-ten']:
      return setArrOverTen(maxNum, numOfExs);
    case EExerciseCategories['multiply']:
      return setArrMultiply(maxNum, numOfExs);
    case EExerciseCategories['division']:
      return setArrDivision(maxNum, numOfExs);

    default:
      return setArrEqual(maxNum, numOfExs);
  }
};

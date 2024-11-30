import { ELang } from '@models/types';
import { EExerciseCategories, IExerciseParams } from './types';

export const NUMBER_OF_EXERCISES = 10;
export const HARD_LEVELS_IN_ARRAY = 2;

export const keyboardNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const keyboardInequalKeys = ['<', '=', '>'];

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
    EExerciseCategories['equal-over-hundred'],
    {
      [ELang.en]: { title: 'Hundreds', description: '123 + 45' },
      [ELang.ua]: { title: 'Сотні', description: '123 + 45' },
      exercise: { start: 1000, max: 1000, step: 0 },
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

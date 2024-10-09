import { ELang } from '@/models/types';

type TLang = {
  [ELang.en]: string;
  [ELang.ua]: string;
};

type TTitleMap = Map<string, TLang>;

export enum EMessageNames {
  'MISSION_CHOICE' = 'choiceMiss',
  'SHOW_END_LEVEL' = 'showEndLevel',
  'CATEGORY_CHOICE' = 'categoryChoice',
  'CHOICE_MAX_EXS_NUM' = 'choiceMaxNumOfExs',
  'LEFT_EXS_NUM_MSG' = 'leftExs',
  'BRAVO' = 'bravo',
  'BAD' = 'bad',
  'NO_BAD' = 'notBad',
  'CORRECTION' = 'correction',
  'CONTINUE' = 'continue',
  'RESULTS' = 'results',
  'EXS_TIME' = 'exTime',
  'CATEGORY' = 'category',
  'MISTAKES' = 'mistakes',
  'BTN_LEVELS' = 'btnLevels',
  'BTN_CAT' = 'btnCat',
  'BTN_ENTER' = 'btnEnter',
  'BTN_MATH' = 'btnMath',
  'TITLE_HOME_PAGE' = 'titleHomePage',
  'TITLE_REPORT' = 'Report',
  'EXERCISES' = 'exercises',
  'HANGMAN' = 'hangman',
}

export const titleMap: TTitleMap = new Map([
  [
    EMessageNames.SHOW_END_LEVEL,
    { [ELang.en]: 'level is completed', [ELang.ua]: 'рівень пройдено' },
  ],
  [EMessageNames.LEFT_EXS_NUM_MSG, { [ELang.en]: 'Remains', [ELang.ua]: 'Залишилось' }],
  [EMessageNames.BRAVO, { [ELang.en]: 'BRAVO', [ELang.ua]: 'БРАВО!' }],
  [EMessageNames.BAD, { [ELang.en]: 'BAD!', [ELang.ua]: 'ПОГАНО!' }],
  [EMessageNames.NO_BAD, { [ELang.en]: 'NOT BAD', [ELang.ua]: 'НОРМАЛЬНО!' }],
  [EMessageNames.CORRECTION, { [ELang.en]: 'Correction', [ELang.ua]: 'Виправлення' }],
  [EMessageNames.CONTINUE, { [ELang.en]: 'Continue', [ELang.ua]: 'Далі' }],
  [EMessageNames.RESULTS, { [ELang.en]: 'Results', [ELang.ua]: 'Результати' }],
  [EMessageNames.EXS_TIME, { [ELang.en]: 'Execution time', [ELang.ua]: 'Час виконання' }],
  [EMessageNames.CATEGORY, { [ELang.en]: 'Category', [ELang.ua]: 'Категорія' }],
  [EMessageNames.MISTAKES, { [ELang.en]: 'Mistakes', [ELang.ua]: 'Помилки' }],
  [EMessageNames.BTN_LEVELS, { [ELang.en]: 'Levels', [ELang.ua]: 'Рівні' }],
  [EMessageNames.BTN_CAT, { [ELang.en]: 'Categories', [ELang.ua]: 'Категорії' }],
  [EMessageNames.BTN_ENTER, { [ELang.en]: 'Confirm', [ELang.ua]: 'Далі' }],
  [EMessageNames.BTN_MATH, { [ELang.en]: 'Maths', [ELang.ua]: 'Математика' }],
  [EMessageNames.TITLE_HOME_PAGE, { [ELang.en]: 'Home Page', [ELang.ua]: 'Домашня Сторінка' }],
  [EMessageNames.TITLE_REPORT, { [ELang.en]: 'Report', [ELang.ua]: 'Звіт' }],
  [EMessageNames.EXERCISES, { [ELang.en]: 'Exercises', [ELang.ua]: 'Завдань' }],
  [EMessageNames.HANGMAN, { [ELang.en]: 'Hangman', [ELang.ua]: 'Кат' }],
]);

export const getTitleFromMap = (
  msg: EMessageNames,
  lang: ELang = ELang.en,
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

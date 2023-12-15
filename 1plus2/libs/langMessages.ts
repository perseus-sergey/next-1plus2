// export type TLang = 'en' | 'ua';

export enum ELang {
  ENGLISH = 'en',
  UKRAINE = 'ua',
}

type TLang = {
  [ELang.ENGLISH]: string;
  [ELang.UKRAINE]: string;
};

type TTitleMap = Map<string, TLang>;

type TCatObject = {
  title: string;
  description: string;
};

type TCatMap = Map<
  string,
  {
    [ELang.ENGLISH]: TCatObject;
    [ELang.UKRAINE]: TCatObject;
    exercise: { start: number; max: number; step: number };
  }
>;

export enum EMessageNames {
  'MISSION_CHOICE' = 'choiceMiss',
  'SHOW_END_LEVEL' = 'showEndLevel',
  'CATEGORY_CHOICE' = 'categoryChoice',
  'CHOICE_MAX_EXS_NUM' = 'choiceMaxNumOfExs',
  'LEFT_EXS_NUM' = 'leftExs',
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
}

export const titleMap: TTitleMap = new Map([
  [
    EMessageNames.MISSION_CHOICE,
    { [ELang.ENGLISH]: 'Choose the task', [ELang.UKRAINE]: 'Обери завдання' },
  ],
  [
    EMessageNames.SHOW_END_LEVEL,
    { [ELang.ENGLISH]: 'level is completed', [ELang.UKRAINE]: 'рівень пройдено' },
  ],
  [
    EMessageNames.CATEGORY_CHOICE,
    { [ELang.ENGLISH]: 'Choose the category', [ELang.UKRAINE]: 'Обери категорію' },
  ],
  [
    EMessageNames.CHOICE_MAX_EXS_NUM,
    { [ELang.ENGLISH]: 'Choose Level', [ELang.UKRAINE]: 'Рівень складності' },
  ],
  [EMessageNames.LEFT_EXS_NUM, { [ELang.ENGLISH]: 'Remains', [ELang.UKRAINE]: 'Залишилось' }],
  [EMessageNames.BRAVO, { [ELang.ENGLISH]: 'BRAVO', [ELang.UKRAINE]: 'БРАВО!' }],
  [EMessageNames.BAD, { [ELang.ENGLISH]: 'BAD!', [ELang.UKRAINE]: 'ПОГАНО!' }],
  [EMessageNames.NO_BAD, { [ELang.ENGLISH]: 'NOT BAD', [ELang.UKRAINE]: 'НОРМАЛЬНО!' }],
  [EMessageNames.CORRECTION, { [ELang.ENGLISH]: 'Correction', [ELang.UKRAINE]: 'Виправлення' }],
  [EMessageNames.CONTINUE, { [ELang.ENGLISH]: 'Continue', [ELang.UKRAINE]: 'Далі' }],
  [EMessageNames.RESULTS, { [ELang.ENGLISH]: 'Results', [ELang.UKRAINE]: 'Результати' }],
  [EMessageNames.EXS_TIME, { [ELang.ENGLISH]: 'Execution time', [ELang.UKRAINE]: 'Час виконання' }],
  [EMessageNames.CATEGORY, { [ELang.ENGLISH]: 'Category', [ELang.UKRAINE]: 'Категорія' }],
  [EMessageNames.MISTAKES, { [ELang.ENGLISH]: 'Mistakes', [ELang.UKRAINE]: 'Помилки' }],
  [EMessageNames.BTN_LEVELS, { [ELang.ENGLISH]: 'Levels', [ELang.UKRAINE]: 'Рівні' }],
  [EMessageNames.BTN_CAT, { [ELang.ENGLISH]: 'Categories', [ELang.UKRAINE]: 'Категорії' }],
  [EMessageNames.BTN_ENTER, { [ELang.ENGLISH]: 'Confirm', [ELang.UKRAINE]: 'Далі' }],
]);

export enum EPageTitles {
  'MAIN' = 'main',
  'MATH' = 'math',
}

export enum EMetaTypes {
  'TITLE' = 'title',
  'DESCRIPTION' = 'description',
  'KEYWORDS' = 'keywords',
}

type TMetaMap = Map<
  EPageTitles,
  {
    [EMetaTypes.TITLE]: TLang;
    [EMetaTypes.DESCRIPTION]: TLang;
    [EMetaTypes.KEYWORDS]: TLang;
  }
>;

export const metaMap: TMetaMap = new Map([
  [
    EPageTitles.MAIN,
    {
      [EMetaTypes.TITLE]: {
        [ELang.ENGLISH]: '1+2 = Fun',
        [ELang.UKRAINE]: '1+2 = Весело',
      },
      [EMetaTypes.DESCRIPTION]: {
        [ELang.ENGLISH]:
          'Interactive online resource, homework, exams and tests. Useful for teachers, students and parents.',
        [ELang.UKRAINE]:
          'Інтерактивний розвиваючий онлайн ресурс, домашні роботи, іспити та тести. Корисно для вчителів, учнів та батьків.',
      },
      [EMetaTypes.KEYWORDS]: {
        [ELang.ENGLISH]:
          'Interactive, homework, exams, tests, mathematics, children, teachers, students and parents.',
        [ELang.UKRAINE]:
          'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
    },
  ],
  [
    EPageTitles.MATH,
    {
      [EMetaTypes.TITLE]: {
        [ELang.ENGLISH]: '1+2 | Fun Maths',
        [ELang.UKRAINE]: '1+2 | Весела Математика',
      },
      [EMetaTypes.DESCRIPTION]: {
        [ELang.ENGLISH]:
          "Fun children's mathematics, initial level, learn to count, add, subtract, comparison, more, less, equal.",
        [ELang.UKRAINE]:
          'Весела дитяча математика, початковий рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
      [EMetaTypes.KEYWORDS]: {
        [ELang.ENGLISH]:
          'children mathematics, level, learn, count, add, subtract, comparison, more, less, equal.',
        [ELang.UKRAINE]:
          'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
    },
  ],
]);

export const categoriesMap: TCatMap = new Map([
  [
    'sequence',
    {
      [ELang.ENGLISH]: { title: 'title', description: '1 2 ?' },
      [ELang.UKRAINE]: { title: 'назва', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equality',
    {
      [ELang.ENGLISH]: { title: 'title', description: '1 + 2' },
      [ELang.UKRAINE]: { title: 'назва', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'pairs',
    {
      [ELang.ENGLISH]: { title: 'title', description: '1 + 1' },
      [ELang.UKRAINE]: { title: 'назва', description: '1 + 1' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'link-equality',
    {
      [ELang.ENGLISH]: { title: 'title', description: '1 + ?' },
      [ELang.UKRAINE]: { title: 'назва', description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'inequality',
    {
      [ELang.ENGLISH]: { title: 'title', description: '< = >' },
      [ELang.UKRAINE]: { title: 'назва', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equal-ten',
    {
      [ELang.ENGLISH]: { title: 'title', description: '1 + 10' },
      [ELang.UKRAINE]: { title: 'назва', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'composition',
    {
      [ELang.ENGLISH]: { title: 'title', description: 'Composition 11..19' },
      [ELang.UKRAINE]: { title: 'назва', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
    },
  ],
  [
    'equal-ive',
    {
      [ELang.ENGLISH]: { title: 'title', description: '10 + 5' },
      [ELang.UKRAINE]: { title: 'назва', description: '10 + 5' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equal-over-ten',
    {
      [ELang.ENGLISH]: { title: 'title', description: '7 + 8' },
      [ELang.UKRAINE]: { title: 'назва', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
]);

export const getTitleFromMap = (
  msg: EMessageNames,
  lang: ELang = ELang.ENGLISH,
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

export const getCatFromMap = (
  msg: string,
  lang: ELang = ELang.ENGLISH,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

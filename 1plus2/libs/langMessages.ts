import { createArray } from './utils';

const NUMBER_OF_EXERCISES = 10;
const HARD_LEVELS_IN_ARRAY = 2;

export enum ELang {
  en = 'en',
  ua = 'ua',
}

type TLang = {
  [ELang.en]: string;
  [ELang.ua]: string;
};

type TTitleMap = Map<string, TLang>;

type TCatObject = {
  title: string;
  description: string;
};

export interface IExerciseParams {
  [ELang.en]: TCatObject;
  [ELang.ua]: TCatObject;
  exercise: { start: number; max: number; step: number };
  keyboardKeys: string[];
}

type TCatMap = Map<string, IExerciseParams>;

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
}

export const titleMap: TTitleMap = new Map([
  [EMessageNames.MISSION_CHOICE, { [ELang.en]: 'Choose the task', [ELang.ua]: 'Обери завдання' }],
  [
    EMessageNames.SHOW_END_LEVEL,
    { [ELang.en]: 'level is completed', [ELang.ua]: 'рівень пройдено' },
  ],
  [
    EMessageNames.CATEGORY_CHOICE,
    { [ELang.en]: 'Choose the category', [ELang.ua]: 'Обери категорію' },
  ],
  [
    EMessageNames.CHOICE_MAX_EXS_NUM,
    { [ELang.en]: 'Choose Level', [ELang.ua]: 'Рівень складності' },
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
        [ELang.en]: '1+2 = Fun',
        [ELang.ua]: '1+2 = Весело',
      },
      [EMetaTypes.DESCRIPTION]: {
        [ELang.en]:
          'Interactive online resource, homework, exams and tests. Useful for teachers, students and parents.',
        [ELang.ua]:
          'Інтерактивний розвиваючий онлайн ресурс, домашні роботи, іспити та тести. Корисно для вчителів, учнів та батьків.',
      },
      [EMetaTypes.KEYWORDS]: {
        [ELang.en]:
          'Interactive, homework, exams, tests, mathematics, children, teachers, students and parents.',
        [ELang.ua]:
          'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
    },
  ],
  [
    EPageTitles.MATH,
    {
      [EMetaTypes.TITLE]: {
        [ELang.en]: '1+2 | Fun Maths',
        [ELang.ua]: '1+2 | Весела Математика',
      },
      [EMetaTypes.DESCRIPTION]: {
        [ELang.en]:
          "Fun children's mathematics, initial level, learn to count, add, subtract, comparison, more, less, equal.",
        [ELang.ua]:
          'Весела дитяча математика, початковий рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
      [EMetaTypes.KEYWORDS]: {
        [ELang.en]:
          'children mathematics, level, learn, count, add, subtract, comparison, more, less, equal.',
        [ELang.ua]:
          'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
      },
    },
  ],
]);

const keyboardNumKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const keyboardInEqualKeys = ['<', '=', '>'];

export const categoriesMap: TCatMap = new Map([
  [
    'sequence',
    {
      [ELang.en]: { title: 'title', description: '1 2 ?' },
      [ELang.ua]: { title: 'назва', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'equality',
    {
      [ELang.en]: { title: 'title', description: '1 + 2' },
      [ELang.ua]: { title: 'назва', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'pairs',
    {
      [ELang.en]: { title: 'title', description: '1 + 1' },
      [ELang.ua]: { title: 'назва', description: '1 + 1' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'link-equality',
    {
      [ELang.en]: { title: 'title', description: '1 + ?' },
      [ELang.ua]: { title: 'назва', description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'inequality',
    {
      [ELang.en]: { title: 'title', description: '< = >' },
      [ELang.ua]: { title: 'назва', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardInEqualKeys,
    },
  ],
  [
    'equal-ten',
    {
      [ELang.en]: { title: 'title', description: '1 + 10' },
      [ELang.ua]: { title: 'назва', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'composition',
    {
      [ELang.en]: { title: 'title', description: 'Composition 11..19' },
      [ELang.ua]: { title: 'назва', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'equal-five',
    {
      [ELang.en]: { title: 'title', description: '10 + 5' },
      [ELang.ua]: { title: 'назва', description: '10 + 5' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
  [
    'equal-over-ten',
    {
      [ELang.en]: { title: 'title', description: '7 + 8' },
      [ELang.ua]: { title: 'назва', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
      keyboardKeys: keyboardNumKeys,
    },
  ],
]);

export const getTitleFromMap = (
  msg: EMessageNames,
  lang: ELang = ELang.en,
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

export const getCatFromMap = (
  msg: string,
  lang: ELang = ELang.en,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

const makeRandForEqual = (maxN = 100): number[] => {
  const randN1 = (): number => {
    const a = Math.floor(Math.random() * maxN) + 1; //  1 to maxN   0,maxN => (Math.random() * (maxN+1))
    return a % 10 ? a : randN1();
  };
  const randN2 = (): number => {
    const a = Math.floor(Math.random() * (2 * maxN + 1)) - maxN; // -maxN,maxN
    return a % 10 ? a : randN2();
  };

  const n1 = randN1();
  const n2 = randN2();
  return [n1, n2, n1 + n2];
};

function pushIntoArr(arr: number[][], quant: number, maxN: number, arEx: number[]): number[][] {
  // console.log('🚀 ~ file: langMessages.ts:261 ~ pushIntoArr ~ arr:', arr);
  // console.log('🚀 ~ file: langMessages.ts:261 ~ pushIntoArr ~ arEx:', arEx);
  if (arEx[2] > maxN || arEx[2] <= 0) return arr;
  if (!(quant < maxN) || !JSON.stringify(arr).includes(JSON.stringify(arEx))) return [...arr, arEx];
  return arr;
}

// => [[n1, n2, res], [n1, n2, res]]
const setArrEqual = (quant: number, maxN: number): number[][] =>
  createArray(quant).reduce((acc) => {
    const makeExsParts = (): number[] => {
      const exerciseParts = makeRandForEqual(maxN);
      const max_n = Math.max(exerciseParts[0], exerciseParts[1]);
      const minTen = max_n - (max_n % 10);
      if (
        exerciseParts[2] > maxN ||
        exerciseParts[2] <= 0 ||
        exerciseParts[2] > minTen + 10 ||
        exerciseParts[2] < minTen
      ) {
        return makeExsParts();
      }
      return exerciseParts;
    };
    return pushIntoArr(acc, quant, maxN, makeExsParts());
  }, []);

const makeExerciseArray = (numOfExs = NUMBER_OF_EXERCISES, maxNum = 100) => {
  const maxNumOfLevel = Math.floor(maxNum / HARD_LEVELS_IN_ARRAY);
  const quantExsPerLevel = Math.floor(numOfExs / HARD_LEVELS_IN_ARRAY);

  const arrTest = createArray(HARD_LEVELS_IN_ARRAY).reduce((acc, _, n) => {
    return [
      ...acc,
      ...setArrEqual(Math.floor(quantExsPerLevel * 0.7 * (n + 1)), maxNumOfLevel * (n + 1)),
    ];
  }, []);
  return arrTest;
};
console.log('🚀 ~ file: langMessages.ts:304 ~ makeExerciseArray:', makeExerciseArray());

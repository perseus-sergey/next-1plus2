// export type TLang = 'en' | 'ua';

export enum ELang {
  ENGLISH = 'en',
  UKRAINE = 'ua',
}

type TTitleMap = Map<
  string,
  {
    en: string;
    ua: string;
  }
>;

type TCatObject = {
  title: string;
  description: string;
};

type TCatMap = Map<
  string,
  {
    en: TCatObject;
    ua: TCatObject;
    exercise: { start: number; max: number; step: number };
  }
>;

export const titleMap: TTitleMap = new Map([
  ['choiceMiss', { en: 'Choose the task', ua: 'Обери завдання' }],
  ['showEndLevel', { en: 'level is completed', ua: 'рівень пройдено' }],
  ['categoryChoice', { en: 'Choose the category', ua: 'Обери категорію' }],
  ['choiceMaxNumOfExs', { en: 'Choose Level', ua: 'Рівень складності' }],
  ['leftExs', { en: 'Remains', ua: 'Залишилось' }],
  ['bravo', { en: 'BRAVO', ua: 'БРАВО!' }],
  ['bad', { en: 'BAD!', ua: 'ПОГАНО!' }],
  ['notBad', { en: 'NOT BAD', ua: 'НОРМАЛЬНО!' }],
  ['correction', { en: 'Correction', ua: 'Виправлення' }],
  ['continue', { en: 'Continue', ua: 'Далі' }],
  ['results', { en: 'Results', ua: 'Результати' }],
  ['exTime', { en: 'Execution time', ua: 'Час виконання' }],
  ['category', { en: 'Category', ua: 'Категорія' }],
  ['mistakes', { en: 'Mistakes', ua: 'Помилки' }],
  ['btnLevels', { en: 'Levels', ua: 'Рівні' }],
  ['btnCat', { en: 'Categories', ua: 'Категорії' }],
  ['btnEnter', { en: 'Confirm', ua: 'Далі' }],
]);

export const metaMap: TTitleMap = new Map([
  [
    'pageDescriptionMain',
    {
      en: 'Interactive online resource, homework, exams and tests. Useful for teachers, students and parents.',
      ua: 'Інтерактивний розвиваючий онлайн ресурс, домашні роботи, іспити та тести. Корисно для вчителів, учнів та батьків.',
    },
  ],
  [
    'pageKeywordsMain',
    {
      en: 'Interactive, homework, exams, tests, mathematics, children, teachers, students and parents.',
      ua: 'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
    },
  ],
  [
    'pageDescriptionMath',
    {
      en: "Fun children's mathematics, initial level, learn to count, add, subtract, comparison, more, less, equal.",
      ua: 'Весела дитяча математика, початковий рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
    },
  ],
  [
    'pageKeywordsMath',
    {
      en: 'children mathematics, level, learn, count, add, subtract, comparison, more, less, equal.',
      ua: 'дитяча математика, рівень, вчимося рахувати, додавання, віднімання, порівняння, більше, менше, дорівнює.',
    },
  ],
]);

export const categoriesMap: TCatMap = new Map([
  [
    'sequence',
    {
      en: { title: 'title', description: '1 2 ?' },
      ua: { title: 'назва', description: '1 2 ?' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equality',
    {
      en: { title: 'title', description: '1 + 2' },
      ua: { title: 'назва', description: '1 + 2' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'pairs',
    {
      en: { title: 'title', description: '1 + 1' },
      ua: { title: 'назва', description: '1 + 1' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'link-equality',
    {
      en: { title: 'title', description: '1 + ?' },
      ua: { title: 'назва', description: '1 + ?' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'inequality',
    {
      en: { title: 'title', description: '< = >' },
      ua: { title: 'назва', description: '< = >' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equal-ten',
    {
      en: { title: 'title', description: '1 + 10' },
      ua: { title: 'назва', description: '1 + 10' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'composition',
    {
      en: { title: 'title', description: 'Composition 11..19' },
      ua: { title: 'назва', description: 'Склад 11..19' },
      exercise: { start: 5, max: 20, step: 1 },
    },
  ],
  [
    'equal-ive',
    {
      en: { title: 'title', description: '10 + 5' },
      ua: { title: 'назва', description: '10 + 5' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
  [
    'equal-over-ten',
    {
      en: { title: 'title', description: '7 + 8' },
      ua: { title: 'назва', description: '7 + 8' },
      exercise: { start: 10, max: 100, step: 10 },
    },
  ],
]);

export const getTitleFromMap = (
  msg: string,
  lang: ELang = ELang.ENGLISH,
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

export const getCatFromMap = (
  msg: string,
  lang: ELang = ELang.ENGLISH,
  mapTitleObj = categoriesMap.get(msg)
): TCatObject => (mapTitleObj ? mapTitleObj[lang] : { title: '', description: '' });

export const getMetaFromMap = (
  msg: string,
  lang: ELang = ELang.ENGLISH,
  mapTitleObj = metaMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

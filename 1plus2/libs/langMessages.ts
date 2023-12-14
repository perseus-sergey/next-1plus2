export type TLang = 'en' | 'ua';

type ITitleMap = Map<
  string,
  {
    en: string;
    ua: string;
  }
>;
export const titleMap: ITitleMap = new Map([
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
  ['btnCompos', { en: 'Composition 11..19', ua: 'Склад 11..19' }],
  ['btnEnter', { en: 'Confirm', ua: 'Далі' }],
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

export const getTitleFromMap = (
  msg: string,
  lang: TLang = 'en',
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

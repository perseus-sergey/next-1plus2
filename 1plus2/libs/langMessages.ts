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
]);

export const getTitleFromMap = (
  msg: string,
  lang: TLang = 'en',
  mapTitleObj = titleMap.get(msg)
) => (mapTitleObj ? mapTitleObj[lang] : '');

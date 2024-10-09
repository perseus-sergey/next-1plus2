import { ELang } from '@models/types';

export const META_MATH_CATEGORY = {
  [ELang.ua]: {
    title: 'Обери категорію математичних завдань | 1plus2.fun',
    description:
      'Оберіть категорію завдань: додавання, віднімання, рівняння, послідовності та інше. Виберіть свій рівень складності для цікавого навчання.',
    keywords:
      'обери категорію, додавання, віднімання, рівняння, послідовності, математичні тести, рівень складності',
  },
  [ELang.en]: {
    title: 'Choose a Math Category | 1plus2.fun',
    description:
      'Choose a math task category: addition, subtraction, equations, sequences, and more. Select your difficulty level for engaging learning.',
    keywords:
      'choose category, addition, subtraction, equations, sequences, math tests, difficulty level',
  },
};

export const MATH_CATEGORY_PAGE_TEXT = {
  [ELang.ua]: (
    <p>
      Оберіть категорію математичних завдань, яка вам необхідна. Ви можете вибрати завдання з
      рівняннями, послідовностями, парними числами та іншими математичними операціями. Після вибору
      категорії оберіть рівень складності для початку тесту.
    </p>
  ),
  [ELang.en]: (
    <p>
      Choose the math task category that you need. You can select tasks with equations, sequences,
      even numbers, and other mathematical operations. After choosing a category, select the
      difficulty level to start the test.
    </p>
  ),
};

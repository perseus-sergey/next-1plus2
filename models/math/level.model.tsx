import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Обери рівень складності для математичних завдань | 1plus2.fun',
      description:
        'Оберіть рівень складності для математичних завдань: додавання, віднімання, послідовності, рівняння та інші операції з числами до 10, 20, 30 і більше. Навчайтесь ефективно, поступово підвищуючи рівень.',
      keywords:
        'рівень складності, математичні тести, додавання, віднімання, послідовності, рівняння, рівні складності, математика, тести до 100',
    },
    [ELang.en]: {
      title: 'Choose the Difficulty Level for Math Tasks | 1plus2.fun',
      description:
        'Select the difficulty level for math tasks: addition, subtraction, sequences, equations, and other number operations up to 10, 20, 30, and more. Learn effectively by gradually increasing the challenge.',
      keywords:
        'difficulty level, math tests, addition, subtraction, sequences, equations, levels of difficulty, math, tests up to 100',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Тести з математики до числа ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Пройдіть математичні тести з різних категорій на додавання, віднімання, послідовності, рівняння до числа ${number}.`;
      },
      getKeywords(number: string) {
        return `математичні тести до ${number}, додавання, віднімання, послідовності, рівняння, рівень складності`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Math Tests up to ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Take math tests from various categories: addition, subtraction, sequences, equations up to ${number}`;
      },
      getKeywords(number: string) {
        return `math tests up to ${number}, addition, subtraction, sequences, equations, difficulty level`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Оберіть рівень складності для математичних завдань, щоб розпочати серію тестів. Ви можете
        вибрати максимальне число для прикладів: від 10 до 100. Тест охоплюватиме додавання,
        віднімання, послідовності, рівняння та інші операції, і допоможе покращити ваші математичні
        навички. Почніть з простих завдань і поступово підвищуйте рівень, щоб досягти кращих
        результатів.
      </p>
    ),
    [ELang.en]: (
      <p>
        Choose the difficulty level for math tasks to start a series of tests. You can select the
        maximum number for examples: from 10 to 100. The test will cover addition, subtraction,
        sequences, equations, and other operations, helping you improve your math skills. Start with
        simple tasks and gradually increase the level to achieve better results.
      </p>
    ),
  },
};

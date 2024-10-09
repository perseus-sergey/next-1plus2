import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Додавання та віднімання кратних 5 | 1plus2.fun',
      description:
        'Тести на додавання та віднімання чисел кратних 5. Покращуйте свої математичні навички!',
      keywords:
        'додавання чисел кратних 5, віднімання чисел кратних 5, математичні тести, задачі для дітей',
    },
    [ELang.en]: {
      title: 'Adding and Subtracting Multiples of 5 | 1plus2.fun',
      description: 'Tests on adding and subtracting multiples of 5. Improve your math skills!',
      keywords: 'adding multiples of 5, subtracting multiples of 5, math tests, tasks for kids',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Додавання та віднімання кратних 5, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на додавання та віднімання чисел кратних 5 з результатом до ${number}. Тренуйтеся прямо зараз!`;
      },
      getKeywords(number: string) {
        return `додавання кратних 5, віднімання кратних 5, рівень ${number}, математичні тести`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Adding and Subtracting Multiples of 5, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on adding and subtracting multiples of 5 with results up to ${number}. Start practicing now!`;
      },
      getKeywords(number: string) {
        return `adding multiples of 5, subtracting multiples of 5, level ${number}, math tests`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на <span className="text-2xl text-blue-100">додавання та віднімання</span>{' '}
        чисел кратних 5. Оберіть рівень і почніть тренування!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on <span className="text-2xl text-blue-100">adding and subtracting</span>{' '}
        multiples of 5. Choose a level and start practicing!
      </p>
    ),
  },
};

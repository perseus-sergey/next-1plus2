import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Додавання і віднімання за межами десятка | 1plus2.fun',
      description:
        'Тести на додавання і віднімання чисел, які виходять за межі одного десятка. Підвищуйте свої математичні навички!',
      keywords: 'додавання, віднімання, за межами десятка, математичні тести, навчання',
    },
    [ELang.en]: {
      title: 'Addition and Subtraction Over Ten | 1plus2.fun',
      description:
        'Tests on adding and subtracting numbers that go beyond a single decade. Enhance your math skills!',
      keywords: 'addition, subtraction, over ten, math tests, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Додавання і віднімання за межами десятка, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на додавання і віднімання чисел, які виходять за межі десятка, на рівні ${number}.`;
      },
      getKeywords(number: string) {
        return `додавання, віднімання, за межами десятка, рівень ${number}, математичні тести`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Addition and Subtraction Over Ten, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on adding and subtracting numbers beyond a decade at level ${number}.`;
      },
      getKeywords(number: string) {
        return `addition, subtraction, over ten, level ${number}, math tests`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на <span className="text-2xl text-blue-100">додавання та віднімання</span>{' '}
        чисел, які виходять за межі десятка. Виберіть рівень і почніть практикуватися!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on <span className="text-2xl text-blue-100">adding and subtracting</span>{' '}
        numbers beyond a single decade. Choose a level and start practicing!
      </p>
    ),
  },
};

import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Додавання і віднімання тризначних чисел | 1plus2.fun',
      description:
        'Тести на додавання і віднімання тризначних чисел. Покращуйте свої навички обчислень!',
      keywords: 'додавання, віднімання, тризначні числа, математичні тести, навчання',
    },
    [ELang.en]: {
      title: 'Addition and Subtraction of Three-Digit Numbers | 1plus2.fun',
      description:
        'Tests on adding and subtracting three-digit numbers. Improve your calculation skills!',
      keywords: 'addition, subtraction, three-digit numbers, math tests, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Додавання і віднімання тризначних чисел, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на додавання і віднімання тризначних чисел на рівні ${number}.`;
      },
      getKeywords(number: string) {
        return `додавання, віднімання, тризначні числа, рівень ${number}, математичні тести`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Addition and Subtraction of Three-Digit Numbers, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on adding and subtracting three-digit numbers at level ${number}.`;
      },
      getKeywords(number: string) {
        return `addition, subtraction, three-digit numbers, level ${number}, math tests`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на <span className="text-2xl text-blue-100">додавання та віднімання</span>{' '}
        тризначних чисел. Виберіть рівень і почніть практикуватися!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on <span className="text-2xl text-blue-100">adding and subtracting</span>{' '}
        three-digit numbers. Choose a level and start practicing!
      </p>
    ),
  },
};

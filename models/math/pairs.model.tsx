import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Додавання парних чисел | 1plus2.fun',
      description:
        'Тести з додавання парних чисел. Тренуйте свої математичні навички, додаючи парні числа в межах заданих рівнів складності.',
      keywords:
        'додавання парних чисел, математичні тести, парні числа, задачі для дітей, навчання',
    },
    [ELang.en]: {
      title: 'Adding Even Numbers | 1plus2.fun',
      description:
        'Tests on adding even numbers. Improve your math skills by solving even number addition tasks at different difficulty levels.',
      keywords: 'adding even numbers, math tests, even numbers, kids tasks, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Додавання парних чисел, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести з додавання парних чисел з результатом до ${number}. Вдосконалюйте свої математичні навички!`;
      },
      getKeywords(number: string) {
        return `додавання парних чисел, математичні тести, рівень ${number}, парні числа`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Adding Even Numbers, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on adding even numbers with results up to ${number}. Improve your math skills!`;
      },
      getKeywords(number: string) {
        return `adding even numbers, math tests, level ${number}, even numbers`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Тести для тренування навичок{' '}
        <span className="text-2xl text-blue-100">додавання парних чисел</span>. Виберіть рівень і
        покращуйте свої знання, вирішуючи задачі!
      </p>
    ),
    [ELang.en]: (
      <p>
        Tests to improve your <span className="text-2xl text-blue-100">even number addition</span>{' '}
        skills. Choose your level and practice solving tasks!
      </p>
    ),
  },
};

import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Послідовності чисел | 1plus2.fun',
      description:
        'Тести на визначення пропущених чисел у послідовностях. Розвивайте логічне мислення та математичні навички!',
      keywords: 'послідовності чисел, математичні тести, задачі на логіку, розвиток мислення',
    },
    [ELang.en]: {
      title: 'Number Sequences | 1plus2.fun',
      description:
        'Tests for identifying missing numbers in sequences. Develop your logical thinking and math skills!',
      keywords: 'number sequences, math tests, logic problems, thinking development',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Послідовності чисел, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на визначення пропущених чисел у послідовностях з числами від 10 до 100 (шаг 10) на рівні ${number}.`;
      },
      getKeywords(number: string) {
        return `послідовності чисел, рівень ${number}, математичні тести, пропущені числа`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Number Sequences, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests for identifying missing numbers in sequences from 10 to 100 (step 10) at level ${number}.`;
      },
      getKeywords(number: string) {
        return `number sequences, level ${number}, math tests, missing numbers`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на <span className="text-2xl text-blue-100">послідовності чисел</span>,
        заповнюючи пропуски. Виберіть рівень і тренуйтеся!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on <span className="text-2xl text-blue-100">number sequences</span> by filling
        in the gaps. Choose a level and practice!
      </p>
    ),
  },
};

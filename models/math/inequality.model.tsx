import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Нерівності | 1plus2.fun',
      description:
        'Тести на визначення символів нерівності. Вдосконалюйте логічне мислення і математичні навички!',
      keywords: 'нерівності, символи нерівності, математичні тести, навчання',
    },
    [ELang.en]: {
      title: 'Inequalities | 1plus2.fun',
      description:
        'Tests for determining inequality symbols. Improve your logical thinking and math skills!',
      keywords: 'inequalities, inequality symbols, math tests, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Нерівності, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на визначення символів нерівності з числами від 10 до 100 (шаг 10) на рівні ${number}.`;
      },
      getKeywords(number: string) {
        return `нерівності, рівень ${number}, математичні тести, символи нерівності`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Inequalities, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests for determining inequality symbols with numbers from 10 to 100 (step 10) at level ${number}.`;
      },
      getKeywords(number: string) {
        return `inequalities, level ${number}, math tests, inequality symbols`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на{' '}
        <span className="text-2xl text-blue-100">визначення символів нерівності</span>. Оберіть
        рівень і тренуйтеся!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on{' '}
        <span className="text-2xl text-blue-100">determining inequality symbols</span>. Choose a
        level and practice!
      </p>
    ),
  },
};

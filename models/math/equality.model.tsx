import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Рівності в межах десятка | 1plus2.fun',
      description:
        'Тести на додавання та віднімання в межах одного десятка. Перевірте свої математичні навички!',
      keywords: 'рівності, додавання, віднімання, математичні тести, навчання',
    },
    [ELang.en]: {
      title: 'Equations within a Decade | 1plus2.fun',
      description:
        'Tests on addition and subtraction within a single decade. Check your math skills!',
      keywords: 'equations, addition, subtraction, math tests, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Рівності в межах десятка, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на додавання та віднімання в межах десятка з результатом до ${number}.`;
      },
      getKeywords(number: string) {
        return `рівності, додавання, віднімання, рівень ${number}, математичні тести`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Equations within a Decade, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on addition and subtraction within a decade with results up to ${number}.`;
      },
      getKeywords(number: string) {
        return `equations, addition, subtraction, level ${number}, math tests`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Практикуйте <span className="text-2xl text-blue-100">додавання та віднімання</span> в межах
        десятка. Виберіть рівень і почніть вирішувати задачі!
      </p>
    ),
    [ELang.en]: (
      <p>
        Practice <span className="text-2xl text-blue-100">addition and subtraction</span> within a
        decade. Choose a level and start solving tasks!
      </p>
    ),
  },
};

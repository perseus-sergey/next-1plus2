import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Рівняння на додавання та віднімання в межах одного десятка | 1plus2.fun',
      description:
        'Тести на визначення пропущеного числа в рівняннях на додавання та віднімання в межах одного десятка. Тренуйте свої математичні навички!',
      keywords:
        'рівняння на додавання, рівняння на віднімання, рівність, математичні тести, навчання, пропущене число',
    },
    [ELang.en]: {
      title: 'Addition and Subtraction Equations within a Decade | 1plus2.fun',
      description:
        'Tests for identifying the missing number in addition and subtraction equations within a decade. Practice your math skills!',
      keywords:
        'addition equations, subtraction equations, equality, math tests, learning, missing number',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Рівняння на додавання/віднімання в межах одного десятка, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на визначення пропущеного числа в рівняннях на додавання/віднімання з результатом до ${number}.`;
      },
      getKeywords(number: string) {
        return `рівняння на додавання, рівняння на віднімання, рівень ${number}, математичні тести, пропущене число`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Addition/Subtraction Equations within a Decade, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests for identifying the missing number in addition/subtraction equations with results up to ${number}.`;
      },
      getKeywords(number: string) {
        return `addition equations, subtraction equations, level ${number}, math tests, missing number`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте <span className="text-2xl text-blue-100">рівняння на додавання/віднімання</span> в
        межах одного десятка, заповнюючи пропущені числа. Виберіть рівень і тренуйтеся!
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve <span className="text-2xl text-blue-100">addition/subtraction equations</span> within
        a decade by filling in the missing numbers. Choose a level and practice!
      </p>
    ),
  },
};

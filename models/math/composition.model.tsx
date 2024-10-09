import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Склад числа | 1plus2.fun',
      description: 'Тести на визначення складу чисел. Покращуйте свої математичні навички!',
      keywords: 'склад числа, математичні тести, задачі на склад чисел, навчання',
    },
    [ELang.en]: {
      title: 'Number Composition | 1plus2.fun',
      description: 'Tests for determining number composition. Improve your math skills!',
      keywords: 'number composition, math tests, number composition problems, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Склад числа ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на визначення складу числа ${number}.`;
      },
      getKeywords(number: string) {
        return `склад числа ${number}, математичні тести, задачі на склад числа`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Composition of the number ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests for determining the composition of the number ${number}.`;
      },
      getKeywords(number: string) {
        return `number composition, level ${number}, math tests, number composition problems`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вивчайте <span className="text-2xl text-blue-100">склад числа</span> за допомогою цих
        тестів. Виберіть число і почніть практикуватися!
      </p>
    ),
    [ELang.en]: (
      <p>
        Learn <span className="text-2xl text-blue-100">number composition</span> through these
        tests. Choose a number and start practicing!
      </p>
    ),
  },
};

import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Множення | 1plus2.fun',
      description: 'Тести на множення обраного числа. Розвивайте свої навички множення!',
      keywords: 'множення, математичні тести, задачі на множення, навчання',
    },
    [ELang.en]: {
      title: 'Multiplication | 1plus2.fun',
      description: 'Tests on multiplying the selected number. Develop your multiplication skills!',
      keywords: 'multiplication, math tests, multiplication problems, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Множення на число ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на множення числа ${number}.`;
      },
      getKeywords(number: string) {
        return `множення, рівень ${number}, математичні тести, задачі на множення`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Multiplication by ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on multiplying the number ${number}.`;
      },
      getKeywords(number: string) {
        return `multiplication, level ${number}, math tests, multiplication problems`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Практикуйте <span className="text-2xl text-blue-100">множення</span> обраного числа.
        Виберіть рівень і почніть тренування!
      </p>
    ),
    [ELang.en]: (
      <p>
        Practice <span className="text-2xl text-blue-100">multiplying</span> the selected number.
        Choose a level and start practicing!
      </p>
    ),
  },
};

import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Ділення | 1plus2.fun',
      description: 'Тести на ділення на обране число. Розвивайте свої навички ділення!',
      keywords: 'ділення, математичні тести, задачі на ділення, навчання',
    },
    [ELang.en]: {
      title: 'Division | 1plus2.fun',
      description: 'Tests on dividing by the selected number. Develop your division skills!',
      keywords: 'division, math tests, division problems, learning',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Ділення на ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на ділення на число ${number}.`;
      },
      getKeywords(number: string) {
        return `ділення на ${number}, математичні тести, задачі на ділення`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Division by ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on dividing by the number ${number}.`;
      },
      getKeywords(number: string) {
        return `Division by ${number}, math tests, division problems`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Практикуйте <span className="text-2xl text-blue-100">ділення</span> на обране число.
        Виберіть рівень і почніть тренування!
      </p>
    ),
    [ELang.en]: (
      <p>
        Practice <span className="text-2xl text-blue-100">dividing</span> by the selected number.
        Choose a level and start practicing!
      </p>
    ),
  },
};

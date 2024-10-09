import { ELang } from '@models/types';
import { IPageData } from './types';

export const PAGE_DATA: IPageData = {
  meta: {
    [ELang.ua]: {
      title: 'Рівність десятків: додавання та віднімання | 1plus2.fun',
      description:
        'Тести на додавання і віднімання десятків. Перевірте свої математичні навички за допомогою простих задач!',
      keywords:
        'рівність десятків, додавання десятків, віднімання десятків, математичні тести, навчання математики',
    },
    [ELang.en]: {
      title: 'Equal Ten: Adding and Subtracting Tens | 1plus2.fun',
      description:
        'Tests on adding and subtracting tens. Check your math skills with simple tasks!',
      keywords: 'equal ten, adding tens, subtracting tens, math tests, learning math',
    },
  },

  metaLevel: {
    [ELang.ua]: {
      getTitle(number: string) {
        return `Рівність десятків, рівень ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Тести на додавання і віднімання десятків з результатами до ${number}. Відмінний спосіб покращити навички роботи з числами!`;
      },
      getKeywords(number: string) {
        return `рівність десятків, рівень ${number}, додавання десятків, віднімання десятків, математичні тести`;
      },
    },
    [ELang.en]: {
      getTitle(number: string) {
        return `Equal Ten, Level ${number} | 1plus2.fun`;
      },
      getDescription(number: string) {
        return `Tests on adding and subtracting tens with results up to ${number}. A great way to improve number skills!`;
      },
      getKeywords(number: string) {
        return `equal ten, level ${number}, adding tens, subtracting tens, math tests`;
      },
    },
  },

  text: {
    [ELang.ua]: (
      <p>
        Вирішуйте задачі на{' '}
        <span className="text-2xl text-blue-100">додавання та віднімання десятків</span>. Виберіть
        рівень і почніть тренування! Завдання допоможуть вам легко працювати з числами на десятки,
        покращуючи ваші математичні навички.
      </p>
    ),
    [ELang.en]: (
      <p>
        Solve tasks on <span className="text-2xl text-blue-100">adding and subtracting tens</span>.
        Choose a level and start practicing! These tasks will help you work with tens effortlessly,
        improving your math skills.
      </p>
    ),
  },
};

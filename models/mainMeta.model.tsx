import { ELang } from '@models/types';
import { ReactNode } from 'react';

export const DEFAULT_META_DATA = {
  [ELang.ua]: {
    title: '1plus2.fun – Вчимо та розважаємось',
    description:
      'Розважайтеся та навчайтеся одночасно на 1plus2.fun! Вивчайте математику, грайте в Hangman та освоюйте мови за допомогою наших захопливих тестів та ігор.',
    keywords:
      'навчальні ігри, математика для дітей, тестові завдання, гра Кат, вивчення мов, штучний інтелект для навчання, мовні тести, розваги та навчання',
  },
  [ELang.en]: {
    title: '1plus2.fun – Learn and Have Fun',
    description:
      'Have fun and learn at the same time on 1plus2.fun! Explore math challenges, play Hangman, and master languages with our engaging tests and games.',
    keywords:
      'educational games, math for kids, test tasks, Hangman game, language learning, AI for education, language tests, fun and learning',
  },
};

export const MAIN_PAGE_TEXT: Record<ELang, ReactNode> = {
  [ELang.ua]: (
    <>
      <p>
        Ласкаво просимо до <span className="text-xl text-blue-100">1plus2.fun</span> - вашого
        найкращого місця для розваг та навчання! Оберіть категорію, яка вас цікавить, та почніть
        свою подорож у світ знань та веселощів!
      </p>
      <p>
        Грайте в {`"Кат"`} або вивчайте іноземні мови за допомогою наших тестів. Кожна гра має різні
        рівні складності, що робить навчання захоплюючим та ефективним.
      </p>
    </>
  ),
  [ELang.en]: (
    <>
      <p>
        Welcome to <span className="text-xl text-blue-100">1plus2.fun</span> - your ultimate
        destination for fun and learning! Choose a category that excites you and embark on a journey
        of knowledge and entertainment!
      </p>
      <p>
        Choose from math, play {`"Hangman"`}, or improve your language skills with our tests. Each
        game offers different difficulty levels, making learning fun and engaging.
      </p>
    </>
  ),
};

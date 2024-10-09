import { ELang } from './types';

export const META_ABOUT = {
  [ELang.ua]: {
    title: 'Про 1plus2.fun',
    description:
      'Дізнайтеся більше про нашу місію: допомогти вам навчатися та розважатися за допомогою інноваційних навчальних ігор та тестів. Ми прагнемо зробити навчання цікавим та доступним для всіх.',
    keywords:
      'про нас, місія сайту, навчальні ігри, інновації в освіті, команда 1plus2.fun, розваги та навчання',
  },
  [ELang.en]: {
    title: 'About 1plus2.fun',
    description:
      'Learn more about our mission: to help you learn and have fun through innovative educational games and tests. We aim to make learning engaging and accessible for everyone.',
    keywords:
      'about us, site mission, educational games, innovation in education, 1plus2.fun team, fun and learning',
  },
};

export const ABOUT_PAGE_TEXT = {
  [ELang.ua]: (
    <p>
      <span className="text-2xl text-blue-100">1plus2.fun</span> - це проект, спрямований на
      поєднання навчання та розваг. Наша мета – створити інструменти, які допоможуть кожному,
      незалежно від віку, покращувати свої знання в ігровій формі. Ми віримо, що процес навчання
      повинен бути захоплюючим і доступним, тому використовуємо штучний інтелект, щоб створювати
      персоналізовані завдання для кожного користувача.
    </p>
  ),
  [ELang.en]: (
    <p>
      <span className="text-2xl text-blue-100">1plus2.fun</span> is a project aimed at combining
      learning and entertainment. Our goal is to create tools that help everyone, regardless of age,
      improve their skills through playful learning. We believe that the learning process should be
      engaging and accessible, which is why we use AI to create personalized tasks for every user.
    </p>
  ),
};

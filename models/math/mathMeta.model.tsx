import { ELang } from '@models/types';

export const META_MATH = {
  [ELang.ua]: {
    title: 'Весела Математика | 1plus2.fun',
    description:
      'Обери категорію математичних завдань: додавання, віднімання, множення, ділення та інші. Різні рівні складності для ефективного навчання.',
    keywords:
      'обери завдання, математичні тести, додавання, віднімання, множення, ділення, рівень складності',
  },
  [ELang.en]: {
    title: 'Fun Maths | 1plus2.fun',
    description:
      'Choose a math category: addition, subtraction, multiplication, division, and more. Various difficulty levels for effective learning.',
    keywords:
      'choose task, math tests, addition, subtraction, multiplication, division, difficulty level',
  },
};

export const MATH_PAGE_TEXT = {
  [ELang.ua]: (
    <p>
      Ласкаво просимо до розділу{' '}
      <span className="text-2xl text-blue-100">математичних завдань</span>! Оберіть завдання для
      тренування своїх навичок: додавайте, віднімайте, множте чи діліть числа. Кожне завдання
      підібране з урахуванням різних рівнів складності, щоб навчання було цікавим та корисним для
      всіх.
    </p>
  ),
  [ELang.en]: (
    <p>
      Welcome to the <span className="text-2xl text-blue-100">math tasks</span> section! Choose a
      task to practice your skills: add, subtract, multiply, or divide numbers. Each task is
      designed with different difficulty levels in mind, making learning both fun and beneficial for
      everyone.
    </p>
  ),
};

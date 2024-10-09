import { ELang } from './types';

export interface ITranslation {
  id: number;
  english: string;
  ukrainian: string;
  transcription?: string;
}

export interface IGenerateAiSettings {
  taskType: ETaskType;
  level: number;
  quantity: number;
  topic: string;
  languageAsk: string;
  languageAnswer: string;
}

export enum ETaskType {
  phrases = 'phrases',
  words = 'words',
  sentences = 'sentences',
}

export const META_REPEATER = {
  [ELang.ua]: {
    title: 'Вивчення мов з ШІ на 1plus2.fun',
    description:
      'Вивчайте мови легко та ефективно з нашим ШІ репетитором! Створюйте індивідуальні тести та вивчайте нові слова та фрази.',
    keywords:
      'вивчення мов, AI репетитор, мовні тести, онлайн курси, вивчення англійської, вивчення іноземних мов',
  },
  [ELang.en]: {
    title: 'Language Learning with AI on 1plus2.fun',
    description:
      'Learn languages easily and effectively with our AI tutor! Create personalized tests and learn new words and phrases.',
    keywords:
      'language learning, AI tutor, language tests, online courses, learn English, foreign language learning',
  },
};

export const REPEATER_PAGE_TEXT = {
  [ELang.ua]:
    'Вітаємо на сторінці «Репетитор»! Тут ви можете обрати параметри для створення мовних завдань: вибирайте мову, яку хочете вивчати, перекладну мову, складність і тематику. Наш штучний інтелект підготує для вас завдання, які допоможуть ефективно засвоїти нові знання.',
  [ELang.en]:
    'Welcome to the Repeater page! Here you can customize the parameters for language learning tasks: select the language you want to study, the translation language, difficulty level, and topic. Our AI will create tasks that will help you learn more effectively.',
};

export const promptModel = {
  maxLevel: 10,
  maxTaskGeneration: 30,
  defaultTopic: 'general',
  defaultTaskType: ETaskType.phrases,
  maxWordsInWords: 1,
  maxWordsInPhrases: 3,
  maxWordsInSentences: 11,
};

export const LANGUAGES = [
  'English',
  'Ukrainian',
  'Greek',
  'Chinese',
  'Spanish',
  'Hindi',
  'Arabic',
  'Bengali',
  'Portuguese',
  'Japanese',
  'Turkish',
  'Korean',
  'French',
  'German',
  'Italian',
  'Polish',
  'Czech',
];

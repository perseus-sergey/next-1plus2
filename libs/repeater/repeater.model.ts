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

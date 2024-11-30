import { ELang } from '../types';

export enum EExerciseCategories {
  'composition' = 'composition',
  'pairs' = 'pairs',
  'sequence' = 'sequence',
  'equality' = 'equality',
  'link-equality' = 'link-equality',
  'inequality' = 'inequality',
  'equal-ten' = 'equal-ten',
  'equal-five' = 'equal-five',
  'equal-over-ten' = 'equal-over-ten',
  'equal-over-hundred' = 'equal-over-hundred',
  'multiply' = 'multiply',
  'division' = 'division',
  'level' = 'level',
}

export const QUESTION_MARK = '?';

export type TUnequalMark = '>' | '<' | '=' | '';

export enum EMinusPlus {
  MULTIPLY = '×',
  DIVISION = '/',
  MINUS = '-',
  PLUS = '+',
  EMPTY = '',
}

export type TCatObject = {
  title: string;
  description: string;
};

export interface IExerciseParams {
  [ELang.en]: TCatObject;
  [ELang.ua]: TCatObject;
  exercise: { start: number; max: number; step: number };
  equalMark: '=' | '';
  keyboardKeys: string[];
  isColumn?: boolean;
}

interface IMetaData {
  title: string;
  description: string;
  keywords: string;
}

interface IMetaDataFn {
  getTitle(number: string): string;
  getDescription(number: string): string;
  getKeywords(number: string): string;
}

export interface IPageData {
  meta: {
    [key in ELang]: IMetaData;
  };
  metaLevel: {
    [key in ELang]: IMetaDataFn;
  };
  text: {
    [key in ELang]: React.ReactNode;
  };
}

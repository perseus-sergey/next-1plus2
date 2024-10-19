import { DEFAULT_LANG, ELang } from '@/models/types';

export const getELangKey = (lang: string): ELang =>
  Object.values(ELang).includes(lang as ELang) ? (lang as ELang) : DEFAULT_LANG;

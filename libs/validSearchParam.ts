import { DEFAULT_LANG, ELang } from '@/models/types';
import { cache } from 'react';

export const isValidLanguage = (lang: string): boolean =>
  Object.values(ELang).includes(lang as ELang);

export const getELangKey = cache((lang: string): ELang => {
  const isValid = isValidLanguage(lang);

  return isValid ? (lang as ELang) : DEFAULT_LANG;
});

import { ELang } from '@/models/types';
import React, { createContext, useContext } from 'react';

interface IProps {
  children: React.ReactNode;
  language: ELang;
}

type TLanguageContext = {
  language: ELang;
};

const LanguageContext = createContext<TLanguageContext>({} as TLanguageContext);

export const useLangProvider = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const LanguageProvider = ({ children, language }: IProps) => (
  <LanguageContext.Provider value={{ language }}>{children}</LanguageContext.Provider>
);

export default LanguageProvider;

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { TLang } from '../langMessages';

type TProps = { children: JSX.Element };
type TLangContext = { language: TLang; setLanguage: Dispatch<SetStateAction<TLang>> };

const LangContext = createContext<TLangContext>({} as TLangContext);

export const useLanguage = () => useContext(LangContext);

export default function LanguageProvider({ children }: TProps) {
  const [language, setLanguage] = useState<TLang>('en');

  return <LangContext.Provider value={{ language, setLanguage }}>{children}</LangContext.Provider>;
}

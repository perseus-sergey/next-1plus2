import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { ELang } from '../langMessages';

type TProps = { children: JSX.Element };
type TLangContext = { language: ELang; setLanguage: Dispatch<SetStateAction<ELang>> };

const LangContext = createContext<TLangContext>({} as TLangContext);

export const useLanguage = () => useContext(LangContext);

export default function LanguageProvider({ children }: TProps) {
  const [language, setLanguage] = useState<ELang>(ELang.ENGLISH);

  return <LangContext.Provider value={{ language, setLanguage }}>{children}</LangContext.Provider>;
}

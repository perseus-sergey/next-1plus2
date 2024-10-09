'use client';

import { useCallback, useState } from 'react';
import DictionaryPage from './DictionaryPage';
import RepeaterTestPage from './RepeaterTestPage';
import { ELang } from '@models/types';
import { ITranslation } from '@/models/repeater.model';

const RepeaterPage = ({ lang }: { lang: ELang }) => {
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = useCallback(() => {
    setIsTestStarted(true);
  }, []);

  return !isTestStarted ? (
    <DictionaryPage
      lang={lang}
      translations={translations}
      setTranslations={setTranslations}
      startTest={startTest}
    />
  ) : (
    <RepeaterTestPage
      lang={lang}
      translations={translations}
      setIsTestStarted={setIsTestStarted}
      translationsLength={translations.length}
    />
  );
};

export default RepeaterPage;

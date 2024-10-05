'use client';

import DictionaryPage from '@/components/Repeater/DictionaryPage';
import RepeaterTestPage from '@/components/Repeater/RepeaterTestPage';
import { ITranslation } from '@/libs/repeater/repeater.model';
import { useCallback, useState } from 'react';

const Page = () => {
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = useCallback(() => {
    setIsTestStarted(true);
  }, []);

  return !isTestStarted ? (
    <DictionaryPage
      translations={translations}
      setTranslations={setTranslations}
      startTest={startTest}
    />
  ) : (
    <RepeaterTestPage
      translations={translations}
      setIsTestStarted={setIsTestStarted}
      translationsLength={translations.length}
    />
  );
};

export default Page;

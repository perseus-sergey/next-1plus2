'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { ELang } from '@models/types';
import { BaseButton } from '../TextButton/BaseButton';
import ModalConfirmExit from '../Modals/ModalConfirmExit';
import { getELangKey } from '@/libs/validSearchParam';

const langConfig = {
  ua: {
    ariaLabel: 'Переключити мову на англійську',
    modalText: 'При перемиканні мови існуючі дані і результати онулюються',
    confirmBtnTitle: 'Перемкнути на Англійську',
    buttonText: 'EN',
  },
  en: {
    ariaLabel: 'Switch language to Ukrainian',
    modalText: 'Switching languages will reset existing data and results',
    confirmBtnTitle: 'Switch to Ukrainian',
    buttonText: 'UA',
  },
};

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const currentUrlLang = pathname.split('/')[1];
  const currentLang = getELangKey(currentUrlLang);

  const { ariaLabel, modalText, confirmBtnTitle, buttonText } = langConfig[currentLang];

  const handleLanguageChange = () => {
    const newLang = currentLang === ELang.en ? ELang.ua : ELang.en;
    const pathSegments = pathname.split('/');
    pathSegments[1] = newLang;
    const newPath = pathSegments.join('/');
    router.replace(newPath);
  };

  return (
    <>
      <BaseButton
        ariaLabel={ariaLabel}
        onClick={() => setIsExitModalOpen(true)}
        className="text-white border border-slate-500 rounded-sm p-2 h-fit leading-none"
      >
        {buttonText}
      </BaseButton>

      {isExitModalOpen && (
        <ModalConfirmExit
          lang={currentLang}
          confirmExit={handleLanguageChange}
          closeModal={() => setIsExitModalOpen(false)}
          modalText={modalText}
          confirmBtnTitle={confirmBtnTitle}
        />
      )}
    </>
  );
};

export default LanguageSwitcher;

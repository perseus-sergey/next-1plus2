'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ELang } from '@models/types';
import { BaseButton } from '../TextButton/BaseButton';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] as ELang;

  const handleLanguageChange = () => {
    const newLang = currentLang === ELang.en ? ELang.ua : ELang.en;
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.replace(newPath);
  };

  return (
    <BaseButton
      ariaLabel={
        currentLang === ELang.en ? 'Switch language to Ukrainian' : 'Переключити мову на англійську'
      }
      onClick={handleLanguageChange}
      className="text-white border border-slate-500 rounded-sm p-2 h-fit leading-none"
    >
      {currentLang === ELang.en ? 'UA' : 'EN'}
    </BaseButton>
  );
};

export default LanguageSwitcher;

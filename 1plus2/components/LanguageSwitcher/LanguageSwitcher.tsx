'use client';

import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ELang } from '@/libs/langMessages';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = pathname.split('/')[1] as ELang;

  const handleLanguageChange = () => {
    const newLang = currentLang === ELang.en ? ELang.ua : ELang.en;
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button onClick={handleLanguageChange} className={styles.switcher}>
      {currentLang === ELang.en ? 'UA' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;

import React, { FC } from 'react';
import styles from './HomeLinks.module.scss';
import Link from 'next/link';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import TextButton from '../TextButton/TextButton';

const HomeLinksUa: FC = () => (
  <div className={styles.links}>
    <Link href={`/${ELang.ua}/math`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.ua)}</TextButton>
    </Link>
    <Link href={`/${ELang.ua}/hangman`}>
      <TextButton isLink>Кат</TextButton>
    </Link>
  </div>
);

export default HomeLinksUa;

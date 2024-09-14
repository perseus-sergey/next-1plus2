// import React, { FC } from 'react';
// import styles from './HomeLinks.module.scss';
// import Link from 'next/link';
// import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
// import TextButton from '../TextButton/TextButton';

// interface HomeLinksProps {}

// const HomeLinks: FC<HomeLinksProps> = () => (
//   <div className={styles.links}>
//     <Link href={`/${ELang['ua']}/math`}>
//       <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.ua)}</TextButton>
//     </Link>
//     <Link href={`/${ELang['en']}/math`}>
//       <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.en)}</TextButton>
//     </Link>
//   </div>
// );

// export const HangmanLinks: FC<HomeLinksProps> = () => (
//   <div className={styles.links}>
//     <Link href={`/${ELang['ua']}/hangman`}>
//       <TextButton isLink>Кат</TextButton>
//     </Link>
//     <Link href={`/${ELang['en']}/hangman`}>
//       <TextButton isLink>Hangman</TextButton>
//     </Link>
//   </div>
// );

// export default HomeLinks;

import React, { FC } from 'react';
import styles from './HomeLinks.module.scss';
import Link from 'next/link';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import TextButton from '../TextButton/TextButton';

const HomeLinksEng: FC = () => (
  <div className={styles.links}>
    <Link href={`/${ELang.en}/math`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.en)}</TextButton>
    </Link>
    <Link href={`/${ELang.en}/hangman`}>
      <TextButton isLink>Hangman</TextButton>
    </Link>
  </div>
);

export default HomeLinksEng;

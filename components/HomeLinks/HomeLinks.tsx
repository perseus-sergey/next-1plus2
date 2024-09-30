import styles from './HomeLinks.module.scss';
import Link from 'next/link';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import TextButton from '../TextButton/TextButton';

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <div className={styles.links}>
    <Link href={`/${lang}/math`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, lang)}</TextButton>
    </Link>

    <Link href={`/${lang}/hangman`}>
      <TextButton isLink>{lang === ELang.ua ? 'Кат' : 'Hangman'}</TextButton>
    </Link>

    <Link href={`/${lang}/chat`}>
      <TextButton isLink>{lang === ELang.ua ? 'чат із ШІ' : 'Chat Page'}</TextButton>
    </Link>
  </div>
);

export default HomeLinks;

import styles from './HomeLinks.module.scss';
import Link from 'next/link';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import TextButton from '../TextButton/TextButton';
import { EUrlParams } from '@/models/main.model';

const { MATH, REPEATER, HANGMAN } = EUrlParams;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <div className={styles.links}>
    <Link href={`/${lang}/${MATH}`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, lang)}</TextButton>
    </Link>

    <Link href={`/${lang}/${HANGMAN}`}>
      <TextButton isLink>{lang === ELang.ua ? 'Кат' : 'Hangman'}</TextButton>
    </Link>

    {/* <Link href={`/${lang}/chat`}>
      <TextButton isLink>{lang === ELang.ua ? 'чат із ШІ' : 'Chat Page'}</TextButton>
    </Link> */}

    <Link href={`/${lang}/${REPEATER}`}>
      <TextButton isLink>
        {lang === ELang.ua ? 'Вивчання англійської' : 'Learning English'}
      </TextButton>
    </Link>
  </div>
);

export default HomeLinks;

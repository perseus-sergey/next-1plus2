import Link from 'next/link';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import TextButton from '../TextButton/TextButton';
import { EUrlParams } from '@/models/main.model';
import { ELang } from '@/models/types';

const { MATH, REPEATER, HANGMAN } = EUrlParams;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <div className="flex justify-evenly flex-wrap gap-8 w-full whitespace-nowrap">
    <Link href={`/${lang}/${MATH}`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, lang)}</TextButton>
    </Link>

    <Link href={`/${lang}/${HANGMAN}`}>
      <TextButton isLink>{lang === ELang.ua ? 'Гра "Кат"' : '"Hangman" Game'}</TextButton>
    </Link>

    <Link href={`/${lang}/${REPEATER}`}>
      <TextButton isLink>{lang === ELang.ua ? 'Вивчання мов' : 'Learning languages'}</TextButton>
    </Link>
  </div>
);

export default HomeLinks;

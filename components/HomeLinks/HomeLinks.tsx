import Link from 'next/link';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
// import TextButton from '../TextButton/TextButton';
import { EUrlParams } from '@/models/main.model';
import { ELang } from '@/models/types';
import Image from 'next/image';
import mathLinkImg from 'public/img/main-pencil_300.png';

const { MATH, REPEATER, HANGMAN } = EUrlParams;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <div className="h-60 flex justify-evenly flex-wrap gap-8 w-full whitespace-nowrap">
    <Link href={`/${lang}/${MATH}`} className="flex flex-col items-center gap-2">
      <Image
        className="sm:rounded-full sm:border-zinc-300 sm:border w-36 hover:w-44 duration-300"
        src={mathLinkImg}
        alt={
          lang === ELang.ua
            ? 'Креативна ілюстрація для головної сторінки сайту, що символізує освіту та навчання з книгами, математичними символами і лампочкою, яка представляє ідеї та знання.'
            : 'A creative illustration for a website homepage, symbolizing education and learning with books, mathematical symbols, and a light bulb representing ideas and knowledge.'
        }
      />
      {/* <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_MATH, lang)}</TextButton> */}
      {getTitleFromMap(EMessageNames.BTN_MATH, lang)}
    </Link>

    <Link href={`/${lang}/${HANGMAN}`} className="flex flex-col items-center gap-2">
      <Image
        className="sm:rounded-full sm:border-zinc-300 sm:border w-36 hover:w-44 duration-300"
        src={mathLinkImg}
        alt={
          lang === ELang.ua
            ? 'Креативна ілюстрація для головної сторінки сайту, що символізує освіту та навчання з книгами, математичними символами і лампочкою, яка представляє ідеї та знання.'
            : 'A creative illustration for a website homepage, symbolizing education and learning with books, mathematical symbols, and a light bulb representing ideas and knowledge.'
        }
      />
      {/* <TextButton isLink>{lang === ELang.ua ? 'Гра "Кат"' : '"Hangman" Game'}</TextButton> */}
      {lang === ELang.ua ? 'Гра "Кат"' : '"Hangman" Game'}
    </Link>

    <Link href={`/${lang}/${REPEATER}`} className="flex flex-col items-center gap-2">
      <Image
        className="sm:rounded-full sm:border-zinc-300 sm:border w-36 hover:w-44 duration-300"
        src={mathLinkImg}
        alt={
          lang === ELang.ua
            ? 'Креативна ілюстрація для головної сторінки сайту, що символізує освіту та навчання з книгами, математичними символами і лампочкою, яка представляє ідеї та знання.'
            : 'A creative illustration for a website homepage, symbolizing education and learning with books, mathematical symbols, and a light bulb representing ideas and knowledge.'
        }
      />
      {/* <TextButton isLink>{lang === ELang.ua ? 'Вивчання мов' : 'Learning languages'}</TextButton> */}
      {lang === ELang.ua ? 'Вивчання мов' : 'Learning languages'}
    </Link>
  </div>
);

export default HomeLinks;

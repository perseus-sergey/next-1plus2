import Link from 'next/link';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { ESegments } from '@/models/main.model';
import { ELang } from '@/models/types';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import mathLinkImg from 'public/img/math_160.jpg';
import hangmanLinkImg from 'public/img/hangman-page_160.jpg';
import repeaterLinkImg from 'public/img/repeater_160.jpg';
import LazyAppearing from '../intersection/LazyAppearing';

const { MATH, REPEATER, HANGMAN } = ESegments;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <section className="h-60 flex justify-evenly flex-wrap gap-4 w-full px-2 sm:px-4 whitespace-nowrap">
    <LazyAppearing transformDirection="left">
      <LinkToSegment
        imgSrc={mathLinkImg}
        href={`/${lang}/${MATH}`}
        alt={
          lang === ELang.ua
            ? 'Ілюстрація яскравої математичної сцени з числами, символами та геометричними фігурами.'
            : 'Illustration of a colorful math scene with numbers, symbols, and geometric shapes.'
        }
        linkText={getTitleFromMap(EMessageNames.BTN_MATH, lang)}
      />
    </LazyAppearing>

    <LazyAppearing transformDirection="right">
      <LinkToSegment
        imgSrc={hangmanLinkImg}
        href={`/${lang}/${HANGMAN}`}
        alt={
          lang === ELang.ua
            ? `Ілюстрація веселої гри 'Кат' із грайливими літерами та врятованим персонажем.`
            : 'Illustration of a fun and friendly Hangman game with playful letters and a saved character.'
        }
        linkText={lang === ELang.ua ? 'Гра "Кат"' : '"Hangman" Game'}
      />
    </LazyAppearing>

    <LazyAppearing transformDirection="left">
      <LinkToSegment
        imgSrc={repeaterLinkImg}
        href={`/${lang}/${REPEATER}`}
        alt={
          lang === ELang.ua
            ? 'Ілюстрація веселої сцени вивчення мов із бульбашками тексту та дружнім AI-помічником.'
            : 'Illustration of a playful language learning scene with speech bubbles and a friendly AI assistant.'
        }
        linkText={lang === ELang.ua ? 'Вивчання мов' : 'Learning languages'}
      />
    </LazyAppearing>
  </section>
);

const LinkToSegment = ({
  href,
  alt,
  linkText,
  imgSrc,
}: {
  href: string;
  alt: string;
  linkText: string;
  imgSrc: StaticImport;
}) => {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 text-zinc-300 text-2xl">
      <Image
        className="rounded-full border-4 border-zinc-300 w-36 lg:hover:w-40 duration-300"
        src={imgSrc}
        alt={alt}
      />
      {linkText}
    </Link>
  );
};

export default HomeLinks;

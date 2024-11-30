import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { ESegments } from '@/models/main.model';
import { ELang } from '@/models/types';

import mathLinkImg from 'public/img/math_160.jpg';
import hangmanLinkImg from 'public/img/hangman-page_160.jpg';
import repeaterLinkImg from 'public/img/repeater_160.jpg';
import LazyAppearing from '../intersection/LazyAppearing';
import SeoLink from '../SeoLink';
import { MAIN_PAGE_LANG } from '@/models/mainPage.model';

const { MATH, REPEATER, HANGMAN } = ESegments;

const {
  links: { mathLink, hangmanLink, langLearningLink },
} = MAIN_PAGE_LANG;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <section className="h-60 flex justify-evenly flex-wrap gap-4 w-full px-2 sm:px-4 whitespace-nowrap">
    <LazyAppearing transformDirection="left">
      <LinkToSegment
        imgSrc={mathLinkImg}
        href={`/${lang}/${MATH}`}
        alt={mathLink.imgAlt[lang]}
        ariaLabel={mathLink.ariaLabel[lang]}
        linkText={getTitleFromMap(EMessageNames.BTN_MATH, lang)}
      />
    </LazyAppearing>

    <LazyAppearing transformDirection="right">
      <LinkToSegment
        imgSrc={hangmanLinkImg}
        href={`/${lang}/${HANGMAN}`}
        alt={hangmanLink.imgAlt[lang]}
        ariaLabel={hangmanLink.ariaLabel[lang]}
        linkText={lang === ELang.ua ? 'Гра "Кат"' : '"Hangman" Game'}
      />
    </LazyAppearing>

    <LazyAppearing transformDirection="left">
      <LinkToSegment
        imgSrc={repeaterLinkImg}
        href={`/${lang}/${REPEATER}`}
        alt={langLearningLink.imgAlt[lang]}
        ariaLabel={langLearningLink.ariaLabel[lang]}
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
  ariaLabel,
}: {
  href: string;
  alt: string;
  ariaLabel: string;
  linkText: string;
  imgSrc: StaticImport;
}) => {
  return (
    <SeoLink
      title={ariaLabel}
      href={href}
      className="flex flex-col items-center gap-2 text-zinc-300 text-2xl"
    >
      <Image
        className="rounded-full border-4 border-zinc-300 w-36 lg:hover:w-40 duration-300"
        src={imgSrc}
        alt={alt}
      />
      {linkText}
    </SeoLink>
  );
};

export default HomeLinks;

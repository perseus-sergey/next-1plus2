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

const { MATH, REPEATER, HANGMAN, ABOUT } = ESegments;

const {
  links: { mathLink, hangmanLink, langLearningLink },
} = MAIN_PAGE_LANG;

const HomeLinks = ({ lang }: { lang: ELang }) => (
  <>
    <section className="min-h-60 flex justify-evenly flex-wrap gap-4 w-full px-2 sm:px-4 whitespace-nowrap">
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
          linkText={lang === ELang.ua ? 'Вивчання мов' : 'Language learning'}
        />
      </LazyAppearing>
    </section>

    <LazyAppearing transformDirection="bottom">
      <SeoLink
        className="block m-4 hover:bg-slate-700 hover:border border-slate-400 px-4 py-1 rounded text-xl duration-300 font-inter"
        href={`/${lang}/${ABOUT}`}
        title={
          lang === ELang.ua
            ? 'Перейти до сторінки "Про проєкт"'
            : 'Go to the "About the project" page'
        }
      >
        {lang === ELang.ua ? 'Про проєкт' : 'About the project'}
      </SeoLink>
    </LazyAppearing>
  </>
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
      <div className="relative overflow-hidden rounded-full border-4 border-zinc-300 w-40">
        <Image
          className="w-full h-full object-cover lg:hover:scale-110 duration-300"
          src={imgSrc}
          alt={alt}
        />
      </div>
      {linkText}
    </SeoLink>
  );
};

export default HomeLinks;

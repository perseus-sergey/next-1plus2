import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { ELang } from '@/models/types';
import SeoLink from '../SeoLink';

import logoImg from 'public/img/1plus2-logo_w180.png';

export const Header = ({ lang }: { lang: ELang }) => (
  <header className="flex justify-between w-full max-w-screen-xl p-2 sm:p-4">
    <SeoLink
      title={
        lang === ELang.ua ? 'Перейти на домашню сторінку сайту' : 'Go to the home page of the site'
      }
      href={`/${lang === ELang.ua ? ELang.ua : ELang.en}`}
    >
      <Image
        src={logoImg}
        alt={
          lang === ELang.ua
            ? 'Логотип сайту 1plus2.fun з грайливими числами та навчальними символами.'
            : 'Logo of 1plus2.fun website with playful numbers and educational symbols.'
        }
      />
    </SeoLink>
    {/* <BreadCrumb homeElement={'Home'} isCapitalizeLinks /> */}
    <LanguageSwitcher />
  </header>
);

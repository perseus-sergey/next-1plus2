import { ESegments } from '../main.model';
import { ELang } from '../types';

interface IBreadCrumbList {
  href: string;
  title: { [key in ELang]: string };
}

const { MATH, MATH_CATEGORY } = ESegments;

export const breadCrumbList: Record<string, IBreadCrumbList> = {
  math: {
    href: MATH,
    title: { ua: 'Математика', en: 'Mathematics' },
  },

  mathCategory: {
    href: `${MATH}/${MATH_CATEGORY}`,
    title: { ua: 'Вибір категорії', en: 'Category selection' },
  },

  mathMaxNumber: {
    href: '',
    title: { ua: 'Рівень складності', en: 'Difficulty level' },
  },

  aboutUs: {
    href: '',
    title: { ua: 'Про Нас', en: 'About Us' },
  },
};

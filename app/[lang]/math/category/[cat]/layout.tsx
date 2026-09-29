import type { Metadata } from 'next';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { EExerciseCategories, IPageData } from '@/models/math/types';
import { MATH_TESTS } from '@/models/math/mathTests.model';
import { categoriesMap } from '@/models/math/math.model';

export interface IProps {
  children?: React.ReactNode;
  params: Promise<{ lang: string; cat: string }>;
}

interface IModuleData {
  PAGE_DATA: IPageData;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;

  const { lang, cat } = params;

  const typedLang = lang as ELang;
  const typedCat = cat as EExerciseCategories;

  const { PAGE_DATA }: IModuleData = await MATH_TESTS[EExerciseCategories[typedCat]]();
  const { MATH, MATH_CATEGORY } = ESegments;

  return {
    metadataBase: new URL(BASE_URL),
    ...PAGE_DATA.meta[typedLang],
    openGraph: {
      ...DEFAULT_META_OG,
      ...PAGE_DATA.meta[typedLang],
      url: `/${lang}/${MATH}/${MATH_CATEGORY}/${typedCat}`,
    },
    alternates: {
      canonical: `/${lang}/${MATH}/${MATH_CATEGORY}/${typedCat}`,
      languages: {
        en: `/${ELang.en}/${MATH}/${MATH_CATEGORY}/${typedCat}`,
        uk: `/${ELang.ua}/${MATH}/${MATH_CATEGORY}/${typedCat}`,
      },
    },
  };
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  [...categoriesMap.keys()].map((catSlug) => ({ cat: catSlug }));

export default function RootLayout({ children }: IProps) {
  return children;
}

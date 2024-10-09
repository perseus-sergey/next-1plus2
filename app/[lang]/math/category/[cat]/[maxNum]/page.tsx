import ExerciseLayout from '@/components/ExerciseLayout/ExerciseLayout';
import { createMaxNumArray } from '@/libs/utils';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { categoriesMap } from '@/models/math/math.model';
import { MATH_TESTS } from '@/models/math/mathTests.model';
import { EExerciseCategories, IPageData } from '@/models/math/types';
import { ELang } from '@models/types';
import { Metadata } from 'next';

export interface IProps {
  params: { lang: ELang; cat: EExerciseCategories; maxNum: string };
}

interface IModuleData {
  PAGE_DATA: IPageData;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async ({
  params: { lang, cat, maxNum },
}: IProps): Promise<Metadata> => {
  const { PAGE_DATA }: IModuleData = await MATH_TESTS[EExerciseCategories[cat]]();

  const title = PAGE_DATA.metaLevel[lang].getTitle(maxNum);
  const description = PAGE_DATA.metaLevel[lang].getDescription(maxNum);
  const path = `${EUrlParams.MATH}/${EUrlParams.MATH_CATEGORY}/${cat}/${maxNum}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: PAGE_DATA.metaLevel[lang].getKeywords(maxNum),
    openGraph: {
      ...DEFAULT_META_OG,
      title,
      description,
      url: `/${lang}/${path}`,
    },
    alternates: {
      canonical: `/${lang}/${path}`,
      languages: {
        en: `/${ELang.en}/${path}`,
        uk: `/${ELang.ua}/${path}`,
      },
    },
  };
};

export const generateStaticParams = ({ params: { cat } }: IProps) => {
  const catObj = categoriesMap.get(cat);
  if (!catObj) return [{ [EUrlParams.MAX_NUM]: '100' }];

  return createMaxNumArray(catObj.exercise).map((item) => ({ [EUrlParams.MAX_NUM]: `${item}` }));
};

export const dynamicParams = false;

export default ({ params: { lang, cat, maxNum } }: IProps) => {
  return <ExerciseLayout lang={lang} chosenMaxNum={+maxNum} cat={cat} />;
};

import ExerciseLayout from '@/components/ExerciseLayout/ExerciseLayout';
import { getLevelsByMaxNum } from '@/libs/exercises/math';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { EExerciseCategories } from '@/models/math/types';
import { PAGE_DATA } from '@/models/math/level.model';
import { createMaxNumArray } from '@/libs/utils';
import { categoriesMap } from '@/models/math/math.model';

export interface IProps {
  params: { lang: ELang; maxNum: string };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang, maxNum } }: IProps): Metadata => {
  const title = PAGE_DATA.metaLevel[lang].getTitle(maxNum);
  const description = PAGE_DATA.metaLevel[lang].getDescription(maxNum);
  const path = `${EUrlParams.MATH}/${EUrlParams.MATH_LEVEL}/${maxNum}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: PAGE_DATA.metaLevel[lang].getKeywords(maxNum),
    ...PAGE_DATA.metaLevel[lang],
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

export const generateStaticParams = () => {
  const catObj = categoriesMap.get(EExerciseCategories.level);
  if (!catObj) return [{ [EUrlParams.MAX_NUM]: '100' }];

  return createMaxNumArray(catObj.exercise).map((item) => ({ [EUrlParams.MAX_NUM]: `${item}` }));
};

export const dynamicParams = false;

export default ({ params: { lang, maxNum } }: IProps) => {
  return (
    <ExerciseLayout
      lang={lang}
      chosenMaxNum={+maxNum}
      cat={EExerciseCategories['level']}
      levels={getLevelsByMaxNum(+maxNum)}
    />
  );
};

import ExerciseLayout from '@/components/ExerciseLayout/ExerciseLayout';
import { getLevelsByMaxNum } from '@/libs/exercises/math';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { EExerciseCategories } from '@/models/math/types';
import { PAGE_DATA } from '@/models/math/level.model';
import { categoriesMap } from '@/models/math/math.model';
import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import { breadCrumbList } from '@/models/math/breadCrumb.model';

export interface IProps {
  params: Promise<{ lang: ELang; maxNum: string }>;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

const { MATH, MATH_LEVEL } = ESegments;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const { lang, maxNum } = params;

  const title = PAGE_DATA.metaLevel[lang].getTitle(maxNum);
  const description = PAGE_DATA.metaLevel[lang].getDescription(maxNum);
  const path = `${ESegments.MATH}/${ESegments.MATH_LEVEL}/${maxNum}`;
  const catObj = categoriesMap.get(EExerciseCategories.level);
  const canonicalNum = catObj ? catObj.exercise.max : 100;

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
      canonical: `/${lang}/${ESegments.MATH}/${ESegments.MATH_LEVEL}/${canonicalNum}`,
      languages: {
        en: `/${ELang.en}/${path}`,
        uk: `/${ELang.ua}/${path}`,
      },
    },
  };
};

// export const generateStaticParams = () => {
//   const catObj = categoriesMap.get(EExerciseCategories.level);
//   if (!catObj) return [{ [ESegments.DYNAMIC_MAX_NUM]: '100' }];

//   return createMaxNumArray(catObj.exercise).map((item) => ({
//     [ESegments.DYNAMIC_MAX_NUM]: `${item}`,
//   }));
// };

// export const dynamicParams = false;

export default async (props: IProps) => {
  const params = await props.params;

  const { lang, maxNum } = params;

  return (
    <>
      <BreadCrumbServer
        lang={lang}
        breadCrumbList={[
          breadCrumbList.math,
          {
            href: `${MATH}/${MATH_LEVEL}`,
            title: categoriesMap.get(EExerciseCategories['level'])?.[lang].title || '',
          },
          maxNum,
        ]}
      />
      <ExerciseLayout
        lang={lang}
        chosenMaxNum={+maxNum}
        cat={EExerciseCategories['level']}
        levels={getLevelsByMaxNum(+maxNum)}
      />
    </>
  );
};

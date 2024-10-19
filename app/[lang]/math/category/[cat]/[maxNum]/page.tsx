import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import ExerciseLayout from '@/components/ExerciseLayout/ExerciseLayout';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { breadCrumbList } from '@/models/math/breadCrumb.model';
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

const { MATH, MATH_CATEGORY } = ESegments;

export const generateMetadata = async ({
  params: { lang, cat, maxNum },
}: IProps): Promise<Metadata> => {
  const { PAGE_DATA }: IModuleData = await MATH_TESTS[EExerciseCategories[cat]]();

  const title = PAGE_DATA.metaLevel[lang].getTitle(maxNum);
  const description = PAGE_DATA.metaLevel[lang].getDescription(maxNum);
  const path = `${MATH}/${MATH_CATEGORY}/${cat}/${maxNum}`;
  const catObj = categoriesMap.get(cat);
  const canonicalNum = catObj ? catObj.exercise.max : 10;

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
      canonical: `/${lang}/${MATH}/${MATH_CATEGORY}/${cat}/${canonicalNum}`,
      languages: {
        en: `/${ELang.en}/${path}`,
        uk: `/${ELang.ua}/${path}`,
      },
    },
  };
};

export default ({ params: { lang, cat, maxNum } }: IProps) => {
  return (
    <>
      <BreadCrumbServer
        lang={lang}
        breadCrumbList={[
          breadCrumbList.math,
          breadCrumbList.mathCategory,
          {
            href: `${MATH}/${MATH_CATEGORY}/${cat}`,
            title: categoriesMap.get(cat)?.[lang].title || '',
          },
          maxNum,
        ]}
      />
      <ExerciseLayout lang={lang} chosenMaxNum={+maxNum} cat={cat} />
    </>
  );
};

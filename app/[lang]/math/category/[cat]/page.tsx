import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { categoriesMap } from '@/models/math/math.model';
import { ELang } from '@models/types';
import ArticleWrapper from '@/components/ArticleWrapper';
import { EExerciseCategories } from '@/models/math/types';
import { MATH_TESTS } from '@/models/math/mathTests.model';

export interface IPage {
  params: { lang: ELang; cat: EExerciseCategories };
}

export default async ({ params: { lang, cat } }: IPage) => {
  const { PAGE_DATA } = await MATH_TESTS[EExerciseCategories[cat]]();

  const catName = categoriesMap.get(cat)?.[lang].title;

  return (
    <>
      <ArticleWrapper
        h1Title={
          lang === ELang.ua
            ? `Обери рівень для категорії "${catName}"`
            : `Choose the level for the category "${catName}"`
        }
      >
        {PAGE_DATA.text[lang]}
      </ArticleWrapper>
      <MathPageMaxNumber lang={lang} cat={cat} />;
    </>
  );
};

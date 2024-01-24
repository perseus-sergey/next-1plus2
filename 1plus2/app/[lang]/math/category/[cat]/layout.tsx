import { categoriesMap } from '@/libs/exercises/math.model';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';
import { ICatNamePageProps } from './page';
import { Metadata } from 'next';
import { getCatFromMap } from '@/libs/exercises/math';

export const generateStaticParams = () =>
  Object.values(ELang).reduce(
    (acc, langSlug) =>
      acc.concat([...categoriesMap.keys()].map((catSlug) => ({ lang: langSlug, cat: catSlug }))),
    [{}]
  );

export const generateMetadata = ({ params }: ICatNamePageProps): Metadata => {
  const titleObj = getCatFromMap(params.cat, params.lang);

  return {
    title: `${metaMap.get(EPageTitles.CAT)?.[EMetaTypes.TITLE][params.lang]} | ${titleObj.title}`,
    description: `${metaMap.get(EPageTitles.CAT)?.[EMetaTypes.DESCRIPTION][params.lang]}: ${
      titleObj.title
    } | ${titleObj.description}`,
    keywords: `${metaMap.get(EPageTitles.CAT)?.[EMetaTypes.KEYWORDS][params.lang]}, ${
      titleObj.title
    }`,
    alternates: {
      canonical: `${params.lang}/math/category/${params.cat}`,
    },
  };
};

export default ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const dynamicParams = false;

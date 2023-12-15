import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { ELang, categoriesMap } from '@/libs/langMessages';

export interface ICatNamePageProps {
  params: { lang: ELang; cat: string };
}

export const generateStaticParams = () =>
  Object.values(ELang).reduce(
    (acc, langSlug) =>
      acc.concat([...categoriesMap.keys()].map((catSlug) => ({ lang: langSlug, cat: catSlug }))),
    [{}]
  );

export default (props: ICatNamePageProps) => {
  return <MathPageMaxNumber {...props} />;
};

export const dynamicParams = false;

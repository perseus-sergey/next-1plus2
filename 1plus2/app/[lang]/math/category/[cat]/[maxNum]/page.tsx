import { ELang, categoriesMap } from '@/libs/langMessages';

export interface IExercisePageProps {
  params: { lang: ELang; cat: string; maxNum: string };
}

export const generateStaticParams = () =>
  Object.values(ELang).reduce(
    (acc, langSlug) =>
      acc.concat([...categoriesMap.keys()].map((catSlug) => ({ lang: langSlug, cat: catSlug }))),
    [{}]
  );

export default (props: IExercisePageProps) => {
  // return <MathExercise {...props} />;
  return <h1>hj</h1>;
};

export const dynamicParams = false;

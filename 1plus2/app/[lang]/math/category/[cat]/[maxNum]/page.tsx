import { ELang, categoriesMap } from '@/libs/langMessages';

export interface IExercisePageProps {
  params: { lang: ELang; cat: string; maxNum: string };
}

export const generateStaticParams = () =>
  Object.values(ELang).reduce(
    (acc, langSlug) =>
      acc.concat(
        [...categoriesMap.keys()].map((catSlug) => ({ lang: langSlug, cat: catSlug, maxNum: '1' }))
      ),
    [{}]
  );

export default (props: IExercisePageProps) => {
  return <h1>{props.params.maxNum}</h1>;
  // return <ExercisePage {...props} />;
};

export const dynamicParams = false;

import { ELang, categoriesMap } from '@/libs/langMessages';

export const generateStaticParams = () =>
  Object.values(ELang).reduce(
    (acc, langSlug) =>
      acc.concat([...categoriesMap.keys()].map((catSlug) => ({ lang: langSlug, cat: catSlug }))),
    [{}]
  );

export default ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const dynamicParams = false;

import { ELang, getMetaFromMap } from '@/libs/langMessages';
import styles from '../page.module.css';
import { Metadata } from 'next';

export interface IMathPageProps {
  params: { lang: ELang };
}

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: '1plus2 | Math',
  description: getMetaFromMap('pageDescriptionMain', params.lang),
  keywords: getMetaFromMap('pageKeywordsMain', params.lang),
});

export default () => (
  <main className={styles.main}>
    <h1>Home Page</h1>
  </main>
);

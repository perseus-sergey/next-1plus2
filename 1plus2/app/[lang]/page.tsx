import { TLang, getTitleFromMap } from '@/libs/langMessages';
import styles from '../page.module.css';
import { Metadata } from 'next';

export interface IMathPageProps {
  params: { lang: TLang };
}

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: '1plus2 | Math',
  description: getTitleFromMap('pageDescriptionMain', params.lang),
  keywords: getTitleFromMap('pageKeywordsMain', params.lang),
});

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home Page</h1>
    </main>
  );
}

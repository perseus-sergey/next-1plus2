import { ICatPageProps } from '@/app/[lang]/math/category/page';
import TextButton from '../TextButton/TextButton';
import SectionTitle from '../sectionTitle/SectionTitle';
import styles from './MathCategories.module.css';
import { ELang, categoriesMap, getCatFromMap, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';

const MathCategories = (props: ICatPageProps) => {
  const { lang = ELang.ENGLISH } = props.params;

  return (
    <section data-testid="MathCategories">
      <SectionTitle name={getTitleFromMap('categoryChoice', lang)} />
      <div className={styles.MathCategories}>
        {[...categoriesMap.keys()].map((catSlug) => (
          <Link href={`/${lang}/math/category/${catSlug}`} key={catSlug}>
            <TextButton>{getCatFromMap(catSlug, lang).description}</TextButton>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MathCategories;

import { ICatPageProps } from '@/app/[lang]/math/category/page';
import TextButton from '../TextButton/TextButton';
import SectionTitle from '../SectionTitle/SectionTitle';
import styles from './MathCategories.module.scss';
import {
  ELang,
  EMessageNames,
  categoriesMap,
  getCatFromMap,
  getTitleFromMap,
} from '@/libs/langMessages';
import Link from 'next/link';

const MathCategories = (props: ICatPageProps) => {
  const { lang = ELang.en } = props.params;

  return (
    <section data-testid="MathCategories">
      <SectionTitle name={getTitleFromMap(EMessageNames.CATEGORY_CHOICE, lang)} />
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

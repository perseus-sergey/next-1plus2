import { ICatPageProps } from '@/app/math/category/page';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import styles from './MathCategories.module.scss';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';
import { getCatFromMap } from '@/libs/exercises/math';

const MathCategories = (props: ICatPageProps) => {
  const { lang = ELang.en } = props.params;

  return (
    <section data-testid="MathCategories">
      <Title name={getTitleFromMap(EMessageNames.CATEGORY_CHOICE, lang)} />
      <div className={styles.MathCategories}>
        {[...categoriesMap.keys()]
          .filter((c) => c !== EExerciseCategories['level'])
          .map((catSlug) => (
            <Link href={`/${lang}/math/category/${catSlug}`} key={catSlug}>
              <TextButton isLink>{getCatFromMap(catSlug, lang).description}</TextButton>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default MathCategories;

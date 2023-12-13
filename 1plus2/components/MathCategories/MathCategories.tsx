import { ICatPageProps } from '@/app/[lang]/math/category/page';
import TextButton from '../TextButton/TextButton';
import SectionTitle from '../sectionTitle/SectionTitle';
import styles from './MathCategories.module.css';
import { getTitleFromMap } from '@/libs/langMessages';

const MathCategories = (props: ICatPageProps) => {
  const { lang = 'en' } = props.params;

  return (
    <section data-testid="MathCategories">
      <SectionTitle name={getTitleFromMap('categoryChoice', lang)} />
      <div className={styles.MathCategories}>
        <TextButton id="sequence">1 2 ?</TextButton>
        <TextButton id="equality">1 + 2</TextButton>
        <TextButton id="pairs">1 + 1</TextButton>
        <TextButton id="linkEquality">1 + ?</TextButton>
        <TextButton id="inequality">{'< = >'}</TextButton>
        <TextButton id="equalTen">1 + 10</TextButton>
        <TextButton id="composition">{getTitleFromMap('btnCompos', lang)}</TextButton>
        <TextButton id="equalFive">10 + 5</TextButton>
        <TextButton id="equalOverTen">7 + 8</TextButton>
      </div>
    </section>
  );
};

export default MathCategories;

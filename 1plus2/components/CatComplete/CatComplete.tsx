import styles from './CatComplete.module.scss';
import { EExerciseCategories } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';
import Link from 'next/link';
import TextButton from '../TextButton/TextButton';

interface ICatCompleteProps {
  mistakeArray: (string | number)[][];
  currentCat: EExerciseCategories;
  nextCat: EExerciseCategories;
  lang: ELang;
  chosenMaxNum: number;
}

const CatComplete = ({
  mistakeArray,
  currentCat,
  nextCat,
  lang,
  chosenMaxNum,
}: ICatCompleteProps) => {
  const mistakesLength = mistakeArray.length;
  const href = mistakesLength
    ? `/${lang}/math/level/${chosenMaxNum}/${currentCat}`
    : `/${lang}/math/level/${chosenMaxNum}/${nextCat}`;
  const h1 = !mistakesLength ? 'BRAVO' : mistakesLength < 3 ? 'GOOD' : 'BAD';
  const btnTitle = !mistakesLength ? 'Continue' : 'Correct mistakes';

  return (
    <section className={styles.CatComplete} data-testid="CatComplete">
      <h1>{h1}</h1>
      <Link href={href}>
        <TextButton>{btnTitle}</TextButton>
      </Link>
    </section>
  );
};

export default CatComplete;

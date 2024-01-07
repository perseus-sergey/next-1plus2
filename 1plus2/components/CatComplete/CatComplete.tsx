import styles from './CatComplete.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedWord } from '@/libs/utils';
import { useLangProvider } from '@/libs/context/LangProvider';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';
import { getCatFromMap } from '@/libs/exercises/math';
import { EExerciseCategories } from '@/libs/exercises/math.model';

interface ICatComplete {
  exsQuant: number;
  onNextCatBtnClicked: () => void;
  title: EMessageNames;
  btnTitle: EMessageNames;
  mistakes: (number | string)[][];
  mistakesStr: string[];
  category: EExerciseCategories;
}

export const EndLevel = ({ language, maxNumb }: { language: ELang; maxNumb: number }) => (
  <>
    <Title
      className={styles.EndLevelTitle}
      name={`${maxNumb} ${getTitleFromMap(EMessageNames.SHOW_END_LEVEL, language)}`}
    />
    <Link href={`/${language}/math`}>
      <TextButton>{getTitleFromMap(EMessageNames.CONTINUE, language)}</TextButton>
    </Link>
  </>
);

const CatComplete = ({
  onNextCatBtnClicked,
  title,
  btnTitle,
  mistakes,
  mistakesStr,
  category,
}: ICatComplete) => {
  const { language } = useLangProvider();

  return (
    <>
      <Title
        name={getTitleFromMap(title, language)}
        className={`${styles.titleH1} ${
          title === EMessageNames.BRAVO
            ? styles.goodTitle
            : title === EMessageNames.NO_BAD
              ? styles.normTitle
              : styles.badTitle
        }`}
      />
      <section className={styles.report}>
        <section>
          <h2 className={styles.reportTitle}>
            {getTitleFromMap(EMessageNames.TITLE_REPORT, language)}:
          </h2>
          <p>
            {getTitleFromMap(EMessageNames.CATEGORY, language)}:{' '}
            {capitalizedWord(getCatFromMap(category, language).title)}
          </p>
          <p>
            {getTitleFromMap(EMessageNames.MISTAKES, language)}: {mistakes.length}
          </p>
        </section>
        {!!mistakes.length && (
          <section>
            <h2 className={styles.reportTitle}>
              {getTitleFromMap(EMessageNames.MISTAKES, language)}:
            </h2>
            {mistakesStr.map((mist, i) => (
              <p key={i}>{mist}</p>
            ))}
          </section>
        )}
      </section>
      <TextButton onClick={onNextCatBtnClicked}>{getTitleFromMap(btnTitle, language)}</TextButton>
    </>
  );
};

export default CatComplete;

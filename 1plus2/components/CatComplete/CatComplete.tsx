import styles from './CatComplete.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { useLangProvider } from '@/libs/context/LangProvider';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';
import { getCatFromMap } from '@/libs/exercises/math';

interface ICatComplete {
  exsQuant: number;
  onNextCatBtnClicked: () => void;
  title: EMessageNames;
  btnTitle: EMessageNames;
  mistakes: (number | string)[][];
  mistakesStr: string[];
}

export const EndLevel = ({ language, maxNumb }: { language: ELang; maxNumb: number }) => (
  <>
    <Title
      className={styles.EndLevelTitle}
      name={`${maxNumb} ${getTitleFromMap(EMessageNames.SHOW_END_LEVEL, language)}`}
    />
    <div className={`${styles.endLevelBtn} ${styles.confirmBtnWrapper}`}>
      <Link href={`/${language}/math`}>
        <TextButton>{getTitleFromMap(EMessageNames.CONTINUE, language)}</TextButton>
      </Link>
    </div>
  </>
);

const CatComplete = ({
  onNextCatBtnClicked,
  title,
  btnTitle,
  mistakes,
  mistakesStr,
}: ICatComplete) => {
  const { category } = useExercisesProvider();

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
            {capitalizedFirstChar(getCatFromMap(category, language).title)}
          </p>
          <p>
            {getTitleFromMap(EMessageNames.MISTAKES, language)}: {mistakes.length}
          </p>
        </section>
        <section>
          <h2 className={styles.reportTitle}>
            {getTitleFromMap(EMessageNames.MISTAKES, language)}:
          </h2>
          {mistakesStr.map((mist, i) => (
            <p key={i}>{mist}</p>
          ))}
        </section>
      </section>
      <div className={styles.confirmBtnWrapper}>
        <TextButton onClick={onNextCatBtnClicked}>{getTitleFromMap(btnTitle, language)}</TextButton>
      </div>
    </>
  );
};

export default CatComplete;

// 	var time 	= msToTime(new Date() - dateStartTest);
// 	header.classList.add('move');
// 	else {res = msg.bad; spn_h1.classList.add("h1_bad")}

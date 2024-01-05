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
  title: string;
  btnTitle: string;
  mistakes: (number | string)[][];
  mistakesStr: string[];
}

export const EndLevel = ({ language }: { language: ELang }) => (
  <section className={styles.EndLevel}>
    <Title
      className={styles.EndLevelTitle}
      name={getTitleFromMap(EMessageNames.SHOW_END_LEVEL, language)}
    />
    <Link href={`/${language}/math`}>
      <TextButton>{getTitleFromMap(EMessageNames.CONTINUE, language)}</TextButton>
    </Link>
  </section>
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
    <section className={styles.CatComplete} data-testid="CatComplete">
      <Title name={title} />
      <p>
        {getTitleFromMap(EMessageNames.CATEGORY, language)}:{' '}
        {capitalizedFirstChar(getCatFromMap(category, language).title)}
      </p>
      <p>
        {getTitleFromMap(EMessageNames.MISTAKES, language)}: {mistakes.length}
      </p>
      {mistakesStr.map((mist, i) => (
        <p key={i}>{mist}</p>
      ))}
      <TextButton onClick={onNextCatBtnClicked}>{btnTitle}</TextButton>
    </section>
  );
};

export default CatComplete;

// 	var time 	= msToTime(new Date() - dateStartTest);
// 	header.classList.add('move');
// 	else {res = msg.bad; spn_h1.classList.add("h1_bad")}

import styles from './CatComplete.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { useLangProvider } from '@/libs/context/LangProvider';
import { useEffect, useState } from 'react';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';

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

const useCatComplTitle = (
  language: ELang,
  exsQuant: number,
  mistQuant: number,
  isCatFinish = false
) => {
  const [{ title, btnTitle }, setTitles] = useState({ title: '', btnTitle: '' });

  useEffect(() => {
    if (!isCatFinish) return;

    const mistakeCoeff = mistQuant / exsQuant;
    console.log('🚀 ~ file: CatComplete. ~ mistQuant / exsQuant:', mistQuant, exsQuant);
    setTitles({
      title: !mistakeCoeff
        ? getTitleFromMap(EMessageNames.BRAVO, language)
        : mistakeCoeff <= 0.2
          ? getTitleFromMap(EMessageNames.NO_BAD, language)
          : getTitleFromMap(EMessageNames.BAD, language),
      btnTitle: !mistakeCoeff
        ? getTitleFromMap(EMessageNames.CONTINUE, language)
        : getTitleFromMap(EMessageNames.CORRECTION, language),
    });
    return () => console.log('useCatComplTitle FINISHED');
  }, [isCatFinish]);

  return { title, btnTitle };
};

const CatComplete = ({
  exsQuant,
  onNextCatBtnClicked,
}: {
  exsQuant: number;
  onNextCatBtnClicked: () => void;
}) => {
  const { category, mistakes, mistakesStr, isCatFinish } = useExercisesProvider();

  const { language } = useLangProvider();

  const { title, btnTitle } = useCatComplTitle(language, exsQuant, mistakes.length, isCatFinish);

  return (
    <section className={styles.CatComplete} data-testid="CatComplete">
      <Title name={title} />
      <p>
        {getTitleFromMap(EMessageNames.CATEGORY, language)}: {capitalizedFirstChar(category)}
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

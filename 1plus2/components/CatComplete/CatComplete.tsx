import styles from './CatComplete.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import Computer from '../Computer/Computer';
import { useLangProvider } from '@/libs/context/LangProvider';
import { useLevelsProvider } from '@/libs/context/MathLevelProvider';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';
import { makeExerciseArray } from '@/libs/exercises/math';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Link from 'next/link';

const EndLevel = ({ language }: { language: ELang }) => (
  <section className={styles.EndLevel}>
    <Title
      className={styles.EndLevelTitle}
      name={getTitleFromMap(EMessageNames.SHOW_END_LEVEL, language)}
    />
    <Link href={`/${language}/math`}>
      <TextButton>{getTitleFromMap(EMessageNames.BTN_LEVELS, language)}</TextButton>
    </Link>
  </section>
);

const CatComplete = () => {
  const {
    category,
    setCategory,
    exercises,
    setExercises,
    mistakes,
    setMistakes,
    mistakesStr,
    setMistakesStr,
    chosenMaxNum,
    setExsParams,
  } = useExercisesProvider();

  const { levelsArray, shiftLevelsArray, isLevel } = useLevelsProvider();

  const { language } = useLangProvider();

  const router = useRouter();

  const [{ title, btnTitle }, setTitles] = useState({ title: '', btnTitle: '' });
  const [nextCat] = useState(levelsArray[1]);

  useEffect(() => {
    const mistakeCoeff = mistakes.length / exercises.length;
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
  }, [mistakes.length, exercises.length]);

  const onBtnClicked = () => {
    if (mistakes.length) {
      setExercises(mistakes);
    } else {
      if (!isLevel) return router.push(`/${language}/math`);

      setCategory(nextCat);
      setExsParams(categoriesMap.get(EExerciseCategories[nextCat]));
      setExercises(makeExerciseArray(nextCat, chosenMaxNum));
      shiftLevelsArray();
    }
    setMistakes([]);
    setMistakesStr([]);
  };

  if (isLevel && !nextCat) return <EndLevel language={language} />;

  if (exercises.length) return <Computer />;

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
      <TextButton onClick={onBtnClicked}>{btnTitle}</TextButton>
    </section>
  );
};

export default CatComplete;

// 	var time 	= msToTime(new Date() - dateStartTest);
// 	header.classList.add('move');
// 	else {res = msg.bad; spn_h1.classList.add("h1_bad")}

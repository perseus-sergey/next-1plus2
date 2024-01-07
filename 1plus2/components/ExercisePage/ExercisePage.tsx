'use client';

import { useEffect, useReducer, useState } from 'react';
import styles from './ExercisePage.module.scss';
import { ELang } from '@/libs/langMessages';
import {
  IExsPart,
  NUMBER_OF_EXERCISES,
  getCatComplTitles,
  makeExerciseArray,
  makeExerciseParts,
} from '@/libs/exercises/math';
import MathLevelProvider from '@/libs/context/MathLevelProvider';
import Computer from '../Computer/Computer';
import {
  EExerciseCategories,
  IExerciseParams,
  QUESTION_MARK,
  categoriesMap,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import LanguageProvider from '@/libs/context/LangProvider';
import { Loader } from '../loaders/Loader';
import { arrayShift, sleep } from '@/libs/utils';
import { useMySound } from '@/libs/hooks/useSound';
import CatComplete, { EndLevel } from '../CatComplete/CatComplete';
import { useRouter } from 'next/navigation';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';
import { ELevelsActionKind, levelsReducer } from '@/libs/reducers/levelReducer';
import { PlayFunction } from 'use-sound/dist/types';

export enum EIsRightAnswer {
  '_',
  'RIGHT',
  'BAD',
}

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  levels?: EExerciseCategories[];
}

const ExercisePage = ({ cat, chosenMaxNum, lang, levels = [] }: IExerciseComponentProps) => {
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exsArrayLength, setExsArrayLength] = useState(NUMBER_OF_EXERCISES);
  const [exsParams, setExsParams] = useState<IExerciseParams | undefined>();
  const [isCatFinish, setIsCatFinish] = useState(false);
  const [isLevel] = useState(cat === EExerciseCategories['level']);
  const [isSound] = useState(true);
  const [exerciseParts, setExerciseParts] = useState<IExsPart[]>([]);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(EIsRightAnswer._);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);
  const [mistakes, setMistakes] = useState<(number | string)[][]>([]);
  const [mistakesStr, setMistakesStr] = useState<string[]>([]);

  const [levelsObj, changeLevelsArray] = useReducer(levelsReducer, { levels });

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(currentCat, exerciseArray[0]);

  const router = useRouter();

  useEffect(() => {
    const currCat = isLevel ? levelsObj.levels[0] : cat;

    setExsParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, [cat, chosenMaxNum, isLevel]);

  useEffect(() => {
    if (!exerciseArray[0] || !exerciseArray[0].length) return;

    setExerciseParts(
      makeExerciseParts(
        askElemNumbers,
        exerciseArray[0],
        minusPlus,
        exsParams?.equalMark,
        currentCat === EExerciseCategories['inequality'],
        hint
      )
    );
  }, [currentCat, exerciseArray, minusPlus, askElemNumbers, hint, exsParams?.equalMark]);

  const { audioDel, audioKey, audioRightAnsw, audioWrongAnsw, audioCatFinish, audioLevelFinish } =
    useMySound();

  const playSound = (sound: PlayFunction) => {
    if (!isSound) return;
    sound();
    // await sleep(2000);
    // sound.current?.pause();
  };

  // const playSound = async (sound: MutableRefObject<HTMLAudioElement | undefined>) => {
  //   if (!isSound) return;
  //   sound.current?.play();
  //   await sleep(2000);
  //   sound.current?.pause();
  // };

  const enterClickHandler = () => {
    if (!exerciseArray.length || answerElementValue === QUESTION_MARK) return;
    setIsEnterDisabled(true);
    checkAnswer();
  };

  const clearBtnHandler = () => {
    if (answerElementValue === QUESTION_MARK) return;
    setAnswerElementValue(QUESTION_MARK);
    playSound(audioDel);
    // audioDel.current?.play();
  };

  const finishCat = () => {
    playSound(audioCatFinish);
    // audioCatFinish.current?.play();
    setExerciseArray((arr) => arrayShift(arr));
    setIsCatFinish(true);
  };

  const checkAnswer = async () => {
    const properAnswer = isNaN(+exerciseArray[0][askElemNumbers[0]])
      ? exerciseArray[0][askElemNumbers[0]]
      : Math.abs(+exerciseArray[0][askElemNumbers[0]]);
    const isRightAnswer = answerElementValue === `${properAnswer}`;
    isRightAnswer ? rightAnswer() : badAnswer();

    await sleep();

    !isRightAnswer
      ? setExerciseArray((arr) => [...arr, arr[0]])
      : exerciseArray.length < 2
        ? finishCat()
        : setExerciseArray((arr) => arrayShift(arr));

    setIsRightAnswer(EIsRightAnswer._);
    setAnswerElementValue(QUESTION_MARK);
    setIsEnterDisabled(false);
  };

  const rightAnswer = () => {
    playSound(audioRightAnsw);
    // audioRightAnsw.current?.play();
    setIsRightAnswer(EIsRightAnswer.RIGHT);
  };

  const badAnswer = () => {
    playSound(audioWrongAnsw);
    // audioWrongAnsw.current?.play();
    setMistakes((arr) => [...arr, exerciseArray[0]]);

    setMistakesStr([
      ...mistakesStr,
      exerciseParts
        .map(({ value, isQuestionPart }) => (isQuestionPart ? `[${answerElementValue}]` : value))
        .join(' '),
    ]);
    setIsRightAnswer(EIsRightAnswer.BAD);
  };

  const keyboardBtnClickHandler = (value: string) => {
    playSound(audioKey);
    // audioKey.current?.play();
    setAnswerElementValue(
      answerElementValue === QUESTION_MARK || keyboardInEqualKeys.includes(answerElementValue)
        ? value
        : `${answerElementValue}${value}`
    );
  };

  const onNextCatBtnClicked = () => {
    if (mistakes.length) {
      setExerciseArray(mistakes);
      setExsArrayLength(mistakes.length);
    } else {
      if (!isLevel) return router.push(`/${lang}/math`);

      changeLevelsArray({ type: ELevelsActionKind.SHIFT_LEVELS });
      setCurrentCat(levelsObj.levels[1]);
      setExsParams(categoriesMap.get(EExerciseCategories[levelsObj.levels[1]]));
      setExerciseArray(makeExerciseArray(levelsObj.levels[1], chosenMaxNum));
    }
    setIsCatFinish(false);
    setMistakes([]);
    setMistakesStr([]);
  };

  if (isLevel && (!currentCat || currentCat === EExerciseCategories['level'])) {
    playSound(audioLevelFinish);
    // audioLevelFinish.current?.play();
    return <EndLevel language={lang} maxNumb={chosenMaxNum} />;
  }

  if (isCatFinish) {
    const { catCompleteTitle, btnCatCompleteTitle } = getCatComplTitles(
      exsArrayLength,
      mistakes.length
    );
    return (
      <CatComplete
        title={catCompleteTitle}
        btnTitle={btnCatCompleteTitle}
        onNextCatBtnClicked={onNextCatBtnClicked}
        exsQuant={exsArrayLength}
        mistakes={mistakes}
        mistakesStr={mistakesStr}
        category={currentCat}
      />
    );
  }
  if (!exerciseArray.length || !exerciseArray[0].length)
    return (
      <h2>
        <Loader />
        Loading....
      </h2>
    );
  if (!lang || !exsParams || !exerciseParts)
    return (
      <h2>
        <Loader /> Loading...
      </h2>
    );

  return (
    <section data-testid="ExercisePage" className={styles.ExercisePage}>
      <LanguageProvider language={lang}>
        <MathLevelProvider levels={levelsObj.levels} isLevel={isLevel}>
          <Computer
            exerciseParts={exerciseParts}
            answerElementValue={answerElementValue}
            isRightAnswer={isRightAnswer}
            clearBtnHandler={clearBtnHandler}
            keyboardBtnClickHandler={keyboardBtnClickHandler}
            enterClickHandler={enterClickHandler}
            isEnterDisabled={isEnterDisabled}
            mistakesLength={mistakes.length}
            exercisesLength={exerciseArray.length}
            category={currentCat}
            exsParams={exsParams}
          />
        </MathLevelProvider>
      </LanguageProvider>
    </section>
  );
};

export default ExercisePage;

import { useEffect, useMemo, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { arrayShift, capitalizedFirstChar, sleep } from '@/libs/utils';
import {
  EExerciseCategories,
  QUESTION_MARK,
  categoriesMap,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';
import CatComplete, { EndLevel } from '../CatComplete/CatComplete';
import {
  IExsPart,
  getCatFromMap,
  makeExerciseArray,
  makeExerciseParts,
} from '@/libs/exercises/math';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { useLangProvider } from '@/libs/context/LangProvider';
import { useLevelsProvider } from '@/libs/context/MathLevelProvider';
import { useRouter } from 'next/navigation';
import { useSound } from '@/libs/hooks/useSound';
import { useCatComplTitle } from '@/libs/hooks/useCatComplTitle';
import { Loader } from '../loaders/Loader';

export enum EIsRightAnswer {
  'NOT',
  'RIGHT',
  'BAD',
}

const Computer = () => {
  const [exerciseParts, setExerciseParts] = useState<IExsPart[]>([]);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(EIsRightAnswer.NOT);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);
  const [exsQuant, setExsQuant] = useState(0);
  const [_mistakes, setMistakes] = useState<(number | string)[][]>([]);
  const [_mistakesStr, setMistakesStr] = useState<string[]>([]);

  const mistakes = useMemo(() => _mistakes, [_mistakes]);
  const mistakesStr = useMemo(() => _mistakesStr, [_mistakesStr]);

  const {
    exsParams,
    category,
    setCategory,
    exercises,
    setExercises,
    chosenMaxNum,
    setExsParams,
    isCatFinish,
    setIsCatFinish,
  } = useExercisesProvider();

  const { language } = useLangProvider();

  const { levelsArray, shiftLevelsArray, isLevel } = useLevelsProvider();

  const { catCompleteTitle, btnCatCompleteTitle } = useCatComplTitle(
    language,
    exsQuant,
    mistakes.length,
    isCatFinish
  );

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(category, exercises[0]);

  const router = useRouter();

  useEffect(() => {
    if (isCatFinish) return;
    setExsQuant(exercises.length);
  }, [isCatFinish]);

  useEffect(() => {
    if (!exercises.length) return;

    setExerciseParts(
      makeExerciseParts(
        askElemNumbers,
        exercises[0],
        minusPlus,
        exsParams?.equalMark,
        category === EExerciseCategories['inequality'],
        hint
      )
    );
  }, [category, exercises, minusPlus, askElemNumbers, hint, exsParams?.equalMark]);

  const { audioDel, audioKey, audioRightAnsw, audioWrongAnsw, audioCatFinish } = useSound();

  const enterClickHandler = () => {
    if (!exercises.length || answerElementValue === QUESTION_MARK) return;
    setIsEnterDisabled(true);
    checkAnswer();
  };

  const clearBtnHandler = () => {
    if (answerElementValue === QUESTION_MARK) return;
    setAnswerElementValue(QUESTION_MARK);
    audioDel.current?.play();
  };

  const finishCat = () => {
    audioCatFinish.current?.play();
    setExercises(arrayShift(exercises));
    setIsCatFinish(true);
  };

  const checkAnswer = async () => {
    const properAnswer = isNaN(+exercises[0][askElemNumbers[0]])
      ? exercises[0][askElemNumbers[0]]
      : Math.abs(+exercises[0][askElemNumbers[0]]);
    const isRightAnswer = answerElementValue === `${properAnswer}`;
    isRightAnswer ? rightAnswer() : badAnswer();

    await sleep();

    !isRightAnswer
      ? setExercises([...exercises, exercises[0]])
      : exercises.length < 2
        ? finishCat()
        : setExercises(arrayShift(exercises));

    setIsRightAnswer(EIsRightAnswer.NOT);
    setAnswerElementValue(QUESTION_MARK);
    setIsEnterDisabled(false);
  };

  const rightAnswer = () => {
    audioRightAnsw.current?.play();
    setIsRightAnswer(EIsRightAnswer.RIGHT);
  };

  const badAnswer = () => {
    audioWrongAnsw.current?.play();
    setMistakes([...mistakes, exercises[0]]);

    setMistakesStr([
      ...mistakesStr,
      exerciseParts
        .map(({ value, isQuestionPart }) => (isQuestionPart ? `[${answerElementValue}]` : value))
        .join(' '),
    ]);
    setIsRightAnswer(EIsRightAnswer.BAD);
  };

  const keyboardBtnClickHandler = (value: string) => {
    audioKey.current?.play();
    setAnswerElementValue(
      answerElementValue === QUESTION_MARK || keyboardInEqualKeys.includes(answerElementValue)
        ? value
        : `${answerElementValue}${value}`
    );
  };

  const onNextCatBtnClicked = () => {
    if (mistakes.length) {
      setExercises(mistakes);
    } else {
      if (!isLevel) return router.push(`/${language}/math`);

      shiftLevelsArray();
      setCategory(levelsArray[1]);
      setExsParams(categoriesMap.get(EExerciseCategories[levelsArray[1]]));
      setExercises(makeExerciseArray(levelsArray[1], chosenMaxNum));
    }
    setIsCatFinish(false);
    setMistakes([]);
    setMistakesStr([]);
  };

  if (!language || !exsParams)
    return (
      <h2>
        <Loader /> Loading...
      </h2>
    );

  if (isCatFinish)
    return (
      <CatComplete
        title={catCompleteTitle}
        btnTitle={btnCatCompleteTitle}
        onNextCatBtnClicked={onNextCatBtnClicked}
        exsQuant={exsQuant}
        mistakes={mistakes}
        mistakesStr={mistakesStr}
      />
    );

  if (isLevel && (!category || category === EExerciseCategories['level']))
    return <EndLevel language={language} />;

  return (
    <>
      <Title name={`${capitalizedFirstChar(getCatFromMap(category, language).title)}`} />
      <section className={styles.Computer} data-testid="Computer">
        <Monitor
          exerciseParts={exerciseParts}
          userAnswer={answerElementValue}
          arrExsLength={exercises.length}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exsParams.keyboardKeys[0])}
          clearBtnHandler={clearBtnHandler}
          exsRemains={exercises.length}
          mistakes={mistakes.length}
        />
        <Keyboard
          keyboardBtnClickHandler={keyboardBtnClickHandler}
          keyboardKeys={exsParams.keyboardKeys}
          enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, language)}
          enterClickHandler={enterClickHandler}
          isEnterDisabled={isEnterDisabled}
        />
      </section>
    </>
  );
};

export default Computer;

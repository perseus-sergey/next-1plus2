import { useEffect, useRef, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { arrayShift, capitalizedFirstChar, sleep } from '@/libs/utils';
import { ESoundPaths } from '@/libs/ESoundPaths';
import {
  EExerciseCategories,
  QUESTION_MARK,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';
// import { useRouter } from 'next/navigation';
import { useLevelsProvider } from '@/libs/context/MathLevelProvider';
import CatComplete from '../CatComplete/CatComplete';
import { IExsPart, makeExerciseParts } from '@/libs/exercises/math';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { useLangProvider } from '@/libs/context/LangProvider';

export enum EIsRightAnswer {
  'NOT',
  'RIGHT',
  'BAD',
}

const Computer = () => {
  const [exerciseParts, setExerciseParts] = useState<IExsPart[]>([]);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(EIsRightAnswer.NOT);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);
  // const router = useRouter();

  const {
    cat,
    exerciseParams,
    exercises,
    setExercises,
    mistakes,
    setMistakes,
    mistakesStr,
    setMistakesStr,
  } = useExercisesProvider();

  const { levelsArray, setLevelsArray } = useLevelsProvider();
  const { language } = useLangProvider();

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(cat, exercises);

  useEffect(() => {
    if (!exercises.length) return;

    setExerciseParts(
      makeExerciseParts(
        askElemNumbers,
        exercises[0],
        minusPlus,
        exerciseParams?.equalMark,
        cat === EExerciseCategories['inequality'],
        hint
      )
    );
  }, [cat, exercises, minusPlus, askElemNumbers, hint, exerciseParams?.equalMark]);

  const audioDel = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_DEL) : undefined
  );

  const audioKey = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_KEY) : undefined
  );

  const audioRightAnsw = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_RIGHT_ANSWER) : undefined
  );

  const audioWrongAnsw = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_WRONG_ANSWER) : undefined
  );

  const audioCatFinish = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END) : undefined
  );

  // const audioLevelFinish = useRef<HTMLAudioElement | undefined>(
  //   typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END_LEVEL) : undefined
  // );

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

  const finishLevel = () => {
    audioCatFinish.current?.play();
    setExercises(arrayShift(exercises));
    const [, ...rest] = levelsArray;
    setLevelsArray(rest);
    setIsFinish(true);
    // return router.push(`/${language}/math/level/${chosenMaxNum}/${rest[0]}`);
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
        ? finishLevel()
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

  // function addError (){
  //   error++;
  //   error_spn.textContent = `${msg.mistks}: ${error}`;
  // //	progressbar_span.textContent = `${arrTest.length}(${error})`;
  //   circles_ul.classList.add('bad_li');
  //   arrShowErr.push(spn_left.innerHTML + spn_mp.innerHTML + spn_centr.innerHTML + spn_eq.innerHTML + spn_right.innerHTML);
  // }

  const keyboardBtnClickHandler = (value: string) => {
    audioKey.current?.play();
    setAnswerElementValue(
      answerElementValue === QUESTION_MARK || keyboardInEqualKeys.includes(answerElementValue)
        ? value
        : `${answerElementValue}${value}`
    );
  };

  if (!language || !exerciseParams) return <h2>Loading...</h2>;
  if (isFinish) {
    if (badAnswer.length) setIsFinish(false);
    return <CatComplete />;
  }

  return (
    <>
      <Title
        name={`${capitalizedFirstChar(cat)} - ${getTitleFromMap(
          EMessageNames.LEFT_EXS_NUM_MSG,
          language
        )}: ${exercises.length} Mistakes: ${mistakes.length}`}
      />
      <section className={styles.Computer} data-testid="Computer">
        <Monitor
          exerciseParts={exerciseParts}
          userAnswer={answerElementValue}
          arrExsLength={exercises.length}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
          clearBtnHandler={clearBtnHandler}
        />
        <Keyboard
          keyboardBtnClickHandler={keyboardBtnClickHandler}
          keyboardKeys={exerciseParams.keyboardKeys}
          enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, language)}
          enterClickHandler={enterClickHandler}
          isEnterDisabled={isEnterDisabled}
        />
      </section>
    </>
  );
};

export default Computer;

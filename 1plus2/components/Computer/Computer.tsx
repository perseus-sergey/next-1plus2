import { useRef, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IExerciseComponentProps } from '../ExercisePage/ExercisePage';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { arrayShift, sleep } from '@/libs/utils';
import { ESoundPaths } from '@/libs/ESoundPaths';
import {
  EExerciseCategories,
  IExerciseParams,
  QUESTION_MARK,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';
// import { useRouter } from 'next/navigation';
import { useLevelsArray } from '@/libs/context/MathLevelProvider';
import CatComplete from '../CatComplete/CatComplete';

export interface IComputerProps extends IExerciseComponentProps {
  exerciseParams: IExerciseParams | undefined;
  exerciseArray: (string | number)[][];
}

export enum EIsRightAnswer {
  'NOT',
  'RIGHT',
  'BAD',
}

const Computer = ({ lang, exerciseParams, exerciseArray, cat, chosenMaxNum }: IComputerProps) => {
  const [exercises, setExercises] = useState(exerciseArray);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [badAnswers, setBadAnswers] = useState<(string | number)[][]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [isRightAnswer, setIsRightAnswer] = useState(EIsRightAnswer.NOT);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);

  // const router = useRouter();

  const { levelsArray, setLevelsArray } = useLevelsArray();

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(cat, exercises);

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
    setExercises(arrayShift(exercises));
    const [, ...rest] = levelsArray;
    setLevelsArray(rest);
    setIsFinish(true);
    // return router.push(`/${lang}/math/level/${chosenMaxNum}/${rest[0]}`);
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
    const [n1, n2] = exercises[0];
    audioWrongAnsw.current?.play();
    setBadAnswers([...badAnswers, exercises[0]]);
    // TODO: change for each cat
    setMistakes([...mistakes, `${n1} ${minusPlus} ${n2} ${'='} ${answerElementValue}`]);
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

  if (!lang || !exerciseParams) return <h2>Loading...</h2>;
  if (isFinish) {
    if (badAnswer.length) setIsFinish(false);
    return (
      <CatComplete
        mistakeArray={badAnswers}
        currentCat={cat}
        nextCat={levelsArray[0]}
        lang={lang}
        chosenMaxNum={chosenMaxNum}
      />
    );
  }

  return (
    <>
      {JSON.stringify(levelsArray)}
      <Title
        name={`${cat.toUpperCase()} - ${getTitleFromMap(EMessageNames.LEFT_EXS_NUM_MSG, lang)}: ${
          exercises.length
        }`}
      />
      <section className={styles.Computer} data-testid="Computer">
        <Monitor
          exercise={exercises[0]}
          hint={hint}
          minusPlus={minusPlus}
          userAnswer={answerElementValue}
          askElemNumbers={askElemNumbers}
          equalMark={exerciseParams.equalMark}
          arrExsLength={exercises.length}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
          isInequalCat={cat === EExerciseCategories['inequality']}
          clearBtnHandler={clearBtnHandler}
          isColumn={exerciseParams.isColumn}
        />
        <Keyboard
          keyboardBtnClickHandler={keyboardBtnClickHandler}
          keyboardKeys={exerciseParams.keyboardKeys}
          enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, lang)}
          enterClickHandler={enterClickHandler}
          isEnterDisabled={isEnterDisabled}
        />
      </section>
    </>
  );
};

export default Computer;

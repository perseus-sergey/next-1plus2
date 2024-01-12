'use client';

import React, { useCallback, useEffect, useReducer, useState } from 'react';
// import styles from './ExercisePage.module.scss';
import {
  IExsPart,
  NUMBER_OF_EXERCISES,
  getCatComplTitles,
  makeExerciseArray,
  makeExerciseParts,
} from '@/libs/exercises/math';
import Computer from '../Computer/Computer';
import {
  EExerciseCategories,
  IExerciseParams,
  QUESTION_MARK,
  categoriesMap,
  keyboardInequalKeys,
} from '@/libs/exercises/math.model';
import { Loader } from '../loaders/Loader';
import { arrayShift, sleep } from '@/libs/utils';
import { useMySound } from '@/libs/hooks/useSound';
import CatComplete from '../CatComplete/CatComplete';
import { useRouter } from 'next/navigation';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';
import { PlayFunction } from 'use-sound/dist/types';
import EndLevel from '../EndLevel/EndLevel';
import { useLangProvider } from '@/libs/context/LangProvider';
import { useDragProvider } from '@/libs/context/DragProvider';

export enum EIsRightAnswer {
  '_',
  'RIGHT',
  'BAD',
}

export interface IExerciseComponentProps {
  chosenMaxNum: number;
  cat: EExerciseCategories;
  levels?: EExerciseCategories[];
}

const ExercisePage = ({ cat, chosenMaxNum, levels = [] }: IExerciseComponentProps) => {
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

  const { language: lang } = useLangProvider();
  const { isColumn, draggedValue, isDragging, isOverDropZone } = useDragProvider();

  const [currentLevels, shiftLevelsArray] = useReducer(
    (oldArr: EExerciseCategories[]) => oldArr.slice(1),
    levels
  );

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(currentCat, exerciseArray[0]);

  const router = useRouter();

  useEffect(() => {
    const currCat = isLevel ? currentLevels[0] : cat;

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

  useEffect(() => {
    if (!isDragging) return;
    keyboardBtnClickHandler(draggedValue, !isOverDropZone);
  }, [isOverDropZone]);

  const { audioDel, audioKey, audioRightAnsw, audioWrongAnsw, audioCatFinish, audioLevelFinish } =
    useMySound();

  const playSound = (sound: PlayFunction) => isSound && sound();

  const enterClickHandler = () => {
    if (!exerciseArray.length || answerElementValue === QUESTION_MARK) return;
    setIsEnterDisabled(true);
    checkAnswer();
  };

  const clearBtnHandler = () => {
    if (answerElementValue === QUESTION_MARK) return;
    setAnswerElementValue(QUESTION_MARK);
    playSound(audioDel);
  };

  const finishCat = () => {
    playSound(audioCatFinish);
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
    setIsRightAnswer(EIsRightAnswer.RIGHT);
  };

  const badAnswer = () => {
    playSound(audioWrongAnsw);
    setMistakes((arr) => [...arr, exerciseArray[0]]);

    setMistakesStr([
      ...mistakesStr,
      exerciseParts
        .map(({ value, isQuestionPart }) => (isQuestionPart ? `[${answerElementValue}]` : value))
        .join(' '),
    ]);
    setIsRightAnswer(EIsRightAnswer.BAD);
  };

  const keyboardBtnClickHandler = useCallback(
    (value: string, isRemove = false) => {
      if (!value) return;

      if (isRemove) {
        setAnswerElementValue((oldVal) =>
          oldVal === QUESTION_MARK || oldVal.length < 2
            ? QUESTION_MARK
            : isColumn
              ? oldVal.slice(1)
              : oldVal.slice(0, oldVal.length - 1)
        );
      } else {
        playSound(audioKey);
        setAnswerElementValue((oldVal) =>
          oldVal === QUESTION_MARK || keyboardInequalKeys.includes(oldVal)
            ? value
            : isColumn
              ? `${value}${oldVal}`
              : `${oldVal}${value}`
        );
      }
    },
    [isColumn, audioKey]
  );

  const onNextCatBtnClicked = () => {
    if (mistakes.length) {
      setExerciseArray(mistakes);
      setExsArrayLength(mistakes.length);
    } else {
      if (!isLevel) return router.push(`/${lang}/math`);

      shiftLevelsArray();
      setCurrentCat(currentLevels[1]);
      setExsParams(categoriesMap.get(EExerciseCategories[currentLevels[1]]));
      setExerciseArray(makeExerciseArray(currentLevels[1], chosenMaxNum));
    }
    setIsCatFinish(false);
    setMistakes([]);
    setMistakesStr([]);
  };

  if (isLevel && (!currentCat || currentCat === EExerciseCategories['level'])) {
    playSound(audioLevelFinish);
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
  );
};

export default React.memo(ExercisePage);

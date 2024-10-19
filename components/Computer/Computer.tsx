import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { capitalizedWord } from '@/libs/utils';
import { keyboardNumKeys } from '@/models/math/math.model';
import Monitor from '../Monitor/Monitor';
import { IExsPart, getCatFromMap } from '@/libs/exercises/math';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';
import React from 'react';
import { EExerciseCategories, IExerciseParams } from '@/models/math/types';

interface IComputerProps {
  exerciseParts: IExsPart[];
  answerElementValue: string;
  isRightAnswer: EIsRightAnswer;
  clearBtnHandler: () => void;
  keyboardBtnClickHandler: (value: string) => void;
  enterClickHandler: () => void;
  isEnterDisabled: boolean;
  mistakesLength: number;
  exercisesLength: number;
  category: EExerciseCategories;
  exsParams: IExerciseParams | undefined;
}

const Computer = ({
  exerciseParts,
  answerElementValue,
  isRightAnswer,
  clearBtnHandler,
  keyboardBtnClickHandler,
  enterClickHandler,
  isEnterDisabled,
  mistakesLength,
  exercisesLength,
  category,
  exsParams,
}: IComputerProps) => {
  const { language } = useLangProvider();

  return (
    <>
      <Title name={`${capitalizedWord(getCatFromMap(category, language).title)}`} />
      <section className="text-white w-full space-y-8" data-testid="Computer">
        <Monitor
          exerciseParts={exerciseParts}
          userAnswer={answerElementValue}
          arrExsLength={exercisesLength}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exsParams?.keyboardKeys[0])}
          clearBtnHandler={clearBtnHandler}
          mistakes={mistakesLength}
          isColumn={exsParams?.isColumn}
        />
        <Keyboard
          keyboardBtnClickHandler={keyboardBtnClickHandler}
          keyboardKeys={exsParams?.keyboardKeys || keyboardNumKeys}
          enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, language)}
          enterClickHandler={enterClickHandler}
          isEnterDisabled={isEnterDisabled}
        />
      </section>
    </>
  );
};

export default React.memo(Computer);

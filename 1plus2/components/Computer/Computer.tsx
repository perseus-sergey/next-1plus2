import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';
import { keyboardNumKeys } from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';
import { IExsPart, getCatFromMap } from '@/libs/exercises/math';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';

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
}: IComputerProps) => {
  const { exsParams, category } = useExercisesProvider();

  const { language } = useLangProvider();

  return (
    <>
      <Title name={`${capitalizedFirstChar(getCatFromMap(category, language).title)}`} />
      <section className={styles.Computer} data-testid="Computer">
        <Monitor
          exerciseParts={exerciseParts}
          userAnswer={answerElementValue}
          arrExsLength={exercisesLength}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exsParams?.keyboardKeys[0])}
          clearBtnHandler={clearBtnHandler}
          mistakes={mistakesLength}
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

export default Computer;

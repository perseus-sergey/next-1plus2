import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import { EExerciseCategories, IExerciseParams } from '../exercises/math.model';

interface IProps {
  children: React.ReactNode;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  exercisesArray: (number | string)[][];
  exerciseParams: IExerciseParams | undefined;
}

type TMathExercisesContext = {
  category: EExerciseCategories;
  setCategory: Dispatch<SetStateAction<EExerciseCategories>>;
  chosenMaxNum: number;
  exercises: (number | string)[][];
  setExercises: Dispatch<SetStateAction<(number | string)[][]>>;
  // mistakes: (number | string)[][];
  // setMistakes: Dispatch<SetStateAction<(number | string)[][]>>;
  // mistakesStr: string[];
  // setMistakesStr: Dispatch<SetStateAction<string[]>>;
  exsParams: IExerciseParams | undefined;
  setExsParams: Dispatch<SetStateAction<IExerciseParams | undefined>>;
  isCatFinish: boolean;
  setIsCatFinish: Dispatch<SetStateAction<boolean>>;
};

const MathExercisesContext = createContext<TMathExercisesContext>({} as TMathExercisesContext);

export const useExercisesProvider = () => {
  const context = useContext(MathExercisesContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const MathExercisesProvider = ({
  children,
  cat,
  exercisesArray = [],
  exerciseParams,
  chosenMaxNum,
}: IProps) => {
  const [category, setCategory] = useState(cat);
  const [exsParams, setExsParams] = useState(exerciseParams);
  const [isCatFinish, setIsCatFinish] = useState(false);
  const [_exercises, setExercises] = useState<(number | string)[][]>(exercisesArray);
  // const [_mistakes, setMistakes] = useState<(number | string)[][]>([]);
  // const [_mistakesStr, setMistakesStr] = useState<string[]>([]);

  const exercises = useMemo(() => _exercises, [_exercises]);
  // const mistakes = useMemo(() => _mistakes, [_mistakes]);
  // const mistakesStr = useMemo(() => _mistakesStr, [_mistakesStr]);

  return (
    <MathExercisesContext.Provider
      value={{
        category,
        setCategory,
        chosenMaxNum,
        exercises,
        setExercises,
        // mistakes,
        // setMistakes,
        // mistakesStr,
        // setMistakesStr,
        exsParams,
        setExsParams,
        isCatFinish,
        setIsCatFinish,
      }}
    >
      {children}
    </MathExercisesContext.Provider>
  );
};

export default MathExercisesProvider;

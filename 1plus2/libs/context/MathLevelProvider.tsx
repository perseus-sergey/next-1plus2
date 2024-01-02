import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import { EExerciseCategories } from '../exercises/math.model';

interface IProps {
  children: React.ReactNode;
  levels?: EExerciseCategories[];
}

type TMathLevelContext = {
  levelsArray: EExerciseCategories[];
  setLevelsArray: Dispatch<SetStateAction<EExerciseCategories[]>>;
};

const MathLevelContext = createContext<TMathLevelContext>({} as TMathLevelContext);

export const useLevelsProvider = () => {
  const context = useContext(MathLevelContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const MathLevelProvider = ({ children, levels = [] }: IProps) => {
  const [_levelsArray, setLevelsArray] = useState<EExerciseCategories[]>(levels);

  const levelsArray = useMemo(() => _levelsArray, [_levelsArray]);

  return (
    <MathLevelContext.Provider value={{ levelsArray, setLevelsArray }}>
      {children}
    </MathLevelContext.Provider>
  );
};

export default MathLevelProvider;

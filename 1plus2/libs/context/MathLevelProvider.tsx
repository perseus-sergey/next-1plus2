import { createContext, useContext, useState } from 'react';
import { EExerciseCategories } from '../exercises/math.model';

interface IProps {
  children: React.ReactNode;
  levels?: EExerciseCategories[];
}

type TMathLevelContext = {
  levelsArray: EExerciseCategories[];
  shiftLevelsArray: () => void;
};

const MathLevelContext = createContext<TMathLevelContext>({} as TMathLevelContext);

export const useLevelsProvider = () => {
  const context = useContext(MathLevelContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const MathLevelProvider = ({ children, levels = [] }: IProps) => {
  const [levelsArray, setLevelsArray] = useState<EExerciseCategories[]>(levels);

  // const levelsArray = useMemo(() => _levelsArray, [_levelsArray]);

  const shiftLevelsArray = () => setLevelsArray(levelsArray.slice(1));

  return (
    <MathLevelContext.Provider value={{ levelsArray, shiftLevelsArray }}>
      {children}
    </MathLevelContext.Provider>
  );
};

export default MathLevelProvider;

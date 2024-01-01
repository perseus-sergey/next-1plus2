import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type TProps = { children: JSX.Element };

type TMathLevelContext = {
  levelArray: string;
  setLevelArray: Dispatch<SetStateAction<string>>;
};

const MathLevelContext = createContext<TMathLevelContext>({} as TMathLevelContext);

export const useMathLevel = () => useContext(MathLevelContext);

const MathLevelProvider = ({ children }: TProps) => {
  const [levelArray, setLevelArray] = useState<string>('');

  return (
    <MathLevelContext.Provider value={{ levelArray, setLevelArray }}>
      {children}
    </MathLevelContext.Provider>
  );
};

export default MathLevelProvider;

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type TProps = { children: JSX.Element };

type TKeyClickedValueContext = {
  keyClickedValue: string;
  setKeyClickedValue: Dispatch<SetStateAction<string>>;
};

const KeyClickedValueContext = createContext<TKeyClickedValueContext>(
  {} as TKeyClickedValueContext
);

export const useKeyClickedValue = () => useContext(KeyClickedValueContext);

const KeyClickedValueProvider = ({ children }: TProps) => {
  const [keyClickedValue, setKeyClickedValue] = useState<string>('');

  return (
    <KeyClickedValueContext.Provider value={{ keyClickedValue, setKeyClickedValue }}>
      {children}
    </KeyClickedValueContext.Provider>
  );
};

export default KeyClickedValueProvider;

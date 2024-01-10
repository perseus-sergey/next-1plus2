import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

export interface IDraggedObject {
  value: string;
  element?: EventTarget | null;
}

interface IProps {
  children: React.ReactNode;
}

type TDragContext = {
  draggedValue: IDraggedObject;
  setDraggedValue: Dispatch<SetStateAction<IDraggedObject>>;
};

const DragContext = createContext<TDragContext>({} as TDragContext);

export const useDragProvider = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const DragProvider = ({ children }: IProps) => {
  const [draggedValue, setDraggedValue] = useState<IDraggedObject>({ value: '', element: null });

  return (
    <DragContext.Provider value={{ draggedValue, setDraggedValue }}>
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;

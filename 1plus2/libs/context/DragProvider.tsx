import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

type TDragContext = {
  draggedValue: string;
  setDraggedValue: Dispatch<SetStateAction<string>>;
  isDraggable: boolean;
  setIsDraggable: Dispatch<SetStateAction<boolean>>;
};

const DragContext = createContext<TDragContext>({} as TDragContext);

export const useDragProvider = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const DragProvider = ({ children }: IProps) => {
  const [draggedValue, setDraggedValue] = useState<string>('');
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  return (
    <DragContext.Provider value={{ draggedValue, setDraggedValue, isDraggable, setIsDraggable }}>
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;

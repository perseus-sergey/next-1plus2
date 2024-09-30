import React, {
  Dispatch,
  SetStateAction,
  createContext,
  // useCallback,
  useContext,
  useState,
} from 'react';

interface IProps {
  children: React.ReactNode;
}

type TDragContext = {
  draggedValue: string;
  setDraggedValue: Dispatch<SetStateAction<string>>;
  isColumn: boolean;
  setIsColumn: Dispatch<SetStateAction<boolean>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  isOverDropZone: boolean;
  setIsOverDropZone: Dispatch<SetStateAction<boolean>>;
  dropZoneRect: DOMRect | null;
  setDropZoneRect: (value: DOMRect) => void;
};

const DragContext = createContext<TDragContext>({} as TDragContext);

export const useDragProvider = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error('Use app context within provider');
  return context;
};

const DragProvider = ({ children }: IProps) => {
  const [draggedValue, setDraggedValue] = useState<string>('');
  const [isColumn, setIsColumn] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isOverDropZone, setIsOverDropZone] = useState<boolean>(false);
  const [dropZoneRect, setDropZoneRect] = useState<DOMRect | null>(null);

  return (
    <DragContext.Provider
      value={{
        draggedValue,
        setDraggedValue,
        isColumn,
        setIsColumn,
        isDragging,
        setIsDragging,
        isOverDropZone,
        setIsOverDropZone,
        dropZoneRect,
        setDropZoneRect,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;

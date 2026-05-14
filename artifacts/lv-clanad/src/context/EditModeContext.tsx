import { createContext, useContext, useState, type ReactNode } from "react";

type EditModeValue = {
  editing: boolean;
  setEditing: (v: boolean) => void;
  cancel: () => void;
  cancelKey: number;
};

const EditModeContext = createContext<EditModeValue>({
  editing: false,
  setEditing: () => {},
  cancel: () => {},
  cancelKey: 0,
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [cancelKey, setCancelKey] = useState(0);
  const cancel = () => {
    setEditing(false);
    setCancelKey((k) => k + 1);
  };
  return (
    <EditModeContext.Provider value={{ editing, setEditing, cancel, cancelKey }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

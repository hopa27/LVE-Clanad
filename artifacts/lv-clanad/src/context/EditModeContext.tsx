import { createContext, useContext, useState, type ReactNode } from "react";

type EditModeValue = {
  editing: boolean;
  setEditing: (v: boolean) => void;
  cancel: () => void;
  cancelKey: number;
};

export const EditModeContext = createContext<EditModeValue>({
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

const ALWAYS_EDITING: EditModeValue = {
  editing: true,
  setEditing: () => {},
  cancel: () => {},
  cancelKey: 0,
};

export function AlwaysEditingProvider({ children }: { children: ReactNode }) {
  return (
    <EditModeContext.Provider value={ALWAYS_EDITING}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

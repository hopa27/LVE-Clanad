import { createContext, useContext, useState, type ReactNode } from "react";

type EditModeValue = {
  editing: boolean;
  setEditing: (v: boolean) => void;
};

const EditModeContext = createContext<EditModeValue>({
  editing: false,
  setEditing: () => {},
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  return (
    <EditModeContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

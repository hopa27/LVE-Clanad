import { createContext, useContext, useState, type ReactNode } from "react";

export type Cheque = {
  chequeNo: string;
  transferCompany: string;
  amount: string;
  loggedBy: string;
  date: string;
  deleted?: string;
  deletedDate?: string;
  deletedBy?: string;
  assigned?: string;
  assignedDate?: string;
  assignedBy?: string;
};

const INITIAL_CHEQUES: Cheque[] = [
  {
    chequeNo: "232693",
    transferCompany: "Liverpool Victoria Friendly Society Limited",
    amount: "12,450.00",
    loggedBy: "JSMITH",
    date: "12/05/2026",
    deleted: "N",
    deletedDate: "",
    deletedBy: "",
    assigned: "Y",
    assignedDate: "12/05/2026",
    assignedBy: "JSMITH",
  },
  {
    chequeNo: "232694",
    transferCompany: "Aviva Life & Pensions UK Limited",
    amount: "3,200.50",
    loggedBy: "AKHAN",
    date: "13/05/2026",
    deleted: "N",
    deletedDate: "",
    deletedBy: "",
    assigned: "Y",
    assignedDate: "13/05/2026",
    assignedBy: "AKHAN",
  },
  {
    chequeNo: "232695",
    transferCompany: "Legal & General Assurance Society",
    amount: "8,775.00",
    loggedBy: "RBROWN",
    date: "14/05/2026",
    deleted: "N",
    deletedDate: "",
    deletedBy: "",
    assigned: "N",
    assignedDate: "",
    assignedBy: "",
  },
];

type Ctx = {
  cheques: Cheque[];
  addCheque: (c: Cheque) => void;
  removeCheque: (chequeNo: string) => void;
  setCheques: (c: Cheque[]) => void;
};

const ChequesContext = createContext<Ctx | null>(null);

export function ChequesProvider({ children }: { children: ReactNode }) {
  const [cheques, setCheques] = useState<Cheque[]>(INITIAL_CHEQUES);
  const addCheque = (c: Cheque) => setCheques((prev) => [...prev, c]);
  const removeCheque = (chequeNo: string) =>
    setCheques((prev) => prev.filter((c) => c.chequeNo !== chequeNo));
  return (
    <ChequesContext.Provider value={{ cheques, addCheque, removeCheque, setCheques }}>
      {children}
    </ChequesContext.Provider>
  );
}

export function useCheques(): Ctx {
  const ctx = useContext(ChequesContext);
  if (!ctx) throw new Error("useCheques must be used within ChequesProvider");
  return ctx;
}

import { createContext, useContext, useState, type ReactNode } from "react";

export type PlanCodeVersion = "0" | "87" | "84" | "90" | "51" | "83";

export const PLAN_CODE_VERSIONS: {
  code: PlanCodeVersion;
  planType: string;
  description: string;
}[] = [
  { code: "0",  planType: "master", description: "Master — Default version" },
  { code: "87", planType: "FTA",    description: "Version 87 — Standard controls" },
  { code: "84", planType: "FTA",    description: "Version 84 — Full controls (incl. GAD & IR)" },
  { code: "90", planType: "MCP",    description: "Version 90 — MCP" },
  { code: "51", planType: "CPA",    description: "Version 51 — CPA (Status Q)" },
  { code: "83", planType: "PRP",    description: "Version 83 — PRP (Status W)" },
];

type PlanCodeValue = {
  planCode: PlanCodeVersion;
  setPlanCode: (code: PlanCodeVersion) => void;
  surname: string;
  setSurname: (s: string) => void;
  policyRef: string;
  setPolicyRef: (s: string) => void;
};

const PlanCodeContext = createContext<PlanCodeValue>({
  planCode: "0",
  setPlanCode: () => {},
  surname: "Master",
  setSurname: () => {},
  policyRef: "dbePolNo",
  setPolicyRef: () => {},
});

export function PlanCodeProvider({ children }: { children: ReactNode }) {
  const [planCode, setPlanCode] = useState<PlanCodeVersion>("90");
  const [surname, setSurname] = useState<string>("Master");
  const [policyRef, setPolicyRef] = useState<string>("dbePolNo");
  return (
    <PlanCodeContext.Provider
      value={{
        planCode,
        setPlanCode,
        surname,
        setSurname,
        policyRef,
        setPolicyRef,
      }}
    >
      {children}
    </PlanCodeContext.Provider>
  );
}

export function usePlanCode() {
  return useContext(PlanCodeContext);
}

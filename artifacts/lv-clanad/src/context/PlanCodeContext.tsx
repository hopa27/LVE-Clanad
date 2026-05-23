import { createContext, useContext, useState, type ReactNode } from "react";

export type PlanCodeVersion = "0" | "87" | "84";

export const PLAN_CODE_VERSIONS: {
  code: PlanCodeVersion;
  planType: string;
  description: string;
}[] = [
  { code: "0",  planType: "master", description: "Master — Default version" },
  { code: "87", planType: "FTA",    description: "Version 87 — Standard controls" },
  { code: "84", planType: "FTA",    description: "Version 84 — Full controls (incl. GAD & IR)" },
];

type PlanCodeValue = {
  planCode: PlanCodeVersion;
  setPlanCode: (code: PlanCodeVersion) => void;
};

const PlanCodeContext = createContext<PlanCodeValue>({
  planCode: "0",
  setPlanCode: () => {},
});

export function PlanCodeProvider({ children }: { children: ReactNode }) {
  const [planCode, setPlanCode] = useState<PlanCodeVersion>("0");
  return (
    <PlanCodeContext.Provider value={{ planCode, setPlanCode }}>
      {children}
    </PlanCodeContext.Provider>
  );
}

export function usePlanCode() {
  return useContext(PlanCodeContext);
}

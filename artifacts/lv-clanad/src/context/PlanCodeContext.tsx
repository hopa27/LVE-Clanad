import { createContext, useContext, useState, type ReactNode } from "react";

export type PlanCodeVersion = "0" | "87" | "84" | "90" | "51" | "83" | "82" | "621" | "76" | "62a" | "611" | "52" | "61a";

export const PLAN_CODE_VERSIONS: {
  code: PlanCodeVersion;
  planType: string;
  description: string;
}[] = [
  { code: "0",   planType: "master", description: "Master — Default version" },
  { code: "87",  planType: "FTA",    description: "Version 87 — Standard controls" },
  { code: "84",  planType: "FTA",    description: "Version 84 — Full controls (incl. GAD & IR)" },
  { code: "90",  planType: "MCP",    description: "Version 90 — MCP" },
  { code: "51",  planType: "CPA",    description: "Version 51 — CPA (Status Q)" },
  { code: "83",  planType: "PRP",    description: "Version 83 — PRP (Status W)" },
  { code: "82",  planType: "PRP",    description: "Version 82 — PRP (Status S)" },
  { code: "621", planType: "PPA",    description: "Version 621 — PPA (Status I)" },
  { code: "76",  planType: "ICFP",   description: "Version 76 — ICFP (Status D)" },
  { code: "62a", planType: "PPA",    description: "Version 62a — PPA (Status C)" },
  { code: "611", planType: "CPA",    description: "Version 611 — CPA (Status N)" },
  { code: "52",  planType: "PPA",    description: "Version 52 — PPA (Status X)" },
  { code: "61a", planType: "CPA",    description: "Version 61a — CPA (Status E)" },
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
  const [surname, setSurname] = useState<string>("TESTCTCCHIBD");
  const [policyRef, setPolicyRef] = useState<string>("227813");
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

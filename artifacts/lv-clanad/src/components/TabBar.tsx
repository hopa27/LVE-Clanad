import { usePlanCode } from "../context/PlanCodeContext";

export type TabKey =
  | "application"
  | "annuitant"
  | "contacts"
  | "contacts2"
  | "policy"
  | "bank"
  | "payments"
  | "increase"
  | "quote"
  | "diary"
  | "notes"
  | "letters"
  | "events"
  | "maturities"
  | "loa";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "application", label: "Application Details" },
  { key: "annuitant", label: "Annuitant(s) Details" },
  { key: "contacts", label: "Contacts" },
  { key: "contacts2", label: "Contacts" },
  { key: "policy", label: "Policy Details" },
  { key: "bank", label: "Bank Acc Details" },
  { key: "payments", label: "Payments" },
  { key: "increase", label: "Increase History" },
  { key: "quote", label: "Quote Details" },
  { key: "diary", label: "Diary & Audit Trail" },
  { key: "notes", label: "Notes" },
  { key: "letters", label: "Letters" },
  { key: "events", label: "Events" },
  { key: "maturities", label: "Maturities / Surrender" },
  { key: "loa", label: "LOA/POA" },
];

export function TabBar({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (key: TabKey) => void;
}) {
  const { planCode } = usePlanCode();
  const visibleTabs =
    planCode === "611" || planCode === "61a"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "87" || planCode === "84" || planCode === "90" || planCode === "51" || planCode === "82" || planCode === "621" || planCode === "62a" || planCode === "52"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "83" || planCode === "76"
      ? TABS.filter((t) => t.key !== "contacts2")
      : TABS;
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-4 min-w-max">
        {visibleTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`lve-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

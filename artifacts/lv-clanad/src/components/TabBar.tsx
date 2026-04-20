export type TabKey =
  | "application"
  | "annuitant"
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
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row gap-4 min-w-max">
        {TABS.map((tab) => (
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

import { useRef } from "react";
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
  const listRef = useRef<HTMLDivElement>(null);

  const visibleTabs =
    planCode === "611" || planCode === "61a"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "87" || planCode === "84" || planCode === "90" || planCode === "51" || planCode === "80" || planCode === "82" || planCode === "621" || planCode === "62a" || planCode === "52"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "83" || planCode === "76"
      ? TABS.filter((t) => t.key !== "contacts2")
      : TABS;

  const activeIdx = visibleTabs.findIndex((t) => t.key === activeTab);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = listRef.current
      ? Array.from(listRef.current.querySelectorAll<HTMLButtonElement>("button[role='tab']"))
      : [];
    if (!buttons.length) return;

    let nextIdx = activeIdx;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIdx = (activeIdx + 1) % visibleTabs.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIdx = (activeIdx - 1 + visibleTabs.length) % visibleTabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIdx = visibleTabs.length - 1;
    } else {
      return;
    }

    onChange(visibleTabs[nextIdx].key);
    buttons[nextIdx]?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Policy tabs"
        className="flex flex-row gap-4 min-w-max"
        onKeyDown={handleKeyDown}
      >
        {visibleTabs.map((tab, idx) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              type="button"
              className={`lve-tab ${isActive ? "active" : ""}`}
              onClick={() => onChange(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

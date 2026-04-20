import { useState, type JSX } from "react";
import { TopMenu } from "./components/TopMenu";
import { Toolbar } from "./components/Toolbar";
import { PolicyHeader } from "./components/PolicyHeader";
import { TabBar, type TabKey, TABS } from "./components/TabBar";
import { StatusBar } from "./components/StatusBar";
import { ApplicationDetailsTab } from "./tabs/ApplicationDetailsTab";
import { AnnuitantDetailsTab } from "./tabs/AnnuitantDetailsTab";
import { PolicyDetailsTab } from "./tabs/PolicyDetailsTab";
import { BankAccDetailsTab } from "./tabs/BankAccDetailsTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { IncreaseHistoryTab } from "./tabs/IncreaseHistoryTab";
import { QuoteDetailsTab } from "./tabs/QuoteDetailsTab";
import { DiaryAuditTab } from "./tabs/DiaryAuditTab";
import { NotesTab } from "./tabs/NotesTab";
import { LettersTab } from "./tabs/LettersTab";
import { EventsTab } from "./tabs/EventsTab";
import { MaturitiesSurrenderTab } from "./tabs/MaturitiesSurrenderTab";
import { LoaPoaTab } from "./tabs/LoaPoaTab";

const TAB_COMPONENTS: Record<TabKey, () => JSX.Element> = {
  application: ApplicationDetailsTab,
  annuitant: AnnuitantDetailsTab,
  policy: PolicyDetailsTab,
  bank: BankAccDetailsTab,
  payments: PaymentsTab,
  increase: IncreaseHistoryTab,
  quote: QuoteDetailsTab,
  diary: DiaryAuditTab,
  notes: NotesTab,
  letters: LettersTab,
  events: EventsTab,
  maturities: MaturitiesSurrenderTab,
  loa: LoaPoaTab,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("application");
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex flex-col h-screen bg-[color:var(--color-page-bg)]">
      <TopMenu />
      <Toolbar />
      <PolicyHeader />
      <TabBar
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-4 max-w-[1400px] mx-auto">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--color-text-muted)] mb-3">
            {TABS.find((t) => t.key === activeTab)?.label}
          </h2>
          <ActiveComponent />
        </div>
      </main>
      <StatusBar />
    </div>
  );
}

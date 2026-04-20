import { useState, type JSX } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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
  const activeLabel = TABS.find((t) => t.key === activeTab)?.label ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header title={`Client Annuity Administration System — ${activeLabel}`} />
      <main className="flex-1 px-[142px] py-8">
        <Toolbar />
        <PolicyHeader />
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-sm p-6 -mt-px">
          <ActiveComponent />
        </div>
        <StatusBar />
      </main>
      <Footer />
    </div>
  );
}

import { useState, useEffect, type JSX } from "react";
import { EditModeProvider, useEditMode } from "./context/EditModeContext";
import { ChequesProvider } from "./context/ChequesContext";
import {
  PlanCodeProvider,
  usePlanCode,
  type PlanCodeVersion,
} from "./context/PlanCodeContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toolbar } from "./components/Toolbar";
import { PolicyHeader } from "./components/PolicyHeader";
import { TabBar, type TabKey } from "./components/TabBar";
import { StatusBar } from "./components/StatusBar";
import { ApplicationDetailsTab } from "./tabs/ApplicationDetailsTab";
import { AnnuitantDetailsTab } from "./tabs/AnnuitantDetailsTab";
import { ContactsTab } from "./tabs/ContactsTab";
import { ContactsTab2 } from "./tabs/ContactsTab2";
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

const PLAN_CODE_ACCENT: Record<PlanCodeVersion, string> = {
  "0":   "#848285",
  "87":  "#F28C28",
  "84":  "#BEE4BE",
  "90":  "#F4D9E8",
  "51":  "#000080",
  "83":  "#BEE4BE",
  "621": "#000080",
  "76":  "#000080",
  "62a": "#000080",
};

const PLAN_CODE_ACCENT_FG: Record<PlanCodeVersion, string> = {
  "0":   "#ffffff",
  "87":  "#ffffff",
  "84":  "#023E02",
  "90":  "#710340",
  "51":  "#ffffff",
  "83":  "#023E02",
  "621": "#ffffff",
  "76":  "#ffffff",
  "62a": "#ffffff",
};

const TAB_COMPONENTS: Record<TabKey, () => JSX.Element> = {
  application: ApplicationDetailsTab,
  annuitant: AnnuitantDetailsTab,
  contacts: ContactsTab,
  contacts2: ContactsTab2,
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

function AppShell() {
  const [activeTab, setActiveTab] = useState<TabKey>("application");
  const ActiveComponent = TAB_COMPONENTS[activeTab];
  const { cancelKey } = useEditMode();
  const { planCode } = usePlanCode();

  // Allow Header menus to switch the active tab via a custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent<TabKey>).detail;
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("clanad:switch-tab", handler);
    return () => window.removeEventListener("clanad:switch-tab", handler);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f0f0f0]"
      style={{
        ["--lve-accent" as string]: PLAN_CODE_ACCENT[planCode],
        ["--lve-accent-fg" as string]: PLAN_CODE_ACCENT_FG[planCode],
      }}
    >
      <Header title="Client Annuity Administration System" />
      <main className="flex-1 px-[142px] py-8">
        <Toolbar />
        <PolicyHeader />
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-sm p-6 -mt-px">
          <ActiveComponent key={`${activeTab}:${cancelKey}:${planCode}`} />
        </div>
        <StatusBar />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <EditModeProvider>
      <ChequesProvider>
        <PlanCodeProvider>
          <AppShell />
        </PlanCodeProvider>
      </ChequesProvider>
    </EditModeProvider>
  );
}

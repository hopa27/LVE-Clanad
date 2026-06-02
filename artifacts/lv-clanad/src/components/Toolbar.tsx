import { useEffect, useState } from "react";
import {
  MdAdd,
  MdNoteAdd,
  MdContentCopy,
  MdEdit,
  MdSave,
  MdBlock,
  MdSearch,
  MdStorage,
  MdBarChart,
  MdBusiness,
  MdHistory,
} from "react-icons/md";
import { ConfirmDialog } from "./ConfirmDialog";
import { QuoteLookupModal } from "./QuoteLookupModal";
import { PullQuoteModal } from "./PullQuoteModal";
import { CompanySelectionModal } from "./CompanySelectionModal";
import { ReportsModal } from "./ReportsModal";
import { CrsModal } from "./CrsModal";
import { ChequeLoggerModal } from "./ChequeLoggerModal";
import { FindPolicyModal } from "./FindPolicyModal";
import { useEditMode } from "../context/EditModeContext";
import { usePlanCode } from "../context/PlanCodeContext";

type ToolAction =
  | "new-app"
  | "new-quote"
  | "sim-app"
  | "edit-toggle"
  | "edit-cancel"
  | "company"
  | "reports"
  | "crs"
  | "log"
  | "search";

type Tool = {
  label: string;
  icon: typeof MdAdd;
  enabled: boolean;
  action?: ToolAction;
};

export function Toolbar() {
  const { editing, setEditing, cancel } = useEditMode();
  const { planCode } = usePlanCode();
  const isPlan90 = planCode === "90";
  const isPlan84 = planCode === "84";
  const isPlan51 = planCode === "51";
  const [newAppConfirm, setNewAppConfirm] = useState(false);
  const [simAppConfirm, setSimAppConfirm] = useState(false);
  const [quoteLookupOpen, setQuoteLookupOpen] = useState(false);
  const [newQuoteOpen, setNewQuoteOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [crsOpen, setCrsOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [findPolicyOpen, setFindPolicyOpen] = useState(false);

  useEffect(() => {
    const handler = () => setFindPolicyOpen(true);
    window.addEventListener("clanad:open-find-policy", handler);
    return () => window.removeEventListener("clanad:open-find-policy", handler);
  }, []);

  const ALL_TOOLS: Tool[] = [
    { label: "New App", icon: MdAdd, enabled: !editing, action: "new-app" },
    { label: "New Quote", icon: MdNoteAdd, enabled: !editing && !isPlan84 && !isPlan90 && !isPlan51, action: "new-quote" },
    { label: "Sim App", icon: MdContentCopy, enabled: !editing && !isPlan51, action: "sim-app" },
    {
      label: editing ? "Save" : "Edit",
      icon: editing ? MdSave : MdEdit,
      enabled: true,
      action: "edit-toggle",
    },
    { label: "Cancel", icon: MdBlock, enabled: editing && !isPlan51, action: "edit-cancel" },
    { label: "Search", icon: MdSearch, enabled: !editing, action: "search" },
    { label: "Log", icon: MdHistory, enabled: !editing, action: "log" },
    { label: "CRS", icon: MdStorage, enabled: !editing, action: "crs" },
    { label: "Reports", icon: MdBarChart, enabled: !editing, action: "reports" },
    { label: "Company", icon: MdBusiness, enabled: !editing, action: "company" },
  ];
  const TOOLS = isPlan51
    ? ALL_TOOLS.filter((t) => t.action !== "edit-toggle" && t.action !== "log")
    : ALL_TOOLS;

  const handleClick = (action?: ToolAction) => {
    if (action === "new-app") setNewAppConfirm(true);
    else if (action === "new-quote") { if (!isPlan90 && !isPlan84) setNewQuoteOpen(true); }
    else if (action === "sim-app") setSimAppConfirm(true);
    else if (action === "edit-toggle") setEditing(!editing);
    else if (action === "edit-cancel") cancel();
    else if (action === "company") setCompanyOpen(true);
    else if (action === "reports") setReportsOpen(true);
    else if (action === "crs") setCrsOpen(true);
    else if (action === "log") setLogOpen(true);
    else if (action === "search") setFindPolicyOpen(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        const isPrimary = tool.action === "edit-toggle" && editing;
        return (
          <button
            key={tool.label}
            type="button"
            disabled={!tool.enabled}
            onClick={() => handleClick(tool.action)}
            className={`${
              isPrimary ? "lve-btn" : "lve-btn lve-btn-secondary"
            } lve-btn-sm`}
            title={tool.label}
          >
            <Icon size={18} />
            <span>{tool.label}</span>
          </button>
        );
      })}

      <ConfirmDialog
        open={newAppConfirm}
        message="Create a new Application?"
        onYes={() => {
          setNewAppConfirm(false);
          setQuoteLookupOpen(true);
        }}
        onNo={() => setNewAppConfirm(false)}
      />

      <ConfirmDialog
        open={simAppConfirm}
        message="Are you sure you wish to generate simultaneous policy?"
        onYes={() => {
          setSimAppConfirm(false);
          setQuoteLookupOpen(true);
        }}
        onNo={() => setSimAppConfirm(false)}
      />

      <QuoteLookupModal
        open={quoteLookupOpen}
        onClose={() => setQuoteLookupOpen(false)}
      />

      <PullQuoteModal
        open={newQuoteOpen}
        onClose={() => setNewQuoteOpen(false)}
      />

      <CompanySelectionModal
        open={companyOpen}
        onClose={() => setCompanyOpen(false)}
      />

      <ReportsModal
        open={reportsOpen}
        onClose={() => setReportsOpen(false)}
      />

      <CrsModal open={crsOpen} onClose={() => setCrsOpen(false)} />

      <ChequeLoggerModal open={logOpen} onClose={() => setLogOpen(false)} />

      <FindPolicyModal
        open={findPolicyOpen}
        onClose={() => setFindPolicyOpen(false)}
      />
    </div>
  );
}

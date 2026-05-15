import { useState } from "react";
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
import { CompanySelectionModal } from "./CompanySelectionModal";
import { ReportsModal } from "./ReportsModal";
import { CrsModal } from "./CrsModal";
import { FindPolicyModal } from "./FindPolicyModal";
import { useEditMode } from "../context/EditModeContext";

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
  const [newAppConfirm, setNewAppConfirm] = useState(false);
  const [quoteLookupOpen, setQuoteLookupOpen] = useState(false);
  const [newQuoteOpen, setNewQuoteOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [crsOpen, setCrsOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [findPolicyOpen, setFindPolicyOpen] = useState(false);

  const TOOLS: Tool[] = [
    { label: "New App", icon: MdAdd, enabled: !editing, action: "new-app" },
    { label: "New Quote", icon: MdNoteAdd, enabled: !editing, action: "new-quote" },
    { label: "Sim App", icon: MdContentCopy, enabled: !editing, action: "sim-app" },
    {
      label: editing ? "Save" : "Edit",
      icon: editing ? MdSave : MdEdit,
      enabled: true,
      action: "edit-toggle",
    },
    { label: "Cancel", icon: MdBlock, enabled: editing, action: "edit-cancel" },
    { label: "Search", icon: MdSearch, enabled: !editing, action: "search" },
    { label: "Log", icon: MdHistory, enabled: !editing, action: "log" },
    { label: "CRS", icon: MdStorage, enabled: !editing, action: "crs" },
    { label: "Reports", icon: MdBarChart, enabled: !editing, action: "reports" },
    { label: "Company", icon: MdBusiness, enabled: !editing, action: "company" },
  ];

  const handleClick = (action?: ToolAction) => {
    if (action === "new-app") setNewAppConfirm(true);
    else if (action === "new-quote") setNewQuoteOpen(true);
    else if (action === "sim-app") setQuoteLookupOpen(true);
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

      <QuoteLookupModal
        open={quoteLookupOpen}
        onClose={() => setQuoteLookupOpen(false)}
      />

      <QuoteLookupModal
        open={newQuoteOpen}
        onClose={() => setNewQuoteOpen(false)}
        empty
        initialQuery="20824110"
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

      {logOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[720px] max-w-full max-h-[80vh] flex flex-col">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Log</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setLogOpen(false)}
                aria-label="Close"
                title="Close"
              >
                <MdBlock size={18} />
              </button>
            </header>
            <div className="lve-panel-body overflow-auto">
              <table className="w-full text-[13px] font-['Mulish']">
                <thead>
                  <tr className="bg-[#002f5c] text-white text-left">
                    <th className="px-3 py-2 font-semibold">Date / Time</th>
                    <th className="px-3 py-2 font-semibold">User</th>
                    <th className="px-3 py-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[#3d3d3d]">
                  {[
                    ["15/05/2026 09:42", "JSMITH", "Policy opened"],
                    ["14/05/2026 16:08", "AKHAN", "Bank account amended"],
                    ["12/05/2026 11:21", "JSMITH", "Payment authorised"],
                    ["09/05/2026 14:55", "RBROWN", "Doctor record updated"],
                    ["02/05/2026 10:03", "JSMITH", "Annuitant details edited"],
                  ].map(([dt, user, action], i) => (
                    <tr key={i} className={i % 2 ? "bg-[#f7f7f7]" : "bg-white"}>
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{dt}</td>
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{user}</td>
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setLogOpen(false)}
                  className="lve-btn lve-btn-sm min-w-[100px] justify-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FindPolicyModal
        open={findPolicyOpen}
        onClose={() => setFindPolicyOpen(false)}
      />
    </div>
  );
}

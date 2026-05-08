import { useState } from "react";
import {
  MdAdd,
  MdNoteAdd,
  MdContentCopy,
  MdEdit,
  MdBlock,
  MdSearch,
  MdStorage,
  MdBarChart,
  MdBusiness,
} from "react-icons/md";
import { ConfirmDialog } from "./ConfirmDialog";
import { QuoteLookupModal } from "./QuoteLookupModal";

type ToolAction = "new-app" | "new-quote";

const TOOLS: {
  label: string;
  icon: typeof MdAdd;
  enabled: boolean;
  action?: ToolAction;
}[] = [
  { label: "New App", icon: MdAdd, enabled: true, action: "new-app" },
  { label: "New Quote", icon: MdNoteAdd, enabled: true, action: "new-quote" },
  { label: "Sim App", icon: MdContentCopy, enabled: true },
  { label: "Edit", icon: MdEdit, enabled: true },
  { label: "Cancel", icon: MdBlock, enabled: false },
  { label: "Search", icon: MdSearch, enabled: true },
  { label: "CRS", icon: MdStorage, enabled: true },
  { label: "Reports", icon: MdBarChart, enabled: true },
  { label: "Company", icon: MdBusiness, enabled: true },
];

export function Toolbar() {
  const [newAppConfirm, setNewAppConfirm] = useState(false);
  const [quoteLookupOpen, setQuoteLookupOpen] = useState(false);
  const [newQuoteOpen, setNewQuoteOpen] = useState(false);

  const handleClick = (action?: ToolAction) => {
    if (action === "new-app") setNewAppConfirm(true);
    else if (action === "new-quote") setNewQuoteOpen(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            disabled={!tool.enabled}
            onClick={() => handleClick(tool.action)}
            className="lve-btn lve-btn-secondary lve-btn-sm"
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
    </div>
  );
}

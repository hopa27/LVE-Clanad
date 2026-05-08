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
} from "react-icons/md";
import { ConfirmDialog } from "./ConfirmDialog";
import { QuoteLookupModal } from "./QuoteLookupModal";
import { useEditMode } from "../context/EditModeContext";

type ToolAction = "new-app" | "new-quote" | "edit-toggle" | "edit-cancel";

type Tool = {
  label: string;
  icon: typeof MdAdd;
  enabled: boolean;
  action?: ToolAction;
};

export function Toolbar() {
  const { editing, setEditing } = useEditMode();
  const [newAppConfirm, setNewAppConfirm] = useState(false);
  const [quoteLookupOpen, setQuoteLookupOpen] = useState(false);
  const [newQuoteOpen, setNewQuoteOpen] = useState(false);

  const TOOLS: Tool[] = [
    { label: "New App", icon: MdAdd, enabled: !editing, action: "new-app" },
    { label: "New Quote", icon: MdNoteAdd, enabled: !editing, action: "new-quote" },
    { label: "Sim App", icon: MdContentCopy, enabled: !editing },
    {
      label: editing ? "Save" : "Edit",
      icon: editing ? MdSave : MdEdit,
      enabled: true,
      action: "edit-toggle",
    },
    { label: "Cancel", icon: MdBlock, enabled: editing, action: "edit-cancel" },
    { label: "Search", icon: MdSearch, enabled: !editing },
    { label: "CRS", icon: MdStorage, enabled: !editing },
    { label: "Reports", icon: MdBarChart, enabled: !editing },
    { label: "Company", icon: MdBusiness, enabled: !editing },
  ];

  const handleClick = (action?: ToolAction) => {
    if (action === "new-app") setNewAppConfirm(true);
    else if (action === "new-quote") setNewQuoteOpen(true);
    else if (action === "edit-toggle") setEditing(!editing);
    else if (action === "edit-cancel") setEditing(false);
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
    </div>
  );
}

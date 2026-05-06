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

const TOOLS = [
  { label: "New App", icon: MdAdd, enabled: true, action: "new-app" as const },
  { label: "New Quote", icon: MdNoteAdd, enabled: false },
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

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            disabled={!tool.enabled}
            onClick={() => {
              if (tool.action === "new-app") setNewAppConfirm(true);
            }}
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
        onYes={() => setNewAppConfirm(false)}
        onNo={() => setNewAppConfirm(false)}
      />
    </div>
  );
}

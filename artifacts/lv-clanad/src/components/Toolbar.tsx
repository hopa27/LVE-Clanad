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

const TOOLS = [
  { label: "New App", icon: MdAdd, enabled: true },
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
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            disabled={!tool.enabled}
            className="lve-btn lve-btn-secondary lve-btn-sm"
            title={tool.label}
          >
            <Icon size={18} />
            <span>{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}

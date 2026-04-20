import {
  FilePlus2,
  FilePlus,
  Copy,
  Pencil,
  Ban,
  Search,
  Database,
  BarChart3,
  Building2,
  LogOut,
} from "lucide-react";

const TOOLS = [
  { label: "New App", icon: FilePlus2, enabled: true },
  { label: "New Quote", icon: FilePlus, enabled: false },
  { label: "Sim App", icon: Copy, enabled: true },
  { label: "Edit", icon: Pencil, enabled: true },
  { label: "Cancel", icon: Ban, enabled: false },
  { label: "Search", icon: Search, enabled: true },
  { label: "CRS", icon: Database, enabled: true },
  { label: "Reports", icon: BarChart3, enabled: true },
  { label: "Company", icon: Building2, enabled: true },
  { label: "Exit", icon: LogOut, enabled: true },
];

export function Toolbar() {
  return (
    <div className="flex items-center gap-1 px-3 py-1.5 border-b border-[color:var(--color-panel-border)] bg-white">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            disabled={!tool.enabled}
            className="btn-toolbar"
            title={tool.label}
          >
            <Icon size={18} strokeWidth={1.75} />
            <span>{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}

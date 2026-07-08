import { useCallback, useEffect, useRef, useState } from "react";
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
import { getShortcutKeys } from "../shortcuts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  | "search"
  | "exit";

type Tool = {
  label: string;
  icon: typeof MdAdd;
  enabled: boolean;
  action?: ToolAction;
  /** ID of the matching entry in the shortcut registry (`shortcuts.ts`). */
  shortcutId?: string;
};

export function Toolbar() {
  const { editing, setEditing, cancel } = useEditMode();
  const { planCode } = usePlanCode();
  const isPlan51  = planCode === "51";
  const isPlan621 = planCode === "621";
  const isPlan611 = planCode === "611";
  const isPlan84  = planCode === "84";
  const isPlan87  = planCode === "87";
  const isPlan90  = planCode === "90";
  const isPlan76  = planCode === "76";
  const isStatusL = isPlan84 || isPlan90;
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
    { label: "New App",   icon: MdAdd,         enabled: !editing,                          action: "new-app",     shortcutId: "toolbar:new-app" },
    { label: "New Quote", icon: MdNoteAdd,      enabled: isPlan87,                          action: "new-quote" },
    { label: "Sim App",   icon: MdContentCopy,  enabled: !editing && !isPlan51 && !isPlan76 && !isPlan84, action: "sim-app" },
    {
      label: editing ? "Save" : "Edit",
      icon: editing ? MdSave : MdEdit,
      enabled: !isPlan76,
      action: "edit-toggle",
      shortcutId: "toolbar:edit",
    },
    { label: "Cancel",  icon: MdBlock,   enabled: editing && !isPlan51, action: "edit-cancel", shortcutId: "toolbar:cancel" },
    { label: "Search",  icon: MdSearch,  enabled: !editing,                           action: "search",      shortcutId: "toolbar:search" },
    { label: "Log",     icon: MdHistory, enabled: !editing,                           action: "log",         shortcutId: "toolbar:log" },
    { label: "CRS",     icon: MdStorage, enabled: !editing,                           action: "crs",         shortcutId: "toolbar:crs" },
    { label: "Reports", icon: MdBarChart,enabled: !editing,                           action: "reports",     shortcutId: "toolbar:reports" },
    { label: "Company", icon: MdBusiness,enabled: !editing,                           action: "company",     shortcutId: "toolbar:company" },
  ];
  const isPlan62a = planCode === "62a";
  const isPlan52  = planCode === "52";
  const baseTools = (isPlan51 || isPlan62a || isPlan611 || isPlan52)
    ? ALL_TOOLS.filter((t) => t.action !== "edit-toggle" && t.action !== "log")
    : isStatusL || isPlan621
    ? ALL_TOOLS.filter((t) => t.action !== "log")
    : ALL_TOOLS;
  const TOOLS = baseTools;

  const handleClick = useCallback((action?: ToolAction) => {
    if (action === "new-app") setNewAppConfirm(true);
    else if (action === "new-quote") { /* always disabled */ }
    else if (action === "sim-app") setSimAppConfirm(true);
    else if (action === "edit-toggle") setEditing(!editing);
    else if (action === "edit-cancel") cancel();
    else if (action === "company") setCompanyOpen(true);
    else if (action === "reports") setReportsOpen(true);
    else if (action === "crs") setCrsOpen(true);
    else if (action === "log") setLogOpen(true);
    else if (action === "search") setFindPolicyOpen(true);
  }, [editing, setEditing, cancel]);

  const toolsRef = useRef(TOOLS);
  toolsRef.current = TOOLS;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.target as HTMLElement).isContentEditable) return;
      const key = e.key.toLowerCase();
      const tool = toolsRef.current.find((t) => {
        if (!t.shortcutId) return false;
        const keys = getShortcutKeys(t.shortcutId);
        return keys?.[0]?.toLowerCase() === key;
      });
      if (tool && tool.enabled && tool.action) {
        e.preventDefault();
        handleClick(tool.action);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  return (
    <TooltipProvider delayDuration={400}>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="w-full order-first flex flex-wrap items-center gap-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isPrimary = tool.action === "edit-toggle" && editing;
            const shortcutKeys = tool.shortcutId ? getShortcutKeys(tool.shortcutId) : undefined;
            const btnClass = `${isPrimary ? "lve-btn" : "lve-btn lve-btn-secondary"} lve-btn-sm`;

            if (!shortcutKeys) {
              return (
                <button
                  key={tool.label}
                  type="button"
                  disabled={!tool.enabled}
                  tabIndex={!tool.enabled ? -1 : undefined}
                  onClick={() => handleClick(tool.action)}
                  className={btnClass}
                >
                  <Icon size={18} />
                  <span>{tool.label}</span>
                </button>
              );
            }

            return (
              <Tooltip key={tool.label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled={!tool.enabled}
                    tabIndex={!tool.enabled ? -1 : undefined}
                    onClick={() => handleClick(tool.action)}
                    aria-description={`Shortcut: ${shortcutKeys.join("+")}`}
                    className={btnClass}
                  >
                    <Icon size={18} />
                    <span>{tool.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} avoidCollisions={false}>
                  <span className="font-semibold">{tool.label}</span>
                  {shortcutKeys.map((k, i) => (
                    <kbd
                      key={i}
                      className="ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-[18px] px-1 rounded-[3px] border border-white/40 bg-white/15 font-['Mulish'] text-[10px] font-semibold text-white/90"
                    >
                      {k}
                    </kbd>
                  ))}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

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
    </TooltipProvider>
  );
}

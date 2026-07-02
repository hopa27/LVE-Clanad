import { useEffect, useRef, useState } from "react";
import lvLogo from "../assets/lv-logo.png";
import { MdLogout, MdClose, MdCheck } from "react-icons/md";
import { TaxCertificateModal } from "./TaxCertificateModal";
import { AboutModal } from "./AboutModal";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { AmendChequesModal } from "./AmendChequesModal";
import { CompletionCheckerModal } from "./CompletionCheckerModal";
import { ScreenPrintModal } from "./ScreenPrintModal";
import { AmendIfaModal } from "./AmendIfaModal";
import { P45DetailsModal } from "./P45DetailsModal";
import { SetDeadModal } from "./SetDeadModal";
import { CedingSchemeModal } from "./CedingSchemeModal";
import { CopyP60Modal } from "./CopyP60Modal";
import { SupervisoryEditModal } from "./SupervisoryEditModal";
import { BankChangesReportModal } from "./BankChangesReportModal";
import { ReprintMaturityModal } from "./ReprintMaturityModal";
import { RecalcAnnStatModal } from "./RecalcAnnStatModal";
import { ReprintAnnualStatementsModal } from "./ReprintAnnualStatementsModal";
import { PullQuoteModal } from "./PullQuoteModal";
import { usePlanCode } from "../context/PlanCodeContext";

type SubItem = {
  label: string;
  accel?: string;
  action?: string;
};
type SubmenuItem = {
  label: string;
  accel?: string;
  action?: string;
  disabled?: boolean;
  hasSubmenu?: boolean;
  submenu?: SubItem[];
};
type MenuOption =
  | {
      kind?: "item";
      label: string;
      action?: string;
      hasSubmenu?: boolean;
      shortcut?: string;
      disabled?: boolean;
      submenu?: SubmenuItem[];
    }
  | { kind: "separator" };
type MenuItem = { label: string; options?: MenuOption[] };

const OPTIONS_51: MenuOption[] = [
  { label: "Screen Print", shortcut: "F1", action: "screen-print" },
  { label: "Search",       shortcut: "F5", action: "search" },
];

const PRINT_51: MenuOption[] = [
  {
    label: "Print MAR",
    hasSubmenu: true,
    submenu: [
      { label: "1st Life MAR" },
      { label: "2nd Life MAR" },
    ],
  },
  { label: "Diary Report" },
];

const OPTIONS_84: MenuOption[] = [
  { label: "P45 Details", action: "p45-details" },
  { label: "Screen Print", shortcut: "F1", action: "screen-print" },
  { label: "Search", shortcut: "F5", action: "search" },
];

const PROCESS_84: MenuOption[] = [
  {
    label: "Set Dead",
    hasSubmenu: true,
    submenu: [
      { label: "Life One", accel: "L", action: "set-dead-life-one" },
      { label: "Life Two/Current Beneficiary", accel: "L", action: "set-dead-life-two" },
    ],
  },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [
      { label: "Suspend", action: "suspend" },
    ],
  },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { kind: "separator" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { kind: "separator" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const PRINT_84: MenuOption[] = [
  { label: "Tax Certificate", action: "tax-certificate" },
  { label: "Copy P60", action: "copy-p60" },
  {
    label: "Reprint Mar's",
    hasSubmenu: true,
    submenu: [
      { label: "1st Life MAR" },
      { label: "2nd Life MAR" },
    ],
  },
  { label: "Diary Report" },
];

const PROCESS_83: MenuOption[] = [
  {
    label: "Set Dead",
    hasSubmenu: true,
    submenu: [
      { label: "Life One", accel: "L", action: "set-dead-life-one" },
      { label: "Life Two/Current Beneficiary", accel: "L", action: "set-dead-life-two" },
    ],
  },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [
      { label: "Suspend", action: "suspend" },
    ],
  },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { kind: "separator" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const PROCESS_82: MenuOption[] = [
  {
    label: "Set Dead",
    hasSubmenu: true,
    submenu: [
      { label: "Life One", accel: "L", action: "set-dead-life-one" },
      { label: "Life Two/Current Beneficiary", accel: "L", action: "set-dead-life-two" },
    ],
  },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [{ label: "Suspend", action: "suspend" }],
  },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { kind: "separator" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const PRINT_82: MenuOption[] = [
  { label: "Tax Certificate", action: "tax-certificate" },
  { label: "Copy P60", action: "copy-p60" },
  {
    label: "Reprint Mar's",
    hasSubmenu: true,
    submenu: [
      { label: "1st Life MAR" },
      { label: "2nd Life MAR" },
    ],
  },
  { label: "Diary Report" },
];

const SUPERVISOR_82: MenuOption[] = [
  { label: "Supervisory Edit", action: "supervisory-edit" },
  { label: "Revert to Live" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "Surrender", accel: "S", disabled: true },
      { label: "Maturity", accel: "M" },
      { label: "Expired", accel: "E", disabled: true },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Amend IFA", action: "amend-ifa" },
  { label: "C(ancel) Application" },
  {
    label: "Bank Detail Changes",
    hasSubmenu: true,
    submenu: [
      { label: "Bank Changes Awaiting Approval" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Changes", disabled: true },
    ],
  },
  { label: "Convert to Flexi-Access", disabled: true },
  { kind: "separator" },
  {
    label: "LTC",
    hasSubmenu: true,
    disabled: true,
    submenu: [{ label: "LTC Benefit" }],
  },
  { label: "Pull Quote", disabled: true },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const PROCESS_80: MenuOption[] = [
  {
    label: "Set Dead",
    hasSubmenu: true,
    submenu: [
      { label: "Life One", accel: "L", action: "set-dead-life-one" },
      { label: "Life Two/Current Beneficiary", accel: "L", action: "set-dead-life-two" },
    ],
  },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [{ label: "Suspend", action: "suspend" }],
  },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { kind: "separator" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { kind: "separator" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const SUPERVISOR_80: MenuOption[] = [
  { label: "Supervisory Edit", action: "supervisory-edit" },
  { label: "Revert to Maturity Pending" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "Surrender", accel: "S", disabled: true },
      { label: "Maturity", accel: "M", disabled: true },
      { label: "Expired", accel: "E", disabled: true },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Amend IFA", action: "amend-ifa" },
  { label: "C(ancel) Application" },
  {
    label: "Bank Detail Changes",
    hasSubmenu: true,
    submenu: [
      { label: "Bank Changes Awaiting Approval" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Changes", disabled: true },
    ],
  },
  { label: "Convert to Flexi-Access", disabled: true },
  { kind: "separator" },
  {
    label: "LTC",
    hasSubmenu: true,
    disabled: true,
    submenu: [{ label: "LTC Benefit" }],
  },
  { label: "Pull Quote", disabled: true },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const PROCESS_76: MenuOption[] = [
  { label: "ICFP Death Letters" },
  { label: "Set Dead", action: "set-dead" },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [{ label: "Suspend", action: "suspend" }],
  },
  { label: "ICFP Statement Print" },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { kind: "separator" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { kind: "separator" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const PROCESS_76z: MenuOption[] = [
  { label: "ICFP Death Letters" },
  {
    label: "Set Dead",
    hasSubmenu: true,
    submenu: [
      { label: "Life One", accel: "L", action: "set-dead-life-one" },
      { label: "Life Two/Current Beneficiary", accel: "L", action: "set-dead-life-two" },
    ],
  },
  {
    label: "Payments",
    hasSubmenu: true,
    submenu: [{ label: "Suspend", action: "suspend" }],
  },
  { label: "ICFP Statement Print" },
  { label: "PLA Cancellation", action: "pla-cancellation" },
  { kind: "separator" },
  { label: "Ceding Scheme Details", action: "ceding-scheme" },
  { kind: "separator" },
  { label: "LTC Benefit", disabled: true },
  { label: "Cancel LTC", disabled: true },
];

const PRINT_83: MenuOption[] = [
  { label: "Tax Certificate", action: "tax-certificate" },
  {
    label: "Reprint Mar's",
    hasSubmenu: true,
    submenu: [
      { label: "1st Life MAR" },
      { label: "2nd Life MAR" },
    ],
  },
  { label: "Diary Report" },
];

const SUPERVISOR_83: MenuOption[] = [
  { label: "Supervisory Edit", action: "supervisory-edit" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "Surrender", accel: "S", disabled: true },
      { label: "Maturity", accel: "M" },
      { label: "Expired", accel: "E", disabled: true },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Amend IFA", action: "amend-ifa" },
  { label: "C(ancel) Application" },
  {
    label: "Bank Detail Changes",
    hasSubmenu: true,
    submenu: [
      { label: "Bank Changes Awaiting Approval" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Changes", disabled: true },
    ],
  },
  { label: "Convert to Flexi-Access", disabled: true },
  { kind: "separator" },
  {
    label: "LTC",
    hasSubmenu: true,
    disabled: true,
    submenu: [{ label: "LTC Benefit" }],
  },
  { label: "Pull Quote", disabled: true },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const SUPERVISOR_84: MenuOption[] = [
  { label: "Supervisory Edit", action: "supervisory-edit" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "Surrender", accel: "S", disabled: true },
      { label: "Maturity", accel: "M", disabled: true },
      { label: "Expired", accel: "E", disabled: true },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Amend IFA", action: "amend-ifa" },
  { label: "C(ancel) Application" },
  {
    label: "Bank Detail Changes",
    hasSubmenu: true,
    submenu: [
      { label: "Bank Changes Awaiting Approval" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Changes", disabled: true },
    ],
  },
  { label: "Convert to Flexi-Access", disabled: true },
  { kind: "separator" },
  {
    label: "LTC",
    hasSubmenu: true,
    disabled: true,
    submenu: [{ label: "LTC Benefit" }],
  },
  { label: "Pull Quote", action: "pull-quote" },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const SUPERVISOR_87: MenuOption[] = [
  { label: "Final Quote Issued" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "NTU", accel: "N" },
      { label: "Backdate", accel: "B" },
      { label: "Cancel", accel: "C" },
      { label: "XDuplicate", accel: "X" },
      { label: "Surrender", accel: "S" },
      { label: "Maturity", accel: "M" },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Approve Bank Changes", disabled: true },
  { label: "Approve Maturity Bank Detail Changes", disabled: true },
  { kind: "separator" },
  { label: "Set Live" },
  { label: "Force Set Live" },
  { kind: "separator" },
  { label: "Set Status To Hold" },
  { label: "Set Status To Pending", disabled: true },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const SUPERVISOR_90: MenuOption[] = [
  { label: "Supervisory Edit", action: "supervisory-edit" },
  {
    label: "Status Change",
    hasSubmenu: true,
    submenu: [
      { label: "Surrender", accel: "S", disabled: true },
      { label: "Maturity", accel: "M", disabled: true },
      { label: "Expired", accel: "E", action: "expired-confirm" },
    ],
  },
  { label: "Amend Cheques", action: "amend-cheques" },
  { label: "Amend IFA", action: "amend-ifa" },
  { label: "C(ancel) Application", action: "cancel-application" },
  {
    label: "Bank Detail Changes",
    hasSubmenu: true,
    submenu: [
      { label: "Bank Changes Awaiting Approval", action: "bank-changes-awaiting" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Changes", disabled: true },
    ],
  },
  { label: "Convert to Flexi-Access", disabled: true },
  { kind: "separator" },
  {
    label: "LTC",
    hasSubmenu: true,
    disabled: true,
    submenu: [{ label: "LTC Benefit" }],
  },
  { label: "Pull Quote", action: "pull-quote" },
  { kind: "separator" },
  { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
  { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
  { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
];

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Options",
    options: [
      { label: "Screen Print", shortcut: "F1", action: "screen-print" },
      { label: "Check Completion", action: "check-completion" },
      { label: "Amend IFA", action: "amend-ifa" },
      { label: "Search", shortcut: "F5", action: "search" },
    ],
  },
  {
    label: "Process",
    options: [
      { label: "Payment Forecast" },
      { label: "N.I Sweep" },
      {
        label: "P45 details",
        hasSubmenu: true,
        submenu: [{ label: "P45 Details", action: "p45-details" }],
      },
      {
        label: "Monthly",
        hasSubmenu: true,
        submenu: [{ label: "Monthly Processing" }],
      },
      { label: "Coding Scheme Details" },
      { kind: "separator" },
      { label: "Cancel LTC", disabled: true },
    ],
  },
  {
    label: "Print",
    options: [
      {
        label: "Print MAR",
        hasSubmenu: true,
        submenu: [
          { label: "1st Life MAR" },
          { label: "2nd Life MAR" },
        ],
      },
      { label: "Auto Set Live Report" },
      { label: "Diary Report" },
    ],
  },
  {
    label: "Supervisor",
    options: [
      { label: "Final Quote Issued" },
      {
        label: "Status Change",
        hasSubmenu: true,
        submenu: [
          { label: "NTU", accel: "N" },
          { label: "Backdate", accel: "B" },
          { label: "Cancel", accel: "C" },
          { label: "XDuplicate", accel: "X" },
          { label: "Surrender", accel: "S" },
          { label: "Maturity", accel: "M" },
        ],
      },
      { label: "Amend Cheques", action: "amend-cheques" },
      { label: "Amend IFA", action: "amend-ifa" },
      { label: "Approve Bank Changes" },
      { label: "Approve Maturity Bank Detail Changes" },
      { kind: "separator" },
      { label: "Set Live" },
      { label: "Force Set Live" },
      { kind: "separator" },
      { label: "Set Status To Hold" },
      { label: "Set Status To Pending" },
      { kind: "separator" },
      { label: "Reprint Annual Statements", action: "reprint-annual-statements" },
      { label: "Annual Statement Recalculation", action: "annual-statement-recalc" },
      { label: "Reprint Maturity Letters", action: "reprint-maturity-letters" },
      { kind: "separator" },
      { label: "Tracesmart error - make policy editable" },
    ],
  },
  {
    label: "Help",
    options: [
      { label: "About", action: "about" },
      { label: "Keyboard Shortcuts", action: "keyboard-shortcuts" },
    ],
  },
];

export function Header({ title }: { title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [taxCertOpen, setTaxCertOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [amendChequesOpen, setAmendChequesOpen] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [screenPrintOpen, setScreenPrintOpen] = useState(false);
  const [amendIfaOpen, setAmendIfaOpen] = useState(false);
  const [p45DetailsOpen, setP45DetailsOpen] = useState(false);
  const [setDeadOpen, setSetDeadOpen] = useState(false);
  const [noSecondLifeOpen, setNoSecondLifeOpen] = useState(false);
  const [plaCancellationOpen, setPlaCancellationOpen] = useState(false);
  const [suspendClicks, setSuspendClicks] = useState(0);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [cedingOpen, setCedingOpen] = useState(false);
  const [copyP60Open, setCopyP60Open] = useState(false);
  const [supervisoryEditOpen, setSupervisoryEditOpen] = useState(false);
  const [expiredConfirmOpen, setExpiredConfirmOpen] = useState(false);
  const [cancelAppOpen, setCancelAppOpen] = useState(false);
  const [bankChangesReportOpen, setBankChangesReportOpen] = useState(false);
  const [reprintMaturityOpen, setReprintMaturityOpen] = useState(false);
  const [recalcAnnStatOpen, setRecalcAnnStatOpen] = useState(false);
  const [reprintAnnStmtOpen, setReprintAnnStmtOpen] = useState(false);
  const [pullQuoteOpen, setPullQuoteOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { planCode } = usePlanCode();
  const menuItems: MenuItem[] = MENU_ITEMS
    .filter((m) => {
      if (planCode === "51") return m.label === "Options" || m.label === "Print" || m.label === "Help";
      if (planCode === "62a") return m.label === "Options" || m.label === "Print" || m.label === "Help";
      if (planCode === "611" || planCode === "61a") return m.label === "Options" || m.label === "Print" || m.label === "Help";
      if (planCode === "52") return m.label === "Options" || m.label === "Print" || m.label === "Help";
      return true;
    })
    .map((m) => {
      if (planCode === "51" || planCode === "62a" || planCode === "611" || planCode === "52" || planCode === "61a") {
        if (m.label === "Options") return { ...m, options: OPTIONS_51 };
        if (m.label === "Print")   return { ...m, options: PRINT_51 };
      }
      if (planCode === "87" && m.label === "Supervisor")
        return { ...m, options: SUPERVISOR_87 };
      if (planCode === "87" && m.label === "Process")
        return {
          ...m,
          options: m.options?.map((opt) =>
            opt.kind !== "separator" && opt.label === "P45 details"
              ? { label: "P45 details", action: "p45-details" }
              : opt
          ),
        };
      if (planCode === "80") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_80 };
        if (m.label === "Print")      return { ...m, options: PRINT_82 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_80 };
      }
      if (planCode === "82") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_82 };
        if (m.label === "Print")      return { ...m, options: PRINT_82 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_82 };
      }
      if (planCode === "83") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_83 };
        if (m.label === "Print")      return { ...m, options: PRINT_83 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_83 };
      }
      if (planCode === "84" || planCode === "90") {
        if (m.label === "Options") return { ...m, options: OPTIONS_84 };
        if (m.label === "Process") return { ...m, options: PROCESS_84 };
        if (m.label === "Print") return { ...m, options: PRINT_84 };
        if (m.label === "Supervisor")
          return { ...m, options: planCode === "90" ? SUPERVISOR_90 : SUPERVISOR_84 };
      }
      if (planCode === "621") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_83 };
        if (m.label === "Print")      return { ...m, options: PRINT_84 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_83 };
      }
      if (planCode === "76") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_76 };
        if (m.label === "Print")      return { ...m, options: PRINT_84 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_84 };
      }
      if (planCode === "76z") {
        if (m.label === "Options")    return { ...m, options: OPTIONS_84 };
        if (m.label === "Process")    return { ...m, options: PROCESS_76z };
        if (m.label === "Print")      return { ...m, options: PRINT_82 };
        if (m.label === "Supervisor") return { ...m, options: SUPERVISOR_83 };
      }
      return m;
    });

  useEffect(() => {
    const handler = () => setShortcutsOpen(true);
    window.addEventListener("clanad:open-shortcuts", handler);
    return () => window.removeEventListener("clanad:open-shortcuts", handler);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIdx(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleOption = (action?: string) => {
    setOpenIdx(null);
    if (action === "tax-certificate") setTaxCertOpen(true);
    else if (action === "about") setAboutOpen(true);
    else if (action === "amend-cheques") setAmendChequesOpen(true);
    else if (action === "check-completion") setCompletionOpen(true);
    else if (action === "screen-print") setScreenPrintOpen(true);
    else if (action === "amend-ifa") setAmendIfaOpen(true);
    else if (action === "p45-details") setP45DetailsOpen(true);
    else if (action === "set-dead-life-one") setSetDeadOpen(true);
    else if (action === "set-dead-life-two") setNoSecondLifeOpen(true);
    else if (action === "pla-cancellation") setPlaCancellationOpen(true);
    else if (action === "ceding-scheme") setCedingOpen(true);
    else if (action === "copy-p60") setCopyP60Open(true);
    else if (action === "expired-confirm") setExpiredConfirmOpen(true);
    else if (action === "cancel-application") setCancelAppOpen(true);
    else if (action === "bank-changes-awaiting") setBankChangesReportOpen(true);
    else if (action === "reprint-maturity-letters") setReprintMaturityOpen(true);
    else if (action === "annual-statement-recalc") setRecalcAnnStatOpen(true);
    else if (action === "reprint-annual-statements") setReprintAnnStmtOpen(true);
    else if (action === "pull-quote") setPullQuoteOpen(true);
    else if (action === "keyboard-shortcuts") setShortcutsOpen(true);
    else if (action === "supervisory-edit") {
      window.dispatchEvent(new CustomEvent("clanad:switch-tab", { detail: "payments" }));
      setSupervisoryEditOpen(true);
    }
    else if (action === "suspend") {
      if (suspendClicks === 0) {
        setSuspendClicks(1);
      } else {
        setSuspendClicks(0);
        setSuspendOpen(true);
      }
    }
    else if (action === "search")
      window.dispatchEvent(new Event("clanad:open-find-policy"));
  };

  return (
    <header className="shrink-0">
      <div className="w-full bg-[#00263e] text-white py-5 px-[142px] flex items-center">
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-6 min-w-0">
            <img src={lvLogo} alt="LV=" className="h-6 w-auto shrink-0" />
            <h1 className="font-['Livvic'] tracking-tight text-white truncate text-[30px] font-normal">
              {title}
            </h1>
          </div>
          <button
            type="button"
            className="h-8 inline-flex items-center gap-2 px-4 rounded-[30px] text-white hover:bg-white/10 font-['Livvic'] text-sm transition-colors shrink-0"
          >
            <MdLogout size={16} />
            Logout
          </button>
        </div>
      </div>
      <nav
        ref={navRef}
        className="w-full bg-white border-b border-[#e3e6ea] shadow-sm px-[142px] h-12 flex items-center gap-1 font-['Livvic'] text-[14px] text-[#3d3d3d]"
      >
        {menuItems.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.label} className="relative">
              <button
                type="button"
                onClick={() =>
                  item.options ? setOpenIdx(isOpen ? null : idx) : setOpenIdx(null)
                }
                className={`h-8 px-4 rounded-[30px] inline-flex items-center font-medium transition-colors ${
                  isOpen
                    ? "bg-[#006cf4] text-white"
                    : "text-[#04589b] hover:bg-[#eaf5f8]"
                }`}
              >
                {item.label}
              </button>
              {item.options && isOpen && (
                <div className="absolute left-0 top-full mt-1 z-30 min-w-[220px] bg-white border border-[#e3e6ea] rounded-[8px] shadow-lg py-1 font-['Mulish'] text-[14px] text-[#3d3d3d]">
                  {item.options.map((opt, i) => {
                    if ("kind" in opt && opt.kind === "separator") {
                      return (
                        <div
                          key={`sep-${i}`}
                          className="my-1 border-t border-[#e3e6ea]"
                        />
                      );
                    }
                    return (
                      <div key={opt.label} className="relative group">
                        <button
                          type="button"
                          disabled={opt.disabled}
                          onClick={() =>
                            opt.hasSubmenu ? null : handleOption(opt.action)
                          }
                          className={`flex w-full items-center justify-between gap-6 px-4 py-2 text-left ${
                            opt.disabled
                              ? "text-[#b8b8b8] cursor-not-allowed"
                              : "hover:bg-[#eaf5f8] hover:text-[#003578] group-hover:bg-[#eaf5f8] group-hover:text-[#003578]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {opt.shortcut && (
                            <span className="text-[12px] text-[#7a7a7a] font-['Mulish']">
                              {opt.shortcut}
                            </span>
                          )}
                          {opt.hasSubmenu && (
                            <span className="text-[#04589b]">▶</span>
                          )}
                        </button>
                        {opt.hasSubmenu && opt.submenu && !opt.disabled && (
                          <div className="hidden group-hover:block absolute left-full top-0 -mt-1 ml-0 z-40 min-w-[180px] bg-white border border-[#e3e6ea] rounded-[8px] shadow-lg py-1 font-['Mulish'] text-[14px] text-[#3d3d3d] overflow-hidden">
                            {opt.submenu.map((sub) => {
                              const accelIdx = sub.accel
                                ? sub.label.toUpperCase().indexOf(sub.accel.toUpperCase())
                                : -1;
                              const labelEl =
                                accelIdx >= 0 ? (
                                  <span>
                                    {sub.label.slice(0, accelIdx)}
                                    <span className="underline">
                                      {sub.label.charAt(accelIdx)}
                                    </span>
                                    {sub.label.slice(accelIdx + 1)}
                                  </span>
                                ) : (
                                  <span>{sub.label}</span>
                                );
                              if (sub.hasSubmenu && sub.submenu) {
                                return (
                                  <div key={sub.label} className="relative group/sub">
                                    <button
                                      type="button"
                                      className="flex w-full items-center justify-between gap-4 px-4 py-2 text-left hover:bg-[#eaf5f8] hover:text-[#003578] group-hover/sub:bg-[#eaf5f8] group-hover/sub:text-[#003578]"
                                    >
                                      {labelEl}
                                      <span className="text-[#04589b]">▶</span>
                                    </button>
                                    <div className="hidden group-hover/sub:block absolute left-full top-0 -mt-1 z-50 min-w-[160px] bg-white border border-[#e3e6ea] rounded-[8px] shadow-lg py-1 font-['Mulish'] text-[14px] text-[#3d3d3d]">
                                      {sub.submenu.map((item) => {
                                        const ai = item.accel
                                          ? item.label.toUpperCase().indexOf(item.accel.toUpperCase())
                                          : -1;
                                        const el =
                                          ai >= 0 ? (
                                            <span>
                                              {item.label.slice(0, ai)}
                                              <span className="underline">{item.label.charAt(ai)}</span>
                                              {item.label.slice(ai + 1)}
                                            </span>
                                          ) : (
                                            <span>{item.label}</span>
                                          );
                                        return (
                                          <button
                                            key={item.label}
                                            type="button"
                                            onClick={() => handleOption(item.action)}
                                            className="flex w-full items-center px-4 py-2 text-left hover:bg-[#eaf5f8] hover:text-[#003578]"
                                          >
                                            {el}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={sub.label}
                                  type="button"
                                  disabled={sub.disabled}
                                  onClick={() => handleOption(sub.action)}
                                  className={`flex w-full items-center px-4 py-2 text-left ${
                                    sub.disabled
                                      ? "text-[#b8b8b8] cursor-not-allowed"
                                      : "hover:bg-[#eaf5f8] hover:text-[#003578]"
                                  }`}
                                >
                                  {labelEl}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <TaxCertificateModal
        open={taxCertOpen}
        onClose={() => setTaxCertOpen(false)}
      />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <KeyboardShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <AmendChequesModal
        open={amendChequesOpen}
        onClose={() => setAmendChequesOpen(false)}
      />
      <CompletionCheckerModal
        open={completionOpen}
        onClose={() => setCompletionOpen(false)}
      />
      <ScreenPrintModal
        open={screenPrintOpen}
        onClose={() => setScreenPrintOpen(false)}
      />
      <AmendIfaModal
        open={amendIfaOpen}
        onClose={() => setAmendIfaOpen(false)}
      />
      <P45DetailsModal
        open={p45DetailsOpen}
        onClose={() => setP45DetailsOpen(false)}
      />
      <SetDeadModal
        open={setDeadOpen}
        onClose={() => setSetDeadOpen(false)}
      />
      <CedingSchemeModal
        open={cedingOpen}
        onClose={() => setCedingOpen(false)}
        planCode={planCode}
      />
      <CopyP60Modal
        open={copyP60Open}
        onClose={() => setCopyP60Open(false)}
      />
      <SupervisoryEditModal
        open={supervisoryEditOpen}
        onClose={() => setSupervisoryEditOpen(false)}
        planCode={planCode}
      />
      <BankChangesReportModal
        open={bankChangesReportOpen}
        onClose={() => setBankChangesReportOpen(false)}
      />
      <ReprintMaturityModal
        open={reprintMaturityOpen}
        onClose={() => setReprintMaturityOpen(false)}
      />
      <RecalcAnnStatModal
        open={recalcAnnStatOpen}
        onClose={() => setRecalcAnnStatOpen(false)}
      />
      <ReprintAnnualStatementsModal
        open={reprintAnnStmtOpen}
        onClose={() => setReprintAnnStmtOpen(false)}
      />
      <PullQuoteModal
        open={pullQuoteOpen}
        onClose={() => setPullQuoteOpen(false)}
      />
      {cancelAppOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[400px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Information</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
                onClick={() => setCancelAppOpen(false)}
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body">
              <div className="flex items-center gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-[#006cf4] flex items-center justify-center shrink-0">
                  <span className="text-white text-[22px] font-bold font-['Mulish'] leading-none">i</span>
                </div>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                  You must reverse cheques first ?
                </p>
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setCancelAppOpen(false)}
                  className="lve-btn min-w-[80px] justify-center"
                >
                  <MdCheck size={16} />
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {expiredConfirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[420px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Confirm</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
                onClick={() => setExpiredConfirmOpen(false)}
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body">
              <div className="flex items-center gap-4 py-2">
                <div className="w-10 h-10 rounded-full bg-[#006cf4] flex items-center justify-center shrink-0">
                  <span className="text-white text-[22px] font-bold font-['Mulish'] leading-none">?</span>
                </div>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                  Are you sure you want to set the policy to Expired?
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setExpiredConfirmOpen(false)}
                  className="lve-btn min-w-[80px] justify-center"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setExpiredConfirmOpen(false)}
                  className="lve-btn lve-btn-secondary min-w-[80px] justify-center"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setExpiredConfirmOpen(false)}
                  className="lve-btn lve-btn-secondary min-w-[80px] justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {suspendOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[400px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Client Annuity Administration System</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
                onClick={() => setSuspendOpen(false)}
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col items-center gap-5">
              <p className="text-center font-['Mulish'] text-[14px] text-[#3d3d3d] py-2">
                This records payments are already suspended!
              </p>
              <button
                type="button"
                onClick={() => setSuspendOpen(false)}
                className="lve-btn lve-btn-sm min-w-[80px] justify-center"
              >
                <MdCheck size={16} />
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {plaCancellationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[340px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Client Annuity Administration System</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
                onClick={() => setPlaCancellationOpen(false)}
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col items-center gap-5">
              <p className="text-center font-['Mulish'] text-[14px] text-[#3d3d3d] py-2">
                This policy is not a PLA!
              </p>
              <button
                type="button"
                onClick={() => setPlaCancellationOpen(false)}
                className="lve-btn lve-btn-sm min-w-[80px] justify-center"
              >
                <MdCheck size={16} />
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {noSecondLifeOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[380px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Client Annuity Administration System</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
                onClick={() => setNoSecondLifeOpen(false)}
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col items-center gap-5">
              <p className="text-center font-['Mulish'] text-[14px] text-[#3d3d3d] py-2">
                There is no second life for this record!
              </p>
              <button
                type="button"
                onClick={() => setNoSecondLifeOpen(false)}
                className="lve-btn lve-btn-sm min-w-[80px] justify-center"
              >
                <MdCheck size={16} />
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

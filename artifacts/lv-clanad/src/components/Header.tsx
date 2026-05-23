import { useEffect, useRef, useState } from "react";
import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";
import { TaxCertificateModal } from "./TaxCertificateModal";
import { AboutModal } from "./AboutModal";
import { AmendChequesModal } from "./AmendChequesModal";
import { CompletionCheckerModal } from "./CompletionCheckerModal";
import { ScreenPrintModal } from "./ScreenPrintModal";
import { AmendIfaModal } from "./AmendIfaModal";

type SubmenuItem = {
  label: string;
  accel?: string;
  action?: string;
  disabled?: boolean;
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
        submenu: [{ label: "P45 Details" }],
      },
      {
        label: "Monthly",
        hasSubmenu: true,
        submenu: [{ label: "Monthly Processing" }],
      },
      { label: "Coding Scheme Details" },
      { kind: "separator" },
      { label: "Cancel LTC" },
    ],
  },
  {
    label: "Print",
    options: [
      { label: "Print Certificate", action: "tax-certificate" },
      { label: "Copy P60" },
      { label: "Reprint MAR's" },
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
          { label: "Surrender", accel: "S" },
          { label: "Maturity", accel: "M", disabled: true },
          { label: "Expired", accel: "E" },
        ],
      },
      { label: "Amend Cheques", action: "amend-cheques" },
      { label: "Approve Bank Changes", disabled: true },
      {
        label: "Approve Maturity Bank Detail Changes",
        hasSubmenu: true,
        submenu: [
          { label: "Bank Changes Awaiting Approval" },
          { label: "Approve Bank Changes", disabled: true },
          { label: "Approve Maturity Bank Changes", disabled: true },
        ],
      },
      { kind: "separator" },
      { label: "Set Live" },
      { label: "Force Set Live" },
      { kind: "separator" },
      { label: "Set Status To Hold" },
      { label: "Set Status To Pending", disabled: true },
      { kind: "separator" },
      { label: "Reprint Annual Statements" },
      { label: "Annual Statement Recalculation" },
      { label: "Reprint Maturity Letters" },
    ],
  },
  {
    label: "Help",
    options: [{ label: "About", action: "about" }],
  },
];

export function Header({ title }: { title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [taxCertOpen, setTaxCertOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [amendChequesOpen, setAmendChequesOpen] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [screenPrintOpen, setScreenPrintOpen] = useState(false);
  const [amendIfaOpen, setAmendIfaOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
    else if (action === "search")
      window.dispatchEvent(new Event("clanad:open-find-policy"));
  };

  return (
    <header className="shrink-0">
      <div className="w-full bg-[#00263e] text-white py-5 px-[142px] flex items-center">
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-6 min-w-0">
            <img src={lvLogo} alt="LV=" className="h-6 w-auto shrink-0" />
            <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white truncate">
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
        {MENU_ITEMS.map((item, idx) => {
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
                        {opt.hasSubmenu && opt.submenu && (
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
    </header>
  );
}

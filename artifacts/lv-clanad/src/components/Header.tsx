import { useEffect, useRef, useState } from "react";
import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";
import { TaxCertificateModal } from "./TaxCertificateModal";

type MenuOption =
  | {
      kind?: "item";
      label: string;
      action?: string;
      hasSubmenu?: boolean;
      shortcut?: string;
      disabled?: boolean;
    }
  | { kind: "separator" };
type MenuItem = { label: string; options?: MenuOption[] };

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Options",
    options: [
      { label: "Screen Print", shortcut: "F1" },
      { label: "Check Completion" },
      { label: "Amend IFA" },
      { label: "Search", shortcut: "F5" },
    ],
  },
  {
    label: "Process",
    options: [
      { label: "Payment Forecast" },
      { label: "NJ Sweep" },
      { label: "P45 details" },
      { label: "Monthly", hasSubmenu: true },
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
      { label: "Status Change", hasSubmenu: true },
      { label: "Amend Cheques" },
      { label: "Approve Bank Changes", disabled: true },
      { label: "Approve Maturity Bank Detail Changes", disabled: true },
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
    options: [{ label: "About" }],
  },
];

export function Header({ title }: { title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [taxCertOpen, setTaxCertOpen] = useState(false);
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
                <div className="absolute left-0 top-full mt-1 z-30 min-w-[220px] bg-white border border-[#e3e6ea] rounded-[8px] shadow-lg py-1 font-['Mulish'] text-[14px] text-[#3d3d3d] overflow-hidden">
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
                      <button
                        key={opt.label}
                        type="button"
                        disabled={opt.disabled}
                        onClick={() => handleOption(opt.action)}
                        className={`flex w-full items-center justify-between gap-6 px-4 py-2 text-left ${
                          opt.disabled
                            ? "text-[#b8b8b8] cursor-not-allowed"
                            : "hover:bg-[#eaf5f8] hover:text-[#003578]"
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
    </header>
  );
}

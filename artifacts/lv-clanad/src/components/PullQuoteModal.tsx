import { useRef, useState } from "react";
import {
  MdCheck,
  MdClose,
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdSkipPrevious,
  MdSearch,
  MdManageSearch,
} from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

const ILLUSTRATIONS: string[][] = [
  ["929149", "0", "SANDF-001", "18 Dec 2007", "Test44Mr Stanislas",          "PPA", "JOINT",  "64.75", "111003046", "No", "Printed", "STALW-00"],
  ["929543", "0", "QUOTE-001", "17 Dec 2007", "Test44Ms M Graham",           "CPA", "Single", "73.75", "111002872", "No", "Printed", "STALW-00"],
  ["929549", "0", "BARWE-001", "17 Dec 2007", "Test44Mr A Heseltine",        "PPA", "JOINT",  "64.75", "200000001", "No", "Printed", "STALW-00"],
  ["929550", "0", "RIDIN-001", "17 Dec 2007", "Test44Mrs J Hamilton-Winter", "CPA", "JOINT",  "59.75", "106003101", "PR", "Printed", "STALW-00"],
  ["929590", "0", "EASTS-001", "17 Dec 2007", "Test44Mr T Owens",            "CPA", "JOINT",  "59.75", "200000001", "PR", "Printed", "STALW-00"],
  ["929591", "0", "ELEME-004", "18 Dec 2007", "Test44Mr M Chisholm",         "PPA", "Single", "60.00", "111003046", "No", "Printed", "STALW-00"],
  ["929782", "0", "QUOTE-001", "17 Dec 2007", "Test44Mr M Delapeyre",        "CPA", "JOINT",  "59.75", "200000001", "No", "Printed", "STALW-00"],
  ["930038", "0", "OPENW-001", "18 Dec 2007", "Test44Mrs P Cadwell",         "CPA", "JOINT",  "58.25", "106003101", "No", "Printed", "STALW-00"],
  ["930041", "0", "QUOTE-001", "18 Dec 2007", "Test44Mrs G Burrows",         "CPA", "Single", "59.75", "111002872", "No", "Printed", "STALW-00"],
  ["930059", "0", "WENTW-002", "18 Dec 2007", "Test44Mr R Garnett",          "PPA", "JOINT",  "61.75", "111003046", "No", "Printed", "STALW-00"],
];

const ILLUSTRATION_COLS = [
  "Quote", "Variant(T)", "IFA", "Created", "Name", "Type",
  "LifeType", "Age 1", "User", "Master", "Status", "COCODE",
];

const VARIANT_COLS = [
  "Variant", "Series", "Created", "Username", "Type", "Life Type",
  "Gross Annuity", "Amount", "TFC %", "TFC", "Dep %", "O/lap", "Gtee",
];

const navBtn =
  "w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors";
const divider = "h-6 w-px bg-[#BBBBBB]";

export function PullQuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [monthlyCash, setMonthlyCash] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const total = ILLUSTRATIONS.length;
  const atStart = currentIndex <= 0;
  const atEnd = currentIndex >= total - 1;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[1100px] max-w-full max-h-[90vh] flex flex-col">

        <header className="lve-panel-header flex items-center justify-between">
          <span>Quote Lookup</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            aria-label="Close"
            onClick={onClose}
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">

            {/* Get Records */}
            <fieldset className="border border-[#BBBBBB] rounded-[8px] px-3 pt-1 pb-2">
              <legend className="px-1 font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
                Get Records
              </legend>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" name="pq-filter" defaultChecked className="w-3 h-3 accent-[#006cf4] cursor-pointer" />
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" name="pq-filter" className="w-3 h-3 accent-[#006cf4] cursor-pointer" />
                  </label>
                </div>
                <button
                  type="button"
                  className="w-7 h-7 inline-flex items-center justify-center rounded-[6px] border border-[#BBBBBB] bg-white text-[#04589b] hover:border-[#178830]"
                >
                  <MdManageSearch size={16} />
                </button>
                <input type="text" defaultValue="20275369" className="lve-input h-8 w-[160px]" />
              </div>
            </fieldset>

            <span className={divider} />

            {/* Nav buttons */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setCurrentIndex(0)} disabled={atStart} title="First" className={navBtn}>
                <MdFirstPage size={20} />
              </button>
              <button type="button" onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={atStart} title="Previous" className={navBtn}>
                <MdChevronLeft size={20} />
              </button>
              <span className="px-2 min-w-[80px] text-center text-sm font-bold text-[#4a4a49] select-none font-['Mulish']">
                {currentIndex + 1} of {total}
              </span>
              <button type="button" onClick={() => setCurrentIndex((i) => Math.min(total - 1, i + 1))} disabled={atEnd} title="Next" className={navBtn}>
                <MdChevronRight size={20} />
              </button>
              <button type="button" onClick={() => setCurrentIndex(total - 1)} disabled={atEnd} title="Last" className={navBtn}>
                <MdLastPage size={20} />
              </button>
            </div>

            <span className={divider} />

            <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
              <MdSkipPrevious size={16} />
              Last 60
            </button>
            <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
              <MdSearch size={16} />
              Locate (F3 Next)
            </button>

            <label className="inline-flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
              <input
                type="checkbox"
                checked={monthlyCash}
                onChange={(e) => setMonthlyCash(e.target.checked)}
                className="accent-[#006cf4]"
              />
              Monthly Cash Policy
            </label>

            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="lve-btn" onClick={onClose}>
                <MdCheck size={16} />
                OK
              </button>
              <button type="button" className="lve-btn lve-btn-secondary" onClick={onClose}>
                <MdClose size={16} />
                Cancel
              </button>
            </div>
          </div>

          {/* Illustrations grid */}
          <h4 className="font-['Livvic'] text-[13px] font-semibold text-[#3d3d3d] mb-1">
            Illustrations (Variant 0 only)
          </h4>
          <div className="overflow-auto border border-[#BBBBBB] rounded-[8px] mb-4">
            <table className="lve-grid">
              <thead>
                <tr>
                  {ILLUSTRATION_COLS.map((c) => (
                    <th key={c} className="whitespace-nowrap !px-3">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ILLUSTRATIONS.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`cursor-pointer ${i === currentIndex ? "bg-[#eaf5f8]" : ""}`}
                  >
                    {row.map((v, j) => (
                      <td key={j} className="!px-3 whitespace-nowrap">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Variants grid */}
          <h4 className="font-['Livvic'] text-[13px] font-semibold text-[#3d3d3d] mb-1">
            Variants
          </h4>
          <div className="overflow-auto border border-[#BBBBBB] rounded-[8px]">
            <table className="lve-grid">
              <thead>
                <tr>
                  {VARIANT_COLS.map((c) => (
                    <th key={c} className="whitespace-nowrap !px-3">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={VARIANT_COLS.length} className="!px-3 py-12 text-center text-[#888] font-['Mulish']">
                    No records
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

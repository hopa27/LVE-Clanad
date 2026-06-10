import { useRef, useState } from "react";
import {
  MdCheck,
  MdClose,
  MdSkipPrevious,
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
  MdSearch,
  MdManageSearch,
} from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

const ILLUSTRATIONS = [
  ["925149", "0", "SANDF-001", "18 Dec 2007", "Mr M Stanislas",        "PPA", "JOINT",  "64.75", "111000346", "No", "Printed", "STALW-001"],
  ["925180", "0", "QUOTE-001", "17 Dec 2007", "Mr M Graham",            "CPA", "Single", "73.75", "111002872", "No", "Printed", "STALW-001"],
  ["925189", "0", "BARWE-001", "17 Dec 2007", "Mr M Barwell",           "CPA", "JOINT",  "59.75", "111002872", "No", "PR",      "STALW-001"],
  ["925550", "0", "RIDIN-001", "17 Dec 2007", "Mrs J Hamilton-Winter",  "CPA", "Single", "59.75", "106003101", "No", "Printed", "STALW-001"],
  ["925757", "0", "EASTS-001", "17 Dec 2007", "Mr T Diveno",            "CPA", "JOINT",  "64.75", "111002872", "No", "PR",      "STALW-001"],
  ["925778", "0", "ELEME-001", "18 Dec 2007", "Mr M Chisholm",          "CPA", "Single", "64.75", "111002872", "No", "Printed", "STALW-001"],
  ["925782", "0", "QUOTE-001", "18 Dec 2007", "Mr M Delapeyer",         "CPA", "JOINT",  "59.75", "111002872", "No", "Printed", "STALW-001"],
  ["925827", "0", "QPCAD-001", "18 Dec 2007", "Mr P Cadwell",           "CPA", "Single", "59.75", "200000000", "No", "Printed", "STALW-001"],
  ["930001", "0", "QUOTE-001", "18 Dec 2007", "Mr G Burrows",           "CPA", "JOINT",  "59.75", "111002872", "No", "Printed", "STALW-001"],
  ["930059", "0", "WENTW-002", "18 Dec 2007", "Mr R Garnett",           "PPA", "JOINT",  "61.75", "111000346", "No", "Printed", "STALW-001"],
];

const ILLUSTRATION_COLS = [
  "Quote", "Variant", "IFA", "Created", "Name", "Type", "LifeType",
  "Age 1", "User", "Master", "Status", "COCODE",
];

const VARIANT_COLS = [
  "Variant", "Series", "Created", "Username", "Type", "Life Type",
  "Gross Annuity", "Amount", "TFC %", "TFC", "Dep %", "O/lap", "Gtee",
  "Esc %", "Frequency", "Pay Type",
  "Name 1", "Sex 1", "DOB 1", "Age 1", "Smk 1", "Special 1",
  "Name 2", "Sex 2", "DOB 2", "Age 2", "Smk 2", "Special 2",
  "Commence", "B/D Fee", "IFA", "Network", "Master",
  "Expense %", "Comm %", "Brok Split %", "Memb Split %",
  "PLATAXRATE", "CAPITALELEMENT", "TAXRATE", "SINGLEGRATE", "JOINTGRATE", "GRATE",
  "C.Age 1", "C.Age 2", "APRIME1", "APRIME2",
];

const VARIANTS: string[][] = [
  [
    "16","333","25/06/2008","LOPRXP","PPA","JOINT","£3,231.00","61552.52","25","15388.13","50","No","10 year","0","Monthly","Arrears",
    "Test66Mr R Stanislas","Male","29/12/1942","65.25","No","SP2",
    "Test66Mrs J Stanislas","Female","","60","No","No",
    "25/06/2008","","SANDF-001","No","No","2.9","1","","","","","","","","","","59.25","59.25","","",
  ],
  [
    "17","333","25/06/2008","106003590","PPA","JOINT","£3,311.00","61552.52","25","15388.13","50","No","10 year","0","Monthly","Arrears",
    "Test66Mr Stanislas","Male","29/12/1942","65.25","No","SP2",
    "Test66Mrs Stanislas","Female","","60","No","No",
    "25/06/2008","","SANDF-001","No","No","2.9","1","","","","","","","","","","59.25","59.25","","",
  ],
  [
    "18","333","25/07/2008","106003142","PPA","JOINT","£3,441.00","61652.05","25","15413.01","50","No","10 year","0","Monthly","Arrears",
    "Test66Mr Stanislas","Male","29/12/1942","65.5","No","SP2",
    "Test66Mrs Stanislas","Female","12/06/1948","60","No","No",
    "22/07/2008","","SANDF-001","No","No","2.9","","","","","","","","","","","59.5","59.5","","",
  ],
];

export function QuoteLookupModal({
  open,
  onClose,
  empty = false,
  initialQuery = "20150570",
}: {
  open: boolean;
  onClose: () => void;
  empty?: boolean;
  initialQuery?: string;
}) {
  const illustrations = ILLUSTRATIONS;
  const variants = empty ? [] : VARIANTS;
  const total = illustrations.length;
  const hasRecords = total > 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const navBtn =
    "w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors";
  const divider = "h-6 w-px bg-[#BBBBBB]";

  const goFirst = () => setCurrentIndex(0);
  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(total - 1, i + 1));
  const goLast = () => setCurrentIndex(total - 1);
  const atStart = !hasRecords || currentIndex <= 0;
  const atEnd = !hasRecords || currentIndex >= total - 1;

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
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <fieldset className="border border-[#BBBBBB] rounded-[8px] px-3 pt-1 pb-2">
              <legend className="px-1 font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
                Get Records
              </legend>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="get-records-mode"
                      defaultChecked
                      className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                    />
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="get-records-mode"
                      className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  title="Lookup"
                  className="w-7 h-7 inline-flex items-center justify-center rounded-[6px] border border-[#BBBBBB] bg-white text-[#04589b] hover:border-[#178830]"
                >
                  <MdManageSearch size={16} />
                </button>
                <input
                  key={initialQuery}
                  type="text"
                  defaultValue={initialQuery}
                  className="lve-input h-8 w-[160px]"
                />
              </div>
            </fieldset>
            <span className={divider} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goFirst}
                disabled={atStart}
                title="First Record"
                className={navBtn}
              >
                <MdFirstPage size={20} />
              </button>
              <button
                type="button"
                onClick={goPrev}
                disabled={atStart}
                title="Previous Record"
                className={navBtn}
              >
                <MdChevronLeft size={20} />
              </button>
              <span className="px-2 min-w-[80px] text-center text-sm font-bold text-[#4a4a49] select-none font-['Mulish']">
                {hasRecords ? `${currentIndex + 1} of ${total}` : "0 of 0"}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={atEnd}
                title="Next Record"
                className={navBtn}
              >
                <MdChevronRight size={20} />
              </button>
              <button
                type="button"
                onClick={goLast}
                disabled={atEnd}
                title="Last Record"
                className={navBtn}
              >
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
            <label className="inline-flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d]">
              <input type="checkbox" className="accent-[#006cf4]" />
              Monthly Cash Policy
            </label>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="lve-btn" onClick={onClose}>
                <MdCheck size={16} />
                OK
              </button>
              <button
                type="button"
                className="lve-btn lve-btn-secondary"
                onClick={onClose}
              >
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
                    <th key={c} className="whitespace-nowrap !px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {illustrations.length === 0 && (
                  <tr>
                    <td
                      colSpan={ILLUSTRATION_COLS.length}
                      className="!px-3 py-12 text-center text-[#888] font-['Mulish']"
                    >
                      No records
                    </td>
                  </tr>
                )}
                {illustrations.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`cursor-pointer ${
                      i === currentIndex ? "bg-[#eaf5f8]" : ""
                    }`}
                  >
                    {row.map((v, j) => (
                      <td key={j} className="!px-3 whitespace-nowrap">
                        {v}
                      </td>
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
                    <th key={c} className="whitespace-nowrap !px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.length === 0 && (
                  <tr>
                    <td
                      colSpan={VARIANT_COLS.length}
                      className="!px-3 py-12 text-center text-[#888] font-['Mulish']"
                    >
                      No records
                    </td>
                  </tr>
                )}
                {variants.map((row, i) => (
                  <tr key={i}>
                    {row.map((v, j) => (
                      <td key={j} className="!px-3 whitespace-nowrap">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

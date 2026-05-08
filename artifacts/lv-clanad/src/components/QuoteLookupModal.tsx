import { useState } from "react";
import {
  MdCheck,
  MdClose,
  MdSkipPrevious,
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
  MdSearch,
} from "react-icons/md";

const ILLUSTRATIONS = [
  ["925149", "0", "SANDF-001", "18 Dec 2007", "Mr M Stanislas",        "PPA", "JOINT",  "64.75", "111000346", "No", "Printed"],
  ["925180", "0", "QUOTE-001", "17 Dec 2007", "Mr M Graham",            "CPA", "Single", "73.75", "111002872", "No", "Printed"],
  ["925189", "0", "BARWE-001", "17 Dec 2007", "Mr M Barwell",           "CPA", "JOINT",  "59.75", "111002872", "No", "PR"],
  ["925550", "0", "RIDIN-001", "17 Dec 2007", "Mrs J Hamilton-Winter",  "CPA", "Single", "59.75", "106003101", "No", "Printed"],
  ["925757", "0", "EASTS-001", "17 Dec 2007", "Mr T Diveno",            "CPA", "JOINT",  "64.75", "111002872", "No", "PR"],
  ["925778", "0", "ELEME-001", "18 Dec 2007", "Mr M Chisholm",          "CPA", "Single", "64.75", "111002872", "No", "Printed"],
  ["925782", "0", "QUOTE-001", "18 Dec 2007", "Mr M Delapeyer",         "CPA", "JOINT",  "59.75", "111002872", "No", "Printed"],
  ["925827", "0", "QPCAD-001", "18 Dec 2007", "Mr P Cadwell",           "CPA", "Single", "59.75", "200000000", "No", "Printed"],
  ["930001", "0", "QUOTE-001", "18 Dec 2007", "Mr G Burrows",           "CPA", "JOINT",  "59.75", "111002872", "No", "Printed"],
  ["930059", "0", "WENTW-002", "18 Dec 2007", "Mr R Garnett",           "PPA", "JOINT",  "61.75", "111000346", "No", "Printed"],
];

const ILLUSTRATION_COLS = [
  "Quote", "Variant", "IFA", "Created", "Name", "Type", "LifeType",
  "Age 1", "User", "Master", "Status",
];

const VARIANTS: string[][] = [];

const VARIANT_COLS = [
  "Variant", "Serino", "Created", "Username", "Type", "Life Type",
  "Gross Annuity", "Amount", "TFC %", "TFC", "Dep %",
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
  const illustrations = empty ? [] : ILLUSTRATIONS;
  const variants = empty ? [] : VARIANTS;
  const total = illustrations.length;
  const hasRecords = total > 0;
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="lve-panel bg-white w-[1100px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Quote Lookup</span>
          <button
            type="button"
            className="text-white/80 hover:text-white"
            onClick={onClose}
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
              Get Records
            </span>
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
            <input
              key={initialQuery}
              type="text"
              defaultValue={initialQuery}
              className="lve-input w-[140px]"
            />
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

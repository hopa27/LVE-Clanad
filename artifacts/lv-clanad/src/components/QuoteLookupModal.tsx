import {
  MdCheck,
  MdClose,
  MdSkipPrevious,
  MdChevronLeft,
  MdChevronRight,
  MdSkipNext,
  MdSearch,
  MdFastRewind,
} from "react-icons/md";

const ILLUSTRATIONS = [
  ["925849", "1", "SANDF-001", "18 Dec 2007", "Mr M Stanislas", "PPA", "JOINT", "64.75", "11110030466", "", "Printed"],
  ["929540", "1", "QUOTE-001", "18 Dec 2007", "Mr M Graham", "PPA", "Single", "73.75", "11110028372", "", "Printed"],
  ["929544", "0", "BAPVH-001", "18 Dec 2007", "Mr M A Hamilton", "PPA", "Single", "67.75", "1080003571", "", "Printed"],
  ["929545", "0", "REGIN-001", "18 Dec 2007", "Mr M Hamilton-Webster", "PPA", "JOINT", "64.75", "1080003571", "", "Printed"],
  ["929546", "1", "EASTS-001", "17 Dec 2007", "Mr T Owens", "PPA", "Single", "75.75", "1080003571", "", "Printed"],
  ["929547", "1", "ELEME-004", "18 Dec 2007", "Mr M Chisholm", "PPA", "Single", "60", "1110030466", "", "Printed"],
  ["930040", "0", "OPENV-001", "18 Dec 2007", "Mr P Cadwell", "PPA", "Single", "67.75", "2000000001", "", "PR"],
  ["930041", "0", "BAPVH-001", "18 Dec 2007", "Mr G Burrows", "PPA", "JOINT", "60.75", "1110030466", "", "Printed"],
  ["930058", "0", "WENTW-002", "18 Dec 2007", "Mr R Garnett", "PPA", "Single", "75.75", "1110030466", "", "Printed"],
];

const ILLUSTRATION_COLS = [
  "Quote", "Variant", "IFA", "Created", "Name", "Type", "LifeType",
  "Age 1", "User", "Master", "Status",
];

const VARIANTS = [
  ["16", "222", "25/06/2008", "LORHOP", "PPA", "JOINT", "£3,225.00", "61852.62", "25", "15368.13", "10"],
  ["17", "333", "25/06/2008", "11060000800", "PPA", "JOINT", "£3,311.00", "61852.62", "25", "15368.13", "10"],
  ["18", "333", "25/06/2008", "11060000800", "PPA", "JOINT", "£3,441.00", "61852.62", "25", "15413.01", "10"],
];

const VARIANT_COLS = [
  "Id", "Series", "Created", "Username", "Type", "Life Type",
  "Gross Annuity Inc", "Tax/I", "TFC %", "TFC", "Dep %",
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
  if (!open) return null;
  const illustrations = empty ? [] : ILLUSTRATIONS;
  const variants = empty ? [] : VARIANTS;

  const navBtn =
    "h-8 w-8 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#3d3d3d] hover:border-[#178830]";

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
            <div className="flex items-center gap-1">
              <button type="button" className={navBtn} title="First">
                <MdFastRewind size={16} />
              </button>
              <button type="button" className={navBtn} title="Previous">
                <MdChevronLeft size={16} />
              </button>
              <button type="button" className={navBtn} title="Next">
                <MdChevronRight size={16} />
              </button>
              <button type="button" className={navBtn} title="Last">
                <MdSkipNext size={16} />
              </button>
            </div>
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

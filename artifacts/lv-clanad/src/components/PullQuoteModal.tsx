import { useState } from "react";
import { MdClose, MdCheck, MdCancel, MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from "react-icons/md";

const ILLUSTRATIONS = [
  { quote: 929149, variant: 0, ifa: "SANDF-001", created: "18 Dec 2007", name: "Test44Mr Stanislas", type: "PPA", lifeType: "JOINT", age1: 64.75, user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929543, variant: 0, ifa: "QUOTE-001", created: "17 Dec 2007", name: "Test44Ms M Graham", type: "CPA", lifeType: "Single", age1: 73.75, user: "111002872", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929549, variant: 0, ifa: "BARWE-001", created: "17 Dec 2007", name: "Test44Mr A Heseltine", type: "PPA", lifeType: "JOINT", age1: 64.75, user: "200000001", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929550, variant: 0, ifa: "RIDIN-001", created: "17 Dec 2007", name: "Test44Mrs J Hamilton-Winter", type: "CPA", lifeType: "JOINT", age1: 59.75, user: "106003101", master: "PR", status: "Printed", cocode: "STALW-00" },
  { quote: 929590, variant: 0, ifa: "EASTS-001", created: "17 Dec 2007", name: "Test44Mr T Owens", type: "CPA", lifeType: "JOINT", age1: 59.75, user: "200000001", master: "PR", status: "Printed", cocode: "STALW-00" },
  { quote: 929591, variant: 0, ifa: "ELEME-004", created: "18 Dec 2007", name: "Test44Mr M Chisholm", type: "PPA", lifeType: "Single", age1: 60, user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929782, variant: 0, ifa: "QUOTE-001", created: "17 Dec 2007", name: "Test44Mr M Delapeyre", type: "CPA", lifeType: "JOINT", age1: 59.75, user: "200000001", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930038, variant: 0, ifa: "OPENW-001", created: "18 Dec 2007", name: "Test44Mrs P Cadwell", type: "CPA", lifeType: "JOINT", age1: 58.25, user: "106003101", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930041, variant: 0, ifa: "QUOTE-001", created: "18 Dec 2007", name: "Test44Mrs G Burrows", type: "CPA", lifeType: "Single", age1: 59.75, user: "111002872", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930059, variant: 0, ifa: "WENTW-002", created: "18 Dec 2007", name: "Test44Mr R Garnett", type: "PPA", lifeType: "JOINT", age1: 61.75, user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
];

export function PullQuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [filterMode, setFilterMode] = useState<">=" | "=">(">=");
  const [filterValue, setFilterValue] = useState("0");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [monthlyCash, setMonthlyCash] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel bg-white w-[900px] max-w-[96vw] max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between shrink-0">
          <span>Quote Lookup</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body flex flex-col gap-3 overflow-hidden">
          {/* Toolbar row */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Get Records */}
            <fieldset className="border border-[#b8b8b8] rounded-[6px] px-3 pt-1 pb-2">
              <legend className="text-[12px] font-['Mulish'] text-[#3d3d3d] px-1">Get Records</legend>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 font-['Mulish'] text-[13px] cursor-pointer">
                  <input
                    type="radio"
                    name="filterMode"
                    checked={filterMode === ">="}
                    onChange={() => setFilterMode(">=")}
                    className="accent-[#006cf4]"
                  />
                  <span>&gt;=</span>
                </label>
                <label className="flex items-center gap-2 font-['Mulish'] text-[13px] cursor-pointer">
                  <input
                    type="radio"
                    name="filterMode"
                    checked={filterMode === "="}
                    onChange={() => setFilterMode("=")}
                    className="accent-[#006cf4]"
                  />
                  <span>=</span>
                  <input
                    type="text"
                    className="lve-input w-[80px] h-[26px] text-[13px] py-0"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </label>
              </div>
            </fieldset>

            {/* Nav buttons */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm px-2 py-1" title="First">
                  <MdFirstPage size={16} />
                </button>
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm px-2 py-1" title="Previous">
                  <MdChevronLeft size={16} />
                </button>
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm px-2 py-1" title="Next">
                  <MdChevronRight size={16} />
                </button>
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm px-2 py-1" title="Last">
                  <MdLastPage size={16} />
                </button>
              </div>
              <span className="font-['Mulish'] text-[12px] text-[#3d3d3d] pl-1">20275369</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 ml-2">
              <div className="flex items-center gap-2">
                <button type="button" className="lve-btn lve-btn-sm min-w-[80px] justify-center">
                  Last 60
                </button>
                <button type="button" className="lve-btn lve-btn-sm min-w-[120px] justify-center">
                  Locate (F3 Next)
                </button>
                <button type="button" className="lve-btn lve-btn-sm min-w-[70px] justify-center" disabled>
                  <MdCheck size={14} />
                  OK
                </button>
                <button type="button" onClick={onClose} className="lve-btn lve-btn-secondary lve-btn-sm min-w-[80px] justify-center">
                  <MdCancel size={14} />
                  Cancel
                </button>
              </div>
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={monthlyCash}
                  onChange={(e) => setMonthlyCash(e.target.checked)}
                  className="accent-[#006cf4]"
                />
                Monthly Cash Policy
              </label>
            </div>
          </div>

          {/* Illustrations table */}
          <div className="flex flex-col overflow-hidden border border-[#b8b8b8] rounded-[6px]">
            <div className="bg-[#eaf5f8] px-2 py-1 text-[12px] font-['Livvic'] font-semibold text-[#00263e] border-b border-[#b8b8b8]">
              Illustrations (Variant 0 only)
            </div>
            <div className="overflow-auto" style={{ maxHeight: 230 }}>
              <table className="w-full text-[12px] font-['Mulish'] border-collapse">
                <thead>
                  <tr className="bg-[#002f5c] text-white text-left">
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Quote</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Variant(T)</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">IFA</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Created</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Name</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Type</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">LifeType</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Age 1</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">User</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Master</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Status</th>
                    <th className="px-2 py-1 font-semibold whitespace-nowrap">COCODE</th>
                  </tr>
                </thead>
                <tbody>
                  {ILLUSTRATIONS.map((row, i) => (
                    <tr
                      key={row.quote}
                      onClick={() => setSelectedIdx(i)}
                      className={`cursor-pointer border-b border-[#e3e6ea] ${
                        i === selectedIdx ? "bg-[#006cf4] text-white" : i % 2 === 0 ? "bg-white hover:bg-[#eaf5f8]" : "bg-[#f7f9fc] hover:bg-[#eaf5f8]"
                      }`}
                    >
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.quote}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea] text-center">{row.variant}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.ifa}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea] whitespace-nowrap">{row.created}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.name}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.type}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.lifeType}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea] text-right">{row.age1}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.user}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.master}</td>
                      <td className="px-2 py-[2px] border-r border-[#e3e6ea]">{row.status}</td>
                      <td className="px-2 py-[2px]">{row.cocode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Variants table */}
          <div className="flex flex-col border border-[#b8b8b8] rounded-[6px]">
            <div className="bg-[#eaf5f8] px-2 py-1 text-[12px] font-['Livvic'] font-semibold text-[#00263e] border-b border-[#b8b8b8]">
              Variants
            </div>
            <div className="overflow-auto" style={{ maxHeight: 120 }}>
              <table className="w-full text-[12px] font-['Mulish'] border-collapse">
                <thead>
                  <tr className="bg-[#002f5c] text-white text-left">
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Variant</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Series</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Created</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Username</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Type</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Life Type</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Gross Annuity</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Amount</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">TFC %</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">TFC</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">Dep %</th>
                    <th className="px-2 py-1 font-semibold border-r border-[#1a4a7a] whitespace-nowrap">O/lap</th>
                    <th className="px-2 py-1 font-semibold whitespace-nowrap">Gtee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={13} className="px-2 py-3 text-center text-[#b8b8b8] font-['Mulish']">
                      No variants
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
